import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart2, 
  Users, 
  FileText,
  Calendar,
  Droplet,
  AlertTriangle,
  Globe,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardOverview: React.FC = () => {
  const [timeRange, setTimeRange] = useState('week');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
          <p className="text-gray-600">Welcome back! Here's what's happening with DroughtWatch.</p>
        </div>
        
        <div className="inline-flex bg-white rounded-md shadow-sm p-1">
          <button 
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              timeRange === 'day' ? 'bg-science-100 text-science-800' : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setTimeRange('day')}
          >
            Today
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              timeRange === 'week' ? 'bg-science-100 text-science-800' : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setTimeRange('week')}
          >
            This Week
          </button>
          <button 
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              timeRange === 'month' ? 'bg-science-100 text-science-800' : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setTimeRange('month')}
          >
            This Month
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Predictions</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">147</h3>
            </div>
            <div className="bg-science-100 p-3 rounded-full">
              <BarChart2 className="h-6 w-6 text-science-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <div className="flex items-center text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">8.2%</span>
            </div>
            <span className="text-sm text-gray-500 ml-2">vs last {timeRange}</span>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Researchers</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">53</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <div className="flex items-center text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">12.5%</span>
            </div>
            <span className="text-sm text-gray-500 ml-2">vs last {timeRange}</span>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">News Articles</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">28</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <div className="flex items-center text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">5.3%</span>
            </div>
            <span className="text-sm text-gray-500 ml-2">vs last {timeRange}</span>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming Events</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">12</h3>
            </div>
            <div className="bg-amber-100 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-amber-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <div className="flex items-center text-red-600">
              <TrendingDown className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">3.1%</span>
            </div>
            <span className="text-sm text-gray-500 ml-2">vs last {timeRange}</span>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Charts and Data */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Drought Severity Trends</h3>
            <select className="text-sm border border-gray-300 rounded-md p-1.5">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>Last year</option>
            </select>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            {/* Chart would be here */}
            <div className="text-center text-gray-500">
              <BarChart2 className="h-12 w-12 mx-auto mb-2 text-gray-400" />
              <p>Trend chart would appear here</p>
              <p className="text-sm mt-1">Showing severity levels over time</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Regions Monitored</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="w-24 text-sm text-gray-500">Central Valley</span>
              <div className="flex-grow mx-3 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-red-500 h-full rounded-full" style={{ width: '87%' }}></div>
              </div>
              <span className="text-sm font-medium">87%</span>
            </div>
            <div className="flex items-center">
              <span className="w-24 text-sm text-gray-500">Southwest</span>
              <div className="flex-grow mx-3 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-orange-500 h-full rounded-full" style={{ width: '68%' }}></div>
              </div>
              <span className="text-sm font-medium">68%</span>
            </div>
            <div className="flex items-center">
              <span className="w-24 text-sm text-gray-500">Great Plains</span>
              <div className="flex-grow mx-3 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-yellow-500 h-full rounded-full" style={{ width: '53%' }}></div>
              </div>
              <span className="text-sm font-medium">53%</span>
            </div>
            <div className="flex items-center">
              <span className="w-24 text-sm text-gray-500">Midwest</span>
              <div className="flex-grow mx-3 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full rounded-full" style={{ width: '32%' }}></div>
              </div>
              <span className="text-sm font-medium">32%</span>
            </div>
            <div className="flex items-center">
              <span className="w-24 text-sm text-gray-500">Northeast</span>
              <div className="flex-grow mx-3 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '24%' }}></div>
              </div>
              <span className="text-sm font-medium">24%</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Activity and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
          </div>
          <div className="divide-y divide-gray-200">
            <div className="px-6 py-4 flex items-start">
              <div className="bg-science-100 p-2 rounded-full mr-4">
                <BarChart2 className="h-5 w-5 text-science-600" />
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium text-gray-900">New prediction added: "2024 Summer Outlook: Western Regions"</p>
                <p className="text-xs text-gray-500 mt-1">5 minutes ago by Admin</p>
              </div>
            </div>
            <div className="px-6 py-4 flex items-start">
              <div className="bg-purple-100 p-2 rounded-full mr-4">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium text-gray-900">Researcher profile updated: "Dr. Emily Chen"</p>
                <p className="text-xs text-gray-500 mt-1">2 hours ago by Admin</p>
              </div>
            </div>
            <div className="px-6 py-4 flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-4">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium text-gray-900">News article published: "New Funding for Drought Research"</p>
                <p className="text-xs text-gray-500 mt-1">Yesterday by Editor</p>
              </div>
            </div>
            <div className="px-6 py-4 flex items-start">
              <div className="bg-amber-100 p-2 rounded-full mr-4">
                <Calendar className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium text-gray-900">Event created: "2024 Drought Symposium"</p>
                <p className="text-xs text-gray-500 mt-1">2 days ago by Admin</p>
              </div>
            </div>
          </div>
          <div className="px-6 py-3 bg-gray-50 text-right">
            <button className="text-sm text-science-600 hover:text-science-700 font-medium">
              View all activity
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">System Alerts</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-amber-800 font-medium">Database backup scheduled</p>
                  <p className="text-xs text-amber-700 mt-1">Tomorrow at 02:00 AM. Expected downtime: 5-10 minutes.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800 font-medium">API rate limit warning</p>
                  <p className="text-xs text-red-700 mt-1">Weather data API usage at 85% of monthly quota.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Info className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-800 font-medium">System update available</p>
                  <p className="text-xs text-blue-700 mt-1">Version 1.2.4 is ready to install.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/admin/predictions/new" className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg text-center transition-colors">
            <div className="bg-science-100 p-3 rounded-full inline-flex justify-center mb-3">
              <BarChart2 className="h-6 w-6 text-science-600" />
            </div>
            <p className="text-sm font-medium text-gray-800">New Prediction</p>
          </Link>
          
          <Link to="/admin/news/new" className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg text-center transition-colors">
            <div className="bg-blue-100 p-3 rounded-full inline-flex justify-center mb-3">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-sm font-medium text-gray-800">New Article</p>
          </Link>
          
          <Link to="/admin/researchers/new" className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg text-center transition-colors">
            <div className="bg-purple-100 p-3 rounded-full inline-flex justify-center mb-3">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-sm font-medium text-gray-800">Add Researcher</p>
          </Link>
          
          <Link to="/admin/events/new" className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg text-center transition-colors">
            <div className="bg-amber-100 p-3 rounded-full inline-flex justify-center mb-3">
              <Calendar className="h-6 w-6 text-amber-600" />
            </div>
            <p className="text-sm font-medium text-gray-800">New Event</p>
          </Link>
        </div>
      </div>
      
      {/* Global Impact Section */}
      <div className="bg-science-800 rounded-lg shadow-md text-white p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-8">
            <h3 className="text-xl font-bold mb-2">DroughtWatch Global Impact</h3>
            <p className="text-science-200 max-w-2xl">
              Your drought predictions and research are currently helping communities across 147 regions worldwide.
              With 89% prediction accuracy, the system continues to provide crucial early warnings.
            </p>
            <div className="mt-4 flex items-center">
              <Link to="/admin/settings/impact" className="text-white font-medium flex items-center hover:underline">
                View Impact Report
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="bg-science-700 p-4 rounded-full">
              <Globe className="h-16 w-16 text-science-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;