import React, { useState } from 'react';
import './Chat.css';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    const sendMessage = () => {
    };

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {/* Loop through messages and create message bubbles */}
                {messages.map(message => (
                    <div className={`message-bubble ${message.sent ? 'sent' : 'received'}`}>
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    placeholder="Write your message"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chat;
