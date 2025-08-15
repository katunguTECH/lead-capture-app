// src/components/ChatWidget.jsx
import { useState, useEffect } from "react";
import { firestore, realtimeDB } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp
} from "firebase/firestore";
import { ref, onValue } from "firebase/database";

export default function ChatWidget() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(true); // Auto-open
  const [themeColor, setThemeColor] = useState("#007BFF");
  const [welcomeMessage, setWelcomeMessage] = useState(
    "Hello? How may I help you today?"
  );

  // 🎤 Start listening for voice input
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };
  };

  // 🔊 Speak a message
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  // Load theme & welcome message from Realtime Database
  useEffect(() => {
    const settingsRef = ref(realtimeDB, "settings");
    onValue(settingsRef, (snapshot) => {
      const data = snapshot.val();
      if (data?.themeColor) setThemeColor(data.themeColor);
      if (data?.welcomeMessage) {
        setWelcomeMessage(data.welcomeMessage);
        speak(data.welcomeMessage); // Speak DB welcome message
      } else {
        speak(welcomeMessage); // Speak default welcome message
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
        fontFamily: "Arial, sans-serif",
        zIndex: 9999
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
          placeholder="Type your message or use voice..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />

        {/* 🎤 Voice input button */}
        <button
          onClick={startListening}
          style={{
            background: themeColor,
            color: "#fff",
            border: "none",
            padding: "10px 12px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          🎤
        </button>

        {/* Send button */}
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




