import React, { useContext } from 'react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import fblogo from '../../../assets/Facebook_Logo_2023.png';
import glogo from '../../../assets/google.png';
import { Logo } from './Logo';
import { useNavigate } from 'react-router-dom';
import { DarkModeContext } from './DarkModeContext'; // Adjust the import path as necessary
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
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  return (
    <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} p-4`}>
      <div className={`w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-lg`}>
        <div className="text-center mb-6">
          <Logo />
          <h1 className="text-2xl font-bold mb-2">Sign In</h1>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Sign in to plan your perfect trip effortlessly and explore tailored experiences just for you!
          </p>
        </div>

        {error && <div className="mb-4 text-center text-red-500">{error}</div>}

        <form className="space-y-6" onSubmit={handleEmailSignIn}>
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className={`w-full p-3 pl-10 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <Mail className="w-5 h-5 absolute left-3 top-3.5 text-gray-500" />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              className={`w-full p-3 pl-10 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5"
            >
              {showPassword ? <EyeOff className="w-5 h-5 text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
            </button>
          </div>

          <div className="text-right">
            <button type="button" className="text-sm text-emerald-500">Forgot Password?</button>
          </div>

          <button type="submit" className="w-full p-3 rounded-lg font-medium bg-emerald-500 text-white hover:bg-emerald-600">
            Sign In
          </button>

          <div className="text-center text-sm">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className="font-medium text-emerald-500 hover:underline"
            >
              Sign Up
            </button>
          </div>

          <div className="text-center text-sm mt-4">
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="font-medium text-emerald-500 hover:underline"
            >
              Continue without Logging In
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className={`px-2 ${darkMode ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>OR SIGN IN WITH</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleSocialSignIn('facebook')}
            className={`w-full p-3 border rounded-lg flex items-center justify-center gap-2 ${darkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-gray-50 border-gray-300 hover:bg-gray-100'}`}
          >
            <img src={fblogo} alt="Facebook" className="w-6 h-6" />
            Sign in with Facebook
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignIn('google')}
            className={`w-full p-3 border rounded-lg flex items-center justify-center gap-2 ${darkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-gray-50 border-gray-300 hover:bg-gray-100'}`}
          >
            <img src={glogo} alt="Google" className="w-6 h-6" />
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
};