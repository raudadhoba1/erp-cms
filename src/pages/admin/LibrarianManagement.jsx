import React, { useState, useEffect } from "react";
import TableView from "../../assets/TableView"; // Import the reusable table component

const LibrarianManagement = () => {
  const [librarians, setLibrarians] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // To track if the user is editing
  const [formData, setFormData] = useState({
    userId: "",
    email: "",
    password: "",
    name: "",
    dob: "",
    address: "",
    gender: "MALE",
    department: "", // Added department for librarian
    role: "LIBRARIAN" // Default role for librarian
  });

  useEffect(() => {
    fetchLibrarians();
  }, []);

  const fetchLibrarians = async () => {
    try {
      const response = await fetch("http://localhost:8080/librarian/all");
      if (response.ok) {
        const data = await response.json();
        setLibrarians(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditLibrarian = (id) => {
    const librarianToEdit = librarians.find(librarian => librarian.userId === id);
    if (librarianToEdit) {
      setFormData(librarianToEdit); // Populate form with existing data
      setIsEditing(true); // Switch to editing mode
      setShowForm(true); // Show the form
    }
  };

  const handleDeleteLibrarian = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/librarian/delete/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Librarian deleted successfully!");
        fetchLibrarians();
      } else {
        alert("Error deleting librarian.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isEditing ? `http://localhost:8080/librarian/update/${formData.userId}` : "http://localhost:8080/librarian/add";
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(isEditing ? "Librarian updated successfully!" : "Librarian added successfully!");
        fetchLibrarians();
        setShowForm(false);
        resetForm();
        setIsEditing(false); // Reset editing mode
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      userId: "",
      email: "",
      password: "",
      name: "",
      dob: "",
      address: "",
      gender: "MALE",
      department: "", // Reset department field
      role: "LIBRARIAN" // Default role maintained in reset
    });
  };

  const librarianColumns = [
    { label: "Name", field: "name" },
    { label: "Email", field: "email" },
    { label: "Gender", field: "gender" },
    { label: "DOB", field: "dob" },
    { label: "Department", field: "department" },
  ];

  return (
    <div className="min-h-screen py-2 px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Librarian Management</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setIsEditing(false); // Reset editing state when toggling the form
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {showForm ? "Cancel" : isEditing ? "Cancel Edit" : "Add Librarian"}
        </button>
      </div>

      {showForm && (
        <div className="bg-transparent p-6 rounded shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">{isEditing ? "Edit Librarian" : "Add New Librarian"}</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                <input
                  type="text"
                  name="userId"
                  value={formData.userId}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                  disabled={isEditing} // Disable User ID input while editing
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                rows="3"
                required
              ></textarea>
            </div>
            
            <div className="flex justify-end mt-6 gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
                  setIsEditing(false); // Reset editing state
                }}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                {isEditing ? "Update Librarian" : "Save Librarian"}
              </button>
            </div>
          </form>
        </div>
      )}

      <TableView
        columns={librarianColumns}
        data={librarians}
        onEdit={handleEditLibrarian}
        onDelete={handleDeleteLibrarian}
      />
    </div>
  );
};

export default LibrarianManagement;
