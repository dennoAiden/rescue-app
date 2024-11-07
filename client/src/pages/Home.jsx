import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Phone, MapPin, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-gray-900">
          Emergency Response System for Kenya
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Report accidents and emergencies in real-time. Every second counts in
          saving lives. Be part of the solution.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            Report an Emergency
          </Link>
          <Link
            to="/login"
            className="bg-gray-100 text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            View Reports
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <AlertTriangle className="h-12 w-12 text-red-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Quick Reporting</h3>
          <p className="text-gray-600">
            Report incidents instantly with our easy-to-use interface. Add photos,
            videos, and location data.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <MapPin className="h-12 w-12 text-red-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Precise Location</h3>
          <p className="text-gray-600">
            Automatic geolocation tracking ensures emergency responders can find the
            incident quickly.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <Shield className="h-12 w-12 text-red-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
          <p className="text-gray-600">
            Track the status of your reports and receive updates as authorities
            respond to the situation.
          </p>
        </div>
      </section>

      <section className="bg-red-50 p-8 rounded-xl">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <Phone className="h-16 w-16 text-red-600 mx-auto" />
          <h2 className="text-3xl font-bold text-gray-900">
            Emergency? Don't wait.
          </h2>
          <p className="text-xl text-gray-600">
            If you're witnessing an emergency situation, report it now. Your quick
            action could save lives.
          </p>
          <Link
            to="/report"
            className="inline-block bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            Report Now
          </Link>
        </div>
      </section>
    </div>
  );
}
