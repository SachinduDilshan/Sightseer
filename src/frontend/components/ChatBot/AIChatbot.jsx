import React, { useState, useContext, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, MessageCircle, X } from 'lucide-react';
import { DarkModeContext } from '../view/DarkModeContext';
import OpenAI from "openai";

const AIChatbot = () => {

    const openai = new OpenAI();
    const { darkMode } = useContext(DarkModeContext);
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hi Traveler! I'm the Sightseer AI assistant. How can I help you plan your Sri Lankan adventure today?",
            sender: 'ai'
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef(null);

    // Function to get AI response from OpenAI API
    const fetchAIResponse = async (userMessage) => {
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: "gpt-4o-mini",  
                    messages: [{ role: "user", content: userMessage }],
                    max_tokens: 50,
                },
                {
                    headers: {
                        "Authorization": `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`,  // Replace with your key
                        "Content-Type": "application/json"
                    }
                }
            );

            return response.data.choices[0].message.content;
        } catch (error) {
            console.error("Error fetching AI response:", error);
            return "Sorry, I couldn't fetch a response. Try again later.";
        }
    };

    const handleSendMessage = async () => {
        if (inputMessage.trim() === '') return;

        // Add user message
        const newUserMessage = {
            id: messages.length + 1,
            text: inputMessage,
            sender: 'user'
        };
        setMessages(prev => [...prev, newUserMessage]);

        // Get AI response
        const aiText = await fetchAIResponse(inputMessage);
        const aiResponse = {
            id: messages.length + 2,
            text: aiText,
            sender: 'ai'
        };
        setMessages(prev => [...prev, aiResponse]);

        setInputMessage('');
    };

    // Scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Chatbot Window */}
            {isOpen && (
                <div className={`w-80 h-[500px] rounded-xl shadow-2xl border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'} flex flex-col overflow-hidden`}>
                    {/* Header */}
                    <div className={`p-4 flex justify-between items-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-teal-600 text-white'}`}>
                        <h3 className="font-semibold">Sightseer AI Assistant</h3>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-opacity-20 rounded-full p-1">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className={`flex-1 overflow-y-auto p-4 ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-50 text-gray-800'}`}>
                        {messages.map((msg) => (
                            <div key={msg.id} className={`mb-4 max-w-[90%] clear-both ${msg.sender === 'user' ? 'ml-auto text-right' : 'mr-auto text-left'}`}>
                                <div className={`inline-block p-3 rounded-lg ${msg.sender === 'user' ? (darkMode ? 'bg-teal-700 text-white' : 'bg-teal-500 text-white') : (darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800')}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className={`p-4 border-t flex items-center ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
                        <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} placeholder="Ask about your trip..." className={`flex-1 p-2 rounded-lg mr-2 ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-800'}`} />
                        <button onClick={handleSendMessage} className={`p-2 rounded-full ${darkMode ? 'bg-teal-700 hover:bg-teal-600' : 'bg-teal-500 hover:bg-teal-600'} text-white`}>
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

            {/* Chatbot Launcher */}
            <button onClick={() => setIsOpen(!isOpen)} className={`rounded-full p-4 shadow-2xl ${darkMode ? 'bg-teal-700 hover:bg-teal-600 text-white' : 'bg-teal-500 hover:bg-teal-600 text-white'} transition-all duration-300`}>
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </button>
        </div>
    );
};

export default AIChatbot;
