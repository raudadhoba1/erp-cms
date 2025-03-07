import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-900 min-h-screen">
      {/* Overview Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Total Students */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 flex flex-col items-center">
          <h3 className="text-xl font-semibold text-white">Total Students</h3>
          <p className="text-4xl font-bold text-blue-400">1,230</p>
        </div>
        {/* Card 2: Total Courses */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 flex flex-col items-center">
          <h3 className="text-xl font-semibold text-white">Total Courses</h3>
          <p className="text-4xl font-bold text-green-400">50</p>
        </div>
        {/* Card 3: Total Faculty */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 flex flex-col items-center">
          <h3 className="text-xl font-semibold text-white">Total Faculty</h3>
          <p className="text-4xl font-bold text-yellow-400">120</p>
        </div>
      </div>

      {/* Recent Activities Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-2xl font-semibold text-white mb-4">Recent Activities</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-300">New student registration: John Doe</p>
            <span className="text-sm text-gray-500">2 hours ago</span>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-300">Professor Smith added a new course: Data Structures</p>
            <span className="text-sm text-gray-500">1 day ago</span>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-300">Admin scheduled exams for upcoming semester</p>
            <span className="text-sm text-gray-500">3 days ago</span>
          </div>
          {/* Add more activities */}
          <div className="flex justify-between items-center">
            <p className="text-gray-300">Faculty report submitted: Professor Lee</p>
            <span className="text-sm text-gray-500">4 days ago</span>
          </div>
        </div>
      </div>

      {/* Attendance and Exam Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 4: Pending Attendance */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 flex flex-col items-center">
          <h3 className="text-xl font-semibold text-white">Pending Attendance</h3>
          <p className="text-4xl font-bold text-red-400">30</p>
        </div>
        {/* Card 5: Upcoming Exams */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 flex flex-col items-center">
          <h3 className="text-xl font-semibold text-white">Upcoming Exams</h3>
          <p className="text-4xl font-bold text-purple-400">8</p>
        </div>
        {/* Card 6: Active Students */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 flex flex-col items-center">
          <h3 className="text-xl font-semibold text-white">Active Students</h3>
          <p className="text-4xl font-bold text-teal-400">1,150</p>
        </div>
      </div>

      {/* Student Enrollment Graph */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-2xl font-semibold text-white mb-4">Student Enrollment Trend</h2>
        {/* Placeholder for Graph */}
        <div className="h-60 bg-gray-700 rounded-lg flex items-center justify-center">
          <span className="text-gray-400">Graph goes here</span>
        </div>
      </div>

      {/* System Health Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-2xl font-semibold text-white mb-4">System Health</h2>
        <div className="flex justify-between items-center">
          <div className="text-gray-300">Server Usage</div>
          <div className="text-green-400">60%</div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="text-gray-300">Database Load</div>
          <div className="text-red-400">85%</div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="text-gray-300">Network Status</div>
          <div className="text-yellow-400">Normal</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
