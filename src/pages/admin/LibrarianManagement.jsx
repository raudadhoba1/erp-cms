// LibrarianManagement.js
import React, { useState, useEffect } from 'react';

const LibrarianManagement = () => {
  const [librarians, setLibrarians] = useState([]);
  const [newLibrarian, setNewLibrarian] = useState({
    userId: '',
    email: '',
    password: '',
    name: '',
    dob: '',
    address: '',
    gender: 'MALE',
    department: '',
  });
  const [isOpen, setIsOpen] = useState(false); // Controls popup visibility
  const [editingLibrarian, setEditingLibrarian] = useState(null); // For editing librarian

  // Fetch all librarians when the page loads
  useEffect(() => {
    fetchLibrarians();
  }, []);

  // Fetch librarians from backend
  const fetchLibrarians = async () => {
    try {
      const response = await fetch('/librarians');
      if (response.ok) {
        const data = await response.json();
        setLibrarians(data);
      } else {
        console.error('Error fetching librarians');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handle adding a new librarian
  const handleAddLibrarian = async () => {
    try {
      const response = await fetch('/librarians/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLibrarian),
      });
      if (response.ok) {
        alert('Librarian added successfully!');
        fetchLibrarians(); // Refresh the list
        setIsOpen(false); // Close popup
        resetForm();
      } else {
        alert('Error adding librarian.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handle editing a librarian
  const handleEditLibrarian = async (id) => {
    const librarian = librarians.find((librarian) => librarian.id === id);
    setEditingLibrarian(librarian);
    setNewLibrarian({ ...librarian });
    setIsOpen(true); // Open the form to edit
  };

  // Handle deleting a librarian
  const handleDeleteLibrarian = async (id) => {
    try {
      const response = await fetch(`/librarians/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('Librarian deleted successfully!');
        fetchLibrarians(); // Refresh the list
      } else {
        alert('Error deleting librarian.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLibrarian((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Reset the form
  const resetForm = () => {
    setNewLibrarian({
      userId: '',
      email: '',
      password: '',
      name: '',
      dob: '',
      address: '',
      gender: 'MALE',
      department: '',
    });
  };

  return (
    <div className="min-h-screen py-8">
      {/* Add Librarian Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setIsOpen(true)}
          className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
        >
          Add Librarian
        </button>
      </div>

      {/* List of Librarians */}
      <div className="max-w-5xl mx-auto p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Librarian List</h2>
        <ul>
          {librarians.length === 0 ? (
            <p>No librarians added yet.</p>
          ) : (
            librarians.map((librarian) => (
              <li key={librarian.id} className="flex justify-between items-center py-3 border-b">
                <div>
                  <strong>{librarian.name}</strong> - {librarian.email}
                </div>
                <div>
                  <button
                    onClick={() => handleEditLibrarian(librarian.id)}
                    className="py-1 px-3 text-sm bg-yellow-400 text-white rounded-md mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteLibrarian(librarian.id)}
                    className="py-1 px-3 text-sm bg-red-500 text-white rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Popup Form for Add/Edit Librarian */}
      {isOpen && (
        <div
          className={`fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 ${isOpen ? 'bg-gray-700' : 'bg-transparent'}`}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96 md:w-1/2 lg:w-1/3 xl:w-1/4">
            <h2 className="text-2xl font-semibold text-center mb-6">{editingLibrarian ? 'Edit Librarian' : 'Add New Librarian'}</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="userId" className="block text-sm font-medium text-gray-700">User ID</label>
                  <input
                    type="text"
                    id="userId"
                    name="userId"
                    value={newLibrarian.userId}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={newLibrarian.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={newLibrarian.password}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newLibrarian.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={newLibrarian.dob}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                  <textarea
                    id="address"
                    name="address"
                    value={newLibrarian.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={newLibrarian.gender}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={newLibrarian.department}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handleAddLibrarian}
                  className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="py-2 px-6 bg-gray-400 text-white font-semibold rounded-lg shadow-md hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibrarianManagement;
