import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database"; // Add Realtime Database functions

const firebaseConfig = {
  apiKey: "AIzaSyBvwhC7lxl7fTV2hISOWeK2-t2gxktZe2A",
  authDomain: "leadcapturechat.firebaseapp.com",
  databaseURL: "https://leadcapturechat-default-rtdb.firebaseio.com", // ⚠️ Add this line (replace if different)
  projectId: "leadcapturechat",
  storageBucket: "leadcapturechat.appspot.com", // Fixed typo in your original
  messagingSenderId: "572495631325",
  appId: "1:572495631325:web:cbe65a1a1f4bd31ac89c34",
  measurementId: "G-SYZRN9LXFC"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Initialize Realtime DB

export { database, ref, push, onValue }; // Export only what's needed for chat