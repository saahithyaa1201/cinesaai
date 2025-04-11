// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAPbWUhYM-gEkoS9Ow6z1Wn9SEdSTU13X0",
  authDomain: "disneyplus-a031e.firebaseapp.com",
  projectId: "disneyplus-a031e",
  storageBucket: "disneyplus-a031e.appspot.com", // Corrected typo in your previous code
  messagingSenderId: "1059183405200",
  appId: "1:1059183405200:web:9e4b29c4cd3eeae19d9015",
  measurementId: "G-N34PFS5KQ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { auth, provider, storage };
export default db;
