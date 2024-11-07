import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import IncidentCard from '../components/IncidentCard';
import Map from '../components/Map';
import {
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
} from 'lucide-react';

function AdminDashboard() {
  const incidents = useStore((state) => state.incidents);
  const updateIncident = useStore((state) => state.updateIncident);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch =
      incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || incident.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    {
      label: 'Total Reports',
      value: incidents.length,
      icon: AlertTriangle,
      color: 'text-red-600',
    },
    {
      label: 'Under Investigation',
      value: incidents.filter((i) => i.status === 'investigating').length,
      icon: AlertCircle,
      color: 'text-blue-600',
    },
    {
      label: 'Resolved',
      value: incidents.filter((i) => i.status === 'resolved').length,
      icon: CheckCircle2,
      color: 'text-green-600',
    },
    {
      label: 'Rejected',
      value: incidents.filter((i) => i.status === 'rejected').length,
      icon: XCircle,
      color: 'text-gray-600',
    },
  ];

  const handleStatusChange = (incidentId, newStatus) => {
    updateIncident(incidentId, {
      status: newStatus,
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="mt-1 text-3xl font-semibold">{stat.value}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search incidents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border border-gray-300 pl-10 pr-4 py-2 focus:border-red-500 focus:outline-none focus:ring-red-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-md border border-gray-300 px-3 py-2 focus:border-red-500 focus:outline-none focus:ring-red-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="investigating">Investigating</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Incident Reports</h2>
            <div className="space-y-4">
              {filteredIncidents.map((incident) => (
                <div key={incident.id} className="relative">
                  <IncidentCard incident={incident} />
                  <div className="absolute right-4 top-4 z-10">
                    <select
                      value={incident.status}
                      onChange={(e) =>
                        handleStatusChange(incident.id, e.target.value)
                      }
                      className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:border-red-500 focus:outline-none focus:ring-red-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="investigating">Investigating</option>
                      <option value="resolved">Resolved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-[600px] rounded-lg bg-white shadow-md">
            <Map
              center={{ lat: -1.2921, lng: 36.8219 }}
              markers={filteredIncidents.map((i) => i.location)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
