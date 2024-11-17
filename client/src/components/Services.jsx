import React from 'react';
import { AlertTriangle, Bell, Clock, Shield, LineChart, Users, FileSearch, Zap, Phone } from 'lucide-react';
import Navbar from './Navbar';

const services = [
  {
    icon: <AlertTriangle className="h-8 w-8 text-purple-500" />,
    title: "Incident Detection",
    description: "Advanced detection systems to identify and classify incidents in real-time."
  },
  {
    icon: <Bell className="h-8 w-8 text-purple-500" />,
    title: "Alert Management",
    description: "Customizable alert systems with intelligent notification routing and escalation."
  },
  {
    icon: <Clock className="h-8 w-8 text-purple-500" />,
    title: "Response Timeline",
    description: "Detailed incident timelines with response tracking and documentation."
  },
  {
    icon: <Shield className="h-8 w-8 text-purple-500" />,
    title: "Security Protocols",
    description: "Predefined security protocols and response procedures for various incident types."
  },
  {
    icon: <LineChart className="h-8 w-8 text-purple-500" />,
    title: "Analytics Dashboard",
    description: "Comprehensive analytics for incident patterns, response times, and resolution rates."
  },
  {
    icon: <Users className="h-8 w-8 text-purple-500" />,
    title: "Team Coordination",
    description: "Streamlined team collaboration tools for effective incident response."
  },
  {
    icon: <FileSearch className="h-8 w-8 text-purple-500" />,
    title: "Incident Reports",
    description: "Detailed reporting system with customizable templates and analysis tools."
  },
  {
    icon: <Zap className="h-8 w-8 text-purple-500" />,
    title: "Quick Response",
    description: "Automated response workflows for faster incident resolution."
  },
  {
    icon: <Phone className="h-8 w-8 text-purple-500" />,
    title: "24/7 Support",
    description: "Round-the-clock incident response support and guidance."
  }
];

const Services = () => {
  return (
    <>
      <Navbar />
      {/* <section id="services" className="mt-16 py-20 px-4"> Changed pt-20 to mt-16 */}
      <section id="services" className="pt-24 py-20 px-4">

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 pt-8"> {/* Added pt-8 for extra spacing */}
            <h2 className="text-4xl font-bold mb-4 pt-24 py-20 px-4">Our Services</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive incident management solutions designed to protect your organization
              and ensure rapid response to any situation.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="p-6 rounded-xl bg-gray-800/50 hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="p-3 bg-purple-500/10 rounded-lg w-fit">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mt-4">{service.title}</h3>
                <p className="mt-2 text-gray-400">{service.description}</p>
                <button className="mt-4 text-purple-400 hover:text-purple-300 flex items-center gap-2 transition-colors duration-200">
                  Learn more <Zap className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;