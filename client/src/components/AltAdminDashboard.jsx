import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock,
  MessageSquare,
  PieChart
} from 'lucide-react';

const mockIncidents = [
  { id: '1234', title: 'Fire in Building A', status: 'investigating' },
  { id: '5678', title: 'Water Leak in Basement', status: 'pending' },
];

export default function AdminDashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Manage Incident Reports</h2>
          {mockIncidents.map((incident) => (
            <div
              key={incident.id}
              className="p-4 bg-gray-800 rounded-lg space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Incident #{incident.id}: {incident.title}
                </h3>
                <span className="px-3 py-1 rounded-full text-sm bg-yellow-500 text-gray-900">
                  {incident.status}
                </span>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Resolve
                </button>
                <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Investigating
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Analytics</h2>
          <div className="bg-gray-800 p-4 rounded-lg">
            <PieChart className="w-full h-64" />
          </div>

          <h2 className="text-2xl font-bold">User Communications</h2>
          <div className="space-y-4">
            {['Jane Smith', 'John Doe'].map((user) => (
              <div key={user} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
                <span className="font-medium">{user}</span>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Send Message
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}