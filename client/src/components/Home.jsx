import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import videoBg from '../videos/response1.mp4';
import EmergencyReporting from './EmergencyReporting';
import Navbar from './Navbar';

export default function LandingPage() {
  const [showEmergencyReport, setShowEmergencyReport] = useState(false);

  return (
    <div className="home">
      <Navbar />

      {/* Home section */}
      <div
        className="relative min-h-screen flex items-center justify-center overflow-hidden text-white"
        style={{ paddingTop: '80px' }} 
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/fallback-image.jpg" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ filter: 'blur(4px) brightness(0.4)', zIndex: '-1' }}
        >
          <source src={videoBg} type="video/mp4" />
        </video>

        <div className="relative z-10 text-center px-4">
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Report and track incidents in real-time before or after they happen. Help make our communities safer together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              aria-label="Sign in to your account"
              className="px-8 py-3 p-8 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transform hover:scale-105 transition duration-300"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              aria-label="Create a new account"
              className="px-8 py-3 p-8 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transform hover:scale-105 transition duration-300 border border-gray-600"
            >
              Create Account
            </Link>
          </div>

          <button
            onClick={() => setShowEmergencyReport(true)}
            className="mt-8 px-8 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transform hover:scale-105 transition duration-300 flex items-center gap-2 mx-auto"
          >
            <AlertTriangle className="w-5 h-5" />
            Report Emergency Now
          </button>

          <div className="mt-12 text-gray-400">
            <p>Emergency? Call 999 or 112 immediately</p>
          </div>

          {showEmergencyReport && (
            <EmergencyReporting onClose={() => setShowEmergencyReport(false)} />
          )}
        </div>
      </div>
    </div>
  );
}
