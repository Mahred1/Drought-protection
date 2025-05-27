import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowRight, AlertTriangle, BarChart2 } from 'lucide-react';
import { PredictionData } from '../../types';

interface PredictionCardProps {
  prediction: PredictionData;
}

const PredictionCard: React.FC<PredictionCardProps> = ({ prediction }) => {
  const getSeverityClass = (level: string) => {
    switch (level) {
      case 'low':
        return 'severity-low';
      case 'moderate':
        return 'severity-moderate';
      case 'high':
        return 'severity-high';
      case 'extreme':
        return 'severity-extreme';
      default:
        return 'severity-low';
    }
  };

  const truncateContent = (content: string, maxLength = 120) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{prediction.title}</h3>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityClass(prediction.severity_level)}`}>
            {prediction.severity_level.charAt(0).toUpperCase() + prediction.severity_level.slice(1)}
          </div>
        </div>
        
        <p className="text-gray-500 text-sm mb-3">
          {format(new Date(prediction.prediction_date), 'MMM d, yyyy')}
        </p>
        
        <p className="text-gray-700 mb-6">
          {truncateContent(prediction.content)}
        </p>
        
        <div className="flex justify-between items-center">
          <Link 
            to={`/predictions/${prediction._id}`} 
            className="text-science-600 hover:text-science-700 font-medium flex items-center"
          >
            Read More
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
          
          {prediction.severity_level === 'high' || prediction.severity_level === 'extreme' ? (
            <div className="flex items-center text-alert-600">
              <AlertTriangle className="h-4 w-4 mr-1" />
              <span className="text-sm">High Priority</span>
            </div>
          ) : (
            <div className="flex items-center text-gray-500">
              <BarChart2 className="h-4 w-4 mr-1" />
              <span className="text-sm">View Data</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionCard;