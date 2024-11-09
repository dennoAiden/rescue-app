import React, { useState } from 'react';
import { 
  Search,
  Filter,
  CheckCircle,
  Clock,
  XCircle,
  AlertTriangle,
  MapPin,
  Calendar,
  User
} from 'lucide-react';

const mockIncidents = [
  {
    id: 'INC-001',
    title: 'Traffic Accident on Mombasa Road',
    description: 'Multiple vehicle collision near Exit 7',
    location: 'Mombasa Road, Nairobi',
    status: 'investigating',
    reporter: 'John Doe',
    date: '2024-02-28',
    images: ['https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=800'],
  },
  {
    id: 'INC-002',
    title: 'Building Fire in CBD',
    description: 'Commercial building fire on Kimathi Street',
    location: 'CBD, Nairobi',
    status: 'pending',
    reporter: 'Jane Smith',
    date: '2024-02-28',
    images: ['https://images.unsplash.com/photo-1599587897943-467f82141a45?w=800'],
  },
];

export default function ReportedIncidents() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const updateStatus = (id, newStatus) => {
    console.log(`Updating incident ${id} to ${newStatus}`);
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Incident Management</h1>
        <div className="flex gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search incidents..."
              className="pl-10 pr-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-yellow-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <select
            className="px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-yellow-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="investigating">Investigating</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {mockIncidents.map((incident) => (
          <div key={incident.id} className="bg-gray-800 rounded-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold mb-2">{incident.title}</h2>
                  <p className="text-gray-400">{incident.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  incident.status === 'resolved' ? 'bg-green-500' :
                  incident.status === 'investigating' ? 'bg-yellow-500' :
                  incident.status === 'rejected' ? 'bg-red-500' :
                  'bg-gray-500'
                } text-gray-900`}>
                  {incident.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>{incident.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>{incident.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <User className="w-4 h-4" />
                    <span>Reported by: {incident.reporter}</span>
                  </div>
                </div>

                <div>
                  <img 
                    src={incident.images[0]} 
                    alt={incident.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button
                  onClick={() => updateStatus(incident.id, 'investigating')}
                  className="px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2"
                >
                  <Clock className="w-4 h-4" />
                  Mark Investigating
                </button>
                <button
                  onClick={() => updateStatus(incident.id, 'resolved')}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark Resolved
                </button>
                <button
                  onClick={() => updateStatus(incident.id, 'rejected')}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Reject Report
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
