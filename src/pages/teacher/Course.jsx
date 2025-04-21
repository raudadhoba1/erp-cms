import { useState } from "react";

const courses = [
  { id: 1, name: "Computer Science", code: "CS101", students: 35 },
  { id: 2, name: "Data Structures", code: "DS202", students: 40 },
];

export default function TeacherCoursePage() {
  const [announcements, setAnnouncements] = useState("");
  const [materials, setMaterials] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const handleUpload = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === "material") {
        setMaterials([...materials, file.name]);
      } else {
        setAssignments([...assignments, file.name]);
      }
    }
  };

  return (
    <div className="p-2 space-y-5 ">
      <h1 className="text-2xl font-bold">Assigned Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="p-4 shadow-lg border rounded-lg">
            <h2 className="text-lg font-semibold">{course.name} ({course.code})</h2>
            <p className="text-sm text-gray-600">Enrolled Students: {course.students}</p>
            <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded">View Course Details</button>
            <button className="mt-2 w-full bg-yellow-500 text-white py-2 rounded">View Student List</button>
          </div>
        ))}
      </div>

      {/* Post Assignment */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Post Assignment</h2>
        <input type="file" onChange={(e) => handleUpload(e, "assignment")} className="mt-2 border p-2 w-full" />
        <ul className="mt-2 list-disc list-inside">
          {assignments.map((assignment, index) => (
            <li key={index}>{assignment}</li>
          ))}
        </ul>
      </div>

      {/* Check Assignments */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Check Assignments</h2>
        <button className="mt-2 bg-purple-500 text-white py-2 px-4 rounded">View Submitted Assignments</button>
      </div>

      {/* Upload Study Materials and Syllabus */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Upload Study Materials & Syllabus</h2>
        <input type="file" onChange={(e) => handleUpload(e, "material")} className="mt-2 border p-2 w-full" />
        <ul className="mt-2 list-disc list-inside">
          {materials.map((material, index) => (
            <li key={index}>{material}</li>
          ))}
        </ul>
      </div>

      {/* Announcements */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Make an Announcement</h2>
        <textarea
          value={announcements}
          onChange={(e) => setAnnouncements(e.target.value)}
          placeholder="Type your announcement here..."
          className="mt-2 border p-2 w-full h-24"
        ></textarea>
        <button className="mt-2 bg-green-500 text-white py-2 px-4 rounded">Post Announcement</button>
      </div>
    </div>
  );
}
