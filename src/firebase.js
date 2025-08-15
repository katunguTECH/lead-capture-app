// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; // For Realtime DB

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvwhC7lxl7fTV2hISOWeK2-t2gxktZe2A",
  authDomain: "leadcapturechat.firebaseapp.com",
  databaseURL: "https://leadcapturechat-default-rtdb.firebaseio.com", // Important: for Realtime DB
  projectId: "leadcapturechat",
  storageBucket: "leadcapturechat.firebasestorage.app",
  messagingSenderId: "572495631325",
  appId: "1:572495631325:web:cbe65a1a1f4bd31ac89c34",
  measurementId: "G-SYZRN9LXFC"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Firestore (for chat messages)
export const firestore = getFirestore(app);

// Export Realtime Database (for settings)
export const realtimeDB = getDatabase(app);
