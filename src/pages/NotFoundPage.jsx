// src/pages/NotFound.js

import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700">
      <div className="text-center p-8 bg-gray-800 shadow-xl rounded-lg">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <h2 className="text-2xl font-medium text-white mt-4">Oops! Page not found.</h2>
        <p className="text-lg text-white mt-2">
          The page you are looking for might have been moved or deleted.
        </p>
        
      </div>
    </div>
  );
};

export default NotFoundPage;
