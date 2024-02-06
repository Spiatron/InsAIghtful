'use client';
import { ChatBOT } from "@/lib/chatbot";
import { useState } from "react";

export default function ChatbotComponent() {

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
            <div>
                {chatHistory.map((chat, index) => (
                    <div key={index}>
                        <p><strong>User:</strong> {chat.user}</p>
                        <p><strong>Bot:</strong> {chat.bot}</p>
                    </div>
                ))}
            </div>
            <div>
                <input type="text" value={userInput} onChange={handleChange} placeholder="Ask your questions here..." required />
                <button onClick={buttonHandler}>Chat with the bot</button>
            </div>
        </>
    );
}
