import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus } from 'lucide-react';

const NewsManager: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">News Management</h2>
        
        <Link 
          to="/admin/news/new" 
          className="btn btn-primary inline-flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Article
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-16 text-center">
        <div className="bg-gray-100 rounded-full p-4 inline-flex mb-4">
          <FileText className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-medium text-gray-800 mb-2">News Management Module</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          This module will allow you to create, edit, and manage news articles about drought research and findings.
        </p>
        <Link 
          to="/admin/predictions" 
          className="btn btn-primary inline-flex items-center"
        >
          Go to Predictions
        </Link>
      </div>
    </div>
  );
};

export default NewsManager;