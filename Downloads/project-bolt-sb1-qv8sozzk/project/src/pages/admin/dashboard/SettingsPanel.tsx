import React from 'react';
import { Settings } from 'lucide-react';

const SettingsPanel: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
      
      <div className="bg-white rounded-lg shadow-sm p-16 text-center">
        <div className="bg-gray-100 rounded-full p-4 inline-flex mb-4">
          <Settings className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-medium text-gray-800 mb-2">Settings Panel</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          This module will allow you to configure system settings, user preferences, and notification options.
        </p>
      </div>
    </div>
  );
};

export default SettingsPanel;