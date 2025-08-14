import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvwhC7lxl7fTV2hISOWeK2-t2gxktZe2A",
  authDomain: "leadcapturechat.firebaseapp.com",
  projectId: "leadcapturechat",
  storageBucket: "leadcapturechat.firebasestorage.app",
  messagingSenderId: "572495631325",
  appId: "1:572495631325:web:cbe65a1a1f4bd31ac89c34",
  measurementId: "G-SYZRN9LXFC"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
