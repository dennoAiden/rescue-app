import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AlertTriangle,
  Map,
  Bell,
  Building2,
  FileText,
  Upload,
  Camera,
  List,
  Settings,
  LogOut,
} from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Sidebar() {
  const location = useLocation();
  const { user } = useStore();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-gray-900 h-screen p-4 flex flex-col">
      <div className="flex items-center space-x-3 px-4 py-3 mb-6">
        <AlertTriangle className="h-8 w-8 text-accent" />
        <span className="text-xl font-bold">Ajali!</span>
      </div>

      <nav className="flex-1 space-y-2">
        <Link
          to="/report"
          className={`sidebar-item ${isActive('/report') ? 'active' : ''}`}
        >
          <AlertTriangle className="h-5 w-5" />
          <span>Report an Incident</span>
        </Link>

        <Link
          to="/login"
          className={`sidebar-item ${isActive('/login') ? 'active' : ''}`}
        >
          <Building2 className="h-5 w-5" />
          <span>Login/Sign Up</span>
        </Link>

        <Link
          to="/map"
          className={`sidebar-item ${isActive('/map') ? 'active' : ''}`}
        >
          <Map className="h-5 w-5" />
          <span>Incidents Map</span>
        </Link>

        <Link
          to="/updates"
          className={`sidebar-item ${isActive('/updates') ? 'active' : ''}`}
        >
          <Bell className="h-5 w-5" />
          <span>News & Updates</span>
        </Link>

        {user?.role === 'admin' && (
          <Link
            to="/admin"
            className={`sidebar-item ${isActive('/admin') ? 'active' : ''}`}
          >
            <Building2 className="h-5 w-5" />
            <span>Admin Dashboard</span>
          </Link>
        )}

        <div className="pt-4 border-t border-gray-700 mt-4">
          <Link
            to="/details"
            className={`sidebar-item ${isActive('/details') ? 'active' : ''}`}
          >
            <FileText className="h-5 w-5" />
            <span>Incident Details</span>
          </Link>

          <Link
            to="/upload"
            className={`sidebar-item ${isActive('/upload') ? 'active' : ''}`}
          >
            <Upload className="h-5 w-5" />
            <span>Upload Details</span>
          </Link>

          <Link
            to="/media"
            className={`sidebar-item ${isActive('/media') ? 'active' : ''}`}
          >
            <Camera className="h-5 w-5" />
            <span>Add Photos/Videos</span>
          </Link>

          <Link
            to="/manage"
            className={`sidebar-item ${isActive('/manage') ? 'active' : ''}`}
          >
            <List className="h-5 w-5" />
            <span>Manage Incidents</span>
          </Link>
        </div>
      </nav>

      <div className="border-t border-gray-700 pt-4 mt-4">
        <div className="flex items-center space-x-3 px-4 py-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-700" />
          <div>
            <div className="text-sm font-medium">{user?.name || 'Guest'}</div>
            <div className="text-xs text-gray-400">{user?.email}</div>
          </div>
        </div>

        <Link to="/settings" className="sidebar-item">
          <Settings className="h-5 w-5" />
          <span>App Settings</span>
        </Link>

        <button className="sidebar-item w-full">
          <LogOut className="h-5 w-5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
