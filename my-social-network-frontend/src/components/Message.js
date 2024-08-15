import React, { useState } from "react";
import "../styles/Messenger.css";
const Messenger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "John Doe",
      content: "Hey, how are you?",
      timestamp: "10:30 AM",
    },
    {
      id: 2,
      sender: "You",
      content: "I am doing great, thanks! How about you?",
      timestamp: "10:32 AM",
    },
    {
      id: 3,
      sender: "John Doe",
      content: "Pretty good! Just working on some projects.",
      timestamp: "10:35 AM",
    },
    {
      id: 4,
      sender: "You",
      content: "That sounds interesting. What kind of projects?",
      timestamp: "10:37 AM",
    },
    {
      id: 5,
      sender: "John Doe",
      content: "Mostly web development stuff. Iam learning React!",
      timestamp: "10:40 AM",
    },
    // Add more messages here to test scrolling
  ]);

  const toggleMessenger = () => setIsOpen(!isOpen);

  return (
    <div className={`messenger ${isOpen ? "open" : ""}`}>
      <div className="messenger-header" onClick={toggleMessenger}>
        <h3>Messenger</h3>
        <span className={`toggle-icon ${isOpen ? "open" : ""}`}>▲</span>
      </div>
      {isOpen && (
        <div className="messenger-content">
          <div className="message-list">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${
                  message.sender === "You" ? "sent" : "received"
                }`}
              >
                <strong>{message.sender}: </strong>
                <span>{message.content}</span>
                <small>{message.timestamp}</small>
              </div>
            ))}
          </div>
          <div className="message-input">
            <input type="text" placeholder="Type a message..." />
            <button>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messenger;
