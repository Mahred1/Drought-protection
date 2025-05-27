import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowUpDown } from 'lucide-react';
import PredictionCard from '../components/predictions/PredictionCard';
import { getPredictions } from '../services/api';
import { PredictionData } from '../types';

const PredictionsPage: React.FC = () => {
  const [predictions, setPredictions] = useState<PredictionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const data = await getPredictions();
        setPredictions(data);
      } catch (error) {
        console.error('Error fetching predictions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (sortOption: string) => {
    if (sortBy === sortOption) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(sortOption);
      setSortOrder('desc');
    }
  };

  const handleSeverityFilter = (severity: string) => {
    setSelectedSeverity(severity);
  };

  const filteredPredictions = predictions
    .filter(prediction => {
      const matchesSearch = prediction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           prediction.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSeverity = selectedSeverity === 'all' || prediction.severity_level === selectedSeverity;
      
      return matchesSearch && matchesSeverity;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc' 
          ? new Date(a.prediction_date).getTime() - new Date(b.prediction_date).getTime()
          : new Date(b.prediction_date).getTime() - new Date(a.prediction_date).getTime();
      } else if (sortBy === 'severity') {
        const severityOrder = { low: 1, moderate: 2, high: 3, extreme: 4 };
        const severityA = severityOrder[a.severity_level as keyof typeof severityOrder];
        const severityB = severityOrder[b.severity_level as keyof typeof severityOrder];
        
        return sortOrder === 'asc' ? severityA - severityB : severityB - severityA;
      }
      return 0;
    });

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
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-science-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Drought Predictions</h1>
          <p className="text-xl text-science-100 max-w-3xl">
            Access the latest drought forecasts, analyses, and projections based on our advanced predictive models and research.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search predictions..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-science-500 focus:border-science-500"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-science-500 focus:border-science-500 appearance-none bg-white"
                  value={selectedSeverity}
                  onChange={(e) => handleSeverityFilter(e.target.value)}
                >
                  <option value="all">All Severities</option>
                  <option value="low">Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                  <option value="extreme">Extreme</option>
                </select>
              </div>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ArrowUpDown className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-science-500 focus:border-science-500 appearance-none bg-white"
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [newSortBy, newSortOrder] = e.target.value.split('-');
                    setSortBy(newSortBy);
                    setSortOrder(newSortOrder as 'asc' | 'desc');
                  }}
                >
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="severity-desc">Highest Severity</option>
                  <option value="severity-asc">Lowest Severity</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Predictions Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 h-64">
                <div className="skeleton h-6 w-3/4 mb-4"></div>
                <div className="skeleton h-4 w-1/4 mb-6"></div>
                <div className="skeleton h-4 w-full mb-3"></div>
                <div className="skeleton h-4 w-full mb-3"></div>
                <div className="skeleton h-4 w-2/3 mb-6"></div>
                <div className="skeleton h-10 w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {filteredPredictions.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredPredictions.map((prediction) => (
                  <motion.div key={prediction._id} variants={itemVariants}>
                    <PredictionCard prediction={prediction} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-700 mb-4">No predictions found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedSeverity('all');
                  }}
                  className="btn btn-primary"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PredictionsPage;