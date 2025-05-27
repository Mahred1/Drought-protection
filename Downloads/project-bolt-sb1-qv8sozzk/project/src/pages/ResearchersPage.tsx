import React from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Filter, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResearchersPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-science-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Our Researchers</h1>
          <p className="text-xl text-science-100 max-w-3xl">
            Meet the dedicated team of scientists and researchers working to advance drought prediction and mitigation strategies.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search researchers..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-science-500 focus:border-science-500"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-science-500 focus:border-science-500 appearance-none bg-white"
              >
                <option value="all">All Specializations</option>
                <option value="climate">Climate Science</option>
                <option value="hydrology">Hydrology</option>
                <option value="meteorology">Meteorology</option>
                <option value="data">Data Science</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Placeholder researchers */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="aspect-w-3 aspect-h-2">
                <img
                  src={`https://images.pexels.com/photos/${1000000 + i}/pexels-photo-${1000000 + i}.jpeg`}
                  alt="Researcher"
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Dr. Jane Smith</h3>
                <p className="text-gray-600 mb-4">Senior Climate Scientist</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-science-100 text-science-800 rounded-full text-sm">Climate Modeling</span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">Data Analysis</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Hydrology</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-gray-600">
                    <p className="text-sm">Publications: 45</p>
                    <p className="text-sm">Years: 12</p>
                  </div>
                  <Link to="#" className="text-science-600 hover:text-science-700 flex items-center">
                    View Profile
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResearchersPage;