import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  AlertTriangle, 
  BarChart2, 
  CheckCircle,
  Clock,
  XCircle,
  Activity
} from 'lucide-react';

export default function AdminOverview() {
  const stats = [
    { label: 'Total Users', value: '1,234', icon: <Users />, color: 'bg-blue-500' },
    { label: 'Total Incidents', value: '567', icon: <AlertTriangle />, color: 'bg-yellow-500' },
    { label: 'Resolved', value: '342', icon: <CheckCircle />, color: 'bg-green-500' },
    { label: 'Pending', value: '125', icon: <Clock />, color: 'bg-orange-500' },
    { label: 'Investigating', value: '89', icon: <Activity />, color: 'bg-purple-500' },
    { label: 'Rejected', value: '11', icon: <XCircle />, color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-6 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Link
          to="/admin/incidents"
          className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-600 transition-colors"
        >
          View All Incidents
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recent Incidents</h2>
            <BarChart2 className="w-6 h-6 text-gray-400" />
          </div>
          <div className="space-y-4">
            {['Traffic Accident', 'Building Fire', 'Medical Emergency'].map((incident) => (
              <div key={incident} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                <span>{incident}</span>
                <span className="px-3 py-1 bg-yellow-500 text-gray-900 rounded-full text-sm">
                  Investigating
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Active Users</h2>
            <Users className="w-6 h-6 text-gray-400" />
          </div>
          <div className="space-y-4">
            {['John Doe', 'Jane Smith', 'Mike Johnson'].map((user) => (
              <div key={user} className="flex items-center gap-4 p-4 bg-gray-700 rounded-lg">
                <img
                  src={`https://source.unsplash.com/random/100x100?portrait&${user}`}
                  alt={user}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{user}</p>
                  <p className="text-sm text-gray-400">Last active: 5 mins ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
