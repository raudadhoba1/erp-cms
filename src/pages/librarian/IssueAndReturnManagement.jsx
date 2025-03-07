import React, { useState, useEffect } from 'react';
import axios from 'axios';

const IssueAndReturnManagement = () => {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [formData, setFormData] = useState({ bookId: '', userId: '', issueDate: '', returnDate: '' });
  
  const API_URL = "http://localhost:8080/api/issued-books"; // Update with your backend API URL

  // Fetch the issued books from the backend
  const fetchIssuedBooks = async () => {
    try {
      const response = await axios.get(API_URL);
      setIssuedBooks(response.data);
    } catch (error) {
      console.error("There was an error fetching the issued books!", error);
    }
  };

  useEffect(() => {
    fetchIssuedBooks();
  }, []);

  // Handle issuing a book
  const handleIssueBook = async () => {
    if (formData.bookId && formData.userId && formData.issueDate && formData.returnDate) {
      try {
        const response = await axios.post(`${API_URL}/addIssuedBook`, formData); // Correct endpoint path
        setIssuedBooks([...issuedBooks, response.data]);
        setFormData({ bookId: '', userId: '', issueDate: '', returnDate: '' });
      } catch (error) {
        alert('Error issuing book: ' + error.message);
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  // Handle returning a book
  const handleReturnBook = async (bookId) => {
    try {
      await axios.delete(`${API_URL}/returnBook/${bookId}`); // Assuming the backend uses this endpoint
      setIssuedBooks(issuedBooks.filter((book) => book.bookId !== bookId));
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <h3 className="text-3xl font-semibold mb-6">Issue and Return Books</h3>

      {/* Issue Book Form */}
      <div className="bg-transparent p-6 rounded-lg shadow-md mb-6">
        <h5 className="text-xl font-medium mb-4">Issue Book</h5>
        <input
          type="text"
          placeholder="Book ID"
          value={formData.bookId}
          onChange={(e) => setFormData({ ...formData, bookId: e.target.value })}
          className="form-input w-full p-3 mb-4 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="User ID"
          value={formData.userId}
          onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
          className="form-input w-full p-3 mb-4 border border-gray-300 rounded-md"
        />
        <input
          type="date"
          value={formData.issueDate}
          onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
          className="form-input w-full p-3 mb-4 border border-gray-300 rounded-md"
        />
        <input
          type="date"
          value={formData.returnDate}
          onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
          className="form-input w-full p-3 mb-4 border border-gray-300 rounded-md"
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          onClick={handleIssueBook}
        >
          Issue Book
        </button>
      </div>

      {/* Table of Issued Books */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-transparent shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-6 py-3 text-left">Book ID</th>
              <th className="px-6 py-3 text-left">User ID</th>
              <th className="px-6 py-3 text-left">Issue Date</th>
              <th className="px-6 py-3 text-left">Return Date</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {issuedBooks.map((book, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="px-6 py-4">{book.bookId}</td>
                <td className="px-6 py-4">{book.userId}</td>
                <td className="px-6 py-4">{book.issueDate}</td>
                <td className="px-6 py-4">{book.returnDate}</td>
                <td className="px-6 py-4">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded-md"
                    onClick={() => handleReturnBook(book.bookId)}
                  >
                    Return
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IssueAndReturnManagement;
