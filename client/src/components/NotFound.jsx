import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center max-w-md p-8 bg-gray-800 rounded-lg shadow-xl">
        <h1 className="text-6xl font-bold text-yellow-500 mb-4">404</h1>
        <p className="text-gray-300 mb-6">
          The page you are looking for cannot be found.
        </p>
        <Link 
          to="/" 
          className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-yellow-600 transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
