import React, { useState, useEffect } from 'react';
import { BarChart, Users, AlertTriangle, CheckCircle, Menu, MapPin } from 'lucide-react';

// const stats = [
//   { label: 'Total Incidents', value: '156', icon: AlertTriangle, color: 'text-yellow-500' },
//   { label: 'Resolved', value: '89', icon: CheckCircle, color: 'text-green-500' },
//   { label: 'Active Users', value: '2,345', icon: Users, color: 'text-blue-500' },
//   { label: 'Monthly Reports', value: '45', icon: BarChart, color: 'text-purple-500' },
// ];

const AdminDashboard = () => {
  const [selectedStat, setSelectedStat] = useState(stats[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [incidentReports, setIncidentReports] = useState([]);
  // const [selectedIncident, setSelectedIncident] = useState(null);

 
  useEffect(() => {
    fetch('/api/incidents')
      .then(response => response.json())
      .then(data => setIncidentReports(data))
      .catch(error => console.error('Error fetching incident reports:', error));
  }, []);

  // Handle status change of an incident
  const handleStatusChange = (incidentId, newStatus) => {
    fetch(`/api/incidents/${incidentId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(response => response.json())
      .then(data => {
        // Update the local incidentReports state after status update
        setIncidentReports(incidentReports.map(incident =>
          incident.id === incidentId ? { ...incident, status: newStatus } : incident
        ));
        alert(`Incident status changed to: ${newStatus}`);
      })
      .catch(error => console.error('Error updating incident status:', error));
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">

      {/* Main Content Area */}
      <main
        className={`flex-1 p-8 space-y-6 sm:p-12 ${
          sidebarOpen ? 'ml-64' : ''
        } mt-12 sm:mt-0`} // Add margin-top for mobile when the hamburger menu is visible
      >
        <h1
          className={`text-2xl sm:text-3xl font-semibold ${
            sidebarOpen ? 'ml-64' : ''
          }`}
        >
          {selectedStat.label}
        </h1>

        {/* Incident Reports List */}
        <div className="space-y-4 mt-8">
          {incidentReports.map(incident => (
            <div key={incident.id} className="bg-gray-800 p-4 rounded-lg">
              <h2 className="font-semibold text-lg">{incident.title}</h2>
              <p>{incident.description}</p>
              <div className="mt-2">
                <MapPin className="inline-block mr-2" />
                <span>{incident.location}</span>
              </div>

              {/* Status Management */}
              <div className="mt-4">
                <button
                  onClick={() => handleStatusChange(incident.id, 'under investigation')}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-2"
                >
                  Under Investigation
                </button>
                <button
                  onClick={() => handleStatusChange(incident.id, 'resolved')}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
                >
                  Resolved
                </button>
                <button
                  onClick={() => handleStatusChange(incident.id, 'rejected')}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                  Rejected
                </button>
              </div>

              {/* Media Display */}
              <div className="mt-4">
                {incident.media && incident.media.images && (
                  <div>
                    <h3>Images:</h3>
                    <div className="flex space-x-2">
                      {incident.media.images.map((image, index) => (
                        <img key={index} src={image} alt="Incident" className="w-24 h-24 object-cover rounded-lg" />
                      ))}
                    </div>
                  </div>
                )}
                {incident.media && incident.media.videos && (
                  <div className="mt-2">
                    <h3>Videos:</h3>
                    {incident.media.videos.map((video, index) => (
                      <video key={index} controls className="w-full max-w-xs mt-2">
                        <source src={video} type="video/mp4" />
                      </video>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
