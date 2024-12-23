import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto py-12 px-6">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start">
          {/* Logo and Description */}
          <div className="text-center lg:text-left mb-8 lg:mb-0">
            <h1 className="text-3xl font-bold text-yellow-400">My Blog</h1>
            <p className="text-gray-400 mt-3">
              Inspiring stories, insightful ideas, and creative musings.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center lg:justify-start space-x-6 text-sm">
            <a href="/" className="hover:text-yellow-400 transition duration-200">
              Home
            </a>
            <a href="/posts" className="hover:text-yellow-400 transition duration-200">
              Posts
            </a>
            <a href="/about" className="hover:text-yellow-400 transition duration-200">
              About
            </a>
            <a href="/contact" className="hover:text-yellow-400 transition duration-200">
              Contact
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-6 lg:mt-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-400 transition duration-200 text-xl"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-400 transition duration-200 text-xl"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-400 transition duration-200 text-xl"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-400 transition duration-200 text-xl"
            >
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10"></div>

        {/* Bottom Section */}
        <div className="text-center text-gray-500 text-sm mt-6">
          &copy; {new Date().getFullYear()} <span className="text-yellow-400">My Blog</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
