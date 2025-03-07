import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Book, Group, Assignment, Description } from "@mui/icons-material";

const data = [
  { name: "Jan", books: 30, members: 10 },
  { name: "Feb", books: 40, members: 15 },
  { name: "Mar", books: 35, members: 12 },
  { name: "Apr", books: 50, members: 20 },
];

const pieData = [
  { name: "Issued", value: 400 },
  { name: "Available", value: 600 },
];

const COLORS = ["#0088FE", "#00C49F"];

export default function LibrarianDashboard() {
  return (
    <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {/* Cards */}
      <div className="bg-transparent p-4 flex items-center gap-4 rounded-lg shadow-md">
        <Book className="text-blue-500 w-10 h-10" />
        <div>
          <h6 className="text-lg font-semibold">Total Books</h6>
          <p className="text-xl font-bold">1,200</p>
        </div>
      </div>
      <div className="bg-transparent p-4 flex items-center gap-4 rounded-lg shadow-md">
        <Group className="text-green-500 w-10 h-10" />
        <div>
          <h6 className="text-lg font-semibold">Members</h6>
          <p className="text-xl font-bold">350</p>
        </div>
      </div>
      <div className="bg-transparent p-4 flex items-center gap-4 rounded-lg shadow-md">
        <Assignment className="text-yellow-500 w-10 h-10" />
        <div>
          <h6 className="text-lg font-semibold">Books Issued</h6>
          <p className="text-xl font-bold">800</p>
        </div>
      </div>
      <div className="bg-transparent p-4 flex items-center gap-4 rounded-lg shadow-md">
        <Description className="text-red-500 w-10 h-10" />
        <div>
          <h6 className="text-lg font-semibold">Pending Returns</h6>
          <p className="text-xl font-bold">120</p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="col-span-2 bg-transparent p-4 rounded-lg shadow-md">
        <h6 className="text-xl font-semibold mb-4">Monthly Statistics</h6>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="books" fill="#4A90E2" name="Books Issued" />
            <Bar dataKey="members" fill="#50C878" name="New Members" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="col-span-2 bg-transparent p-4 rounded-lg shadow-md flex flex-col items-center">
        <h6 className="text-xl font-semibold mb-4">Book Availability</h6>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Actions */}
      <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors">
          Add New Book
        </button>
        <button className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition-colors">
          Manage Members
        </button>
        <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-yellow-600 transition-colors">
          Track Issued Books
        </button>
        <button className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition-colors">
          Overdue Returns
        </button>
      </div>
    </div>
  );
}
