import { useState, useRef } from 'react';
import { Camera, MapPin, AlertTriangle } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function IncidentReport() {
  const [location, setLocation] = useState('');
  const [latLong, setLatLong] = useState({ lat: '', long: '' });
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

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
    onSubmit: async (values) => {
      try {
        // Step 1: Post Incident
        const incidentResponse = await fetch('http://127.0.0.1:5555/incidents', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            description: values.description,
            location: values.location,
            latitude: values.latitude,
            longitude: values.longitude,
            user_id: localStorage.getItem('user_id'),
          }),
        });
        if (incidentResponse.ok) {
          return incidentResponse.json().then((data) => {
            console.log(data)
          })
        }
    
        const incidentData = await incidentResponse.json();
        const incidentId = incidentData.id; 
    
        if (!incidentId) {
          setResponseMessage('Failed to create incident. Please try again.');
          return;
        }
    
        const mediaUploads = [...images, ...videos].map((file) => {
          const formData = new FormData();
          formData.append('incident_report_id', incidentId);
          formData.append('media_type', file.type.startsWith('image') ? 'image' : 'video');
          formData.append('media_url', file); // Use actual file object
    
          return fetch('http://127.0.0.1:5555/media', {
            method: 'POST',
            body: formData,
          });
        });
    
        await Promise.all(mediaUploads);
        setResponseMessage('Incident and media posted successfully!');
      } catch (error) {
        console.error('Error creating incident or uploading media:', error);
        setResponseMessage('Error posting incident or media. Please try again.');
      }
    }    
  });

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    formik.setFieldValue('location', e.target.value);
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLatLong({ lat: latitude, long: longitude });
        formik.setFieldValue('latitude', latitude);
        formik.setFieldValue('longitude', longitude);
        
    
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=e8e97b4bccb04cbf84c4835212b56571`)
          .then((res) => res.json())
          .then((data) => {
            const humanReadableLocation = data.results[0]?.formatted || `Lat: ${latitude}, Long: ${longitude}`;
            formik.setFieldValue('location', humanReadableLocation);
            setLocation(humanReadableLocation);
          })
          .catch((error) => {
            console.error('Error fetching location data:', error);
            formik.setFieldValue('location', `Lat: ${latitude}, Long: ${longitude}`);
            setLocation(`Lat: ${latitude}, Long: ${longitude}`);
          });
      });
    } else {
      setGeolocationError('Geolocation is not supported by this browser.');
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    formik.setFieldValue('images', files);
  };

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    setVideos(files);
    formik.setFieldValue('videos', files);
  };

  const handleCaptureVideo = () => {
    const videoCapture = document.createElement('video');
    const mediaStream = navigator.mediaDevices.getUserMedia({ video: true });
    mediaStream.then((stream) => {
      videoCapture.srcObject = stream;
      videoCapture.play();
      videoCapture.onloadedmetadata = () => {
        setVideos([videoCapture]);
      };
    });
  };

  const triggerImageUpload = () => {
    imageInputRef.current.click();
  };

  const triggerVideoUpload = () => {
    videoInputRef.current.click();
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

          <div>
            <span className="text-lg font-medium text-white">Evidence</span>
            <div className="mt-2 flex gap-4">
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-400 hover:text-white rounded-lg"
                onClick={triggerImageUpload}
              >
                <Camera className="w-5 h-5" />
                <span>Add Photos</span>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-400 hover:text-white rounded-lg"
                onClick={triggerVideoUpload}
              >
                <AlertTriangle className="w-5 h-5" />
                <span>Add Videos</span>
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  multiple
                  className="hidden"
                  onChange={handleVideoUpload}
                />
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-yellow-500 text-gray-900 font-medium rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Submit Report
          </button>
        </form>

        {responseMessage && (
          <div className="mt-4 text-center text-white">
            <span>{responseMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}
