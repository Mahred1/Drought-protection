import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { MapPin, Calendar, Download, Share2, AlertTriangle, ArrowLeft } from 'lucide-react';
import { getPredictionById } from '../services/api';
import { PredictionData } from '../types';
import { motion } from 'framer-motion';

const PredictionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        if (id) {
          const data = await getPredictionById(id);
          setPrediction(data);
        }
      } catch (error) {
        console.error('Error fetching prediction:', error);
        setError('Failed to load prediction data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPrediction();
  }, [id]);

  const getSeverityClass = (level: string) => {
    switch (level) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'extreme':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-science-600"></div>
      </div>
    );
  }

  if (error || !prediction) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <AlertTriangle className="h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
        <p className="text-gray-600 mb-6 text-center">{error || 'Prediction not found'}</p>
        <Link to="/predictions" className="btn btn-primary">
          Back to Predictions
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className={`${getSeverityClass(prediction.severity_level)} py-6`}>
        <div className="container mx-auto px-4">
          <Link to="/predictions" className="inline-flex items-center text-gray-700 hover:text-gray-900 mb-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Predictions
          </Link>
          
          <div className="flex flex-wrap items-start justify-between">
            <div className="w-full lg:w-3/4">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{prediction.title}</h1>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-gray-700">
                  <Calendar className="h-5 w-5 mr-1" />
                  <span>{format(new Date(prediction.prediction_date), 'MMMM d, yyyy')}</span>
                </div>
                
                {prediction.geospatial_data?.features?.[0]?.properties?.name && (
                  <div className="flex items-center text-gray-700">
                    <MapPin className="h-5 w-5 mr-1" />
                    <span>{prediction.geospatial_data.features[0].properties.name}</span>
                  </div>
                )}
                
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityClass(prediction.severity_level)}`}>
                  {prediction.severity_level.charAt(0).toUpperCase() + prediction.severity_level.slice(1)} Severity
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/4 flex flex-col sm:flex-row lg:flex-col gap-3 mt-4 lg:mt-0">
              <button className="btn btn-secondary flex items-center justify-center">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </button>
              
              {prediction.attachments && prediction.attachments.length > 0 && (
                <div className="dropdown relative">
                  <button className="btn btn-primary flex items-center justify-center">
                    <Download className="h-4 w-4 mr-2" />
                    Download Reports
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div 
            className="lg:col-span-2 bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <article className="prose prose-science max-w-none">
              {prediction.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </article>
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {prediction.geospatial_data && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Affected Region</h3>
                <div className="aspect-video bg-gray-100 rounded-md flex items-center justify-center mb-3">
                  {/* This would be replaced with an actual map component */}
                  <div className="text-gray-500 text-sm">
                    Interactive map would be displayed here
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  {prediction.geospatial_data.features[0].properties.name} region showing {prediction.severity_level} drought severity.
                </p>
              </div>
            )}
            
            {prediction.attachments && prediction.attachments.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Available Reports</h3>
                <ul className="space-y-3">
                  {prediction.attachments.map((attachment, index) => (
                    <li key={index}>
                      <a 
                        href="#" 
                        className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <Download className="h-5 w-5 text-science-600 mr-3" />
                        <span className="text-gray-700">{attachment}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Related Predictions</h3>
              <div className="space-y-4">
                <a 
                  href="#" 
                  className="block p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <h4 className="font-medium text-gray-900 mb-1">Historical Drought Patterns: Central Valley</h4>
                  <p className="text-gray-600 text-sm">Analysis of drought cycles from 1950-2023</p>
                </a>
                <a 
                  href="#" 
                  className="block p-4 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <h4 className="font-medium text-gray-900 mb-1">2023 Winter Rainfall Impact Assessment</h4>
                  <p className="text-gray-600 text-sm">Evaluation of precipitation effects on water tables</p>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PredictionDetailPage;