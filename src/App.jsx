import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import Layout from "../Layout"; // Layout component for sidebar and header
import LoginPage from "../src/pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "../HomePage";

// Admin Components
import AdminDashboard from "../src/pages/admin/AdminDashboard";
import ManageUsers from "../src/pages/admin/ManageUsers";
import Report from "../src/pages/admin/Report";
import ManageEvents from "../src/pages/admin/ManageEvents";
import FinanceManagement from "./pages/admin/FinanceManagement";


// Librarian Components
import LibrarianDashboard from "./pages/librarian/LibrarianDashboard";
import BookManagement from "./pages/librarian/BookManagement";
import IssueAndReturnManagement from "./pages/librarian/IssueAndReturnManagement";
import LibraryReports from "./pages/librarian/LibraryReports";

// Student Components
import StudentDashboard from "../src/pages/student/StudentDashboard";
import AttendancePage from "./pages/student/AttendancePage";
import CourseEnrollment from "./pages/student/CourseEnrollment";
import LibraryAccess from "./pages/student/LibraryAccess";
import StudentFeedback from "./pages/student/StudentFeedback";

// Teacher Components
import TeacherDashboard from "../src/pages/teacher/TeacherDashboard";
import Exam from "./pages/teacher/TeacherExamPage";
import TeacherMarkAttendance from "./pages/teacher/TeacherMarkAttendance"; 
import Course from "./pages/teacher/Course";
import TeacherFeedback from "./pages/teacher/TeacherFeedback";


// ManageUsers sub-components (You'll need to create these)
import TeacherManagement from "./pages/admin/TeacherManagement";
import StudentManagement from "./pages/admin/StudentManagement";
import LibrarianManagement from "./pages/admin/LibrarianManagement";

const ProtectedRoute = ({ children, allowedRoles = [], requiredPermission }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userRole = localStorage.getItem("role");
  const permissions = JSON.parse(localStorage.getItem("permissions")) || [];

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Check if user's role matches the allowed roles
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  // Check if the user has the required permission for the route
  if (requiredPermission) {
    const hasPermission = permissions.some(
      (permission) => permission.permissionPage === requiredPermission
    );
    if (!hasPermission) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // If authenticated, role matches, and permissions are correct, render the children
  return children;
};

// Component for ManageUsers that handles its own sub-routes
const ManageUsersPage = () => {
  const { subPage } = useParams();
  
  const subPages = {
    students: <StudentManagement />,
    teachers: <TeacherManagement />,
    librarians: <LibrarianManagement />,
    // Add more sub-pages as needed
  };

  // If no subPage is specified, render the main ManageUsers component
  if (!subPage) {
    return <ManageUsers />;
  }

  return subPages[subPage] || <NotFoundPage />;
};

const AdminPage = () => {
  const { permissionPage } = useParams(); // Get the dynamic page name
  const pages = {
    admindashboard: <AdminDashboard />,
    manageusers: <ManageUsersPage />, // This will now handle its own sub-routes
    report: <Report />,
    manageevents: <ManageEvents />,
    financemanagement: <FinanceManagement />,
    
  };

  return pages[permissionPage] || <NotFoundPage />;
};

const TeacherPage = () => {
  const { permissionPage } = useParams();
  const pages = {
    teacherdashboard: <TeacherDashboard />,
    exam: <Exam />,
    attendancemanagement: <TeacherMarkAttendance />,
    coursemanagement: <Course />,
    feedback: <TeacherFeedback />,
  };

  return pages[permissionPage] || <NotFoundPage />;
};

const StudentPage = () => {
  const { permissionPage } = useParams();
  const pages = {
    studentdashboard: <StudentDashboard />,
    attendanceview: <AttendancePage />,
    courseenrollment: <CourseEnrollment />,
    libraryaccess: <LibraryAccess />,
    feedback: <StudentFeedback />,
  };

  return pages[permissionPage] || <NotFoundPage />;
};

const LibrarianPage = () => {
  const { permissionPage } = useParams();
  const pages = {
    librariandashboard: <LibrarianDashboard />,
    bookmanagement: <BookManagement />,
    issueandreturnmanagement: <IssueAndReturnManagement />,
    libraryreports: <LibraryReports />,
  };

  return pages[permissionPage] || <NotFoundPage />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login is the default page (root path) */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected routes with role-based access */}
        <Route
          path="/admin/:permissionPage"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Layout>
                <AdminPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        
        {/* Nested route for ManageUsers */}
        <Route
          path="/admin/manageusers/:subPage"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Layout>
                <ManageUsersPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/teacher/:permissionPage"
          element={
            <ProtectedRoute allowedRoles={["TEACHER"]}>
              <Layout>
                <TeacherPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/:permissionPage"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <Layout>
                <StudentPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/librarian/:permissionPage"
          element={
            <ProtectedRoute allowedRoles={["LIBRARIAN"]}>
              <Layout>
                <LibrarianPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Catch-all route to handle undefined URLs and show 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;