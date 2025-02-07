import React, { useContext } from 'react';
import { Search, User, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../assets/sightseerlogo.png';
import SidebarMenu from './SideBar.jsx';
import { DarkModeContext } from './DarkModeContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="px-4 py-3 flex items-center justify-between shadow-sm bg-white dark:bg-gray-800">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="Sightseer Logo" className="h-10 w-10" />
            <span className="text-teal-600 dark:text-teal-400 font-semibold">SIGHTSEER</span>
            <SidebarMenu />
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400">Destinations</button>
            <button className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400">Hotels</button>
            <button className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400">Restaurants</button>
            <button className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400">Activities</button>
            <button className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400">Travel Agents</button>
            <button className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400">Vacation Rentals</button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-700" />}
          </button>

          {/* User Profile */}
          <button className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400">
            <User className="h-6 w-6" onClick={() => navigate('/')} />
          </button>
        </div>
      </nav>

      {/* Search Bar */}
      <div className="px-4 py-3">
        <div className="relative max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search anything here..."
            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
          />
          <Search className="absolute right-4 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
