import { useState } from "react";
import { FaChalkboardTeacher, FaBook, FaUserGraduate, FaBullhorn, FaClipboardList } from "react-icons/fa";

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: "Mathematics", students: 30 },
    { id: 2, name: "Physics", students: 25 },
    { id: 3, name: "Computer Science", students: 40 },
  ]);

  return (
    <div className="min-h-screen bg-transparent p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-transparent p-6 rounded-lg shadow-md flex items-center space-x-4">
          <FaChalkboardTeacher className="text-blue-500 text-3xl" />
          <div>
            <h3 className="text-xl font-semibold">Total Courses</h3>
            <p className="text-gray-600">{courses.length}</p>
          </div>
        </div>
        <div className="bg-transparent p-6 rounded-lg shadow-md flex items-center space-x-4">
          <FaUserGraduate className="text-green-500 text-3xl" />
          <div>
            <h3 className="text-xl font-semibold">Total Students</h3>
            <p className="text-gray-600">{courses.reduce((acc, course) => acc + course.students, 0)}</p>
          </div>
        </div>
        <div className="bg-transparent p-6 rounded-lg shadow-md flex items-center space-x-4">
          <FaBook className="text-purple-500 text-3xl" />
          <div>
            <h3 className="text-xl font-semibold">Assignments</h3>
            <p className="text-gray-600">12 Pending</p>
          </div>
        </div>
        <div className="bg-transparent p-6 rounded-lg shadow-md flex items-center space-x-4">
          <FaBullhorn className="text-red-500 text-3xl" />
          <div>
            <h3 className="text-xl font-semibold">Announcements</h3>
            <p className="text-gray-600">3 New</p>
          </div>
        </div>
      </div>

      <div className="bg-transparent p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-4">My Courses</h3>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-transparent text-center">
              <th className="border p-3">Course Name</th>
              <th className="border p-3">Students</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="text-center">
                <td className="border p-3">{course.name}</td>
                <td className="border p-3">{course.students}</td>
                <td className="border p-3">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-transparent p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Recent Announcements</h3>
        <ul className="list-disc pl-5">
          <li className="mb-2">Exam schedule has been updated.</li>
          <li className="mb-2">Project submission deadline extended.</li>
          <li className="mb-2">New grading policy implemented.</li>
        </ul>
      </div>
    </div>
  );
};

export default TeacherDashboard;
