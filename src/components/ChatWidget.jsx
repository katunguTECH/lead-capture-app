// src/components/ChatWidget.jsx
import { useState, useEffect } from "react";
import { firestore, realtimeDB } from "../firebase";

// Firestore imports (for messages)
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp
} from "firebase/firestore";

// Realtime Database imports (for settings)
import { ref, onValue } from "firebase/database";

export default function ChatWidget() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [themeColor, setThemeColor] = useState("#007BFF");
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Hello? How may I help you today?"
  );

  // Load theme & welcome message from Realtime Database
  useEffect(() => {
    const settingsRef = ref(realtimeDB, "settings");
    onValue(settingsRef, (snapshot) => {
      const data = snapshot.val();
      if (data?.themeColor) setThemeColor(data.themeColor);
      if (data?.welcomeMessage) {
        setWelcomeMessage(data.welcomeMessage);
      }
    });
  }, []);

  // Load chat messages from Firestore
  useEffect(() => {
    const q = query(collection(firestore, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(loadedMessages);
    });

    return unsubscribe;
  }, []);

  // Send a message to Firestore
  const sendMessage = async () => {
    if (input.trim()) {
      await addDoc(collection(firestore, "messages"), {
        text: input,
        createdAt: serverTimestamp(),
        sender: "user"
      });
      setInput("");
    }
  };

  // Closed chat button
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          background: themeColor,
          color: "#fff",
          border: "none",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          fontSize: "24px",
          cursor: "pointer"
        }}
      >
        💬
      </button>
    );
  }

  // Open chat widget
  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "320px",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "Arial, sans-serif"
      }}
    >
      {/* Header */}
      <div
        style={{
          background: themeColor,
          color: "#fff",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: "bold"
        }}
      >
        Chat Support
        <button
          onClick={() => setIsOpen(false)}
          style={{
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          padding: "10px",
          overflowY: "auto",
          background: "#f5f5f5"
        }}
      >
        {/* Always show welcome message first */}
        {welcomeMessage && (
          <div
            style={{
              marginBottom: "8px",
              display: "flex",
              justifyContent: "flex-start"
            }}
          >
            <div
              style={{
                background: "#e0e0e0",
                color: "#000",
                padding: "8px 12px",
                borderRadius: "15px",
                maxWidth: "80%"
              }}
            >
              {welcomeMessage}
            </div>
          </div>
        )}

        {/* Firestore messages */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              marginBottom: "8px",
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start"
            }}
          >
            <div
              style={{
                background:
                  msg.sender === "user" ? themeColor : "#e0e0e0",
                color: msg.sender === "user" ? "#fff" : "#000",
                padding: "8px 12px",
                borderRadius: "15px",
                maxWidth: "80%"
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ display: "flex", borderTop: "1px solid #ddd" }}>
        <input
          style={{
            flex: 1,
            border: "none",
            padding: "10px",
            fontSize: "14px",
            outline: "none"
          }}
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          style={{
            background: themeColor,
            color: "#fff",
            border: "none",
            padding: "10px 15px",
            cursor: "pointer"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}


