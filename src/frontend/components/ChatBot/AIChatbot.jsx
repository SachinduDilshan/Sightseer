import React, { useState, useContext, useRef, useEffect } from 'react';
import { Send, MessageCircle, X } from 'lucide-react';
import { DarkModeContext } from '../view/DarkModeContext';
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

const AIChatbot = () => {
    const { darkMode } = useContext(DarkModeContext);
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi there! I'm the Sightseer AI assistant. How can I help you plan your Sri Lankan adventure today?", sender: 'ai' }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef(null);

    const fetchAIResponse = async (userMessage) => {
        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are an AI assistant helping users plan trips in Sri Lanka." },
                    { role: "user", content: userMessage }
                ],
                store: true,
            });
            return completion.choices[0].message.content;
        } catch (error) {
            console.error("Error fetching AI response:", error);
            return "Sorry, I couldn't fetch a response. Try again later.";
        }
    };

    const handleSendMessage = async () => {
        if (inputMessage.trim() === '') return;

        const newUserMessage = { id: messages.length + 1, text: inputMessage, sender: 'user' };
        setMessages(prev => [...prev, newUserMessage]);

        const aiText = await fetchAIResponse(inputMessage);
        const aiResponse = { id: messages.length + 2, text: aiText, sender: 'ai' };
        setMessages(prev => [...prev, aiResponse]);

        setInputMessage('');
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {isOpen && (
                <div className={`w-80 h-[500px] rounded-xl shadow-2xl border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'} flex flex-col overflow-hidden`}>
                    <div className={`p-4 flex justify-between items-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-teal-600 text-white'}`}>
                        <h3 className="font-semibold">Sightseer AI Assistant</h3>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-opacity-20 rounded-full p-1">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
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
                    <div className={`p-4 border-t flex items-center ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault(); 
                                    handleSendMessage();
                                    setInputMessage('');
                                }
                            }}
                            placeholder="Ask about your trip..."
                            className={`flex-1 p-2 rounded-lg mr-2 ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-800'}`}
                        />
                        <button onClick={handleSendMessage}
                            className={`p-2 rounded-full ${darkMode ? 'bg-teal-700 hover:bg-teal-600' : 'bg-teal-500 hover:bg-teal-600'} text-white`}>
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className={`rounded-full p-4 shadow-2xl ${darkMode ? 'bg-teal-700 hover:bg-teal-600 text-white' : 'bg-teal-500 hover:bg-teal-600 text-white'} transition-all duration-300`}>
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </button>
        </div>
    );
};

export default AIChatbot;
