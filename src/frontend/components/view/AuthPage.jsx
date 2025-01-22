import React, { useState } from 'react';
import { LoginForm } from '../view/LoginForm';
import { SignUpForm } from '../view/SignUpForm';
import { AuthController } from '../controllers/AuthController';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    birthDate: '',
    country: ''
  });
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const authController = new AuthController();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await authController.handleEmailSignIn(formData.email, formData.password);
      navigate('/home'); // Redirect to dashboard after successful login
    } catch (error) {
      setError("Oops... Login failed. Check your email and password again");
    }
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await authController.handleEmailSignUp(formData);
      setIsLogin(true); // Switch to login form
      setError('Registration successful! Please login with your new account.');
      // Clear the form data
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: '',
        birthDate: '',
        country: ''
      });
    } catch (error) {
      setError("Mmmm... Registering failed. Make sure your details are correct.");
    }
  };

  const handleSocialSignIn = async (provider) => {
    try {
      await authController.handleSocialSignIn(provider);
      navigate('/dashboard'); // Redirect to dashboard after successful social login
    } catch (error) {
      setError(`Error! Failed signing in with ${provider}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {isLogin ? (
        <LoginForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleEmailSignIn={handleEmailSignIn}
          handleSocialSignIn={handleSocialSignIn}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          setIsLogin={setIsLogin}
          error={error}
        />
      ) : (
        <SignUpForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleEmailSignUp={handleEmailSignUp}
          setIsLogin={setIsLogin}
          error={error}
        />
      )}
    </div>
  );
};

export default AuthPage;