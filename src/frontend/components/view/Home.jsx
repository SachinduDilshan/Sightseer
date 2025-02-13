import React, { useContext } from 'react';
import '../../styles/Home.css';
import { useNavigate } from 'react-router-dom';
import Ella from '../../../assets/ella.jpg';
import Jaffna from '../../../assets/Jaffna.jpg';
import Beach from '../../../assets/beach.jpg';
import HILL from '../../../assets/HILL.jpg';
import Sigiriya from '../../../assets/Sigiriya.jpeg';
import Footer from "./Footer.jsx";
import { DarkModeContext } from './DarkModeContext';
import AIChatbot from '../ChatBot/AIChatbot';
import { Search } from 'lucide-react';

import Navbar from './Navbar.jsx';

const HomePage = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        {/* Navigation */}
        <Navbar /> <br></br>
        <div className="relative max-w-2xl mx-auto">

            <input
              type="text"
              placeholder="Search anything here..."
              className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
            />

            <Search className="absolute right-4 top-2.5 h-5 w-5 text-gray-400" />
          </div> <br></br>

        {/* Hero Section */}
        <div className="relative h-[200px] md:h-[300px] mb-8">
          <img
            src={Ella}
            alt="Sri Lanka Landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold text-center mb-2">
              Discover the<br />Magic of Sri Lanka!
            </h1>
            <p className="text-teal-400 mb-4">✨AI-Powered Travel Planning</p>
            <button className="bg-teal-500 text-white px-6 py-2 rounded-md flex items-center gap-2 hover:bg-teal-600">
              <span className="text-lg">📝 Plan My Trip</span>
            </button>
          </div>
        </div>

        {/* How It Works */}
        <div className="px-4 max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-center mb-8 dark:text-white">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="font-semibold mb-2 dark:text-white">Input your preferences</h3>
              <p className="text-gray-600 dark:text-gray-400">Tell us where you want to go and your travel style</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2 dark:text-white">Get recommendations</h3>
              <p className="text-gray-600 dark:text-gray-400">Tell us where you want to go and your travel style</p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold mb-2 dark:text-white">Enjoy your trip</h3>
              <p className="text-gray-600 dark:text-gray-400">Save & follow your itinerary for a hassle-free journey</p>
            </div>
          </div>
        </div>

        {/* Trending Destinations */}
        <div className="px-4 max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-bold mb-6 dark:text-white">Trending Destinations</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative rounded-lg overflow-hidden h-48">
              <img
                src={Jaffna}
                alt="Jaffna & North"
                className= "w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="text-xl font-semibold">Jaffna & North</h3>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden h-48">
              <img
                src={HILL}
                alt="Ella and Hill Country"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="text-xl font-semibold">Ella and Hill Country</h3>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden h-48">
              <img
                src={Sigiriya}
                alt="Sigiriya"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="text-xl font-semibold">Sigiriya</h3>
              </div>
            </div>
            <div className="relative rounded-lg overflow-hidden h-48">
              <img
                src={Beach}
                alt="Down South"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="text-xl font-semibold">Down South</h3>
              </div>
            </div>
          </div>
          <button className="text-teal-500 dark:text-teal-400 hover:text-teal-600 dark:hover:text-teal-500 mt-4 mx-auto block">
            See more
          </button>
        </div>

        {/* Footer */}
        <Footer />
      </div>
      <AIChatbot/>
    </div>
  );
};

export default HomePage;