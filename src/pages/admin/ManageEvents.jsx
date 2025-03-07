import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name: '', date: '', description: '' });
  const API_URL = "http://localhost:8080/api/events";

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(API_URL);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = async () => {
    if (newEvent.name && newEvent.date && newEvent.description) {
      try {
        const response = await axios.post(`${API_URL}/addEvent`, newEvent);

        setEvents([...events, response.data]);
        setNewEvent({ name: '', date: '', description: '' });
      } catch (error) {
        console.error("Error adding event", error);
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setEvents(events.filter(event => event.id !== id));
    } catch (error) {
      console.error("Error deleting event", error);
    }
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <h3 className="text-3xl font-semibold mb-6">Manage Events</h3>
      <div className="mb-6 p-6 bg-transparent rounded-lg shadow-md">
        <h5 className="text-xl font-medium mb-4">Add New Event</h5>
        <input type="text" className="form-input w-full p-3 mb-4 border border-gray-300 rounded-md" placeholder="Event Name" name="name" value={newEvent.name} onChange={handleInputChange} />
        <input type="date" className="form-input w-full p-3 mb-4 border border-gray-300 rounded-md" name="date" value={newEvent.date} onChange={handleInputChange} />
        <textarea className="form-input w-full p-3 mb-4 border border-gray-300 rounded-md" placeholder="Event Description" name="description" value={newEvent.description} onChange={handleInputChange} />
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200" onClick={handleAddEvent}>Add Event</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-transparent shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-6 py-3 text-left">Event Name</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="px-6 py-4">{event.name}</td>
                <td className="px-6 py-4">{event.date}</td>
                <td className="px-6 py-4">{event.description}</td>
                <td className="px-6 py-4">
                  <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded-md transition-colors duration-200" onClick={() => handleDelete(event.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageEvents;
