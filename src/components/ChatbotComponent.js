'use client';
import { useState } from "react";
import { RiRobot2Line } from "react-icons/ri";
import ChatbotScreen from "./ChatbotScreen"; // Import ChatbotScreen component
import styles from '@/styles/ChatBotbuttonStyles.css';

export default function ChatbotComponent() {

    const [chatHistory, setChatHistory] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [chatBotVisible, setChatBotVisible] = useState(false);

    async function buttonHandler() {
        // Implement your logic to handle button click here
        // For example, toggle the visibility of the chatbot screen
        setChatBotVisible(!chatBotVisible);
    }

    function handleChange(event) {
        setUserInput(event.target.value);
    }

    return (
        <>
            {/* Chatbot screen */}
            {chatBotVisible && (
                <ChatbotScreen
                    chatHistory={chatHistory}
                    userInput={userInput}
                    handleChange={handleChange}
                    buttonHandler={buttonHandler}
                />
            )}

            {/* Chatbot button */}
            <button onClick={buttonHandler} className="ChatBotbutton">
                <div className="svgIcon"> <RiRobot2Line /></div>
            </button>
        </>
    );
}

// 'use client';
// import { ChatBOT } from "@/lib/chatbot";
// import { useState } from "react";

// export default function ChatbotComponent() {

//     const [chatHistory, setChatHistory] = useState([]);
//     const [userInput, setuserInput] = useState('');

//     async function buttonHandler() {
//         setChatHistory([...chatHistory, {user: userInput, bot: '...'}]);

//         const chatbotdata = await ChatBOT(userInput);
//         setChatHistory(prevChatHistory => {
//             const newChatHistory = [...prevChatHistory];
//             newChatHistory[newChatHistory.length - 1] = {user: userInput, bot: chatbotdata};
//             return newChatHistory;
//         });

//         setuserInput('');
//     }

//     function handleChange(event) {
//         setuserInput(event.target.value);
//     }

//     return (
//         <>
//             <div>
//                 {chatHistory.map((chat, index) => (
//                     <div key={index}>
//                         <p><strong>User:</strong> {chat.user}</p>
//                         <p><strong>Bot:</strong> {chat.bot}</p>
//                     </div>
//                 ))}
//             </div>
//             <div>
//                 <input type="text" value={userInput} onChange={handleChange} placeholder="Ask your questions here..." required />
//                 <button onClick={buttonHandler}>send</button>
//             </div>
//         </>
//     );
// }

// ChatbotComponent.js