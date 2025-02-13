import React, { useContext } from 'react';
import { Search, User, Moon, Sun } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../../assets/sightseerlogo.png';
import SidebarMenu from './SideBar.jsx';
import { DarkModeContext } from './DarkModeContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current URL path
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

          <div className="flex space-x-4">
            {[
              { path: '/home', label: 'Home' },
              { path: '/destination', label: 'Destinations' },
              { path: '/hotel', label: 'Hotels & Vacation Rentals' },
              { path: '/restaurants', label: 'Restaurants' },
              { path: '/activities', label: 'Activities' },
              { path: '/travel-agents', label: 'Travel Agents' }
            ].map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`px-4 py-2 rounded-md transition-all ${
                  location.pathname === item.path
                    ? 'text-teal-500' // Active button style
                    : 'text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400'
                }`}
              >
                {item.label}
              </button>
            ))}
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
    </div>
  );
};

export default Navbar;
