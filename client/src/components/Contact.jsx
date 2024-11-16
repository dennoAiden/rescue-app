import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to help. Reach out to us for any questions or concerns.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                  placeholder="Your message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-red-500" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-red-500" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">support@ajali.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="h-6 w-6 text-red-500" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-gray-600">123 Safety Street, Security City, SC 12345</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Clock className="h-6 w-6 text-red-500" />
                  <div>
                    <p className="font-medium">Hours</p>
                    <p className="text-gray-600">24/7 Emergency Response</p>
                    <p className="text-gray-600">Support: Mon-Fri, 9AM-6PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">Emergency?</h2>
              <p className="text-gray-600 mb-4">
                For immediate emergency assistance, please call:
              </p>
              <div className="text-2xl font-bold text-red-500">
                999 or 112
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}