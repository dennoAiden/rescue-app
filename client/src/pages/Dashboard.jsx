import React from 'react';
import { MapPin, Clock, AlertTriangle } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function Dashboard() {
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
        <div className="flex space-x-2">
          <span className="px-4 py-2 bg-gray-100 rounded-lg">
            Total Reports: {userIncidents.length}
          </span>
        </div>
      </div>

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
                  <span>
                    {new Date(incident.createdAt).toLocaleDateString()}
                  </span>
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
    </div>
  );
}
