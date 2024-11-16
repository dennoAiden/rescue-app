import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 text-white ml-5">
          <AlertTriangle className="w-8 h-8 text-yellow-500" />
          <h1 className="text-2xl font-bold">Zusha!</h1>
        </div>
        <ul className="flex list-none p-0 m-0">
          <li className="mr-6">
            <Link
              to="/"
              className="text-white font-bold hover:text-gray-300 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li className="mr-6">
          <Link to="/services" onClick={() => console.log('Navigating to Services')}>
              Services
            </Link>

          </li>
          <li className="mr-6">
            <Link
              to="/about"
              className="text-white font-bold hover:text-gray-300 transition duration-300"
            >
              About
            </Link>
          </li>
          <li className="mr-6">
            <Link
              to="/contact"
              className="text-white font-bold hover:text-gray-300 transition duration-300"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
