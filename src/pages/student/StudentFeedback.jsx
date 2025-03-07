import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentFeedback = () => {
  const [feedback, setFeedback] = useState("");
  const [contentHeading, setContentHeading] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);
  const [showForm, setShowForm] = useState(false); // State to manage form visibility
  const userId = localStorage.getItem('userId'); // Get student’s unique ID from local storage
  const role = "STUDENT"; // Set role as "STUDENT"

  // API call to fetch feedback list
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/feedback/user/${userId}`);
        setFeedbackList(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!contentHeading || !feedback) {
      alert("Please fill in all fields.");
      return;
    }

    const feedbackData = {
      heading: contentHeading,
      message: feedback,
      userId: userId,   // Send student’s unique ID
      role: role,        // Send role as "STUDENT"
    };

    console.log('Submitting feedback:', feedbackData);

    try {
      const response = await axios.post('http://localhost:8080/api/feedback/add', feedbackData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Feedback submitted successfully:', response.data);
      // Optionally, reset the form or update feedback list
      setContentHeading('');
      setFeedback('');
      // Append new feedback for the student to see immediately
      setFeedbackList([...feedbackList, response.data]);
      setShowForm(false); // Close form after submission
    } catch (error) {
      console.error('Error submitting feedback:', error.response ? error.response.data : error.message);
      // Handle error, show a user-friendly message, etc.
    }
  };

  return (
    <div className="min-h-screen bg-transparent py-10 px-6">
      <div className="w-full mx-auto bg-transparent border-2 border-white rounded-lg shadow-lg p-8">
        {/* Button to Show Feedback Form */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Student Feedback</h1>
          <p className="text-gray-400 mt-2">Please provide the feedback content below.</p>
          <button
            onClick={() => setShowForm(!showForm)} // Toggle form visibility
            className="mt-4 py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            {showForm ? 'Cancel' : 'Add Feedback'}
          </button>
        </div>

        {/* Feedback Form Section (Hidden by default) */}
        {showForm && (
          <div className="mt-8 bg-transparent p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Content Heading Section */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Content Heading</h2>
                <input
                  type="text"
                  value={contentHeading}
                  onChange={(e) => setContentHeading(e.target.value)}
                  className="w-full p-3 mt-2 border-2 border-gray-700 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the content heading"
                />
              </div>

              {/* Feedback Section */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">Feedback</h2>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows="6"
                  className="w-full p-3 mt-2 border-2 border-gray-700 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Write your feedback here..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        )}

        
      </div>

      {/* Feedback List Section */}
      <div className="mt-10">
          <h2 className="text-2xl font-semibold text-white mb-4">Feedback List</h2>
          {feedbackList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {feedbackList.map((item, index) => (
                <div key={index} className="bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                  <h3 className="text-xl text-white font-semibold mb-2">{item.heading}</h3>
                  <p className="text-gray-400">{item.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No feedback available.</p>
          )}
        </div>
    </div>
  );
};

export default StudentFeedback;
