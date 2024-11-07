import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import AdminDashboard from '../pages/AdminDashboard';
import UserDashboard from '../pages/UserDashboard';
import CreateReport from '../pages/CreateReport';
import Login from '../pages/Login';
import Register from '../pages/Register';

export default function MainContent() {
  return (
    <main className="flex-1 overflow-y-auto bg-gray-900 p-6">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/report" element={<CreateReport />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </main>
  );
}
