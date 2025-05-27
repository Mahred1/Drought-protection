import React from 'react';
import { motion } from 'framer-motion';

const ResearchSpotlight: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="order-2 md:order-1"
      >
        <h3 className="text-2xl font-bold mb-4 text-science-800">Satellite-Based Early Warning System</h3>
        <p className="text-gray-700 mb-4">
          Our team has developed a groundbreaking early warning system that combines satellite imagery, 
          ground sensor data, and advanced machine learning algorithms to detect drought conditions up to 
          three months before conventional methods.
        </p>
        <p className="text-gray-700 mb-6">
          This research has shown 83% accuracy in predicting the onset of drought conditions and has been 
          successfully deployed in four major agricultural regions, helping farmers and water management 
          authorities implement timely mitigation strategies.
        </p>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Key Findings:</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Soil moisture anomalies detected 60-90 days before visible drought effects</li>
            <li>Integration of thermal data improves prediction accuracy by 27%</li>
            <li>Custom vegetation indices outperform standard NDVI for early detection</li>
            <li>Successfully forecasted 2023 drought conditions in Central Valley</li>
          </ul>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="order-1 md:order-2"
      >
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img 
            src="https://images.pexels.com/photos/4340548/pexels-photo-4340548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Satellite monitoring drought conditions" 
            className="w-full h-auto"
          />
          <div className="p-4 bg-white">
            <p className="text-sm text-gray-500">
              Visualization of drought prediction algorithm analyzing satellite imagery over California's Central Valley region
            </p>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="order-4 md:order-3"
      >
        <div className="rounded-lg overflow-hidden shadow-lg">
          <img 
            src="https://images.pexels.com/photos/8471831/pexels-photo-8471831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Field sensors for drought monitoring" 
            className="w-full h-auto"
          />
          <div className="p-4 bg-white">
            <p className="text-sm text-gray-500">
              Researchers installing advanced soil moisture sensors as part of the Early Detection Network
            </p>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="order-3 md:order-4"
      >
        <h3 className="text-2xl font-bold mb-4 text-alert-800">Historical Drought Pattern Analysis</h3>
        <p className="text-gray-700 mb-4">
          By analyzing over 150 years of climate data, our research team has identified cyclical patterns 
          in drought occurrence that correlate with specific oceanic and atmospheric conditions.
        </p>
        <p className="text-gray-700 mb-6">
          This long-term historical perspective has allowed us to develop more accurate predictive models 
          that account for climate change effects while recognizing natural variability in the Earth's 
          climate system.
        </p>
        <div className="bg-alert-50 p-4 rounded-lg">
          <div className="h-40 bg-white rounded p-2 mb-2 overflow-hidden">
            {/* This would be a chart in the real application */}
            <div className="h-full w-full bg-gradient-to-r from-blue-50 to-blue-100 rounded flex items-center justify-center">
              <p className="text-gray-400 text-center text-sm">Interactive drought timeline visualization would appear here</p>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            Interactive visualization of drought patterns from 1870-2023, with projections for 2024-2030 based on our predictive models
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ResearchSpotlight;