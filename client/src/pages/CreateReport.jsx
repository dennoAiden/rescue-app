import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Video, MapPin } from 'lucide-react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useStore } from '../store/useStore';

const defaultCenter = {
  lat: -1.2921,
  lng: 36.8219,
};

export default function CreateReport() {
  const navigate = useNavigate();
  const addIncident = useStore((state) => state.addIncident);
  const user = useStore((state) => state.user);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'accident',
    location: defaultCenter,
    images: [],
    videos: [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return;

    const incident = {
      id: Date.now().toString(),
      ...formData,
      status: 'pending',
      userId: user.id,
      location: { ...formData.location, address: 'Kenya' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addIncident(incident);
    navigate('/dashboard');
  };

  const handleMapClick = (e) => {
    if (e.latLng) {
      setFormData((prev) => ({
        ...prev,
        location: {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        },
      }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
      <h1 className="text-3xl font-bold mb-8">Report an Incident</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Incident Type
          </label>
          <select
            value={formData.type}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, type: e.target.value }))
            }
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="accident">Accident</option>
            <option value="emergency">Emergency</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Brief description of the incident"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Detailed Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full p-3 border border-gray-300 rounded-lg"
            rows={4}
            placeholder="Provide as much detail as possible"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <div className="h-[400px] w-full rounded-lg overflow-hidden">
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={formData.location}
                zoom={13}
                onClick={handleMapClick}
              >
                <Marker position={formData.location} />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Images
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-red-600 rounded-lg tracking-wide border border-red-600 cursor-pointer hover:bg-red-50">
                <Camera className="w-8 h-8" />
                <span className="mt-2 text-base">Select Images</span>
                <input type="file" className="hidden" multiple accept="image/*" />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Videos
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-red-600 rounded-lg tracking-wide border border-red-600 cursor-pointer hover:bg-red-50">
                <Video className="w-8 h-8" />
                <span className="mt-2 text-base">Select Videos</span>
                <input type="file" className="hidden" multiple accept="video/*" />
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
}
