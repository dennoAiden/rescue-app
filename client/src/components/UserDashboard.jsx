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
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <img
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop"
              alt="User avatar"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-lg font-medium text-white">Report an accident or emergency now</h3>
            <p className="text-gray-400 mt-2">
              Welcome to Ajali! Incident Reporting, a modern web application designed for
              reporting accidents and emergencies in Kenya. Our user-friendly features for incident
              reporting help save lives.
            </p>

            <div className="mt-4 flex gap-4 justify-center">
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

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-white">Recent Alerts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-white">
              {[
                {
                  url: "https://images.unsplash.com/photo-1599152097274-5da4c5979b9b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFjY2lkZW50fGVufDB8fDB8fHww",
                  description: "Accident on Thika Road",
                },
                {
                  url: "https://plus.unsplash.com/premium_photo-1664304341769-5cbee1b0a7e4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZW1lcmdlbmN5fGVufDB8fDB8fHww",
                  description: "Chemical spill incident",
                },
                {
                  url: "https://images.unsplash.com/photo-1606613817012-6c4efabd5e2e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGVtZXJnZW5jeXxlbnwwfHwwfHx8MA%3D%3D",
                  description: "Flooding in Kisumu",
                },
                {
                  url: "https://plus.unsplash.com/premium_photo-1672759455710-70c879daf721?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGVtZXJnZW5jeXxlbnwwfHwwfHx8MA%3D%3D",
                  description: "Building collapse in Nairobi",
                },
                {
                  url: "https://images.unsplash.com/photo-1674663939841-7f36c628b0fb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fGVtZXJnZW5jeXxlbnwwfHwwfHx8MA%3D%3D",
                  description: "Power outage in Mombasa",
                },
                {
                  url: "https://images.unsplash.com/photo-1639369488374-561b5486177d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTB8fGVtZXJnZW5jeXxlbnwwfHwwfHx8MA%3D%3D",
                  description: "Fire incident downtown",
                },
              ].map((alert, index) => (
                <div key={index} className="rounded-lg overflow-hidden bg-gray-700">
                  <div className="aspect-square relative">
                    <img
                      src={alert.url}
                      alt="Emergency situation"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-300">{alert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
