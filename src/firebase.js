// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBL7ImYcPfRVP5ZdW_yYZWKBYtyeua5m0w",
  authDomain: "to-do-list-90496.firebaseapp.com",
  projectId: "to-do-list-90496",
  storageBucket: "to-do-list-90496.firebasestorage.app",
  messagingSenderId: "1051186892522",
  appId: "1:1051186892522:web:bc984bd0b8a537f4bc9193",
  measurementId: "G-EVZJBMMBC5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
