import { useState } from "react";
import { FaClipboardList, FaPlusCircle } from "react-icons/fa";

const TeacherExamPage = () => {
  const [exams, setExams] = useState([
    { id: 1, subject: "Mathematics", date: "2025-03-15", status: "Scheduled" },
    { id: 2, subject: "Physics", date: "2025-03-20", status: "Completed" },
    { id: 3, subject: "Computer Science", date: "2025-03-25", status: "Scheduled" },
  ]);

  return (
    <div className="min-h-screen bg-transparent p-6">
      <div className="bg-transparent p-6 rounded-lg shadow-md mb-6 flex justify-between items-center">
        <h3 className="text-2xl font-semibold">Manage Exams</h3>
        <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
          <FaPlusCircle className="mr-2" /> Add Exam
        </button>
      </div>

      <div className="bg-transparent p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Upcoming & Past Exams</h3>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-transparent border-b border-gray-200">
              <th className="border p-3">Subject</th>
              <th className="border p-3">Date</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam.id} className="text-center">
                <td className="border p-3">{exam.subject}</td>
                <td className="border p-3">{exam.date}</td>
                <td className="border p-3">
                  <span className={`px-2 py-1 rounded ${exam.status === "Scheduled" ? "bg-green-500 text-white" : "bg-gray-500 text-white"}`}>{exam.status}</span>
                </td>
                <td className="border p-3">
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherExamPage;
