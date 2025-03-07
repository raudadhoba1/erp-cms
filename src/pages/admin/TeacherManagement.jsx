// import React, { useState, useEffect } from 'react';

// // TeacherManagement Component
// const TeacherManagement = () => {
//   const [teachers, setTeachers] = useState([]);
//   const [newTeacher, setNewTeacher] = useState({
//     userId: '',
//     email: '',
//     password: '',
//     name: '',
//     dob: '',
//     address: '',
//     qualification: '',
//     gender: 'MALE',
//     role: 'TEACHER', // Default value set to TEACHER
//   });
//   const [editingTeacher, setEditingTeacher] = useState(null); // For editing teacher
//   const [formVisible, setFormVisible] = useState(false); // Manage form visibility
//   const [formWidth, setFormWidth] = useState('max-w-5xl'); // Default width of the form

//   // Fetch all teachers when the page loads
//   useEffect(() => {
//     fetchTeachers();
//   }, []);

//   // Fetch teachers from backend
//   const fetchTeachers = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/teacher/all');
//       if (response.ok) {
//         const data = await response.json();
//         setTeachers(data); // Set teachers data into state
//       } else {
//         console.error('Error fetching teachers');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   // Handle adding or editing a teacher
//   const handleAddOrEditTeacher = async () => {
//     const url = editingTeacher
//       ? `http://localhost:8080/teacher/edit/${editingTeacher.userId}` // Edit request (using userId)
//       : 'http://localhost:8080/teacher/add'; // Add request

//     try {
//       const response = await fetch(url, {
//         method: editingTeacher ? 'PUT' : 'POST', // Use PUT for editing
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newTeacher),
//       });

//       if (response.ok) {
//         alert(editingTeacher ? 'Teacher updated successfully!' : 'Teacher added successfully!');
//         fetchTeachers(); // Refresh the list
//         resetForm();
//       } else {
//         alert('Error saving teacher.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   // Handle editing a teacher
//   const handleEditTeacher = async (userId) => {
//     const teacher = teachers.find((teacher) => teacher.userId === userId); // Use userId
//     setEditingTeacher(teacher);
//     setNewTeacher({ ...teacher });
//   };

//   // Handle deleting a teacher
//   const handleDeleteTeacher = async (userId) => {
//     try {
//       const response = await fetch(`http://localhost:8080/teacher/delete/${userId}`, {
//         method: 'DELETE',
//       });
//       if (response.ok) {
//         alert('Teacher deleted successfully!');
//         fetchTeachers(); // Refresh the list
//       } else {
//         alert('Error deleting teacher.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   // Handle form input change
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewTeacher((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   // Reset the form
//   const resetForm = () => {
//     setNewTeacher({
//       userId: '',
//       email: '',
//       password: '',
//       name: '',
//       dob: '',
//       address: '',
//       qualification: '',
//       gender: 'MALE',
//       role: 'TEACHER',
//     });
//     setEditingTeacher(null); // Reset editing state
//   };

//   // Toggle form visibility and expand width
//   const toggleFormVisibility = () => {
//     setFormVisible(!formVisible);
//     setFormWidth(formVisible ? 'max-w-5xl' : 'max-w-full'); // Change form width when toggled
//   };

//   return (
//     <div className="min-h-screen py-8">
//       {/* Button to toggle form visibility */}
//       <div className="flex justify-left mb-6 px-6">
//         <button
//           onClick={toggleFormVisibility}
//           className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
//         >
//           {formVisible ? 'Hide Add Teacher Form' : 'Add New Teacher'}
//         </button>
//       </div>

//       {/* Add Teacher Form */}
//       {formVisible && (
//         <div className={`transition-all duration-300 ${formWidth} mx-auto p-6 rounded-lg shadow-md mb-6`}>
//           <h2 className="text-2xl font-semibold text-center mb-6">
//             {editingTeacher ? 'Edit Teacher' : 'Add New Teacher'}
//           </h2>
//           <form onSubmit={(e) => e.preventDefault()}>
//             {/* Form Fields */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//               <div>
//                 <label htmlFor="userId" className="block text-sm font-medium text-white-700">User ID</label>
//                 <input
//                   type="text"
//                   id="userId"
//                   name="userId"
//                   value={newTeacher.userId}
//                   onChange={handleInputChange}
//                   required
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-white-700">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={newTeacher.email}
//                   onChange={handleInputChange}
//                   required
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-white-700">Password</label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   value={newTeacher.password}
//                   onChange={handleInputChange}
//                   required
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-white-700">Name</label>
//                 <input
//                   type="text"
//                   id="name"
//                   name="name"
//                   value={newTeacher.name}
//                   onChange={handleInputChange}
//                   required
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="dob" className="block text-sm font-medium text-white-700">Date of Birth</label>
//                 <input
//                   type="date"
//                   id="dob"
//                   name="dob"
//                   value={newTeacher.dob}
//                   onChange={handleInputChange}
//                   required
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="address" className="block text-sm font-medium text-white-700">Address</label>
//                 <input
//                   type="text"
//                   id="address"
//                   name="address"
//                   value={newTeacher.address}
//                   onChange={handleInputChange}
//                   required
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="qualification" className="block text-sm font-medium text-white-700">Qualification</label>
//                 <input
//                   type="text"
//                   id="qualification"
//                   name="qualification"
//                   value={newTeacher.qualification}
//                   onChange={handleInputChange}
//                   required
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="gender" className="block text-sm font-medium text-white-700">Gender</label>
//                 <select
//                   id="gender"
//                   name="gender"
//                   value={newTeacher.gender}
//                   onChange={handleInputChange}
//                   required
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 >
//                   <option value="MALE">Male</option>
//                   <option value="FEMALE">Female</option>
//                   <option value="OTHER">Other</option>
//                 </select>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <div className="flex justify-center "> 
              
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowForm(false);
//                   resetForm();
//                   setIsEditing(false); // Reset editing state
//                 }}
//                 className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleAddOrEditTeacher}
//                 className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
//               >
//                 {editingTeacher ? 'Update Teacher' : 'Add Teacher'}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* List of Teachers - Table Format */}
//       <div className="w-full mx-auto p-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold text-left mb-6">Teacher List</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full table-auto border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-transparent">
//                 <th className="py-2 px-4 border-b">Name</th>
//                 <th className="py-2 px-4 border-b">Email</th>
//                 <th className="py-2 px-4 border-b">Qualification</th>
//                 <th className="py-2 px-4 border-b">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {teachers.length === 0 ? (
//                 <tr>
//                   <td colSpan="4" className="text-center py-3">No teachers added yet.</td>
//                 </tr>
//               ) : (
//                 teachers.map((teacher) => (
//                   <tr key={teacher.userId}>
//                     <td className="py-2 px-4 border-b">{teacher.name}</td>
//                     <td className="py-2 px-4 border-b">{teacher.email}</td>
//                     <td className="py-2 px-4 border-b">{teacher.qualification}</td>
//                     <td className="py-2 px-4 border-b">
//                       <button
//                         onClick={() => handleEditTeacher(teacher.userId)}
//                         className="py-1 px-4 bg-blue-500 text-white rounded-md"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDeleteTeacher(teacher.userId)} // Using userId
//                         className="py-1 px-4 bg-red-500 text-white rounded-md"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeacherManagement;


import React, { useState, useEffect } from "react";
import TableView from "../../assets/TableView"; // Import the reusable table component

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
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
    qualification: "",
    role: "STUDENT" // Default role added
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
      setFormData(studentToEdit); // Populate form with existing data
      setIsEditing(true); // Switch to editing mode
      setShowForm(true); // Show the form
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
