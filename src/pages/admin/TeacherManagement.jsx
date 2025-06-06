// TeacherManagement.jsx
import React, { useState, useEffect } from "react";
import TableView from "../../assets/TableView"; 

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 
  const [formData, setFormData] = useState({
    userId: "",
    email: "",
    password: "",
    name: "",
    dob: "",
    address: "",
    gender: "MALE",
    qualification: "",
    role: "STUDENT" 
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:8080/teacher/all");
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEditStudent = (id) => {
    const studentToEdit = students.find(student => student.userId === id);
    if (studentToEdit) {
      setFormData(studentToEdit); 
      setIsEditing(true); 
      setShowForm(true); 
    }
  };

  const handleDeleteStudent = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/teacher/delete/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Student deleted successfully!");
        fetchStudents();
      } else {
        alert("Error deleting student.");
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

    const url = isEditing ? `http://localhost:8080/teacher/update/${formData.userId}` : "http://localhost:8080/student/add";
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
        alert(isEditing ? "Student updated successfully!" : "Student added successfully!");
        fetchStudents();
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
      program: "",
      role: "STUDENT" // Default role maintained in reset
    });
  };

  const studentColumns = [
    { label: "Name", field: "name" },
    { label: "Email", field: "email" },
    { label: "Qualification", field: "qualification" },
  ];

  return (
    <div className="min-h-screen py-2 px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Teacher Management</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setIsEditing(false); // Reset editing state when toggling the form
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          {showForm ? "Cancel" : isEditing ? "Cancel Edit" : "Add Teacher"}
        </button>
      </div>

      {showForm && (
        <div className="bg-transparent p-6 rounded shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">{isEditing ? "Edit Student" : "Add New Student"}</h2>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
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
                {isEditing ? "Update Teacher" : "Save Teacher"}
              </button>
            </div>
          </form>
        </div>
      )}

      <TableView
        columns={studentColumns}
        data={students}
        onEdit={handleEditStudent}
        onDelete={handleDeleteStudent}
      />
    </div>
  );
};

export default StudentManagement;
