import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StudentDashboard = () => {
  // Simulated data for attendance and results, semester-wise (Sem1 to Sem5)
  const [attendance] = useState([
    { semester: "Semester 1", present: 50, absent: 5 },
    { semester: "Semester 2", present: 45, absent: 10 },
    { semester: "Semester 3", present: 40, absent: 15 },
    { semester: "Semester 4", present: 35, absent: 20 },
    { semester: "Semester 5", present: 30, absent: 25 },
  ]);

  const [results] = useState([
    { semester: "Semester 1", marks: 85 },
    { semester: "Semester 2", marks: 80 },
    { semester: "Semester 3", marks: 75 },
    { semester: "Semester 4", marks: 70 },
    { semester: "Semester 5", marks: 65 },
  ]);

  // Data for Attendance Bar Chart
  const attendanceChartData = {
    labels: attendance.map((data) => data.semester),
    datasets: [
      {
        label: "Present",
        data: attendance.map((data) => data.present),
        backgroundColor: "rgba(34, 197, 94, 0.5)", // Green color for present
      },
      {
        label: "Absent",
        data: attendance.map((data) => data.absent),
        backgroundColor: "rgba(244, 63, 94, 0.5)", // Red color for absent
      },
    ],
  };

  // Data for Results Bar Chart
  const resultChartData = {
    labels: results.map((result) => result.semester),
    datasets: [
      {
        label: "Marks",
        data: results.map((result) => result.marks),
        backgroundColor: "rgba(59, 130, 246, 0.5)", // Blue color for marks
      },
    ],
  };

  return (
    <div className="w-full bg-transparent ">
      <div className="w-full mx-auto bg-transparent shadow-xl rounded-lg p-6">
        <h1 className="text-3xl font-bold text-left text-white-200 mb-6">Student Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Attendance Bar Chart */}
          <div className="bg-transparent p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Attendance (Semester-wise)</h2>
            <Bar data={attendanceChartData} options={{ responsive: true }} />
          </div>

          {/* Results Bar Chart */}
          <div className="bg-transparent p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">Results (Semester-wise)</h2>
            <Bar data={resultChartData} options={{ responsive: true }} />
          </div>
        </div>

        

        <div className="mt-8 bg-transparent p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Upcoming Events</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>March 15, 2025 - Annual Sports Day</li>
            <li>March 20, 2025 - Tech Symposium</li>
            <li>March 25, 2025 - Guest Lecture on AI</li>
          </ul>
        </div>

        <div className="mt-8 bg-transparent p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recent Activities</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Joined the Machine Learning workshop</li>
            <li>Participated in the Science Quiz Competition</li>
            <li>Completed the online course on Web Development</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
