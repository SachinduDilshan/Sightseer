import React from 'react';
import { User, Lock, Mail, Phone, Calendar } from 'lucide-react';
import { Logo } from '../view/Logo';
import Select from 'react-select';
import countryOptions from './Countries';

export const SignUpForm = ({
  formData,
  handleInputChange,
  handleEmailSignUp,
  setIsLogin,
  error,
}) => {
  const handleCountryChange = (selectedOption) => {
    handleInputChange({
      target: { name: 'country', value: selectedOption.value },
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg md:p-8 lg:p-10">
      <Logo />
      <h1 className="text-2xl font-bold mb-2 text-center lg:text-3xl">Sign Up</h1>
      <p className="text-gray-600 text-center mb-6 lg:text-lg">
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
              className="w-full p-3 pl-10 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-emerald-500"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
            <User className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
          </div>
          <div className="relative">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="w-full p-3 pl-10 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-emerald-500"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
            <User className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
          </div>
        </div>

        {/* Email, Phone, Birth Date */}
        <div className="relative">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full p-3 pl-10 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-emerald-500"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <Mail className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
        </div>

        <div className="relative">
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="w-full p-3 pl-10 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-emerald-500"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          <Phone className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
        </div>

        <div className="relative">
          <input
            type="date"
            name="birthDate"
            className="w-full p-3 pl-10 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-emerald-500"
            value={formData.birthDate}
            onChange={handleInputChange}
            required
          />
          <Calendar className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
        </div>

        {/* Country Dropdown */}
        <div className="relative">
          <Select
            options={countryOptions}
            placeholder="Country of Residence"
            onChange={handleCountryChange}
            className="w-full"
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
            className="w-full p-3 pl-10 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-emerald-500"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <Lock className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
        </div>

        <div className="relative">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-3 pl-10 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-emerald-500"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          <Lock className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-start gap-2">
          <input type="checkbox" className="mt-1 focus:ring-emerald-500" required />
          <label className="text-sm text-gray-600">
            I agree to the{' '}
            <button type="button" className="text-emerald-500">
              Terms & Conditions
            </button>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition"
        >
          Sign Up
        </button>
      </form>

      <p className="text-gray-600 text-center mt-4">
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
