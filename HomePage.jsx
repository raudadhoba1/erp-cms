import React, { useState } from 'react';

const HomePage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <a className="text-2xl font-bold text-white" href="/" aria-label="Go to Home Page">
              CMS
            </a>
            <button 
              className="text-white focus:outline-none md:hidden" 
              onClick={toggleNav}
              aria-controls="navbarNav" 
              aria-expanded={isNavOpen} 
              aria-label="Toggle navigation"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            <div className={`${isNavOpen ? 'block' : 'hidden'} md:block`} id="navbarNav">
              <ul className="md:flex md:space-x-6 mt-4 md:mt-0">
                <li>
                  <a className="block py-2 text-white hover:text-gray-200" href="#about">About</a>
                </li>
                <li>
                  <a className="block py-2 text-white hover:text-gray-200" href="#contact">Contact</a>
                </li>
                <li>
                  <a className="block px-6 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg" href="/login" role="button">
                    Enter into Portal
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex justify-center items-center bg-cover bg-center text-white py-24 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600">
        <div className="container text-center px-6">
          <h1 className="text-5xl font-extrabold leading-tight mb-4 shadow-lg">Welcome to College Management System</h1>
          <p className="text-xl md:text-2xl font-semibold shadow-md">A comprehensive portal for College Administration</p>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="container mx-auto mt-16 px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
            <i className="text-4xl text-blue-500">📅</i>
            <h4 className="mt-4 text-xl font-semibold text-gray-800">Attendance Management</h4>
            <p className="text-gray-600">Track and manage attendance records efficiently</p>
          </div>
          <div className="text-center p-8 bg-white rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
            <i className="text-4xl text-blue-500">📈</i>
            <h4 className="mt-4 text-xl font-semibold text-gray-800">Results & Grades</h4>
            <p className="text-gray-600">Access academic performance and results</p>
          </div>
          <div className="text-center p-8 bg-white rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
            <i className="text-4xl text-blue-500">📚</i>
            <h4 className="mt-4 text-xl font-semibold text-gray-800">Library Management</h4>
            <p className="text-gray-600">Digital library access and book management</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-700 to-blue-800 text-white py-10 mt-auto">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <h5 className="text-lg font-semibold">Contact Us</h5>
              <p>Email: info@college.edu</p>
              <p>Phone: (123) 456-7890</p>
            </div>
            <div className="w-full md:w-1/2 md:text-right">
              <h5 className="text-lg font-semibold">Quick Links</h5>
              <ul className="space-y-2">
                <li><a href="#about" className="text-white hover:text-gray-200">About Us</a></li>
                <li><a href="#contact" className="text-white hover:text-gray-200">Contact</a></li>
                <li><a href="#privacy" className="text-white hover:text-gray-200">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;