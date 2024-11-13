import React, { useState, useEffect } from 'react';
import { Search, Mail, Phone, Calendar, AlertTriangle, MoreVertical, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function UserData() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [showMenu, setShowMenu] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://incident-report-98rf.onrender.com/users');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const usersWithBannedStatus = data.map(user => ({
          ...user,
          is_banned: user.banned,
        }));
        setUsers(usersWithBannedStatus);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const banUser = async (userId) => {
    try {
      const response = await fetch(`https://incident-report-98rf.onrender.com/users/${userId}/ban`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to ban user');
      }

      setUsers(prevUsers => prevUsers.map(user =>
        user.id === userId ? { ...user, is_banned: true } : user
      ));
      alert('User has been banned.');
    } catch (error) {
      console.error('Error banning user:', error);
    }
  };

  const unbanUser = async (userId) => {
    try {
      const response = await fetch(`https://incident-report-98rf.onrender.com/users/${userId}/unban`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to unban user');
      }

      setUsers(prevUsers => prevUsers.map(user =>
        user.id === userId ? { ...user, is_banned: false } : user
      ));
      alert('User has been unbanned.');
    } catch (error) {
      console.error('Error unbanning user:', error);
    }
  };

  const filteredUsers = users.filter(user =>
    user.username && user.username.toLowerCase().includes(search.toLowerCase())
  );

  const deleteUser = (userId) => {
    const user = users.find((user) => user.id === userId);

    toast.promise(
      fetch(`https://incident-report-98rf.onrender.com/user/${userId}`, {
        method: 'DELETE',
      }).then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete user');
        }
        return response;
      }).then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      }),
      {
        loading: 'Deleting user...',
        success: `${user?.username} deleted successfully!`,
        error: 'Error deleting user. Please try again.',
      }
    );
  };

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
            <div key={user.id} className="bg-gray-800 rounded-lg p-6 relative">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold">{user.username}</h2>
                </div>
                <div className="relative">
                  <MoreVertical
                    className="w-5 h-5 cursor-pointer text-gray-400"
                    onClick={() => setShowMenu(showMenu === user.id ? null : user.id)}
                  />
                  {showMenu === user.id && (
                    <div className="absolute right-0 mt-2 w-32 bg-gray-700 rounded-md shadow-lg z-10">
                      {user.is_banned ? (
                        <button
                          className="block w-full px-4 py-2 text-left text-green-500 hover:bg-gray-600"
                          onClick={() => {
                            unbanUser(user.id);
                            setShowMenu(null);
                          }}
                        >
                          Unban User
                        </button>
                      ) : (
                        <button
                          className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-600"
                          onClick={() => {
                            banUser(user.id);
                            setShowMenu(null);
                          }}
                        >
                          Ban User
                        </button>
                      )}
                    </div>
                  )}
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
                  <span>Joined: {new Date(user.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{user.reports_count} Reports Submitted</span>
                </div>
                {user.is_banned && (
                  <p className="text-red-500 font-bold">User is banned</p>
                )}
              </div>

              <button
                onClick={() =>
                  toast(
                    (t) => (
                      <div className="flex items-center justify-between">
                        <span>Are you sure you want to delete {user.username}?</span>
                        <div>
                          <button
                            onClick={() => {
                              deleteUser(user.id);
                              toast.dismiss(t.id);
                            }}
                            className="bg-red-600 text-white px-4 py-2 rounded-md"
                          >
                            Yes, Delete
                          </button>
                          <button
                            onClick={() => toast.dismiss(t.id)}
                            className="bg-gray-600 text-white px-4 py-2 rounded-md ml-2"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ),
                    {
                      duration: 5000,
                    }
                  )
                }
                className="mt-4 text-red-500"
              >
                <Trash2 className="w-4 h-4 inline mr-2" />
                Delete User
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No users found</p>
        )}
      </div>
    </div>
  );
}
