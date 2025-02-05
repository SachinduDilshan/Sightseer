import React, { useState, useEffect, useContext } from 'react';
import { Menu, X, Settings, LogOut, History, Heart, Image, Calendar, MapPin } from 'lucide-react';
import { auth, database } from '../../../firebasefront'; // Adjust import path
import { ref, onValue } from 'firebase/database';
import { signOut } from 'firebase/auth';
import { DarkModeContext } from './DarkModeContext'; // Import from your existing context

const SidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const { darkMode } = useContext(DarkModeContext);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const userRef = ref(database, `users/${user.uid}`);
      const unsubscribe = onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        setUserData(data);
      });

      return () => unsubscribe();
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Redirect to login page or home page
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className={`p-2 rounded-lg ${
          darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
        }`}
      >
        <Menu size={24} />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${
          darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-600">
          <button onClick={toggleMenu} className="p-2">
            <X size={24} />
          </button>
        </div>

        <div className="p-4 border-b border-gray-600">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gray-500" />
            <div>
              <h3 className="font-medium">
                {userData 
                  ? `${userData.firstName} ${userData.lastName}` 
                  : 'Loading...'
                }
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {userData?.country || 'Location'}
              </p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {[
              { icon: <History size={20} />, text: 'Trip history' },
              { icon: <Heart size={20} />, text: 'My favorites' },
              { icon: <Image size={20} />, text: 'Post photos' },
              { icon: <Calendar size={20} />, text: 'Add an event' },
              { icon: <MapPin size={20} />, text: 'Add a new place' },
              { icon: <Settings size={20} />, text: 'Settings' },
            ].map((item, index) => (
              <li key={index}>
                <button
                  className={`w-full flex items-center space-x-3 p-2 rounded-lg ${
                    darkMode
                      ? 'hover:bg-gray-800'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.text}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-600">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center space-x-2 p-2 rounded-lg ${
              darkMode ? 'text-red-400 hover:bg-gray-800' : 'text-red-600 hover:bg-gray-100'
            }`}
          >
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;