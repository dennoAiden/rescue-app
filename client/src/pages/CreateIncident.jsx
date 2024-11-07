import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import Map from '../components/Map';
import { Camera, Upload, MapPin } from 'lucide-react';

function CreateIncident() {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const addIncident = useStore((state) => state.addIncident);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState({
    lat: -1.2921,
    lng: 36.8219,
    address: '',
  });
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const incident = {
      id: crypto.randomUUID(),
      title,
      description,
      location,
      status: 'pending',
      images,
      videos,
      userId: user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    addIncident(incident);
    navigate('/');
  };

  const handleMapClick = (e) => {
    if (e.latLng) {
      setLocation({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        address: 'Location selected', // In a real app, use reverse geocoding
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Report an Incident</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <div className="h-[400px] rounded-lg overflow-hidden mb-2">
            <Map
              center={{ lat: location.lat, lng: location.lng }}
              markers={[location]}
              onClick={handleMapClick}
            />
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            <span>Click on the map to set location</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images
            </label>
            <div className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none hover:border-gray-400 focus:outline-none">
              <div className="flex flex-col items-center space-y-2">
                <Camera className="w-8 h-8 text-gray-400" />
                <span className="text-sm text-gray-500">
                  Drop images here or click to upload
                </span>
              </div>
              <input type="file" className="hidden" accept="image/*" multiple />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Videos
            </label>
            <div className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none hover:border-gray-400 focus:outline-none">
              <div className="flex flex-col items-center space-y-2">
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="text-sm text-gray-500">
                  Drop videos here or click to upload
                </span>
              </div>
              <input type="file" className="hidden" accept="video/*" multiple />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
}

export default CreateIncident;
