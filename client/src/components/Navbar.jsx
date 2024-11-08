import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, LogOut } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Navbar() {
  const { user, setUser } = useStore();

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav className="bg-red-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <AlertTriangle className="h-8 w-8" />
            <span className="text-2xl font-bold">Ajali!</span>
          </Link>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {user.role === 'admin' ? (
                  <Link
                    to="/admin"
                    className="hover:text-red-200 transition-colors"
                  >
                    Admin Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/dashboard"
                      className="hover:text-red-200 transition-colors"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/report"
                      className="bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      Report Incident
                    </Link>
                  </>
                )}
                <div className="text-sm">
                  {user.name} ({user.role})
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:text-red-200 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-red-200 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
