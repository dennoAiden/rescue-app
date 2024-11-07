import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup'; // Import the new Signup component
import CreateIncident from './pages/CreateIncident';
import ViewIncident from './pages/ViewIncident';
import AdminDashboard from './pages/AdminDashboard';

// Private route for authenticated users
function PrivateRoute({ children }) {
  const user = useStore((state) => state.user);
  return user ? <>{children}</> : <Navigate to="/login" />;
}

// Admin route for users with admin role
function AdminRoute({ children }) {
  const user = useStore((state) => state.user);
  return user?.role === 'admin' ? <>{children}</> : <Navigate to="/" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} /> {/* New signup route */}
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="create" element={<CreateIncident />} />
          <Route path="incident/:id" element={<ViewIncident />} />
          <Route
            path="admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
