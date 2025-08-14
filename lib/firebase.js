import { initializeApp } from "firebase/app";
import { getDatabase, ref as firebaseRef, push as firebasePush, onValue as firebaseOnValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBvwhC7lxl7fTV2hISOWeK2-t2gxktZe2A",
  authDomain: "leadcapturechat.firebaseapp.com",
  databaseURL: "https://leadcapturechat-default-rtdb.firebaseio.com",
  projectId: "leadcapturechat",
  storageBucket: "leadcapturechat.appspot.com",
  messagingSenderId: "572495631325",
  appId: "1:572495631325:web:cbe65a1a1f4bd31ac89c34"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Export renamed functions to avoid naming conflicts
export { 
  database, 
  firebaseRef as ref, 
  firebasePush as push, 
  firebaseOnValue as onValue 
};