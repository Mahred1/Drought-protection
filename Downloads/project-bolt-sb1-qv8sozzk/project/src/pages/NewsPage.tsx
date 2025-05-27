import React from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const NewsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-science-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Latest News</h1>
          <p className="text-xl text-science-100 max-w-3xl">
            Stay updated with the latest developments in drought research, predictions, and climate science.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search news articles..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-science-500 focus:border-science-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured Article */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img
                  className="h-48 w-full md:w-64 object-cover"
                  src="https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg"
                  alt="Featured article"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  March 15, 2024
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Breakthrough in Long-term Drought Prediction Methods
                </h2>
                <p className="text-gray-600 mb-4">
                  New research reveals innovative approaches to predicting drought patterns using advanced machine learning algorithms and satellite data...
                </p>
                <Link to="#" className="text-science-600 hover:text-science-700 font-medium flex items-center">
                  Read full article
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* News Grid */}
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <img
                className="h-48 w-full object-cover"
                src={`https://images.pexels.com/photos/${2000000 + i}/pexels-photo-${2000000 + i}.jpeg`}
                alt="News article"
              />
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar className="h-4 w-4 mr-1" />
                  March {10 + i}, 2024
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Latest Developments in Climate Research
                </h3>
                <p className="text-gray-600 mb-4">
                  Recent findings suggest new patterns in global climate systems that could impact drought predictions...
                </p>
                <Link to="#" className="text-science-600 hover:text-science-700 font-medium flex items-center">
                  Read more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;