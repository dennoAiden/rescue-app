import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import UserDashboard from './components/UserDashboard.jsx';
import IncidentReport from './components/user/IncidentReport';
import IncidentMap from './components/user/IncidentMap';
import News from './components/user/News';
import InDetails from './components/user/InDetails';
import MediaUpload from './components/user/MediaUpload';
import UserSettings from './components/user/UserSettings';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Home from './components/Home';


function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication routes come first */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />

        {/* Layout with user/admin routes */}
        <Route element={<Layout isAdmin={false} />}>
          <Route path="/" element={<UserDashboard />} />
          <Route path="/report" element={<IncidentReport />} />
          <Route path="/map" element={<IncidentMap />} />
          <Route path="/news" element={<News />} />
          <Route path="/incidents" element={<InDetails />} />
          <Route path="/media" element={<MediaUpload />} />
          <Route path="/settings" element={<UserSettings />} />
        </Route>

        {/* Admin route */}
        <Route element={<Layout isAdmin={true} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
