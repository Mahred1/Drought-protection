import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const EventsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-science-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Upcoming Events</h1>
          <p className="text-xl text-science-100 max-w-3xl">
            Join us at conferences, workshops, and seminars focused on drought research and climate science.
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
              placeholder="Search events..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-science-500 focus:border-science-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured Event */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img
                  className="h-48 w-full md:w-64 object-cover"
                  src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg"
                  alt="Featured event"
                />
              </div>
              <div className="p-8">
                <div className="inline-block bg-science-100 text-science-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  Featured Event
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  2024 International Drought Conference
                </h2>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>June 15-17, 2024</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>500+ Attendees Expected</span>
                  </div>
                </div>
                <Link to="#" className="btn btn-primary inline-flex items-center">
                  Register Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Events Grid */}
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
                src={`https://images.pexels.com/photos/${3000000 + i}/pexels-photo-${3000000 + i}.jpeg`}
                alt="Event"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Drought Research Workshop {i}
                </h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>April {10 + i}, 2024</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>Virtual Event</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Join us for an interactive workshop focusing on the latest developments in drought prediction technology...
                </p>
                <Link to="#" className="text-science-600 hover:text-science-700 font-medium flex items-center">
                  Learn more
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

export default EventsPage;