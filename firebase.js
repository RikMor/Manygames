// ── FIREBASE CONFIG ──────────────────────────────────────────────
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, updateDoc, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBjlFFwXwU6m3_P-YhHOkn7lt8vnZeIs6w",
  authDomain: "manygames-2f8a7.firebaseapp.com",
  projectId: "manygames-2f8a7",
  storageBucket: "manygames-2f8a7.firebasestorage.app",
  messagingSenderId: "1053374536523",
  appId: "1:1053374536523:web:e46fde896a25179f0d66ce",
  measurementId: "G-LSR3NDK0WL"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export { collection, addDoc, getDocs, doc, setDoc, updateDoc, query, orderBy, onSnapshot };
