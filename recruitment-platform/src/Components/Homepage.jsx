import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signup");
        return;
      }

      const response = await fetch("http://localhost:5000/api/user/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/signup");
      } else {
        setError("Failed to fetch user data");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChange"));
    navigate("/signup");
  };

  if (loading) {
    return (
      <div className="homepage-container">
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h2>Loading user data...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="homepage-container">
        <div className="homepage-header">
          <h1 className="homepage-title">Welcome to Recruitment Platform</h1>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h2 style={{ color: "#e74c3c" }}>Error: {error}</h2>
          <button onClick={fetchUserData} className="feature-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="homepage-container">
      <div className="homepage-header">
        <h1 className="homepage-title">Welcome to Recruitment Platform</h1>
        <div className="user-info">
          <span className="welcome-text">
            Welcome, {user?.name || user?.email || "User"}!
          </span>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>

      <div className="homepage-content">
        <div className="user-profile-card">
          <h2>User Profile</h2>
          <div className="profile-details">
            <div className="profile-item">
              <strong>Name:</strong> {user?.name || "Not provided"}
            </div>
            <div className="profile-item">
              <strong>Email:</strong> {user?.email || "Not provided"}
            </div>
            <div className="profile-item">
              <strong>Member Since:</strong>{" "}
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "Not available"}
            </div>
            <div className="profile-item">
              <strong>Last Updated:</strong>{" "}
              {user?.updatedAt
                ? new Date(user.updatedAt).toLocaleDateString()
                : "Not available"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
