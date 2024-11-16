import React from 'react';
import { Users, Shield, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Ajali</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're dedicated to making our communities safer through efficient incident reporting and response systems.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <Shield className="h-12 w-12 text-red-500" />,
              title: "Our Mission",
              description: "To provide a reliable and efficient platform for incident reporting and emergency response."
            },
            {
              icon: <Target className="h-12 w-12 text-red-500" />,
              title: "Our Vision",
              description: "Creating safer communities through technology and community engagement."
            },
            {
              icon: <Users className="h-12 w-12 text-red-500" />,
              title: "Our Values",
              description: "Integrity, reliability, and commitment to public safety."
            }
          ].map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2024, Ajali emerged from a simple yet powerful idea: to create a platform that makes incident reporting accessible to everyone. Our team of dedicated professionals works tirelessly to ensure that communities have the tools they need to stay safe and informed.
          </p>
          <p className="text-gray-600">
            Today, we serve thousands of users across multiple regions, helping to create safer and more connected communities through our innovative reporting system.
          </p>
        </div>
      </div>
    </div>
  );
}