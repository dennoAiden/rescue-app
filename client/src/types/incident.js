export default {
  
  id: '',
  title: '',
  description: '',
  location: {
    lat: 0,
    lng: 0,
    address: '',
  },
  status: 'pending', // or 'investigating', 'rejected', 'resolved'
  images: [],
  videos: [],
  userId: '',
  createdAt: new Date(),
  updatedAt: new Date(),
};
