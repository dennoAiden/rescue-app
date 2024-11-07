import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';
import {
  Home,
  Map,
  Bell,
  Settings,
  LogOut,
  AlertTriangle,
  Shield,
  MessageCircle,
  Camera,
  Info,
} from 'lucide-react';

function Layout() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: AlertTriangle, label: 'Report Incident', path: '/create' },
    { icon: Map, label: 'Incidents Map', path: '/map' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: MessageCircle, label: 'Messages', path: '/messages' },
    { icon: Camera, label: 'Media', path: '/media' },
    { icon: Info, label: 'About', path: '/about' },
    ...(user?.role === 'admin' ? [{ icon: Shield, label: 'Admin', path: '/admin' }] : []),
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      {/* Sidebar */}
      <div className="w-64 bg-[var(--card)] border-r border-gray-800">
        <div className="p-4">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white">
            <AlertTriangle className="h-8 w-8 text-green-500" />
            <span>Accident Reporter</span>
          </Link>
        </div>

        <nav className="mt-8 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-link ${
                location.pathname === item.path ? 'active' : ''
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
          <button
            onClick={() => setUser(null)}
            className="sidebar-link w-full"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Bar */}
        <div className="bg-[var(--card)] border-b border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <div className="relative w-96">
              <input
                type="text"
                placeholder="Search for incidents..."
                className="input-dark w-full"
              />
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-white">
                <Bell className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-300">{user?.name}</span>
                <img
                  src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`}
                  alt="Profile"
                  className="h-8 w-8 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;