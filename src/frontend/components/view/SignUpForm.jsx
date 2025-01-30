import React from 'react';
import { User, Lock, Mail, Phone, Calendar } from 'lucide-react';
import { Logo } from '../view/Logo';
import Select from 'react-select';
import countryOptions from './Countries';
import { useContext } from 'react';
import { DarkModeContext } from './Home';

export const SignUpForm = ({
  formData,
  handleInputChange,
  handleEmailSignUp,
  setIsLogin,
  error,
}) => {
  const darkModeContext = useContext(DarkModeContext);
  const darkMode = darkModeContext?.darkMode ?? false;

  const handleCountryChange = (selectedOption) => {
    handleInputChange({
      target: { name: 'country', value: selectedOption.value },
    });
  };

  // Custom styles for react-select in dark mode
  const selectStyles = {
    control: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: darkMode ? '#374151' : 'white',
      borderColor: darkMode ? '#4B5563' : '#D1D5DB',
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: darkMode ? '#374151' : 'white',
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: darkMode 
        ? state.isSelected 
          ? '#047857'
          : state.isFocused 
            ? '#4B5563'
            : '#374151'
        : state.isSelected
          ? '#10B981'
          : state.isFocused
            ? '#F3F4F6'
            : 'white',
      color: darkMode ? 'white' : 'black',
    }),
    singleValue: (baseStyles) => ({
      ...baseStyles,
      color: darkMode ? 'white' : 'black',
    }),
    input: (baseStyles) => ({
      ...baseStyles,
      color: darkMode ? 'white' : 'black',
    }),
  };

  return (
    <div
      className={`w-full max-w-2xl mx-auto p-6 rounded-lg shadow-lg md:p-8 lg:p-10 ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      }`}
    >
      <Logo />

      <h1 className="text-2xl font-bold mb-2 text-center lg:text-3xl">Sign Up</h1>
      <p className={`text-center mb-6 lg:text-lg ${
        darkMode ? 'text-gray-300' : 'text-gray-600'
      }`}>
        Join us and start your journey to unlock personalized trip planning, AI-powered recommendations, and seamless travel experiences!
      </p>

      {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

      <form className="space-y-4" onSubmit={handleEmailSignUp}>
        {/* Name Fields */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="relative">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className={`w-full p-3 pl-10 border rounded-lg ${
                darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 border-gray-300'
              } focus:ring-2 focus:ring-emerald-500`}
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
            <User className={`w-5 h-5 absolute left-3 top-3.5 ${
              darkMode ? 'text-gray-400' : 'text-gray-400'
            }`} />
          </div>
          <div className="relative">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className={`w-full p-3 pl-10 border rounded-lg ${
                darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 border-gray-300'
              } focus:ring-2 focus:ring-emerald-500`}
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
            <User className={`w-5 h-5 absolute left-3 top-3.5 ${
              darkMode ? 'text-gray-400' : 'text-gray-400'
            }`} />
          </div>
        </div>

        {/* Email */}
        <div className="relative">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className={`w-full p-3 pl-10 border rounded-lg ${
              darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 border-gray-300'
            } focus:ring-2 focus:ring-emerald-500`}
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <Mail className={`w-5 h-5 absolute left-3 top-3.5 ${
            darkMode ? 'text-gray-400' : 'text-gray-400'
          }`} />
        </div>

        {/* Phone */}
        <div className="relative">
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className={`w-full p-3 pl-10 border rounded-lg ${
              darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 border-gray-300'
            } focus:ring-2 focus:ring-emerald-500`}
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          <Phone className={`w-5 h-5 absolute left-3 top-3.5 ${
            darkMode ? 'text-gray-400' : 'text-gray-400'
          }`} />
        </div>

        {/* Birth Date */}
        <div className="relative">
          <input
            type="date"
            name="birthDate"
            className={`w-full p-3 pl-10 border rounded-lg ${
              darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 border-gray-300'
            } focus:ring-2 focus:ring-emerald-500`}
            value={formData.birthDate}
            onChange={handleInputChange}
            required
          />
          <Calendar className={`w-5 h-5 absolute left-3 top-3.5 ${
            darkMode ? 'text-gray-400' : 'text-gray-400'
          }`} />
        </div>

        {/* Country Dropdown */}
        <div className="relative">
          <Select
            options={countryOptions}
            placeholder="Country of Residence"
            onChange={handleCountryChange}
            className="w-full"
            styles={selectStyles}
            isSearchable
            required
          />
        </div>

        {/* Password Fields */}
        <div className="relative">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={`w-full p-3 pl-10 border rounded-lg ${
              darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 border-gray-300'
            } focus:ring-2 focus:ring-emerald-500`}
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <Lock className={`w-5 h-5 absolute left-3 top-3.5 ${
            darkMode ? 'text-gray-400' : 'text-gray-400'
          }`} />
        </div>

        <div className="relative">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className={`w-full p-3 pl-10 border rounded-lg ${
              darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 border-gray-300'
            } focus:ring-2 focus:ring-emerald-500`}
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          <Lock className={`w-5 h-5 absolute left-3 top-3.5 ${
            darkMode ? 'text-gray-400' : 'text-gray-400'
          }`} />
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-2">
          <input 
            type="checkbox" 
            className="mt-1 focus:ring-emerald-500" 
            required 
          />
          <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            I agree to the{' '}
            <button type="button" className="text-emerald-500">
              Terms & Conditions
            </button>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 rounded-lg font-medium transition bg-emerald-500 text-white hover:bg-emerald-600"
        >
          Sign Up
        </button>
      </form>

      <p className={`text-center mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Already have an account?{' '}
        <button
          type="button"
          onClick={() => setIsLogin(true)}
          className="text-emerald-500 font-medium hover:underline"
        >
          Log in
        </button>
      </p>
    </div>
  );
};

export default SignUpForm;