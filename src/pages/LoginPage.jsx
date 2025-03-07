import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [userIdOrEmail, setUserIdOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Combine authentication and permission fetching logic in one place
  const handleNavigation = (role) => {
    const permissions = JSON.parse(localStorage.getItem("permissions")) || [];
    
    // Ensure permissions are available
    if (permissions.length === 0) {
      setError("No permission page assigned. Please contact the admin.");
      return;
    }
    
    // For simplicity, we're selecting the first permission in the list, 
    // but you can modify this logic based on your permission structure
    const permissionPage = permissions[0]?.permissionPage;

    if (!permissionPage) {
      setError("No permission page assigned. Please contact the admin.");
      return;
    }

    // Navigate based on role and permission page
    switch (role) {
      case "ADMIN":
        navigate(`/admin/${permissionPage.toLowerCase()}`);
        break;
      case "TEACHER":
        navigate(`/teacher/${permissionPage.toLowerCase()}`);
        break;
      case "STUDENT":
        navigate(`/student/${permissionPage.toLowerCase()}`);
        break;
      case "LIBRARIAN":
        navigate(`/librarian/${permissionPage.toLowerCase()}`);
        break;
      default:
        navigate("/not-found");
    }
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const role = localStorage.getItem("role");

    // If authenticated and role is found, navigate to the corresponding dashboard
    if (isAuthenticated === "true" && role) {
      handleNavigation(role); // Use the same logic to navigate based on role
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!userIdOrEmail || !password) {
      setError("Please fill in all fields");
      return;
    }

    setError(""); // Clear any previous errors
    setIsLoading(true);

    try {
      // Attempt to login
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        userIdOrEmail,
        password,
      });

      // If login successful, process response
      if (response.status === 200) {
        const { userId, email, role } = response.data;

        // Store necessary data in localStorage
        localStorage.setItem("userId", userId);
        localStorage.setItem("email", email);
        localStorage.setItem("role", role);
        localStorage.setItem("isAuthenticated", "true");

        // Fetch permissions after successful login
        const permissionsResponse = await axios.get(`http://localhost:8080/permissions/role/${role}`);
        localStorage.setItem("permissions", JSON.stringify(permissionsResponse.data));

        // Use the same navigation function to navigate based on role
        handleNavigation(role);
      } else {
        setError(response.data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);

      if (err.response) {
        setError(err.response.data.message || `Login failed (${err.response.status})`);
      } else if (err.request) {
        setError("No response from server. Please check your connection.");
      } else {
        setError("Login failed. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen flex items-center justify-center">
      <div className="p-8 rounded-lg shadow-2xl w-full max-w-sm">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-700">Login</h2>
        </div>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="userIdOrEmail" className="block text-gray-700 font-medium mb-2">
              Email or User ID
            </label>
            <input
              type="text"
              id="userIdOrEmail"
              name="userIdOrEmail"
              value={userIdOrEmail}
              onChange={(e) => setUserIdOrEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full ${isLoading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"} text-white py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <div className="mt-4 text-center">
            <a href="/forgot-password" className="text-indigo-600 text-sm hover:underline">
              Forgot your password?
            </a>
          </div>

          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/signup" className="text-indigo-600 hover:underline">
                Sign up
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
