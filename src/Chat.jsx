import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Chat.css";

function Chat({ selectedUserId, loggedInUserId }) {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchMessages = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/messages/${selectedUserId}`
            );
            setMessages(response.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const sendMessage = async () => {
        if (inputText.trim() !== "") {
            try {
                const response = await axios.post(
                    `http://localhost:5000/api/messages/${selectedUserId}`,
                    {
                        text: inputText,
                        senderId: loggedInUserId,
                    }
                );

                setMessages([...messages, response.data]);
                setInputText("");
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

    useEffect(() => {
        if (selectedUser) {
            fetchMessages();
        }
    }, [selectedUser]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/users/${selectedUserId}`
                );
                setSelectedUser(response.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        if (selectedUserId) {
            fetchUser();
            fetchMessages();
        }
    }, [selectedUserId]);

    return (
        <div className="chat-container">
            <div className="chat-header">
                {selectedUser && <h2>Chat with {selectedUser.username}</h2>}
            </div>
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${
                            message.sender_id === loggedInUserId
                                ? "sent"
                                : "received"
                        }`}
                    >
                        <div
                            className={`message-bubble ${
                                message.sender_id === loggedInUserId
                                    ? "sent"
                                    : "received"
                            }`}
                        >
                            {message.text}
                        </div>
                        <img
                            src={selectedUser?.avatar || "av3.png"}
                            alt="avatar"
                            className="avatar"
                        />
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
