import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function Login() {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mock login - in real app, this would make an API call
    // For demo purposes, we'll make any email ending with @admin.com an admin user
    const isAdmin = formData.email.endsWith('@admin.com');
    
    setUser({
      id: '1',
      name: isAdmin ? 'Admin User' : 'Regular User',
      email: formData.email,
      role: isAdmin ? 'admin' : 'user',
    });

    navigate(isAdmin ? '/admin' : '/dashboard');
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome Back</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            Use any email ending with @admin.com for admin access
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}
