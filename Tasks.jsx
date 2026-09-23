import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

function Tasks() {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Load tasks from Firestore
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "tasks"));

      const taskList = querySnapshot.docs.map((task) => ({
        id: task.id,
        ...task.data(),
      }));

      setTasks(taskList);
    } catch (error) {
      console.log(error);
      alert("Error loading tasks");
    }
  };

  // Add new task
  const addTask = async (e) => {
    e.preventDefault();

    if (!title || !date || !time) {
      alert("Please enter title, date and time");
      return;
    }

    try {
      await addDoc(collection(db, "tasks"), {
        title: title,
        description: description,
        date: date,
        time: time,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      alert("Task added successfully!");

      setTitle("");
      setDescription("");
      setDate("");
      setTime("");

      loadTasks();
    } catch (error) {
      console.log(error);
      alert("Error adding task");
    }
  };

  // Mark task as completed
  const completeTask = async (id) => {
    try {
      await updateDoc(doc(db, "tasks", id), {
        status: "completed",
      });

      loadTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));

      loadTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // Categories
  const myTasks = tasks;

  const scheduledTasks = tasks.filter(
    (task) => task.date && task.time
  );

  const pendingTasks = tasks.filter(
    (task) => task.status === "pending"
  );

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  );

  return (
    <div className="container py-4">

      <h2 className="mb-4">Task Management</h2>

      {/* Add Task */}
      <div className="card shadow mb-4">
        <div className="card-body">

          <h4 className="mb-3">➕ Add New Task</h4>

          <form onSubmit={addTask}>

            <div className="mb-3">
              <label className="form-label">Task Title</label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>

              <textarea
                className="form-control"
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="row">

              <div className="col-md-6 mb-3">
                <label className="form-label">Schedule Date</label>

                <input
                  type="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Schedule Time</label>

                <input
                  type="time"
                  className="form-control"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>

            </div>

            <button className="btn btn-primary">
              Add Task
            </button>

          </form>
        </div>
      </div>


      {/* Task Categories */}

      <div className="row">

        {/* My Tasks */}
        <div className="col-md-6 mb-4">

          <div className="card shadow">

            <div className="card-header bg-primary text-white">
              📋 My Tasks ({myTasks.length})
            </div>

            <div className="card-body">

              {myTasks.length === 0 ? (
                <p>No tasks found.</p>
              ) : (
                myTasks.map((task) => (

                  <div
                    key={task.id}
                    className="border rounded p-3 mb-3"
                  >

                    <h5>{task.title}</h5>

                    <p>{task.description}</p>

                    <small>
                      📅 {task.date} &nbsp; ⏰ {task.time}
                    </small>

                    <br />

                    <span
                      className={
                        task.status === "completed"
                          ? "badge bg-success mt-2"
                          : "badge bg-warning mt-2"
                      }
                    >
                      {task.status}
                    </span>

                  </div>

                ))
              )}

            </div>
          </div>

        </div>


        {/* Scheduled Tasks */}
        <div className="col-md-6 mb-4">

          <div className="card shadow">

            <div className="card-header bg-info text-white">
              📅 Scheduled Tasks ({scheduledTasks.length})
            </div>

            <div className="card-body">

              {scheduledTasks.length === 0 ? (
                <p>No scheduled tasks.</p>
              ) : (
                scheduledTasks.map((task) => (

                  <div
                    key={task.id}
                    className="border rounded p-3 mb-3"
                  >

                    <h5>{task.title}</h5>

                    <p>{task.description}</p>

                    <strong>
                      📅 {task.date}
                    </strong>

                    <br />

                    <strong>
                      ⏰ {task.time}
                    </strong>

                  </div>

                ))
              )}

            </div>
          </div>

        </div>


        {/* Pending Tasks */}
        <div className="col-md-6 mb-4">

          <div className="card shadow">

            <div className="card-header bg-warning">
              ⏳ Pending Tasks ({pendingTasks.length})
            </div>

            <div className="card-body">

              {pendingTasks.length === 0 ? (
                <p>No pending tasks.</p>
              ) : (
                pendingTasks.map((task) => (

                  <div
                    key={task.id}
                    className="border rounded p-3 mb-3"
                  >

                    <h5>{task.title}</h5>

                    <p>{task.description}</p>

                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => completeTask(task.id)}
                    >
                      ✓ Complete
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>

                  </div>

                ))
              )}

            </div>
          </div>

        </div>


        {/* Completed Tasks */}
        <div className="col-md-6 mb-4">

          <div className="card shadow">

            <div className="card-header bg-success text-white">
              ✅ Completed Tasks ({completedTasks.length})
            </div>

            <div className="card-body">

              {completedTasks.length === 0 ? (
                <p>No completed tasks.</p>
              ) : (
                completedTasks.map((task) => (

                  <div
                    key={task.id}
                    className="border rounded p-3 mb-3"
                  >

                    <h5>{task.title}</h5>

                    <p>{task.description}</p>

                    <span className="badge bg-success">
                      Completed
                    </span>

                    <button
                      className="btn btn-danger btn-sm ms-2"
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>

                  </div>

                ))
              )}

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Tasks;