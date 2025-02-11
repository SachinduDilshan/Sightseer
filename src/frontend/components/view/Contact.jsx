import React, { useContext} from 'react';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { DarkModeContext } from './DarkModeContext';
import Sigiriya from '../../../assets/Sigiriya_800x520.jpg';
import Footer from './Footer';
import Navbar from './Navbar';
import AIChatbot from '../ChatBot/AIChatbot';
//import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';

const ContactPage = () => {
    const { darkMode } = useContext(DarkModeContext);
   // const navigate = useNavigate();
    

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <Navbar />
            {/* Back Button Section */}
           <div className="p-4 flex justify-between items-center bg-transparent text-gray-900 dark:text-white">
                <BackButton className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700" />
            </div>

            {/* Hero Section */}
            <div className="relative h-64 bg-gray-800">
                <img
                    src={Sigiriya}
                    alt="Contact Us Background"
                    className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-4xl font-bold text-white">CONTACT US</h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-semibold mb-4">Questions About Your Journey?</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        We are here to help you plan every detail of your trip. From choosing destinations to arranging authentic experiences, we ensure your Sri Lankan adventure is seamless and memorable.
                    </p>
                </div>

                {/* Contact Options */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {[{ icon: Phone, title: 'Talk to our expert', value: '+94 11 234 5678' },
                    { icon: Mail, title: 'Email us anytime', value: 'contact@sightseer.lk' },
                    { icon: MessageCircle, title: 'Chat with us now', value: 'Chat Now', isButton: true }].map((item, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-teal-100 dark:border-gray-700 text-center hover:shadow-lg transition-shadow">
                            <div className="flex justify-center mb-4">
                                <item.icon className="w-8 h-8 text-teal-500" />
                            </div>
                            <h3 className="font-medium mb-2 text-gray-800 dark:text-white">{item.title}</h3>
                            {item.isButton ? (
                                <button className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600">
                                    {item.value}
                                </button>
                            ) : (
                                <p className="text-teal-500">{item.value}</p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Address Section */}
                <div className="text-center mb-12">
                    <h3 className="text-xl font-semibold mb-4">General Contact Information</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        Mailing address: Sightseer, No. 41st, Colombo 03, Sri Lanka
                    </p>
                </div>

                
            </div>
            <Footer />

            <AIChatbot />
        </div>
    );
};

export default ContactPage;