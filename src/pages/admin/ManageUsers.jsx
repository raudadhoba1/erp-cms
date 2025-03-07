import React, { useState } from 'react';
import ListView from '../../assets/ListView'; // Import the ListView component
import Card from '../../assets/Cards';

const ManageUsers = () => {
  // Sample user data (you can fetch this from an API in real-world scenarios)
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'johndoe@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', role: 'Editor', status: 'Inactive' },
    { id: 3, name: 'Sam Brown', email: 'sambrown@example.com', role: 'Viewer', status: 'Active' },
  ]);

  // Handle Edit Action
  const handleEdit = (id) => {
    console.log(`Edit user with ID: ${id}`);
    // Add edit logic (e.g., redirect to edit page or open a modal)
  };

  // Handle Delete Action
  const handleDelete = (id) => {
    const newUsers = users.filter((user) => user.id !== id);
    setUsers(newUsers); // Remove user from the list
    console.log(`Deleted user with ID: ${id}`);
  };

  return (
    <div className="p-6 bg-transparent text-white min-h-screen">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card
            title="Student Management"
            description="Manage students and other student-related activities and data."
            actionText="Go to Students"
            actionUrl="/admin/manageusers/students"
          />

          <Card
            title="Teacher Management"
            description="Manage Teachers and other teacher-related activities and data."
            actionText="Go to Teacher"
            actionUrl="/admin/manageusers/teachers"
          />

          <Card
            title="Librarian Management"
            description="Manage Librarians and other librarian-related activities and data."
            actionText="Go to Librarian"
            actionUrl="/admin/manageusers/librarians"
          />

          
        </div>


      {/* <h1 className="text-3xl font-semibold mb-6">Manage Users</h1> */}
      
      {/* ListView component for displaying users */}
      {/* <ListView users={users} onEdit={handleEdit} onDelete={handleDelete} /> */}
    </div>
  );
};

export default ManageUsers;
