'use client';
import { ChatBOT } from "@/lib/chatbot";
import { useState } from "react";
import { RiRobot2Line } from "react-icons/ri";
import styles from '@/styles/ChatBotStyles.css';

export default function ChatbotComponent() {

    const [chatHistory, setChatHistory] = useState([]);
    const [userInput, setuserInput] = useState('');
    const [chatBotVisible, setChatBotVisible] = useState(false);

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

    async function screenHandler() {
        setChatBotVisible(!chatBotVisible);
    }

    function handleChange(event) {
        setuserInput(event.target.value);
    }

    return (
        <>
        {chatBotVisible && 
        <div>
            <div className="chatbot-screen">
                <div className="chat-history">
                    {chatHistory.map((chat, index) => (
                        <div key={index}>
                            <p><strong>User:</strong> {chat.user}</p>
                            <p><strong>Bot:</strong> {chat.bot}</p>
                        </div>
                    ))}
                </div>
                <div className="input-section">
                    <input type="text" value={userInput} onChange={handleChange} placeholder="Ask your questions here..." required />
                    <button onClick={buttonHandler}>Send</button>
                </div>
            </div>
        </div>
        }
        {/* Chatbot button */}
            <button onClick={screenHandler} className="ChatBotbutton">
                <div className="svgIcon"> <RiRobot2Line size={25}/></div>
            </button>
        </>
    );
}