import React from 'react';
import { MapPin, Clock, AlertTriangle, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

export default function UserDashboard() {
  const { incidents, user } = useStore();

  const userIncidents = incidents.filter(
    (incident) => user && incident.userId === user.id
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'investigating':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">My Reports</h1>
        <div className="flex items-center space-x-4">
          <span className="px-4 py-2 bg-gray-100 rounded-lg">
            Total Reports: {userIncidents.length}
          </span>
          <Link
            to="/report"
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>New Report</span>
          </Link>
        </div>
      </div>

      {userIncidents.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <AlertTriangle className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No Reports Yet</h2>
          <p className="text-gray-600 mb-6">You haven't submitted any incident reports yet.</p>
          <Link
            to="/report"
            className="inline-flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Create Your First Report</span>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {userIncidents.map((incident) => (
            <div
              key={incident.id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{incident.title}</h2>
                    <p className="text-gray-600 mb-4">{incident.description}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      incident.status
                    )}`}
                  >
                    {incident.status}
                  </span>
                </div>

                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{incident.location.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{new Date(incident.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    <span>{incident.type}</span>
                  </div>
                </div>

                {(incident.images.length > 0 || incident.videos.length > 0) && (
                  <div className="mt-4 flex gap-4">
                    {incident.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Evidence ${index + 1}`}
                        className="h-20 w-20 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
