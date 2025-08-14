// src/components/ChatWidget.jsx
import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";

export default function ChatWidget() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, snapshot => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  const sendMessage = async () => {
    if (input.trim()) {
      await addDoc(collection(db, "messages"), {
        text: input,
        createdAt: serverTimestamp()
      });
      setInput("");
    }
  };

  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      width: "300px",
      background: "white",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
      padding: "10px"
    }}>
      <div style={{ maxHeight: "300px", overflowY: "auto" }}>
        {messages.map(msg => (
          <p key={msg.id}>{msg.text}</p>
        ))}
      </div>
      <input
        style={{ width: "80%" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
