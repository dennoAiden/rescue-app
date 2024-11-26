import './i18n';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout.jsx';
// import AdminDashboard from './components/AdminDashboard.jsx';
import UserDashboard from './components/UserDashboard.jsx';
import IncidentReport from './components/user/IncidentReport';
import IncidentMapUser from './components/user/IncidentMapUser';
import News from './components/user/News';
import InDetails from './components/user/InDetails';
import UserSettings from './components/user/UserSettings';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ForgotPassword from './components/auth/ForgotPassword.jsx';
import VerifyEmail from './components/VerifyEmail.jsx';
import Home from './components/Home';
import Contact from './components/Contact';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import NotFound from './components/NotFound.jsx';

import AppSettings from './components/admin/AppSettings.jsx';
import AdminOverview from './components/admin/AdminOverview.jsx';
import Analytics from './components/admin/Analytics.jsx'
import UserData from './components/admin/UserData.jsx'
import ReportedIncidents from './components/admin/ReportedIncident.jsx'
import IncidentMapAdmin from './components/admin/IncidentMapAdmin';
import AboutUs from "./components/AboutUs.jsx";
import Services from './components/Services.jsx';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} errorElement={<ErrorBoundary />} />
        <Route path="/about" element={<AboutUs />} errorElement={<ErrorBoundary />}/>
        <Route path="/services" element={<Services errorElement={<ErrorBoundary />}/>} />

        {/* Authentication routes */}
        <Route path="/login" element={<Login />} errorElement={<ErrorBoundary />}/>
        <Route path="/signup" element={<Signup />} errorElement={<ErrorBoundary />}/>
        <Route path="/forgotP" element={<ForgotPassword errorElement={<ErrorBoundary />}/>} />
        <Route path="/contact" element={<Contact />} errorElement={<ErrorBoundary />}/>
        <Route path="/verify-email" element={<VerifyEmail errorElement={<ErrorBoundary />}/>} />

        <Route element={<Layout isAdmin={false} />}>
          <Route path="/user/:id" element={<UserDashboard errorElement={<ErrorBoundary />}/>} />
          <Route path="/report" element={<IncidentReport />} errorElement={<ErrorBoundary />}/>
          <Route path="/map/user" element={<IncidentMapUser />} errorElement={<ErrorBoundary />}/>
          <Route path="/news" element={<News />} errorElement={<ErrorBoundary />}/>
          <Route path="/incidents" element={<InDetails />} errorElement={<ErrorBoundary />}/>
          <Route path="/settings" element={<UserSettings />} errorElement={<ErrorBoundary />}/>
        </Route>

    
        <Route  element={<Layout isAdmin={true} />}>
          <Route path="/admin/d/:id" element={<AdminOverview />} errorElement={<ErrorBoundary />}/>
          <Route path="/admin/analytics" element={<Analytics />} errorElement={<ErrorBoundary />}/>
          <Route path="/admin/usermanagement" element={<UserData />} errorElement={<ErrorBoundary />}/>
          <Route path="/admin/incidents" element={<ReportedIncidents />} errorElement={<ErrorBoundary />}/>
          <Route path="/admin/contact" element={<Contact />} errorElement={<ErrorBoundary />}/>
          <Route path="/admin/settings" element={<AppSettings />} errorElement={<ErrorBoundary />}/>
          <Route path="/map/admin" element={<IncidentMapAdmin />} errorElement={<ErrorBoundary />}/>
        </Route>
        <Route path="*" element={<NotFound />} errorElement={<ErrorBoundary />} />
      </Routes>
      <Toaster position="top-right" />
    </Router>

);
}

export default App;
