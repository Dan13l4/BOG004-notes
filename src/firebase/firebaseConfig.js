// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, updateDoc, doc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyCGojWN4LpLXannEa5fT2cSiKD_9aPZQWE",
  authDomain: "take-your-note-c9f64.firebaseapp.com",
  projectId: "take-your-note-c9f64",
  storageBucket: "take-your-note-c9f64.appspot.com",
  messagingSenderId: "1079040342274",
  appId: "1:1079040342274:web:8d2de7f26dea774655ea1b",
  measurementId: "G-KV9PRGZ4TF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);
const db = getFirestore(app);
const user = auth.currentUser;

export { db, user, auth };



