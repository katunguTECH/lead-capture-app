import { useState, useEffect } from 'react';
import { database, ref, push, onValue } from '/lib/firebase.js'; // Absolute path import
import styles from '../styles/ChatWidget.module.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const messagesRef = ref(database, 'messages');

  useEffect(() => {
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setMessages(Object.values(data));
      }
    });
    
    return () => unsubscribe();
  }, []);

  const handleSend = () => {
    if (inputValue.trim()) {
      push(messagesRef, {
        text: inputValue,
        sender: 'user',
        timestamp: Date.now()
      });
      setInputValue('');
    }
  };

  return (
    <div className={styles.chatContainer}>
      {isOpen ? (
        <div className={styles.chatBox}>
          <div className={styles.chatHeader}>
            <h3>Live Support</h3>
            <button 
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>
          <div className={styles.messages}>
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`${styles.message} ${
                  msg.sender === 'user' ? styles.user : styles.bot
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className={styles.inputArea}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              aria-label="Type your message"
            />
            <button 
              onClick={handleSend}
              aria-label="Send message"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button 
          className={styles.chatButton}
          onClick={() => setIsOpen(true)}
          aria-label="Open chat widget"
        >
          Need Help?
        </button>
      )}
    </div>
  );
};

export default ChatWidget;