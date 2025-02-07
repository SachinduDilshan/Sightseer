// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AuthPage from "./components/view/AuthPage";
import HomePage from "./components/view/Home";
import ContactPage from "./components/view/Contact";
//import DashboardPage from "./views/pages/DashboardPage"; // You'll need to create this
//import ProtectedRoute from "./components/ProtectedRoute";
import './styles/App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/auth" element={<AuthPage />} />

        <Route path="/home" element={<HomePage />} />

        <Route path="/contact" element={<ContactPage/>} />


        {/* Redirect root to auth page */}
        <Route path="/" element={<Navigate to="/auth" replace />} />
        
        {/* 404 route */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
