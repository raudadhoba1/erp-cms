import React, { useState, useEffect } from 'react';

const LibraryAccess = () => {
  const [libraryDetails, setLibraryDetails] = useState(null);

  // Commenting out the API call and using dummy data for now
  useEffect(() => {
    // Fetching library details for the student from an API or local data
    // const fetchLibraryDetails = async () => {
    //   const response = await fetch('/api/student/library-details');
    //   const data = await response.json();
    //   setLibraryDetails(data);
    // };
    // fetchLibraryDetails();

    // Dummy data
    const dummyData = {
      studentId: 'S12345',
      name: 'John Doe',
      courses: ['Mathematics', 'Computer Science', 'Physics'],
      borrowedBooks: [
        { title: 'Introduction to Algorithms', dueDate: '2025-03-15' },
        { title: 'Fundamentals of Physics', dueDate: '2025-03-20' },
      ],
      libraryFeeStatus: 'Pending',
      libraryFeeAmount: 15.00,
      recommendedBooks: [
        { title: 'Data Structures and Algorithms', author: 'Mark Allen Weiss' },
        { title: 'The Pragmatic Programmer', author: 'Andrew Hunt and David Thomas' },
      ],
    };

    setLibraryDetails(dummyData);
  }, []);

  if (!libraryDetails) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading library details...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Library Details</h1>
      
      {/* Student Info Section */}
      <div className="bg-transparent shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold">Student Information</h2>
        <p className="text-lg mt-2"><strong>Student ID:</strong> {libraryDetails.studentId}</p>
        <p className="text-lg mt-2"><strong>Name:</strong> {libraryDetails.name}</p>
        <p className="text-lg mt-2"><strong>Enrolled Courses:</strong> {libraryDetails.courses.join(', ')}</p>
      </div>

      {/* Borrowed Books Section */}
      <div className="bg-transparent shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Books Borrowed</h2>
        {libraryDetails.borrowedBooks.length > 0 ? (
          <ul className="space-y-3">
            {libraryDetails.borrowedBooks.map((book, index) => (
              <li key={index} className="flex justify-between items-center">
                <span className="text-lg">{book.title}</span>
                <span className="text-sm text-gray-500">Due: {book.dueDate}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-gray-500">No books borrowed currently.</p>
        )}
      </div>

      {/* Library Fees Section */}
      <div className="bg-transparent shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Library Fees</h2>
        <p className="text-lg mb-2">Library Fee Status: {libraryDetails.libraryFeeStatus}</p>
        <p className="text-lg mb-2"><strong>Amount Due:</strong> ${libraryDetails.libraryFeeAmount}</p>
        <button className="bg-blue-500 text-white py-2 px-6 rounded-md mt-4 hover:bg-blue-600 transition">Pay Fees</button>
      </div>

      {/* Recommended Books Section */}
      <div className="bg-transparent shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Recommended Books</h2>
        <ul className="space-y-3">
          {libraryDetails.recommendedBooks.length > 0 ? (
            libraryDetails.recommendedBooks.map((book, index) => (
              <li key={index} className="text-lg">
                {book.title} - <span className="text-sm text-gray-500">Author: {book.author}</span>
              </li>
            ))
          ) : (
            <p className="text-lg text-gray-500">No recommendations available at the moment.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default LibraryAccess;
