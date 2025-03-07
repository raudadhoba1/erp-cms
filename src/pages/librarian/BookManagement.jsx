import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: '', author: '', publicationDate: '', category: '' });
  const [editBook, setEditBook] = useState(null);

  // Fetch books from API when component mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleAddBook = async () => {
    if (newBook.title && newBook.author && newBook.publicationDate && newBook.category) {
      try {
        const response = await axios.post('http://localhost:8080/api/books/add', newBook);
        setBooks([...books, response.data]);
        setNewBook({ title: '', author: '', publicationDate: '', category: '' });
      } catch (error) {
        console.error('Error adding book:', error);
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleEditBook = (book) => {
    setEditBook(book);
  };

  const handleSaveEditBook = async () => {
    if (editBook) {
      try {
        const response = await axios.put(`http://localhost:8080/api/books/${editBook.id}`, editBook);
        setBooks(books.map((book) => (book.id === editBook.id ? response.data : book)));
        setEditBook(null);
      } catch (error) {
        console.error('Error updating book:', error);
      }
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/books/${id}`);
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <h3 className="text-3xl font-semibold mb-6">Book Management</h3>

      {/* Add Book Form */}
      <div className="bg-transparent p-6 rounded-lg shadow-md mb-6">
        <h5 className="text-xl font-medium mb-4">Add New Book</h5>
        <input
          type="text"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          placeholder="Book Title"
          className="form-input w-full p-3 mb-4 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          placeholder="Author"
          className="form-input w-full p-3 mb-4 border border-gray-300 rounded-md"
        />
        <input
          type="date"
          value={newBook.publicationDate}
          onChange={(e) => setNewBook({ ...newBook, publicationDate: e.target.value })}
          className="form-input w-full p-3 mb-4 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          value={newBook.category}
          onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
          placeholder="Category"
          className="form-input w-full p-3 mb-4 border border-gray-300 rounded-md"
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          onClick={handleAddBook}
        >
          Add Book
        </button>
      </div>

      {/* Book List */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-transparent shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Author</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="px-6 py-4">{book.title}</td>
                <td className="px-6 py-4">{book.author}</td>
                <td className="px-6 py-4">{book.category}</td>
                <td className="px-6 py-4 flex items-center space-x-2">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-md"
                    onClick={() => handleEditBook(book)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
                    onClick={() => handleDeleteBook(book.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Book Form */}
      {editBook && (
        <div className="bg-transparent p-6 rounded-lg shadow-md mt-6">
          <h5 className="text-xl font-medium mb-4">Edit Book</h5>
          <input
            type="text"
            value={editBook.title}
            onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
            placeholder="Book Title"
            className="form-input w-full p-3 mb-4 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={editBook.author}
            onChange={(e) => setEditBook({ ...editBook, author: e.target.value })}
            placeholder="Author"
            className="form-input w-full p-3 mb-4 border border-gray-300 rounded-md"
          />
          <input
            type="date"
            value={editBook.publicationDate}
            onChange={(e) => setEditBook({ ...editBook, publicationDate: e.target.value })}
            className="form-input w-full p-3 mb-4 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            value={editBook.category}
            onChange={(e) => setEditBook({ ...editBook, category: e.target.value })}
            placeholder="Category"
            className="form-input w-full p-3 mb-4 border border-gray-300 rounded-md"
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            onClick={handleSaveEditBook}
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default BookManagement;
