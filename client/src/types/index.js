// Location object structure
const Location = {
    lat: 0,  // Number
    lng: 0,  // Number
    address: '',  // String
  };
  
  // Incident status options
  const IncidentStatus = ['pending', 'investigating', 'resolved', 'rejected'];
  
  // User object structure
  const User = {
    id: '',  // String
    name: '',  // String
    email: '',  // String
    role: 'user',  // 'user' or 'admin'
  };
  
  // Incident object structure
  const Incident = {
    id: '',  // String
    userId: '',  // String
    title: '',  // String
    description: '',  // String
    location: Location,  // Location object
    status: 'pending',  // IncidentStatus
    images: [],  // Array of Strings
    videos: [],  // Array of Strings
    createdAt: '',  // String
    updatedAt: '',  // String
  };
  