import React from 'react';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';
import { MapPin, Clock, MessageCircle, Share2, ThumbsUp, Camera } from 'lucide-react';

function Dashboard() {
  const incidents = useStore((state) => state.incidents);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Create Post Card */}
      <div className="feed-card mb-8">
        <div className="flex gap-4">
          <textarea
            placeholder="Report an incident or emergency..."
            className="input-dark w-full resize-none"
            rows={3}
          />
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex gap-4">
            <button className="text-gray-400 hover:text-white">
              <MapPin className="h-5 w-5" />
            </button>
            <button className="text-gray-400 hover:text-white">
              <Camera className="h-5 w-5" />
            </button>
          </div>
          <Link to="/create" className="btn-primary">
            Report Incident
          </Link>
        </div>
      </div>

      {/* Feed */}
      {incidents.map((incident) => (
        <div key={incident.id} className="feed-card">
          <div className="flex items-start gap-3 mb-4">
            <img
              src={`https://ui-avatars.com/api/?name=User&background=random`}
              alt="User"
              className="h-10 w-10 rounded-full"
            />
            <div>
              <h3 className="font-semibold">{incident.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="h-4 w-4" />
                <span>{new Date(incident.createdAt).toLocaleDateString()}</span>
                <MapPin className="h-4 w-4 ml-2" />
                <span>{incident.location.address}</span>
              </div>
            </div>
          </div>

          <p className="text-gray-300 mb-4">{incident.description}</p>

          {incident.images.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {incident.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Evidence ${index + 1}`}
                  className="rounded-lg w-full h-48 object-cover"
                />
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-gray-800">
            <div className="flex gap-6">
              <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                <ThumbsUp className="h-5 w-5" />
                <span>Like</span>
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                <MessageCircle className="h-5 w-5" />
                <span>Comment</span>
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-white">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              incident.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
              incident.status === 'investigating' ? 'bg-blue-500/20 text-blue-500' :
              incident.status === 'resolved' ? 'bg-green-500/20 text-green-500' :
              'bg-red-500/20 text-red-500'
            }`}>
              {incident.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;