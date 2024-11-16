import { Megaphone, MapPin, Camera, Bell } from "lucide-react";

const AboutPage = () => {
  return (
    <div id="about" className="bg-gray-900 text-white p-6 space-y-10">
      {/* Hero Image */}

      <div className="relative w-full h-64 md:h-80 lg:h-96 mb-8">
        <img
          src="/accidents.jpeg"
          alt="Ajali Platform Hero"
          className="opacity-0 w-full h-full object-cover rounded-lg shadow-lg"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center space-y-4 text-center p-4">
          <p className="text-3xl font-bold text-yellow-400">
            Welcome to Ajali! Platform
          </p>
          <p className="hidden md:block text-lg max-w-3xl">
            Where safety meets efficiency. Ajali! Platform is a modern web
            application empowering individuals and communities in Kenya to
            report accidents and emergencies quickly and effectively.
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-gray-800 rounded-lg shadow-md p-4">
        <h2 className="text-3xl font-semibold text-yellow-300 text-center mb-4 mt-4">
          Our Mission
        </h2>
        <p className="text-lg text-center max-w-3xl mx-auto">
          To save lives by providing an accessible platform for real-time
          incident reporting and fostering a culture of safety and
          responsibility.
        </p>
      </div>

      {/* How We Help Section */}
      <div className="p-4">
        <h2 className="text-2xl font-semibold text-yellow-300 text-center mb-6">
          How We Help
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature Cards */}
          <div className="bg-gray-800 p-4 rounded-lg text-center shadow-md">
            <Megaphone className="text-yellow-400 w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">Real-time Reporting</h3>
            <p className="text-sm">
              Report incidents instantly and efficiently.
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center shadow-md">
            <MapPin className="text-yellow-400 w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">Interactive Map</h3>
            <p className="text-sm">
              View incidents on a live, interactive map.
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center shadow-md">
            <Camera className="text-yellow-400 w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">Media Uploads</h3>
            <p className="text-sm">
              Attach photos and videos for better context.
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center shadow-md">
            <Bell className="text-yellow-400 w-12 h-12 mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">Instant Alerts</h3>
            <p className="text-sm">
              Receive real-time updates and notifications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;