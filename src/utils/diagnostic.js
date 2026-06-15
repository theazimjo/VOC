import { ref, set, get, remove } from 'firebase/database';
import { db } from '../firebase';

/**
 * Runs a diagnostic test to check Realtime Database server connection and permissions.
 * @param {string} userId - The authenticated user's ID.
 * @returns {Promise<{success: boolean, stage: string, error: Error|null, message: string}>}
 */
export async function runFirestoreDiagnostic(userId) {
  if (!userId) {
    return { success: false, stage: 'auth', error: null, message: "Foydalanuvchi tizimga kirmagan." };
  }

  const diagRef = ref(db, `users/${userId}/diagnostic_test`);

  // Stage 1: Server Write Test
  try {
    await set(diagRef, {
      testTime: new Date().toISOString(),
      purpose: 'Realtime Database connection diagnostic'
    });
  } catch (err) {
    console.error("Diagnostic Write Error:", err);
    return {
      success: false,
      stage: 'write',
      error: err,
      message: getReadableErrorMessage(err, 'write')
    };
  }

  // Stage 2: Server Read Test
  try {
    const snap = await get(diagRef);
    if (!snap.exists()) {
      throw new Error("Yozilgan ma'lumot Realtime Database serverida topilmadi.");
    }
  } catch (err) {
    console.error("Diagnostic Read Error:", err);
    return {
      success: false,
      stage: 'read',
      error: err,
      message: getReadableErrorMessage(err, 'read')
    };
  }

  // Stage 3: Cleanup Test Document
  try {
    await remove(diagRef);
  } catch (err) {
    console.warn("Diagnostic Cleanup Warning (can be ignored):", err);
  }

  return {
    success: true,
    stage: 'completed',
    error: null,
    message: "Realtime Database serveriga muvaffaqiyatli ulandi va ma'lumotlar saqlandi!"
  };
}

function getReadableErrorMessage(err, stage) {
  const code = err?.code || '';
  const message = err?.message || '';

  const lowerCode = code.toLowerCase();
  const lowerMessage = message.toLowerCase();

  if (lowerCode.includes('permission') || lowerMessage.includes('permission') || lowerMessage.includes('denied')) {
    return `Ruxsat rad etildi (Permission Denied). Firebase Console'da Realtime Database Rules (Xavfsizlik qoidalari) yozish/o'qishga ruxsat bermayapti. Rules bo'limidan 'read' va 'write' ruxsatlarini bering.`;
  }
  if (lowerCode.includes('unavailable') || lowerMessage.includes('offline') || lowerMessage.includes('connect')) {
    return `Realtime Database serveriga ulanib bo'lmadi. Tarmoq ulanishini tekshiring yoki Firebase Console'da 'Realtime Database' yaratilganligiga ishonch hosil qiling.`;
  }
  
  return `Xatolik yuz berdi (${stage} bosqichida): ${message} [Kod: ${code}]`;
}

