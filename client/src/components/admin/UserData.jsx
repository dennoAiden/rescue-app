import React, { useState, useEffect, useRef } from 'react';
import { 
  Search,
  Mail,
  Phone,
  Calendar,
  AlertTriangle
} from 'lucide-react';

// Function to get a random image URL
const getRandomImage = () => {
  const images = [
    'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400&h=400&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop',
  ];
  return images[Math.floor(Math.random() * images.length)];
};

export default function UserData() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5555/users'); // Endpoint should include report count
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const usersWithImages = data.map(user => ({
          ...user,
          avatar: getRandomImage(),
        }));
        setUsers(usersWithImages);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Filter users by username based on the search input
  const filteredUsers = users.filter(user =>
    user.username && user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">User Management</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search users ..."
            className="pl-10 pr-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-yellow-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user.id} className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h2 className="text-xl font-bold">{user.username}</h2>
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
                  <Calendar className="w-4 h-4" />
                  <span>Joined: {user.created_at}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{user.reports_count} Reports Submitted</span> {/* Display the report count */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No users found</p>
        )}
      </div>
    </div>
  );
}
