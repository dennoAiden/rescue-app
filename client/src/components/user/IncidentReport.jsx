import { useState } from 'react';
import { Camera, MapPin, AlertTriangle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { createIncident } from "../../redux/actions/incidentActions";

export default function ReportIncident() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // Assuming user info is in the Redux store

  const [location, setLocation] = useState('');
  const [latLong, setLatLong] = useState({ lat: '', long: '' });
  const [geolocationError, setGeolocationError] = useState('');

  const formik = useFormik({
    initialValues: {
      description: '',
      location: '',
      latitude: '',
      longitude: '',
      images: [],
      videos: [],
    },
    validationSchema: Yup.object({
      description: Yup.string().required('Description is required'),
      location: Yup.string().required('Location is required'),
    }),
    onSubmit: (values) => {
      const newIncident = { ...values, userId: user.id }; // Add userId when creating the incident
      dispatch(createIncident(newIncident)); // Dispatch action to create incident
    },
  });

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    formik.setFieldValue('location', e.target.value);
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatLong({ lat: latitude, long: longitude });
          formik.setFieldValue('latitude', latitude);
          formik.setFieldValue('longitude', longitude);
        },
        (error) => {
          setGeolocationError('Failed to retrieve location. Please allow geolocation access.');
        }
      );
    } else {
      setGeolocationError('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-white">Report an Incident</h1>

      <div className="bg-gray-800 rounded-lg p-6 space-y-6">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block">
              <span className="text-lg font-medium text-white">What happened?</span>
              <textarea
                className="mt-2 w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-500"
                rows={4}
                placeholder="Describe the incident in detail..."
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.description && formik.errors.description && (
                <div className="text-red-500 text-sm">{formik.errors.description}</div>
              )}
            </label>
          </div>

          {/* Location */}
          <div>
            <label className="block">
              <span className="text-lg font-medium text-white">Location</span>
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-500"
                  placeholder="Enter location or use map pin"
                  name="location"
                  value={formik.values.location}
                  onChange={handleLocationChange}
                  onBlur={formik.handleBlur}
                />
                <button
                  type="button"
                  className="p-2 bg-gray-700 text-gray-400 hover:text-white rounded-lg"
                  onClick={handleGeolocation}
                >
                  <MapPin className="w-5 h-5" />
                </button>
              </div>
              {formik.touched.location && formik.errors.location && (
                <div className="text-red-500 text-sm">{formik.errors.location}</div>
              )}
            </label>
            {geolocationError && <div className="text-red-500 text-sm">{geolocationError}</div>}
          </div>

          {/* Evidence (Images and Videos) */}
          <div>
            <span className="text-lg font-medium text-white">Evidence</span>
            <div className="mt-2 flex gap-4">
              <button type="button" className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-400 hover:text-white rounded-lg">
                <Camera className="w-5 h-5" />
                <span>Add Photos</span>
              </button>
              <button type="button" className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-400 hover:text-white rounded-lg">
                <AlertTriangle className="w-5 h-5" />
                <span>Add Videos</span>
              </button>
            </div>
          </div>

          <button type="submit" className="w-full px-6 py-3 bg-yellow-500 text-gray-900 font-medium rounded-lg hover:bg-yellow-600 transition-colors">
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}
