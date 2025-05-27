import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Droplet, BarChart2, Globe, Thermometer, ChevronRight, ArrowRight } from 'lucide-react';
import PredictionCard from '../components/predictions/PredictionCard';
import ThematicFocusCarousel from '../components/home/ThematicFocusCarousel';
import ResearchSpotlight from '../components/home/ResearchSpotlight';
import { getPredictions } from '../services/api';
import { PredictionData } from '../types';

const HomePage: React.FC = () => {
  const [latestPredictions, setLatestPredictions] = useState<PredictionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const data = await getPredictions({ limit: 3 });
        setLatestPredictions(data);
      } catch (error) {
        console.error('Error fetching predictions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-science-900 to-science-800 opacity-90">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/60013/desert-drought-dehydrated-clay-soil-60013.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center mix-blend-overlay opacity-60"></div>
        </div>
        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Advanced Drought Prediction Analytics
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Leveraging cutting-edge technology and research to monitor, predict, and mitigate drought conditions worldwide.
            </p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link 
                to="/predictions" 
                className="btn bg-white text-science-900 hover:bg-gray-100 px-6 py-3 rounded-md font-medium text-lg flex items-center justify-center"
              >
                View Latest Predictions
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                to="/researchers" 
                className="btn bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium text-lg flex items-center justify-center"
              >
                Meet Our Researchers
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Latest Predictions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Latest Predictions</h2>
            <Link to="/predictions" className="flex items-center text-science-600 hover:text-science-700 font-medium">
              View all predictions
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
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
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {latestPredictions.length > 0 ? (
                latestPredictions.map((prediction) => (
                  <motion.div key={prediction._id} variants={itemVariants}>
                    <PredictionCard prediction={prediction} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-3 text-center py-8">
                  <p className="text-gray-500">No predictions available yet.</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Thematic Focus */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Thematic Focus Areas</h2>
          <ThematicFocusCarousel />
        </div>
      </section>

      {/* Research Spotlight */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Research Spotlight</h2>
          <ResearchSpotlight />
        </div>
      </section>

      {/* Stats & CTA */}
      <section className="py-16 bg-science-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold mb-2">147+</h3>
              <p className="text-science-200">Regions Monitored</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <BarChart2 className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold mb-2">89%</h3>
              <p className="text-science-200">Prediction Accuracy</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Droplet className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold mb-2">12TB+</h3>
              <p className="text-science-200">Climate Data Analyzed</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Thermometer className="h-8 w-8" />
              </div>
              <h3 className="text-3xl font-bold mb-2">53+</h3>
              <p className="text-science-200">Active Researchers</p>
            </motion.div>
          </div>
          
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Join Our Newsletter</h2>
            <p className="text-science-200 max-w-2xl mx-auto mb-8">
              Get the latest updates on drought research, predictions, and climate insights delivered directly to your inbox.
            </p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-science-500"
              />
              <button 
                type="submit" 
                className="btn bg-alert-500 hover:bg-alert-600 text-white px-6 py-3 rounded-md font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;