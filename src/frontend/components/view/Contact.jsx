import React, { useContext } from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { DarkModeContext } from './DarkModeContext';
import Footer from './Footer';
import Navbar from './Navbar';
import AIChatbot from '../ChatBot/AIChatbot';

const ContactPage = () => {
    const { darkMode } = useContext(DarkModeContext);

    return (
        <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
                {/* Navigation */}
                <Navbar />

                {/* Hero Section with Background */}
                <div className="relative h-64 bg-gray-900">
                    <img
                        src="/api/placeholder/1920/400"
                        alt="Contact Us Background"
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h1 className="text-4xl font-bold text-white">CONTACT US</h1>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto px-4 py-12">
                    <div className="text-center mb-12">
                        <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            Questions About Your Journey?
                        </h2>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            We are ready to help you plan every detail of your trip. From choosing the perfect
                            destinations to arranging authentic experiences, we're here to make your Sri Lankan
                            adventure seamless and memorable.
                        </p>
                    </div>

                    {/* Contact Options */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {/* Phone */}
                        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-teal-100'} 
            p-6 rounded-lg border text-center hover:shadow-lg transition-shadow`}>
                            <div className="flex justify-center mb-4">
                                <Phone className="w-8 h-8 text-teal-500" />
                            </div>
                            <h3 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                Talk to our expert
                            </h3>
                            <p className="text-teal-500">+94 11 234 5678</p>
                        </div>

                        {/* Email */}
                        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-teal-100'} 
            p-6 rounded-lg border text-center hover:shadow-lg transition-shadow`}>
                            <div className="flex justify-center mb-4">
                                <Mail className="w-8 h-8 text-teal-500" />
                            </div>
                            <h3 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                Email us anytime
                            </h3>
                            <p className="text-teal-500">contact@sightseer.lk</p>
                        </div>

                        {/* Chat */}
                        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-teal-100'} 
            p-6 rounded-lg border text-center hover:shadow-lg transition-shadow`}>
                            <div className="flex justify-center mb-4">
                                <MessageCircle className="w-8 h-8 text-teal-500" />
                            </div>
                            <h3 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                Chat with us now
                            </h3>
                            <button className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600">
                                Chat Now
                            </button>
                        </div>
                    </div>

                    {/* Address Section */}
                    <div className="text-center mb-12">
                        <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            General Contact Information
                        </h3>
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Mailing address: Sightseer, No. 41st, Colombo 03, Sri Lanka
                        </p>
                    </div>

                    {/* Newsletter Section */}
                    <Footer />
                </div>

                <AIChatbot />
            </div>
        </div>
    );
};

export default ContactPage;