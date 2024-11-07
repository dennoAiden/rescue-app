import { useState } from 'react';
import { Camera, MapPin, AlertTriangle, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';

export default function UserDashboard() {
  const [newIncident, setNewIncident] = useState('');

  return (
    <div className="flex min-h-screen bg-gray-900">
      <div className="flex-1 p-6">
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="What happened?"
              className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-500"
              value={newIncident}
              onChange={(e) => setNewIncident(e.target.value)}
            />
            <div className="flex gap-2">
              <button className="p-2 text-gray-400 hover:text-white">
                <Camera className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white">
                <MapPin className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white">
                <AlertTriangle className="w-5 h-5" />
              </button>
            </div>
            <button className="px-6 py-2 bg-yellow-500 text-gray-900 font-medium rounded-lg hover:bg-yellow-600 transition-colors">
              Submit Report
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop"
                alt="User avatar"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <h3 className="font-medium text-white">Report an accident or emergency now</h3>
                <p className="text-gray-400 mt-2">
                  Welcome to Ajali! Incident Reporting, a modern web application designed for
                  reporting accidents and emergencies in Kenya. Our user-friendly features for incident
                  reporting help save lives.
                </p>
                <div className="mt-4 flex gap-4">
                  <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                    <ThumbsUp className="w-5 h-5" />
                    <span>238 Likes</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                    <MessageSquare className="w-5 h-5" />
                    <span>42 Comments</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-white">Recent Alerts</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-white">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square relative rounded-lg overflow-hidden">
                  <img
                    src={`https://source.unsplash.com/random/400x400?emergency,${i}`}
                    alt="Emergency situation"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
