import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Footer.css";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-teal-600 dark:bg-teal-900 text-white px-6 py-12 transition-colors duration-200">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Newsletter Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Get Travel Tips</h2>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email..."
              className="w-full px-4 py-2 rounded-md text-gray-800 dark:text-gray-200 dark:bg-gray-800 focus:outline-none"
            />
            <button className="bg-white dark:bg-gray-800 text-teal-600 dark:text-teal-400 px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              Subscribe
            </button>
          </div>
        </div>

        {/* Links Section */}
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li><button onClick={() => navigate('/contact')} className="hover:underline">Contact Us</button></li>
            <li><a href="#" className="hover:underline">How it Works</a></li>
            <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
            <li><a href="#" className="hover:underline">Safety</a></li>
          </ul>
        </div>
      </div>

      {/* Border line */}
      <div className="border-t border-white dark:border-gray-600 mt-8"></div>

      {/* Social Media Icons - Centered */}
      <div className="flex justify-center space-x-6 text-2xl mt-8">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
          <FaFacebook />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
          <FaInstagram />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
          <FaTwitter />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
          <FaYoutube />
        </a>
      </div>

      {/* Legal Links */}
      <div className="flex justify-center space-x-4 mt-6 text-sm">
        <a href="#" className="hover:underline">Privacy Policy</a>
        <a href="#" className="hover:underline">Cookies</a>
      </div>

      {/* Copyright */}
      <p className="text-center text-sm mt-6">© 2025 K.G.S.D. Abeyrathne. All rights reserved.</p>
    </footer>
  );
};

export default Footer;