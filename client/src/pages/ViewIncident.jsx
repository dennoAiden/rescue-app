import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import Map from '../components/Map';
import {
  Calendar,
  MapPin,
  Clock,
  User,
  Trash2,
  Edit,
  Image,
  Video,
} from 'lucide-react';

function ViewIncident() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const incident = useStore((state) =>
    state.incidents.find((i) => i.id === id)
  );
  const deleteIncident = useStore((state) => state.deleteIncident);

  if (!incident) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-xl text-gray-500">Incident not found</p>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this incident?')) {
      deleteIncident(incident.id);
      navigate('/');
    }
  };

  const isOwner = incident.userId === user?.id;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{incident.title}</h1>
        {isOwner && (
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/edit/${incident.id}`)}
              className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              <Edit className="h-4 w-4" />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Details</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-600">
                <User className="h-5 w-5" />
                <span>Reported by: {user?.name}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-5 w-5" />
                <span>
                  Created: {new Date(incident.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-5 w-5" />
                <span>
                  Updated: {new Date(incident.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-5 w-5" />
                <span>{incident.location.address}</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">Description</h2>
            <p className="text-gray-600">{incident.description}</p>
          </div>

          {(incident.images.length > 0 || incident.videos.length > 0) && (
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-semibold">Media</h2>
              {incident.images.length > 0 && (
                <div className="mb-4">
                  <h3 className="mb-2 flex items-center gap-2 text-lg font-medium">
                    <Image className="h-5 w-5" />
                    Images
                  </h3>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {incident.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Evidence ${index + 1}`}
                        className="rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}
              {incident.videos.length > 0 && (
                <div>
                  <h3 className="mb-2 flex items-center gap-2 text-lg font-medium">
                    <Video className="h-5 w-5" />
                    Videos
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {incident.videos.map((video, index) => (
                      <video
                        key={index}
                        controls
                        className="rounded-lg"
                        src={video}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="h-[600px] rounded-lg bg-white p-4 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Location</h2>
          <Map
            center={incident.location}
            markers={[incident.location]}
            zoom={15}
          />
        </div>
      </div>
    </div>
  );
}

export default ViewIncident;