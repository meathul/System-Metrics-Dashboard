import React from "react";
import Dashboard from "./Dashboard";
import HostMetricsPage from  "./HostMetricsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import CreateUser from "./CreateUser";
import ResetPassword from "./ResetPassword";
import { SystemMetricsProvider } from "./components/MetricsContext";

function App() {
  return (
    <SystemMetricsProvider>
      <Router>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} /> 
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/host-metrics" element={<HostMetricsPage />} />
          <Route path="*" element={<Login />} />
      </Routes>
      </Router>
    </SystemMetricsProvider>
  );
}

export default App;
