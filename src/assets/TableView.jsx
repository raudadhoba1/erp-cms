import React from "react";

const TableView = ({ columns, data, onEdit, onDelete }) => {
  return (
    <div className="w-full mx-auto p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-left mb-6">List</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-transparent border-b border-gray-300">
            {columns.map((col, index) => (
              <th key={index} className="px-4 py-2 text-left border-r border-gray-300">
                {col.label}
              </th>
            ))}
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-3">
                No records found.
              </td>
            </tr>
          ) : (
            data.map((item, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-300">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-4 py-2 border-r border-gray-300">
                    {item[col.field]}
                  </td>
                ))}
                <td className="px-4 py-2 flex justify-start">
                  <button
                    onClick={() => onEdit(item.userId)}
                    className="py-1 px-3 text-sm bg-yellow-400 text-white rounded-md mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(item.userId)}
                    className="py-1 px-3 text-sm bg-red-500 text-white rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
