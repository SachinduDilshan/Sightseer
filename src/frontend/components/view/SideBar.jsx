import React, { useState, useEffect, useContext } from 'react';
import { Menu, X, Settings, LogOut, History, Heart, Image, Calendar, MapPin, Contact } from 'lucide-react';
import { auth, database } from '../../../firebasefront';
import { ref, onValue } from 'firebase/database';
import { signOut } from 'firebase/auth';
import { DarkModeContext } from './DarkModeContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate(); // Initialize useNavigate

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

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLogoutClick = () => setShowLogoutDialog(true);
  const handleCloseDialog = () => setShowLogoutDialog(false);

  const handleLogoutConfirm = async () => {
    try {
      await signOut(auth);
      setShowLogoutDialog(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to login page when user clicks on 'Login'
  };

  return (
    <div className="relative">
      <button onClick={toggleMenu} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
        <Menu size={24} />
      </button>

      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu} />}

      <div className={`fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-600">
          <button onClick={toggleMenu} className="p-2"><X size={24} /></button>
        </div>

        <div className="p-4 border-b border-gray-600">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gray-500" />
            <div>
              {/* Display 'Login' text when no user is logged in */}
              <h3 className="font-medium" onClick={!userData ? handleLoginRedirect : null}>
                {userData ? `${userData.firstName} ${userData.lastName}` : 'Login'}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {userData?.country || 'Location'}
              </p>
              <button
                onClick={() => navigate('/profile')}
                className={`w-full flex items-center space-x-3 p-2 rounded-lg mt-2 ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                <span>View Profile</span>
              </button>

            </div>
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {[{ icon: <History size={20} />, text: 'Trip history' },
            { icon: <Heart size={20} />, text: 'My favorites' },
            { icon: <Image size={20} />, text: 'Post photos' },
            { icon: <Calendar size={20} />, text: 'Add an event' },
            { icon: <MapPin size={20} />, text: 'Add a new place' },
            { icon: <Contact size={20} />, text: 'Contact Us' },
            { icon: <Settings size={20} />, text: 'Settings' }].map((item, index) => (
              <li key={index}>
                <button className={`w-full flex items-center space-x-3 p-2 rounded-lg ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>{item.icon}<span>{item.text}</span></button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-600">
          <button onClick={handleLogoutClick} className={`w-full flex items-center space-x-2 p-2 rounded-lg ${darkMode ? 'text-red-400 hover:bg-gray-800' : 'text-red-600 hover:bg-gray-100'}`}>
            <LogOut size={20} />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {showLogoutDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className={`p-6 rounded-lg shadow-lg w-80 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
            <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
            <p className="text-sm mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-3">
              <button onClick={handleCloseDialog} className="px-4 py-2 text-sm rounded-lg bg-gray-500 text-white hover:bg-gray-600">Cancel</button>
              <button onClick={handleLogoutConfirm} className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700">Log Out</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarMenu;
