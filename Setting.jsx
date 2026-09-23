import { useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function Settings() {
  const navigate = useNavigate();
  const [privateTasks, setPrivateTasks] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container-fluid bg-light min-vh-100">

      {/* Header */}
      <nav className="navbar navbar-dark bg-primary px-4">
        <span className="navbar-brand">
          Task Management System
        </span>
      </nav>

      <div className="container py-4">

        <h2 className="mb-4">Settings</h2>

        {/* Task Management */}
        <div className="card shadow-sm mb-3">
          <div className="card-body">

            <h5>⚙️ Task Management</h5>
            <p className="text-muted">
              Manage your task preferences.
            </p>

            <button className="btn btn-outline-primary">
              Manage Tasks
            </button>

          </div>
        </div>

        {/* Set Time */}
        <div className="card shadow-sm mb-3">
          <div className="card-body">

            <h5>⏰ Set Time</h5>
            <p className="text-muted">
              Set a default reminder time for your tasks.
            </p>

            <input
              type="time"
              className="form-control"
              style={{ maxWidth: "250px" }}
            />

          </div>
        </div>

        {/* Notifications */}
        <div className="card shadow-sm mb-3">
          <div className="card-body">

            <h5>🔔 Notifications</h5>
            <p className="text-muted">
              Receive notifications about your tasks.
            </p>

            <div className="form-check form-switch">

              <input
                className="form-check-input"
                type="checkbox"
                checked={notifications}
                onChange={() =>
                  setNotifications(!notifications)
                }
              />

              <label className="form-check-label">
                Enable Notifications
              </label>

            </div>

          </div>
        </div>

        {/* Privacy */}
        <div className="card shadow-sm mb-3">
          <div className="card-body">

            <h5>🔒 Privacy</h5>
            <p className="text-muted">
              Control who can access your tasks.
            </p>

            <div className="form-check form-switch">

              <input
                className="form-check-input"
                type="checkbox"
                checked={privateTasks}
                onChange={() =>
                  setPrivateTasks(!privateTasks)
                }
              />

              <label className="form-check-label">
                Keep My Tasks Private
              </label>

            </div>

          </div>
        </div>

        {/* Account */}
        <div className="card shadow-sm mb-3">
          <div className="card-body">

            <h5>👤 Account</h5>

            <button className="btn btn-outline-secondary me-2">
              Edit Profile
            </button>

            <button className="btn btn-outline-danger"
             onClick={() => navigate("/Dashboard")}>
              Logout
            </button>

          </div>
        </div>

      </div>

    </div>
  );
}

export default Settings;