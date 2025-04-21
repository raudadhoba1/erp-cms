import { useState } from "react";


export default function CourseEnorllment() {
  const [search, setSearch] = useState("");

  
const courses = [
    {
      id: 1,
      name: "Web Development",
      description: "Learn HTML, CSS, and JavaScript from scratch.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Data Science",
      description: "Introduction to data analysis and machine learning.",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Cyber Security",
      description: "Learn about ethical hacking and cybersecurity fundamentals.",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="p-6 bg-transparent text-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      <input
        type="text"
        placeholder="Search courses..."
        className="w-full p-2 mb-4 border rounded-md"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses
          .filter((course) =>
            course.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((course) => (
            <div key={course.id} className="bg-transparent border-2 border-gray-400 p-4 rounded-lg shadow-md">
              <img
                src={course.image}
                alt={course.name}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <h2 className="text-xl font-semibold">{course.name}</h2>
              <p className="text-gray-600">{course.description}</p>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
                Details..
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
