
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashborad";
import Setting from "./pages/setting";
import Users from "./pages/Users";
import Taks from "./pages/Tasks";

import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
function App() {
  return (
   
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/setting" element={<Setting />} />
      <Route path="/users" element={<Users />} />
      <Route path="/tasks" element={<Taks />} />
    </Routes>
  </BrowserRouter>
  );

}
export default App;



