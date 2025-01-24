import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import fblogo from '../../../assets/Facebook_Logo_2023.png';
import glogo from '../../../assets/google.png';
import { Logo } from './Logo';
import { useNavigate } from 'react-router-dom';
import '../../styles/login.css';

export const LoginForm = ({
  formData,
  handleInputChange,
  handleEmailSignIn,
  handleSocialSignIn,
  showPassword,
  setShowPassword,
  setIsLogin,
  error,
}) => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen ${
        isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <div
        className={`w-full max-w-md mx-4 md:mx-auto md:max-w-lg lg:max-w-2xl ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-lg p-6 shadow-lg`}
      >
        <div className="text-center mb-6">
          <Logo />
          <h1 className="text-2xl font-bold mb-2">Sign In</h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Sign in to plan your perfect trip effortlessly and explore tailored experiences just for you!
          </p>
        </div>

        {error && (
          <div
            className={`mb-4 text-center ${
              isDarkMode ? 'text-red-400' : 'text-red-500'
            }`}
          >
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleEmailSignIn}>
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className={`w-full p-3 pl-10 border rounded-lg ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-200'
                  : 'bg-gray-50 border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <Mail
              className={`w-5 h-5 absolute left-3 top-3.5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            />
          </div>

          <div className="relative">
            <Lock
              className={`absolute left-3 top-3.5 w-5 h-5 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              className={`w-full p-3 pl-10 border rounded-lg ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-gray-200'
                  : 'bg-gray-50 border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5"
            >
              {showPassword ? (
                <EyeOff
                  className={`w-5 h-5 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                />
              ) : (
                <Eye
                  className={`w-5 h-5 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                />
              )}
            </button>
          </div>

          <div className="text-right">
            <button
              type="button"
              className={`text-sm ${
                isDarkMode ? 'text-emerald-400' : 'text-emerald-500'
              }`}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className={`w-full p-3 rounded-lg font-medium transition ${
              isDarkMode
                ? 'bg-emerald-600 text-gray-100 hover:bg-emerald-700'
                : 'bg-emerald-500 text-white hover:bg-emerald-600'
            }`}
          >
            Sign In
          </button>

          <div className="text-center text-sm">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`font-medium hover:underline ${
                isDarkMode ? 'text-emerald-400' : 'text-emerald-500'
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="text-center text-sm mt-4">
            <button
              type="button"
              onClick={() => navigate('/home')}
              className={`font-medium hover:underline ${
                isDarkMode ? 'text-emerald-400' : 'text-emerald-500'
              }`}
            >
              Continue without Logging In
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div
                className={`w-full border-t ${
                  isDarkMode ? 'border-gray-600' : 'border-gray-300'
                }`}
              ></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className={`px-2 ${
                  isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'
                }`}
              >
                OR SIGN IN WITH
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleSocialSignIn('facebook')}
            className={`w-full p-3 border rounded-lg flex items-center justify-center gap-2 transition ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
            }`}
          >
            <img src={fblogo} alt="Facebook" className="w-6 h-6" />
            Sign in with Facebook
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignIn('google')}
            className={`w-full p-3 border rounded-lg flex items-center justify-center gap-2 transition ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 hover:bg-gray-600'
                : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
            }`}
          >
            <img src={glogo} alt="Google" className="w-6 h-6" />
            Sign in with Google
          </button>

          <div className="text-center mt-6">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-md text-sm font-medium transition ${
                isDarkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};