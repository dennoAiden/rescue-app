import { AlertTriangle, Clock, MapPin, Camera, MessageSquare } from 'lucide-react';

export default function IncidentDetails() {
  // Example incident data matching the Incident structure
  const incidents = [
    {
      id: "INC-001",
      title: "Traffic Accident on Highway",
      status: "Under Investigation",
      location: "Mombasa Road, Near Exit 7",
      description: "Multiple vehicle collision reported...",
      timestamp: "2024-02-28 14:30",
      images: ["https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=800&auto=format&fit=crop"]
    },
    {
      id: "INC-002",
      title: "Building Fire Emergency",
      status: "Resolved",
      location: "Central Business District",
      description: "Commercial building fire incident...",
      timestamp: "2024-02-28 12:15",
      images: ["https://images.unsplash.com/photo-1599587897943-467f82141a45?w=800&auto=format&fit=crop"]
    }
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-white">Incident Details</h1>

      <div className="space-y-6">
        {incidents.map((incident) => (
          <div key={incident.id} className="bg-gray-800 rounded-lg overflow-hidden text-white">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">{incident.title}</h2>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  incident.status === 'Resolved' ? 'bg-green-500' : 'bg-yellow-500'
                } text-gray-900`}>
                  {incident.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{incident.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{incident.timestamp}</span>
                  </div>
                  <p className="text-gray-300">{incident.description}</p>
                </div>

                <div>
                  <img 
                    src={incident.images[0]} 
                    alt={incident.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-400 hover:text-white rounded-lg">
                  <Camera className="w-4 h-4" />
                  <span>Add Media</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-400 hover:text-white rounded-lg">
                  <MessageSquare className="w-4 h-4" />
                  <span>Comment</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
