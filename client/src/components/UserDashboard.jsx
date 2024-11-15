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
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;
