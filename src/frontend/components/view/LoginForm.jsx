import React from 'react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import fblogo from '../../assets/Facebook_Logo_2023.png';
import glogo from '../../assets/google.png';
import { Logo } from './Logo';

export const LoginForm = ({
  formData,
  handleInputChange,
  handleEmailSignIn,
  handleSocialSignIn,
  showPassword,
  setShowPassword,
  setIsLogin,
  error
}) => (
  <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg">
    <Logo />
    <h1 className="text-2xl font-bold mb-2 text-center">Sign In</h1>
    <p className="text-gray-600 text-center mb-6">
      Sign in to plan your perfect trip effortlessly and explore tailored experiences just for you!
    </p>

    {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

    <form className="space-y-4" onSubmit={handleEmailSignIn}>
      <div className="relative">
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="w-full p-3 pl-10 border rounded-lg bg-gray-50"
          value={formData.email}
          onChange={handleInputChange}
          required />
        <Mail className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
      </div>

      <div className="relative">
        <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Password"
          className="w-full p-3 pl-10 border rounded-lg bg-gray-50"
          value={formData.password}
          onChange={handleInputChange}
          required />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3.5"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5 text-gray-400" />
          ) : (
            <Eye className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </div>

      <div className="text-right">
        <button type="button" className="text-emerald-500 text-sm">Forgot Password?</button>
      </div>

      <button type="submit" className="w-full p-3 bg-emerald-500 text-white rounded-lg font-medium">
        Sign In
      </button>

      <div className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={() => setIsLogin(false)}
          className="text-emerald-500 font-medium"
        >
          Sign Up
        </button>
        {/*<a href=''>Continue without Loging</a> {/*navigate import*/}
      </div>

      

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">OR SIGN IN WITH</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => handleSocialSignIn('facebook')}
        className="w-full p-3 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50"
      >
        <img src={fblogo} alt="Facebook" className="w-6 h-6" />
        Sign in with Facebook
      </button>

      <button
        type="button"
        onClick={() => handleSocialSignIn('google')}
        className="w-full p-3 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50"
      >
        <img src={glogo} alt="Google" className="w-6 h-6" />
        Sign in with Google
      </button>
    </form>
  </div>
);