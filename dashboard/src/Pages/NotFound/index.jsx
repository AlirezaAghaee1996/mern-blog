import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-2xl text-gray-600">Page Not Found</p>
        <p className="mt-4 text-gray-500">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <button
          onClick={() => navigate(-1)} // Go back to the previous page
          className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Go Back
        </button>
        <a
          href="/"
          className="mt-4 ml-4 inline-block px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;