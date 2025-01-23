import React, { useState } from 'react';
import { Menu, Search, User } from 'lucide-react';
import Logo from '../../../assets/sightseerlogo.png';
import '../../styles/Home.css'
import Ella from '../../../assets/ella.jpg';

const HomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`w-full max-w-7xl mx-auto min-h-screen relative md:grid md:grid-cols-12 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Mobile & Desktop Header */}
      <header className={`md:col-span-12 p-4 shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <nav className="flex items-center justify-between mb-4 max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <Menu className="w-6 h-6 md:hidden" />
            <img src={Logo} alt="Sightseer Logo" className="h-10 md:h-20" />
          </div>
          <div className="flex items-center gap-4">
            <Search className="w-6 h-6 md:hidden" />
            <User className="w-6 h-6" />
            <button 
              className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`} 
              onClick={toggleDarkMode}>
              {isDarkMode ? '🌙' : '🌞'}
            </button>
          </div>
        </nav>

        {/* Scrollable Tab Menu */}
        <div className={`overflow-x-auto scrollbar-hide mb-4 max-w-6xl mx-auto ${isDarkMode ? 'text-white' : ''}`}>
          <div className="flex space-x-6 min-w-max px-1 md:justify-center">
            {['Destinations', 'Hotels', 'Restaurants', 'Activities', 'Travel Agents', 'Vacation'].map((tab) => (
              <a
                key={tab}
                href="#"
                className="whitespace-nowrap hover:text-teal-500 transition-colors"
              >
                {tab}
              </a>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto md:max-w-2xl">
          <input
            type="text"
            placeholder="Search anything here..."
            className={`w-full p-3 pl-4 pr-10 border rounded-full ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} md:p-4`}
          />
          <Search className="absolute right-4 top-3.5 w-5 h-5 text-gray-400 md:top-4" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="md:col-span-12 max-w-6xl mx-auto w-full px-4 md:grid md:grid-cols-12 md:gap-6 lg:gap-8">
        {/* Hero Section */}
        <section className="md:col-span-7 lg:col-span-8 relative h-48 md:h-96 mt-4 md:mt-8">
          <img
            src={Ella}
            alt="Sri Lanka Landscape"
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-white rounded-2xl">
            <h1 className="text-3xl md:text-5xl font-bold text-center">
              Discover the<br />Magic of Sri Lanka!
            </h1>
            <p className="mt-2 text-sm md:text-base text-cyan-300">✨ AI-Powered Travel Planning <br /><br />
            <button className="w-full bg-teal-400 text-white px-8 py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg hover:bg-teal-500 transition-colors">
              <span className="text-lg">📋</span>
              Plan My Trip
            </button>
            </p>
          </div>
        </section>

        {/* Sidebar for Desktop */}
        <aside className={`hidden md:block md:col-span-5 rounded-2xl lg:col-span-4 mt-8 ${isDarkMode ? 'bg-gray-800' : 'bg-teal-50'}`}>
          <div className="p-6 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-4 text-teal-600">Plan Your Perfect Trip</h2>

            <div className="mt-6 space-y-4">
              <div>
                <h3 className="text-lg font-bold text-teal-700">Input your preferences</h3>
                <p className="text-gray-600">Tell us where you want to go and your travel style</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-teal-700">Get recommendations</h3>
                <p className="text-gray-600">Receive personalized travel suggestions</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-teal-700">Enjoy your trip</h3>
                <p className="text-gray-600">Save & follow your itinerary for a hassle-free journey</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Plan Trip Button for Mobile */}
        <div className="flex justify-center -mt-6 relative z-10 md:hidden">
          <button className="bg-teal-400 text-white px-8 py-3 rounded-lg flex items-center gap-2 shadow-lg">
            <span className="text-lg">📋</span>
            Plan My Trip
          </button>
        </div>

        {/* Trending Destinations */}
        <section className="col-span-12 mt-6 md:mt-8">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 flex items-center">
            <span className="mr-2">📈</span>
            Trending Destinations
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="rounded-xl overflow-hidden shadow-md">
                <img
                  src={`/api/placeholder/300/200`}
                  alt={`Destination ${item}`}
                  className="w-full h-32 md:h-48 object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className={`col-span-12 ${isDarkMode ? 'bg-gray-800' : 'bg-teal-500'} text-white p-6 mt-8 rounded-2xl md:flex md:items-center md:justify-between`}>
          <div className="md:w-1/2">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Get Travel Tips</h2>
            <p className="hidden md:block text-teal-100 mb-4">
              Subscribe to our newsletter and get the latest travel insights, tips, and exclusive offers.
            </p>
          </div>
          <div className="md:w-1/2">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email.."
                className={`flex-1 p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-teal-400/50'} text-white placeholder-teal-100 border border-teal-400/30`}
              />
              <button className="bg-white text-teal-500 px-6 py-3 rounded-lg font-medium hover:bg-teal-50">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`col-span-12 ${isDarkMode ? 'bg-gray-800' : 'bg-teal-500'} text-white px-6 pt-8 pb-4 mt-8`}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3 text-teal-50">
              <li><a href="#" className="hover:text-white">About us</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3 text-teal-50">
              <li><a href="#" className="hover:text-white">Contact us</a></li>
              <li><a href="#" className="hover:text-white">How this works</a></li>
              <li><a href="#" className="hover:text-white">Terms and Conditions</a></li>
              <li><a href="#" className="hover:text-white">Safety</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-3 text-teal-50">
              <li><a href="#" className="hover:text-white">Destinations</a></li>
              <li><a href="#" className="hover:text-white">Travel Guides</a></li>
              <li><a href="#" className="hover:text-white">Travel Tips</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-teal-50">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Cookies Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 flex justify-center space-x-6">
          <a href="#" className="text-white hover:text-teal-100">
            <span className="sr-only">Facebook</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
          </a>
          {/* Similar social icons as before */}
        </div>
        <div className="max-w-6xl mx-auto mt-8 text-center text-sm text-teal-100">
          <p>© 2025 Sightseer 2425049. All rights reserved</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-white">About</a>
            <a href="#" className="hover:text-white">Careers</a>
            <a href="#" className="hover:text-white">Legal</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
