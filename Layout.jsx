import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Layout = ({ children }) => {
  const [sidebarContent, setSidebarContent] = useState([]); // Sidebar data
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false); // Sidebar expanded/collapsed state
  const [selectedItem, setSelectedItem] = useState(null); // Selected sidebar item
  const [hoveredItemId, setHoveredItemId] = useState(null); // Hovered sidebar item
  const [isProfileVisible, setIsProfileVisible] = useState(false); // Profile visibility toggle
  const [userDetails, setUserDetails] = useState(null); // Store user details
  const [isLoading, setIsLoading] = useState(false); // Loading state for user details fetching
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const organization = localStorage.getItem("organization");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
  
    if (isAuthenticated !== "true" || !localStorage.getItem("role")) {
      localStorage.clear(); // Clear localStorage to ensure the user is logged out
      navigate("/login"); // Redirect to login page
    }
  }, [navigate]);
  
  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      try {
        const userId = localStorage.getItem("userId");
        if (userId) {
          const response = await axios.get(`http://localhost:8080/${role.toLowerCase()}/${userId}`);
          setUserDetails(response.data);
          localStorage.setItem("name", response.data.name);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch user details if role exists
    if (role) {
      fetchUserDetails();
    } else {
      navigate("/login"); // Redirect to login if no role
    }
  }, [role, navigate]);

  useEffect(() => {
    // If permissions are already stored in localStorage, load them into sidebarContent
    const storedPermissions = localStorage.getItem("permissions");
    if (storedPermissions) {
      setSidebarContent(JSON.parse(storedPermissions)); // Load permissions from localStorage
    } else {
      // Redirect to login if no permissions found
      navigate("/login");
    }
  }, [navigate]);

  const toggleProfileVisibility = () => {
    setIsProfileVisible(!isProfileVisible); // Toggle profile visibility
  };

  const handleLogout = () => {
    localStorage.clear(); // Clear local storage
    navigate("/"); // Navigate to login page
  };

  const handleClick = (item) => {
    setSelectedItem(item.id); // Set selected item ID
    // Check if the item has a permission route, if yes, navigate to it
    if (item.permissionPage) {
      navigate(`/${role.toLowerCase()}/${item.permissionPage.toLowerCase()}`, { replace: true });
    }
  };
  
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", margin: 0, padding: 0 }}>
      {/* Header */}
      <div
        className="header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#282c34",
          color: "white",
          padding: "0 2rem",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
          height: "60px",
          zIndex: 1000,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="organization-name text-4xl">
        <h1><b>{organization}</b></h1>
        </div>

        {/* User Info (Icon and Name) */}
        <div 
          style={{ 
            display: "flex", 
            alignItems: "center", 
            marginLeft: "auto",
            cursor: "pointer",
          }}
          onClick={toggleProfileVisibility}
        >
          {/* Profile Icon */}
          <FaUserCircle
            size={30}
            style={{ marginRight: "10px" }}
          />
          
          {/* Name and Role Container */}
          <div style={{ textAlign: "left" }}>
            <span style={{ fontSize: "1rem", display: "block" }}>
              {userDetails?.name || localStorage.getItem("name") || "User"}
            </span>
            <span style={{ fontSize: "0.75rem", opacity: 0.8 }}>
              {role || "Guest"}
            </span>
          </div>
        </div>
      </div>

      {/* User Profile Modal/Popup */}
      {isProfileVisible && (
        <div
          style={{
            position: "fixed",
            top: "60px",
            right: "20px",
            backgroundColor: "#101125",
            color: "white",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 1001,
            width: "350px",
            transition: "transform 0.3s ease",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Your Profile</h3>
          {isLoading ? (
            <p>Loading...</p>
          ) : userDetails ? (
            <>
              <p><strong>ID:</strong> {userDetails.userId}</p>
              <p><strong>Name:</strong> {userDetails.name} {userDetails.lastName}</p>
              <p><strong>Email:</strong> {userDetails.email}</p>
              <p><strong>DOB:</strong> {userDetails.dob}</p>
              <p><strong>Program:</strong> {userDetails.program}</p>
              <p><strong>Address:</strong> {userDetails.address}</p>
            </>
          ) : (
            <p>Failed to load user details. Please try again later.</p>
          )}

          {/* Logout Button inside the Profile Popup */}
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#e74c3c",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "10px",
              width: "100%",
            }}
          >
            Logout
          </button>
        </div>
      )}

      <div style={{ display: "flex", flex: 1, marginTop: "60px" }}>
        {/* Sidebar */}
        <div
          className={`sidebar ${isSidebarExpanded ? "expanded" : "collapsed"}`}
          style={{
            width: isSidebarExpanded ? "250px" : "80px",
            transition: "width 0.3s",
            backgroundColor: "#303060",
            color: "white",
            overflowY: "auto",
            position: "relative",
          }}
          onMouseEnter={() => setIsSidebarExpanded(true)}
          onMouseLeave={() => setIsSidebarExpanded(false)}
        >
          <ul style={{ listStyle: "none", padding: 0 }}>
            {sidebarContent.map((item) => (
              <li
                key={item.id}
                style={{
                  padding: "10px 20px",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "flex",
                  alignItems: "center",
                  margin: "5px 10px",
                  borderRadius: "5px",
                  backgroundColor: hoveredItemId === item.id ? "#4b5b8a" : 
                                   selectedItem === item.id ? "#38386c" : "transparent",
                  transition: "background-color 0.2s ease, color 0.2s ease",
                  color: (hoveredItemId === item.id || selectedItem === item.id) ? "#ffffff" : "#ccc",
                }}
                onMouseEnter={() => setHoveredItemId(item.id)}
                onMouseLeave={() => setHoveredItemId(null)}
                onClick={() => handleClick(item)}
              >
                {isSidebarExpanded ? (
                  <span>{item.name}</span> /* Display permission name when expanded */
                ) : (
                  <span>{item.permissionCode}</span> /* Display code when collapsed */
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content Area */}
        <div
          className="main-page"
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: "#101125", 
            color: "#ffffff",
            overflowY: "auto",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;