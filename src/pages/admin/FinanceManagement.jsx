import React, { useState, useEffect } from "react";

const FinanceManagement = () => {
  const [financialRecords, setFinancialRecords] = useState([]);
  const [form, setForm] = useState({
    id: null,
    title: "",
    amount: "",
    type: "expense",
    date: "",
    description: "",
  });

  // Fetch all records from backend
  useEffect(() => {
    fetch("http://localhost:8080/api/finance")
      .then((res) => res.json())
      .then((data) => setFinancialRecords(data))
      .catch((err) => console.error(err));
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle add/update record
  const handleSubmit = async () => {
    if (!form.title || !form.amount || !form.date || !form.description) {
      alert("Please fill all fields");
      return;
    }

    const method = form.id ? "PUT" : "POST";
    const url = form.id
      ? `http://localhost:8080/api/finance/${form.id}`
      : "http://localhost:8080/api/finance";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      const updatedRecords = form.id
        ? financialRecords.map((record) => (record.id === form.id ? form : record))
        : [...financialRecords, { ...form, id: financialRecords.length + 1 }];
      setFinancialRecords(updatedRecords);
      setForm({ id: null, title: "", amount: "", type: "expense", date: "", description: "" });
    } else {
      console.error("Failed to save record");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await fetch(`http://localhost:8080/api/finance/${id}`, { method: "DELETE" });
      setFinancialRecords(financialRecords.filter((record) => record.id !== id));
    }
  };

  // Handle edit
  const handleEdit = (record) => {
    setForm(record);
  };

  // Calculate totals
  const totalIncome = financialRecords
    .filter((record) => record.type === "income")
    .reduce((sum, record) => sum + parseFloat(record.amount), 0);

  const totalExpenses = financialRecords
    .filter((record) => record.type === "expense")
    .reduce((sum, record) => sum + parseFloat(record.amount), 0);

  return (
    <div className="container mx-auto mt-10 p-6">
      <h3 className="text-3xl font-bold mb-6">Finance Management</h3>

      {/* Form */}
      <div className="bg-transparent p-6 rounded-lg shadow-md mb-6">
        <h5 className="text-xl font-medium mb-4">
          {form.id ? "Edit Financial Record" : "Add New Financial Record"}
        </h5>

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleInputChange}
          className="w-full p-3 mb-4 border rounded-md"
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleInputChange}
          className="w-full p-3 mb-4 border rounded-md"
        />

        <select
          name="type"
          value={form.type}
          onChange={handleInputChange}
          className="w-full p-3 mb-4 border rounded-md"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleInputChange}
          className="w-full p-3 mb-4 border rounded-md"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleInputChange}
          className="w-full p-3 mb-4 border rounded-md"
        />

        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          onClick={handleSubmit}
        >
          {form.id ? "Update Record" : "Add Record"}
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div className="bg-transparent p-6 rounded-lg shadow-md">
          <h5 className="text-xl font-medium mb-4">Total Income</h5>
          <p className="text-3xl font-bold text-green-600">${totalIncome}</p>
        </div>

        <div className="bg-transparent p-6 rounded-lg shadow-md">
          <h5 className="text-xl font-medium mb-4">Total Expenses</h5>
          <p className="text-3xl font-bold text-red-600">${totalExpenses}</p>
        </div>

        <div className="bg-transparent p-6 rounded-lg shadow-md">
          <h5 className="text-xl font-medium mb-4">Net Balance</h5>
          <p className="text-3xl font-bold text-blue-600">${totalIncome - totalExpenses}</p>
        </div>
      </div>

      {/* Records Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-transparent shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">Type</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Description</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {financialRecords.map((record) => (
              <tr key={record.id} className="border-b hover:bg-transparent">
                <td className="px-6 py-4">{record.title}</td>
                <td className="px-6 py-4">${record.amount}</td>
                <td className="px-6 py-4 capitalize">{record.type}</td>
                <td className="px-6 py-4">{record.date}</td>
                <td className="px-6 py-4">{record.description}</td>
                <td className="px-6 py-4">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded-md mr-2"
                    onClick={() => handleEdit(record)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
                    onClick={() => handleDelete(record.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinanceManagement;
