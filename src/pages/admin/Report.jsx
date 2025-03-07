// src/pages/Admin/GenerateReports.js
import React from 'react';

const Report = () => {
  const reports = [
    { id: 1, title: 'Student Enrollment', description: 'Overview of student enrollment statistics.' },
    { id: 2, title: 'Course Completion Rates', description: 'Report on course completion rates across programs.' },
    { id: 3, title: 'Attendance Summary', description: 'Summary of attendance for all classes.' },
    { id: 4, title: 'Library Usage', description: 'Report on library usage and borrowing trends.' },
  ];

  const handleGenerate = (report) => {
    alert(`Generating report for: ${report.title}`);
    // Here you can implement the logic to generate the selected report.
  };

  return (
    <div className="container mx-auto mt-10 px-4">
      <h3 className="text-3xl font-semibold mb-6">Generate Reports</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {reports.map(report => (
          <div className="bg-transparent border-2 border-gray-200 rounded-lg shadow-lg p-6" key={report.id}>
            <h5 className="text-xl font-medium text-white mb-4">{report.title}</h5>
            <p className="text-white mb-4">{report.description}</p>
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
              onClick={() => handleGenerate(report)}
            >
              Generate Report
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Report;
