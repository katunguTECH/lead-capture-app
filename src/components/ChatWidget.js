import { useState, useEffect } from 'react';
import { database, ref, push, onValue } from '../lib/firebase';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Reference to the Firebase messages
  const messagesRef = ref(database, 'messages');

  // Load messages from Firebase
  useEffect(() => {
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedMessages = Object.values(data);
        setMessages(loadedMessages);
      }
    });
  }, []);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = () => {
    if (inputValue.trim()) {
      // Push new message to Firebase
      push(messagesRef, {
        text: inputValue,
        sender: 'user',
        timestamp: Date.now()
      });
      setInputValue('');
    }
  };

  return (
    <div className="chat-container">
      {isOpen ? (
        <div className="chat-box">
          <div className="chat-header">
            <h3>Live Support</h3>
            <button onClick={toggleChat} className="close-btn">×</button>
          </div>
          <div className="messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="input-area">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      ) : (
        <button onClick={toggleChat} className="chat-toggle-btn">
          Need Help?
        </button>
      )}
    </div>
  );
}