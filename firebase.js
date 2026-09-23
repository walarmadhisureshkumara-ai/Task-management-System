import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXEfa6jiG7Wo__wcMj6rhRxBxi1597kg0",
  authDomain: "register-form-f1acc.firebaseapp.com",
  projectId: "register-form-f1acc",
  storageBucket: "register-form-f1acc.firebasestorage.app",
  messagingSenderId: "806372350672",
  appId: "1:806372350672:web:fe03ad813e2e1e7f645cd5",
  measurementId: "G-D867Y6H4BW"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);