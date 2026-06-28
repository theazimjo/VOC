import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { 
  doc, 
  setDoc, 
  onSnapshot, 
  collection, 
  query, 
  where, 
  updateDoc, 
  addDoc, 
  deleteDoc 
} from 'firebase/firestore';

export function useAIRelay() {
  const { user } = useAuth();
  const [relayStatus, setRelayStatus] = useState({ active: false });

  // 1. HOST AGENT (Runs on the computer where LM Studio is active)
  useEffect(() => {
    if (!user) return;

    let isSubscribed = true;
    let heartbeatInterval;
    let unsubscribeRequests;

    const checkLMStudioAndHeartbeat = async () => {
      const endpoint = localStorage.getItem('lm_studio_endpoint') || 'http://localhost:1234/v1';
      try {
        const res = await fetch(`${endpoint}/models`, { 
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          const data = await res.json();
          const modelName = data.data?.[0]?.id || 'local-model';
          
          if (!isSubscribed) return;

          // Register / Send Heartbeat to Firestore
          const statusRef = doc(db, 'users', user.uid, 'relay', 'status');
          await setDoc(statusRef, {
            active: true,
            lastHeartbeat: new Date().toISOString(),
            model: modelName,
            endpoint: endpoint
          });

          // Start listening for pending grading requests in the cloud
          if (!unsubscribeRequests) {
            const requestsRef = collection(db, 'users', user.uid, 'relay', 'requests');
            const q = query(requestsRef, where('status', '==', 'pending'));
            
            unsubscribeRequests = onSnapshot(q, (snapshot) => {
              snapshot.docs.forEach(async (docSnap) => {
                const reqData = docSnap.data();
                const reqId = docSnap.id;
                
                try {
                  // Mark as processing on host
                  await updateDoc(doc(db, 'users', user.uid, 'relay', 'requests', reqId), {
                    status: 'processing'
                  });

                  // Evaluate the student's answer using the computer's local model
                  const result = await evaluateWithLocalLM(
                    reqData.payload.question,
                    reqData.payload.reference,
                    reqData.payload.answer,
                    endpoint,
                    modelName
                  );

                  // Save results back to Firestore
                  await updateDoc(doc(db, 'users', user.uid, 'relay', 'requests', reqId), {
                    status: 'completed',
                    result: result
                  });
                } catch (e) {
                  console.error("Relay processing error:", e);
                  await updateDoc(doc(db, 'users', user.uid, 'relay', 'requests', reqId), {
                    status: 'failed',
                    error: e.message
                  });
                }
              });
            });
          }
        }
      } catch (err) {
        // LM Studio not running on this machine (or this device is a mobile phone)
      }
    };

    // Run immediately and then poll every 15s
    checkLMStudioAndHeartbeat();
    heartbeatInterval = setInterval(checkLMStudioAndHeartbeat, 15000);

    return () => {
      isSubscribed = false;
      clearInterval(heartbeatInterval);
      if (unsubscribeRequests) unsubscribeRequests();
    };
  }, [user]);

  // 2. CLIENT MONITOR (Runs on the phone to check if the computer is active)
  useEffect(() => {
    if (!user) return;

    const statusRef = doc(db, 'users', user.uid, 'relay', 'status');
    const unsub = onSnapshot(statusRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        // A fresh heartbeat must be within the last 45 seconds
        const diff = new Date().getTime() - new Date(data.lastHeartbeat).getTime();
        if (data.active && diff < 45000) {
          setRelayStatus({ active: true, model: data.model });
        } else {
          setRelayStatus({ active: false });
        }
      } else {
        setRelayStatus({ active: false });
      }
    });

    return () => unsub();
  }, [user]);

  const evaluateWithLocalLM = async (questionText, referenceText, studentAnswerText, endpoint, modelName) => {
    const systemPrompt = `You are a strict and helpful English grammar teacher.
Analyze the student's answer based on the task prompt and reference/model answer.
Evaluate if the sentence is grammatically correct and communicates the right meaning. Ignore minor casing errors.
You must respond with ONLY a valid, plain JSON object. Do not include markdown ticks, prefix notes, or code blocks.
Response JSON schema:
{"score": <number between 0.0 and 1.0>, "feedback": "<Brief 1-sentence English explanation of any grammar mistake, or short praise if perfect>"}
Do not return anything else except this JSON.`;

    const userPrompt = `Task/Question: ${questionText}
Reference/Model Answer: ${referenceText}
Student's Answer: "${studentAnswerText}"

Evaluate the answer and return the JSON.`;

    const response = await fetch(`${endpoint}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.1,
        max_tokens: 150
      })
    });

    if (!response.ok) throw new Error('API return error');
    const data = await response.json();
    const text = data.choices[0].message.content.trim();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON block returned by LLM');
    const cleanJson = JSON.parse(jsonMatch[0]);

    return {
      score: typeof cleanJson.score === 'number' ? cleanJson.score : 0,
      feedback: cleanJson.feedback || 'No comments.'
    };
  };

  // Helper to submit a request and wait for responses
  const sendRelayRequest = async (question, reference, answer) => {
    if (!user) throw new Error("User not logged in");
    
    const requestsRef = collection(db, 'users', user.uid, 'relay', 'requests');
    const docRef = await addDoc(requestsRef, {
      status: 'pending',
      createdAt: new Date().toISOString(),
      payload: { question, reference, answer }
    });

    return new Promise((resolve, reject) => {
      // Timeout after 20 seconds to prevent hanging
      const timeout = setTimeout(() => {
        unsub();
        // Delete request document on timeout
        deleteDoc(doc(db, 'users', user.uid, 'relay', 'requests', docRef.id)).catch(console.error);
        reject(new Error("Relay server timeout"));
      }, 20000);

      const unsub = onSnapshot(doc(db, 'users', user.uid, 'relay', 'requests', docRef.id), (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.status === 'completed') {
            clearTimeout(timeout);
            unsub();
            deleteDoc(doc(db, 'users', user.uid, 'relay', 'requests', docRef.id)).catch(console.error);
            resolve(data.result);
          } else if (data.status === 'failed') {
            clearTimeout(timeout);
            unsub();
            deleteDoc(doc(db, 'users', user.uid, 'relay', 'requests', docRef.id)).catch(console.error);
            reject(new Error(data.error || "Grading failed"));
          }
        }
      });
    });
  };

  return { relayStatus, sendRelayRequest };
}
