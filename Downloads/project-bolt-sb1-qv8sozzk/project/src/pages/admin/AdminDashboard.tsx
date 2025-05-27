import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart2, 
  FileText, 
  Users, 
  Calendar, 
  Settings, 
  Home, 
  Droplet, 
  Menu, 
  X,
  PlusCircle,
  AlertTriangle,
  Info,
  Bell,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import PredictionsManager from './dashboard/PredictionsManager';
import NewsManager from './dashboard/NewsManager';
import ResearchersManager from './dashboard/ResearchersManager';
import EventsManager from './dashboard/EventsManager';
import DashboardOverview from './dashboard/DashboardOverview';
import SettingsPanel from './dashboard/SettingsPanel';

const AdminDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { user } = useAuth();
  const location = useLocation();

  // Handle sidebar for mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar on navigation (mobile only)
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className={`fixed md:relative inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white flex flex-col overflow-hidden ${isSidebarOpen ? '' : 'hidden md:flex'}`}
      >
        <div className="p-4 border-b border-gray-800 flex items-center">
          <Droplet className="h-6 w-6 text-science-400 mr-2" />
          <span className="font-bold text-lg">Admin Portal</span>
          <button 
            className="ml-auto md:hidden text-gray-400 hover:text-white"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            <Link to="/admin" className={`nav-item ${location.pathname === '/admin' ? 'active' : ''}`}>
              <Home className="h-5 w-5 mr-3" />
              Overview
            </Link>
            <Link to="/admin/predictions" className={`nav-item ${location.pathname.includes('/admin/predictions') ? 'active' : ''}`}>
              <BarChart2 className="h-5 w-5 mr-3" />
              Predictions
            </Link>
            <Link to="/admin/news" className={`nav-item ${location.pathname.includes('/admin/news') ? 'active' : ''}`}>
              <FileText className="h-5 w-5 mr-3" />
              News
            </Link>
            <Link to="/admin/researchers" className={`nav-item ${location.pathname.includes('/admin/researchers') ? 'active' : ''}`}>
              <Users className="h-5 w-5 mr-3" />
              Researchers
            </Link>
            <Link to="/admin/events" className={`nav-item ${location.pathname.includes('/admin/events') ? 'active' : ''}`}>
              <Calendar className="h-5 w-5 mr-3" />
              Events
            </Link>
            <Link to="/admin/settings" className={`nav-item ${location.pathname.includes('/admin/settings') ? 'active' : ''}`}>
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Link>
          </nav>
        </div>
        
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
              {user?.name.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-gray-400">{user?.role}</p>
            </div>
          </div>
        </div>
      </motion.aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            <button 
              className="md:hidden text-gray-700"
              onClick={toggleSidebar}
              aria-label="Open sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <div className="flex-1 md:ml-8">
              <h1 className="text-xl font-semibold text-gray-800">
                {location.pathname === '/admin' && 'Dashboard Overview'}
                {location.pathname.includes('/admin/predictions') && 'Manage Predictions'}
                {location.pathname.includes('/admin/news') && 'Manage News'}
                {location.pathname.includes('/admin/researchers') && 'Manage Researchers'}
                {location.pathname.includes('/admin/events') && 'Manage Events'}
                {location.pathname.includes('/admin/settings') && 'Settings'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-700 hover:text-science-600 text-sm hidden md:flex items-center">
                <Home className="h-4 w-4 mr-1" />
                View Site
              </Link>
              
              <div className="relative">
                <button 
                  className="text-gray-700 hover:text-science-600 relative"
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-alert-500"></span>
                </button>
                
                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-30">
                    <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="font-medium text-gray-800">Notifications</h3>
                      <span className="text-xs bg-science-100 text-science-800 py-1 px-2 rounded-full">3 new</span>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      <div className="px-4 py-3 hover:bg-gray-50 border-l-2 border-science-500">
                        <p className="text-sm font-medium text-gray-900">New prediction added</p>
                        <p className="text-xs text-gray-500">5 minutes ago</p>
                      </div>
                      <div className="px-4 py-3 hover:bg-gray-50 border-l-2 border-alert-500">
                        <p className="text-sm font-medium text-gray-900">System alert: API sync issue</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                      <div className="px-4 py-3 hover:bg-gray-50">
                        <p className="text-sm font-medium text-gray-900">New researcher profile submitted</p>
                        <p className="text-xs text-gray-500">Yesterday</p>
                      </div>
                    </div>
                    <div className="px-4 py-2 border-t border-gray-100 text-center">
                      <button className="text-sm text-science-600 hover:text-science-700">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-science-600">
                  <div className="w-8 h-8 rounded-full bg-science-100 flex items-center justify-center text-science-700">
                    {user?.name.charAt(0)}
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 invisible group-hover:visible z-30">
                  <Link to="/admin/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                  <Link to="/admin/settings/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Sign out</button>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100">
          <Routes>
            <Route index element={<DashboardOverview />} />
            <Route path="predictions/*" element={<PredictionsManager />} />
            <Route path="news/*" element={<NewsManager />} />
            <Route path="researchers/*" element={<ResearchersManager />} />
            <Route path="events/*" element={<EventsManager />} />
            <Route path="settings/*" element={<SettingsPanel />} />
            <Route path="*" element={<Navigate to="/admin\" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;