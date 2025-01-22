import React from 'react';
import { Menu, Search, User } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}
      <header className="p-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Menu className="w-6 h-6" />
            <img src="/api/placeholder/40/40" alt="Sightseer Logo" className="w-10 h-10 rounded-full" />
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-700">Destinations</a>
            <a href="#" className="text-gray-700">Hotels</a>
            <a href="#" className="text-gray-700">Restaurants</a>
            <a href="#" className="text-gray-700">Activities</a>
          </div>
          
          <User className="w-6 h-6" />
        </nav>

        {/* Search Bar */}
        <div className="relative mt-4">
          <input
            type="text"
            placeholder="Search anything here..."
            className="w-full p-2 pl-4 pr-10 border rounded-full bg-gray-50"
          />
          <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-48">
        <img
          src="/api/placeholder/400/200"
          alt="Sri Lanka Landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-white">
          <h1 className="text-3xl font-bold text-center">
            Discover the<br />Magic of Sri Lanka!
          </h1>
          <p className="mt-2 text-sm">✨ AI-Powered Travel Planning</p>
        </div>
      </div>

      {/* Plan Trip Button */}
      <div className="flex justify-center -mt-6 relative z-10">
        <button className="bg-teal-400 text-white px-6 py-2 rounded-lg flex items-center gap-2">
          <span className="text-lg">📋</span>
          Plan My Trip
        </button>
      </div>

      {/* How It Works Section */}
      <section className="p-6">
        <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold">Input your preferences</h3>
            <p className="text-gray-600">Tell us where you want to go and your travel style</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Get recommendations</h3>
            <p className="text-gray-600">Tell us where you want to go and your travel style</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Enjoy your trip</h3>
            <p className="text-gray-600">Save & follow your itinerary for a hassle-free journey</p>
          </div>
        </div>
      </section>

      {/* Trending Destinations */}
      <section className="p-6">
        <h2 className="text-2xl font-semibold mb-4">
          <span className="inline-block mr-2">📈</span>
          Trending Destinations
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg overflow-hidden">
            <img
              src="/api/placeholder/200/150"
              alt="Temple"
              className="w-full h-32 object-cover"
            />
          </div>
          <div className="rounded-lg overflow-hidden">
            <img
              src="/api/placeholder/200/150"
              alt="Train track"
              className="w-full h-32 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-teal-600 text-white p-6">
        <h2 className="text-xl font-semibold mb-4">Get Travel Tips</h2>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Enter your email.."
            className="flex-1 p-2 rounded-lg bg-teal-500 text-white placeholder-teal-200 border border-teal-400"
          />
          <button className="bg-white text-teal-600 px-4 py-2 rounded-lg">
            Subscribe
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-teal-600 text-white p-6">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#">About us</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#">Contact us</a></li>
              <li><a href="#">How this works</a></li>
              <li><a href="#">Terms and Conditions</a></li>
              <li><a href="#">Safety</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex justify-center space-x-6">
          <a href="#" className="text-white">Facebook</a>
          <a href="#" className="text-white">Instagram</a>
          <a href="#" className="text-white">Discord</a>
          <a href="#" className="text-white">Twitter</a>
          <a href="#" className="text-white">Threads</a>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>© 2025 Sightseer Design. All rights reserved</p>
          <div className="mt-2 space-x-4">
            <a href="#">Privacy</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;