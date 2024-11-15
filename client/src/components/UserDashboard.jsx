import React from "react";

const images = [
    { url: 'https://img.freepik.com/premium-photo/accident-concept-team-worker-was-born-factory-accident-being-assisted-by-team-safety-supervisors-foreman_33850-973.jpg?w=1060', alt: 'Accident Concept' },
    { url: 'https://img.freepik.com/free-photo/africa-humanitarian-aid-doctor-taking-care-patient_23-2149117844.jpg?semt=ais_hybrid', alt: 'Humanitarian Aid' },
    { url: 'https://img.freepik.com/premium-photo/red-cross-day-observed-annually-may-8th-honors-principles-red-cross-movement-highlighting-humanitarian-efforts-providing-aid_1029476-250254.jpg?semt=ais_hybrid', alt: 'Red Cross Day' },
    { url: 'https://img.freepik.com/free-photo/front-view-medical-control-covid19-concept_23-2148777440.jpg?semt=ais_hybrid', alt: 'Worker Safety' },
];

function UserDashboard() {
    return (
        <div className="dashboard-container">
           
            <div
                className="hero-section relative flex items-center justify-center h-[90vh] bg-cover bg-center"
                style={{ backgroundImage: `url(${images[0].url})`, backgroundSize: 'cover' }}
            >
                <div className="overlay absolute inset-0 bg-black opacity-50"></div>

                <div className="relative z-10 p-6 text-white text-center max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">Welcome to Your Dashboard</h1>
                    <p className="text-lg md:text-2xl">Manage, report, and track incidents with ease and efficiency.</p>
                </div>
            </div>

            <div className="features-section px-6 py-16 bg-gray-900">
                <h2 className="text-3xl font-semibold text-center text-white mb-12">Dashboard Features</h2>
                <div className="features-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {images.map((image, index) => (
                        <div key={index} className="feature-card bg-gray-800 p-6 rounded-lg text-white shadow-lg transition-transform transform hover:scale-105">
                            <img src={image.url} alt={image.alt} className="w-full h-40 object-cover rounded-lg mb-4"/>
                            <h3 className="text-xl font-semibold mb-2">{image.alt}</h3>
                            <p className="text-sm">Access and manage all relevant information related to {image.alt.toLowerCase()} in real-time.</p>
                        </div>
                    ))}
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

            <div className="why-choose-us px-6 py-16 bg-gray-800 mt-16">
                <h2 className="text-3xl font-semibold text-center text-white mb-12">Why Choose Us</h2>
                <div className="why-cards flex flex-wrap gap-8 justify-center max-w-6xl mx-auto">
                    <div className="why-card flex items-center p-8 h-40 w-full md:w-96 mb-8 bg-gray-700 text-white rounded-lg shadow-xl">
                        <div className="content flex flex-col items-center justify-center text-center">
                            <h3 className="text-xl font-semibold mb-4">Reliable Incident Reporting</h3>
                            <p className="text-sm">Our platform ensures real-time reporting and tracking of incidents, providing accurate information and swift responses.</p>
                        </div>
                    </div>

                    <div className="why-card flex items-center p-8 h-40 w-full md:w-96 mb-8 bg-gray-700 text-white rounded-lg shadow-xl">
                        <div className="content flex flex-col items-center justify-center text-center">
                            <h3 className="text-xl font-semibold mb-4">User-Friendly Interface</h3>
                            <p className="text-sm">Easy navigation and intuitive design make it simple for users to find what they need and report incidents seamlessly.</p>
                        </div>
                    </div>

                    <div className="why-card flex items-center p-8 h-40 w-full md:w-96 mb-8 bg-gray-700 text-white rounded-lg shadow-xl">
                        <div className="content flex flex-col items-center justify-center text-center">
                            <h3 className="text-xl font-semibold mb-4">Secure Data Management</h3>
                            <p className="text-sm">We prioritize your data's security and confidentiality with industry-leading encryption and data protection measures.</p>
                        </div>
                    </div>

                    <div className="why-card flex items-center p-8 h-40 w-full md:w-96 mb-8 bg-gray-700 text-white rounded-lg shadow-xl">
                        <div className="content flex flex-col items-center justify-center text-center">
                            <h3 className="text-xl font-semibold mb-4">Expert Support Team</h3>
                            <p className="text-sm">Our dedicated support team is always available to assist you with any questions or concerns you may have.</p>
                        </div>
                    </div>

                    <div className="why-card flex items-center p-8 h-40 w-full md:w-96 mb-8 bg-gray-700 text-white rounded-lg shadow-xl">
                        <div className="content flex flex-col items-center justify-center text-center">
                            <h3 className="text-xl font-semibold mb-4">Customizable Features</h3>
                            <p className="text-sm">Tailor the platform to meet your specific needs and enhance your overall user experience with flexible customization options.</p>
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
            </div>
        </div>
    );
}

export default UserDashboard;
