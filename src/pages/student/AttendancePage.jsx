import { useState } from "react";

const AttendancePage = () => {
  const [subjects] = useState(["Math", "Science", "English", "History"]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [attendance, setAttendance] = useState([
    { subject: "Math", date: "2025-03-01", period: "1", status: "Present" },
    { subject: "Math", date: "2025-03-02", period: "2", status: "Absent" },
    { subject: "Science", date: "2025-03-01", period: "1", status: "Present" },
    { subject: "Science", date: "2025-03-03", period: "3", status: "Present" },
    { subject: "English", date: "2025-03-01", period: "2", status: "Absent" },
    { subject: "History", date: "2025-03-05", period: "1", status: "Present" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setLoading(true);

    // Simulate an API call to fetch attendance for the selected subject
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleGoBack = () => {
    setSelectedSubject(null);
  };

  const filteredAttendance = selectedSubject
    ? attendance.filter((record) => record.subject === selectedSubject)
    : [];

  return (
    <div className="w-full p-6 bg-transparent shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Attendance Records</h2>

      {/* List of subjects */}
      {!selectedSubject && (
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold mb-4">Select a Subject</h3>
          <div className="grid grid-cols-2 gap-4">
            {subjects.map((subject, index) => (
              <button
                key={index}
                onClick={() => handleSubjectClick(subject)}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
              >
                {subject}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Go Back button */}
      {selectedSubject && (
        <div className="mb-4">
          <button
            onClick={handleGoBack}
            className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
          >
            Go Back to Subjects
          </button>
        </div>
      )}

      {/* Attendance table for selected subject */}
      {selectedSubject && (
        <div>
          <h3 className="text-xl font-semibold mb-4">{selectedSubject} Attendance</h3>
          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && !error && (
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-transparent text-100">
                  <th className="border border-gray-300 p-2">Sr No</th>
                  <th className="border border-gray-300 p-2">Date</th>
                  <th className="border border-gray-300 p-2">Period</th>
                  <th className="border border-gray-300 p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendance.length > 0 ? (
                  filteredAttendance.map((record, index) => (
                    <tr key={index} className="text-center">
                      <td className="border border-gray-300 p-2">{index + 1}</td>
                      <td className="border border-gray-300 p-2">{record.date}</td>
                      <td className="border border-gray-300 p-2">{record.period}</td>
                      <td
                        className={`border border-gray-300 p-2 font-semibold ${
                          record.status === "Present" ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {record.status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center p-4">
                      No attendance records found for this subject
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default AttendancePage;
