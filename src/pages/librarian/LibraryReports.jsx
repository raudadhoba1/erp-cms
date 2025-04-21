import React from 'react';
import { LibraryBooks, PendingActions, Bookmarks } from '@mui/icons-material';

const LibraryReports = ({ books = [], issuedBooks = [] }) => {
  const totalBooks = books.length;
  const totalIssuedBooks = issuedBooks.length;
  const overdueBooks = issuedBooks.filter((book) => new Date(book.returnDate) < new Date()).length;
  const availableBooks = totalBooks - totalIssuedBooks;
  const booksReturned = totalIssuedBooks - overdueBooks;

  // Reusable Card component to reduce redundancy
  const ReportCard = ({ title, children, bgColor = 'bg-transparent', icon }) => (
    <div className={`${bgColor} shadow-md border-2 border-gray-200 p-6 rounded-lg`}>
      <div className="mb-4">
        <h6 className="text-xl font-medium text-white">{title}</h6>
      </div>
      <div className="flex items-center">
        {icon && <div className="mr-2">{icon}</div>}
        <div className="text-white">{children}</div>
      </div>
    </div>
  );

  return (
    <div className="w-full mx-auto p-4">
      <h3 className="text-4xl font-semibold text-white mb-6">
        Library Reports
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Library Summary Card */}
        <ReportCard
          title="Library Summary"
          bgColor="bg-transparent"
          icon={<LibraryBooks className="text-primary" />}
        >
          <p>Total Books: {totalBooks}</p>
          <p>Total Issued Books: {totalIssuedBooks}</p>
          <p className="text-red-500">Overdue Books: {overdueBooks}</p>
        </ReportCard>

        {/* Books Statistics Card */}
        <ReportCard
          title="Books Statistics"
          bgColor="bg-transparent"
          icon={<Bookmarks className="text-primary" />}
        >
          <p>Available Books: {availableBooks}</p>
          <p>Issued Books: {totalIssuedBooks}</p>
          <p className="text-green-500">Books Returned: {booksReturned}</p>
        </ReportCard>

        {/* Overdue Books Card */}
        <ReportCard
          title="Overdue Books"
          bgColor="bg-transparent"
          icon={<PendingActions className="text-red-500" />}
        >
          <p className="text-red-500">Overdue Books: {overdueBooks}</p>
          <div className="my-4">
            <hr className="border-t border-gray-300" />
          </div>
          <p className="text-white text-sm">
            Books overdue for more than a week will be flagged for review.
          </p>
        </ReportCard>
      </div>
    </div>
  );
};

export default LibraryReports;
