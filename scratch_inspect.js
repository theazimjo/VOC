import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCjAzSQYeftEQ0t84tDITRvy5xOX609WzU",
  authDomain: "ai-chat-703e7.firebaseapp.com",
  databaseURL: "https://ai-chat-703e7-default-rtdb.firebaseio.com",
  projectId: "ai-chat-703e7",
  storageBucket: "ai-chat-703e7.appspot.com",
  messagingSenderId: "185115025377",
  appId: "1:185115025377:web:ca4cfe8fde9703ed1b7ca0",
  measurementId: "G-K0BYQ65H4B"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function run() {
  const usersRef = ref(db, "users");
  const snap = await get(usersRef);
  if (snap.exists()) {
    const users = snap.val();
    Object.entries(users).forEach(([userId, userVal]) => {
      console.log(`\n=== User ID: ${userId} (${userVal.profile?.displayName || 'No Name'}) ===`);
      if (userVal.books) {
        Object.entries(userVal.books).forEach(([id, b]) => {
          const wordsCount = b.words ? Object.keys(b.words).length : 0;
          console.log(`  Book ID: ${id}, Title: ${b.title}, wordCount: ${b.wordCount}, Actual words: ${wordsCount}`);
        });
      } else {
        console.log("  No books");
      }
      if (userVal.packs) {
        Object.entries(userVal.packs).forEach(([id, p]) => {
          const wordsCount = p.words ? Object.keys(p.words).length : 0;
          console.log(`  Pack ID: ${id}, Name: ${p.name}, wordCount: ${p.wordCount}, Actual words: ${wordsCount}`);
        });
      } else {
        console.log("  No packs");
      }
    });
  } else {
    console.log("No users in DB");
  }
  process.exit(0);
}

run().catch(console.error);


