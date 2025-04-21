import React, { useState } from 'react';
import Card from '../../assets/Cards';

const ManageUsers = () => {
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
    </div>
  );
};

export default ManageUsers;
