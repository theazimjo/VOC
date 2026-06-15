import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

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
export const auth = getAuth(app);
export const db = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();
export default app;


