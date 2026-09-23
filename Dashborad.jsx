import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("there");
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Create Login Page",
      description: "Create Firebase login page",
      status: "Completed",
      priority: "High",
    },
    {
      id: 2,
      title: "Create Register Page",
      description: "Create Firebase registration",
      status: "In Progress",
      priority: "Medium",
    },
    {
      id: 3,
      title: "Create Dashboard",
      description: "Design task management dashboard",
      status: "Pending",
      priority: "Low",
    },
  ]);

  useEffect(() => {
    const loadUserName = async () => {
      if (!auth.currentUser) return;

      const userSnapshot = await getDoc(doc(db, "users", auth.currentUser.uid));
      if (userSnapshot.exists()) {
        setUserName(userSnapshot.data().name || "there");
      }
    };

    loadUserName();
  }, []);

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const progressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  return (
    <div className="dashboard-page">

      {/* Navbar */}
      <nav className="navbar navbar-dark bg-primary px-4">
        <span className="navbar-brand mb-0 h1">
          Task Management System
        </span>

          <button className="btn btn-light"
            onClick={() => navigate("/login")}>
             Logout
        </button>
      </nav>

      <div className="row">

        {/* Sidebar */}
        <div className="col-md-2 bg-dark min-vh-100 p-3">

          <h5 className="text-white mb-4">
            Menu
          </h5>

          <div className="list-group">

            <button className="list-group-item list-group-item-action">
              Dashboard
            </button>

            <button className="list-group-item list-group-item-action"
              onClick={() => navigate("/Tasks")}>
              Tasks
            </button>

            <button className="list-group-item list-group-item-action"
              onClick={() => navigate("/users")}
            >
              Users
            </button>

            <button
              className="list-group-item list-group-item-action"
              onClick={() => navigate("/setting")}
            >
              Settings
            </button>

          </div>

        </div>

        {/* Main Content */}
        <div className="col-md-10 p-4 dashboard-content">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>
              <h2>Welcome, {userName}!</h2>
              <p className="text-muted">
                Here is an overview of your tasks.
              </p>
            </div>

          </div>

          {/* Statistics */}
          <div className="row g-4 mb-4">

            <div className="col-md-3">
              <div className="card shadow-sm p-3">
                <h6 className="text-muted">
                  Total Tasks
                </h6>
                <h2>{totalTasks}</h2>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow-sm p-3">
                <h6 className="text-muted">
                  Pending
                </h6>
                <h2>{pendingTasks}</h2>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow-sm p-3">
                <h6 className="text-muted">
                  In Progress
                </h6>
                <h2>{progressTasks}</h2>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card shadow-sm p-3">
                <h6 className="text-muted">
                  Completed
                </h6>
                <h2>{completedTasks}</h2>
              </div>
            </div>

          </div>

          {/* Tasks */}
          <div className="card shadow-sm">

            <div className="card-body">

              <h4 className="mb-4">
                Recent Tasks
              </h4>

              <div className="table-responsive">

                <table className="table table-hover">

                  <thead>
                    <tr>
                      <th>Task</th>
                      <th>Description</th>
                      <th>Priority</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>

                    {tasks.map((task) => (

                      <tr key={task.id}>

                        <td>
                          <strong>{task.title}</strong>
                        </td>

                        <td>
                          {task.description}
                        </td>

                        <td>
                          <span className="badge bg-warning text-dark">
                            {task.priority}
                          </span>
                        </td>

                        <td>
                          <span className="badge bg-info">
                            {task.status}
                          </span>
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        </div>

      </div>

      <footer className="dashboard-footer">
        <small>Task Management System &copy; 2026</small>
      </footer>

    </div>
  );
}

export default Dashboard;