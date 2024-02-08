'use client';
import { ChatBOT } from "@/lib/chatbot";
import { useState } from "react";
import styles from '@/styles/ChatBotScreenStyles.css';


export default function ChatbotScreen() {

    const [chatHistory, setChatHistory] = useState([]);
    const [userInput, setuserInput] = useState('');

    async function buttonHandler() {
        setChatHistory([...chatHistory, {user: userInput, bot: '...'}]);

        const chatbotdata = await ChatBOT(userInput);
        setChatHistory(prevChatHistory => {
            const newChatHistory = [...prevChatHistory];
            newChatHistory[newChatHistory.length - 1] = {user: userInput, bot: chatbotdata};
            return newChatHistory;
        });

        setuserInput('');
    }

    function handleChange(event) {
        setuserInput(event.target.value);
    }

    return (
        <>
           <div className="chatbot-screen">
            {/* Chat history */}
            <div className="chat-history">
                {chatHistory.map((chat, index) => (
                    <div key={index}>
                        <p><strong>User:</strong> {chat.user}</p>
                        <p><strong>Bot:</strong> {chat.bot}</p>
                    </div>
                ))}
            </div>
            {/* Input field */}
            <div className="input-section">
                <input type="text" value={userInput} onChange={handleChange} placeholder="Type here" required />
                {/* Button to send message */}
                <button onClick={buttonHandler}>Send</button>
            </div>
        </div>
        </>
    );
}
