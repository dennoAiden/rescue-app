import React, { useState } from 'react';
import { 
  Search,
  Mail,
  Phone,
  MapPin,
  Calendar,
  AlertTriangle,
  MoreVertical,
  Shield,
  Ban
} from 'lucide-react';

const mockUsers = [
  {
    id: 'USR-001',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+254 712 345 678',
    location: 'Nairobi, Kenya',
    joinDate: '2024-01-15',
    status: 'active',
    reports: 12,
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop',
  },
  {
    id: 'USR-002',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+254 723 456 789',
    location: 'Mombasa, Kenya',
    joinDate: '2024-02-01',
    status: 'active',
    reports: 8,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
];

export default function UserData() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            className="pl-10 pr-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-yellow-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockUsers.map((user) => (
          <div key={user.id} className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-gray-400">User ID: {user.id}</p>
                </div>
              </div>
              <div className="relative group">
                <button className="p-2 hover:bg-gray-700 rounded-lg">
                  <MoreVertical className="w-5 h-5" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg hidden group-hover:block">
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-600 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Make Admin
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-600 flex items-center gap-2 text-red-500">
                    <Ban className="w-4 h-4" />
                    Ban User
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>Joined: {user.joinDate}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <AlertTriangle className="w-4 h-4" />
                <span>{user.reports} Reports Submitted</span>
              </div>
            </div>

            <div className="mt-6">
              <button className="w-full px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-600 transition-colors">
                View Full Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
