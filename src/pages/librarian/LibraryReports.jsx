import React from 'react';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import { LibraryBooks, PendingActions, Bookmarks } from '@mui/icons-material';

const LibraryReports = ({ books = [], issuedBooks = [] }) => {
  const totalBooks = books.length;
  const totalIssuedBooks = issuedBooks.length;
  const overdueBooks = issuedBooks.filter((book) => new Date(book.returnDate) < new Date()).length;

  return (
    <Box className="w-full mx-auto p-4">
      <Typography variant="h4" component="h3" color="primary" className="text-blue-600 mb-6 font-semibold">
        Reports
      </Typography>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card for Library Summary */}
        <Card className="bg-transparent shadow-md border-2 border-gray-200 p-6">
          <CardContent>
            <Typography variant="h6" className="text-gray-700 mb-4 font-medium">
              Library Summary
            </Typography>
            <div className="flex items-center mb-3">
              <LibraryBooks className="text-primary mr-2" />
              <Typography variant="body1" className="text-gray-600">
                Total Books: {totalBooks}
              </Typography>
            </div>
            <div className="flex items-center mb-3">
              <LibraryBooks className="text-primary mr-2" />
              <Typography variant="body1" className="text-gray-600">
                Total Issued Books: {totalIssuedBooks}
              </Typography>
            </div>
            <div className="flex items-center">
              <PendingActions className="text-red-500 mr-2" />
              <Typography variant="body1" className="text-red-500">
                Overdue Books: {overdueBooks}
              </Typography>
            </div>
          </CardContent>
        </Card>

        {/* Card for Books Statistics */}
        <Card className="bg-transparent shadow-md border-2 border-gray-200 p-6">
          <CardContent>
            <Typography variant="h6" className="text-gray-700 mb-4 font-medium">
              Books Statistics
            </Typography>
            <div className="flex items-center mb-3">
              <Bookmarks className="text-primary mr-2" />
              <Typography variant="body1" className="text-gray-600">
                Available Books: {totalBooks - totalIssuedBooks}
              </Typography>
            </div>
            <div className="flex items-center mb-3">
              <Bookmarks className="text-primary mr-2" />
              <Typography variant="body1" className="text-gray-600">
                Issued Books: {totalIssuedBooks}
              </Typography>
            </div>
            <div className="flex items-center">
              <Bookmarks className="text-green-500 mr-2" />
              <Typography variant="body1" className="text-green-500">
                Books Returned: {totalIssuedBooks - overdueBooks}
              </Typography>
            </div>
          </CardContent>
        </Card>

        {/* Card for Overdue Books */}
        <Card className="bg-transparent shadow-md border-2 border-gray-200 p-6">
          <CardContent>
            <Typography variant="h6" className="text-gray-700 mb-4 font-medium">
              Overdue Books
            </Typography>
            <div className="flex items-center mb-3">
              <PendingActions className="text-red-500 mr-2" />
              <Typography variant="body1" className="text-red-500">
                Overdue Books: {overdueBooks}
              </Typography>
            </div>
            <Divider className="my-4" />
            <Typography variant="body2" className="text-gray-500">
              Books overdue for more than a week will be flagged for review.
            </Typography>
          </CardContent>
        </Card>
      </div>
    </Box>
  );
};

export default LibraryReports;
