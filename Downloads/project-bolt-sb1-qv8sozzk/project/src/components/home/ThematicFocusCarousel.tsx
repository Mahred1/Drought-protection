import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Droplet, BarChart2, Cloud, Thermometer } from 'lucide-react';

interface ThematicFocus {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const thematicFocusItems: ThematicFocus[] = [
  {
    id: '1',
    title: 'Climate Patterns',
    description: 'Analyzing long-term climate patterns and their impact on drought conditions across different geographical regions.',
    icon: <Cloud className="h-12 w-12" />,
    color: 'bg-blue-50 text-blue-600',
  },
  {
    id: '2',
    title: 'Soil Analysis',
    description: 'Comprehensive soil moisture analysis using satellite and ground sensors to track drought development indicators.',
    icon: <Droplet className="h-12 w-12" />,
    color: 'bg-earth-50 text-earth-600',
  },
  {
    id: '3',
    title: 'Historical Data',
    description: 'Leveraging decades of climate records to identify patterns and improve prediction accuracy for drought conditions.',
    icon: <BarChart2 className="h-12 w-12" />,
    color: 'bg-purple-50 text-purple-600',
  },
  {
    id: '4',
    title: 'Temperature Analysis',
    description: 'Studying temperature anomalies and their correlation with precipitation patterns and drought severity.',
    icon: <Thermometer className="h-12 w-12" />,
    color: 'bg-red-50 text-red-600',
  }
];

const ThematicFocusCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  
  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev === thematicFocusItems.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? thematicFocusItems.length - 1 : prev - 1));
  };

  // Auto rotate
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [current]);

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };

  return (
    <div className="relative">
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-full bg-gray-100 p-1">
          {thematicFocusItems.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > current ? 1 : -1);
                setCurrent(index);
              }}
              className={`rounded-full w-3 h-3 mx-1 ${
                current === index ? 'bg-science-600' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden h-80">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="absolute w-full h-full"
          >
            <div className="flex flex-col md:flex-row items-center justify-center h-full px-4">
              <div className={`rounded-full p-8 mb-6 md:mb-0 md:mr-8 ${thematicFocusItems[current].color}`}>
                {thematicFocusItems[current].icon}
              </div>
              <div className="text-center md:text-left max-w-md">
                <h3 className="text-2xl font-bold mb-4">{thematicFocusItems[current].title}</h3>
                <p className="text-gray-700 text-lg">{thematicFocusItems[current].description}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 z-10"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-gray-800" />
      </button>
      
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 z-10"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-gray-800" />
      </button>
    </div>
  );
};

export default ThematicFocusCarousel;