import axios from 'axios';
import { PredictionData, NewsArticle, Event, Researcher, QueryParams, PaginatedResponse } from '../types';

// For development/mock purposes
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Configure axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth services
export const login = async (email: string, password: string) => {
  // Mock login for development
  if (email === 'admin@droughtwatch.org' && password === 'admin123') {
    const mockResponse = {
      token: 'mock-jwt-token',
      user: {
        _id: '1',
        name: 'Admin User',
        email: 'admin@droughtwatch.org',
        role: 'admin'
      }
    };
    return mockResponse;
  }
  
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

// Predictions
export const getPredictions = async (params?: QueryParams): Promise<PredictionData[]> => {
  // Mock data for development
  const mockPredictions: PredictionData[] = [
    {
      _id: '1',
      title: '2024 Summer Projection: Central Valley',
      content: 'Central Valley water reserves expected to drop below 40% capacity by August based on current usage patterns. Agricultural impact expected to be significant if conservation measures are not implemented immediately.',
      prediction_date: '2024-05-15',
      severity_level: 'high',
      geospatial_data: null,
      attachments: [],
      createdAt: '2024-05-15T10:30:00Z',
      updatedAt: '2024-05-15T10:30:00Z'
    },
    {
      _id: '2',
      title: 'Southwest Region: Monsoon Season Outlook',
      content: 'Monsoon precipitation expected to be 20-30% below average this year, extending drought conditions in Arizona and New Mexico. Municipal water restrictions likely to be necessary by mid-summer.',
      prediction_date: '2024-04-30',
      severity_level: 'moderate',
      geospatial_data: null,
      attachments: [],
      createdAt: '2024-04-30T09:15:00Z',
      updatedAt: '2024-04-30T09:15:00Z'
    },
    {
      _id: '3',
      title: 'Great Plains Soil Moisture Analysis',
      content: 'Soil moisture levels in the Northern Great Plains show concerning trends that may impact crop yields. Early intervention with modified irrigation schedules recommended for affected counties.',
      prediction_date: '2024-05-05',
      severity_level: 'low',
      geospatial_data: null,
      attachments: [],
      createdAt: '2024-05-05T14:45:00Z',
      updatedAt: '2024-05-05T14:45:00Z'
    }
  ];
  
  return mockPredictions;
  
  // Uncomment when backend is available
  /*
  try {
    const response = await api.get('/predictions', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching predictions:', error);
    throw error;
  }
  */
};

export const getPredictionById = async (id: string): Promise<PredictionData> => {
  // Mock data for development
  const mockPrediction: PredictionData = {
    _id: id,
    title: '2024 Summer Projection: Central Valley',
    content: 'Central Valley water reserves expected to drop below 40% capacity by August based on current usage patterns. Agricultural impact expected to be significant if conservation measures are not implemented immediately.\n\nKey findings include:\n\n- Snowpack in Sierra Nevada mountains is 65% of normal levels\n- Reservoir levels are currently at 58% capacity compared to 72% this time last year\n- Groundwater depletion continues at an accelerated rate\n- Municipal water usage has increased 12% year-over-year\n\nRecommendations include immediate water conservation measures, adjusted agricultural planning, and contingency preparations for potential water shortages in late summer months.',
    prediction_date: '2024-05-15',
    severity_level: 'high',
    geospatial_data: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [[[-119.5, 36.5], [-119.5, 38.5], [-121.5, 38.5], [-121.5, 36.5], [-119.5, 36.5]]]
          },
          properties: {
            name: 'Central Valley',
            severity: 'high'
          }
        }
      ]
    },
    attachments: [
      'central_valley_forecast_2024.pdf',
      'water_reserve_analysis.xlsx'
    ],
    createdAt: '2024-05-15T10:30:00Z',
    updatedAt: '2024-05-15T10:30:00Z'
  };
  
  return mockPrediction;
  
  // Uncomment when backend is available
  /*
  try {
    const response = await api.get(`/predictions/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching prediction ${id}:`, error);
    throw error;
  }
  */
};

export const createPrediction = async (prediction: Partial<PredictionData>): Promise<PredictionData> => {
  try {
    const response = await api.post('/predictions', prediction);
    return response.data;
  } catch (error) {
    console.error('Error creating prediction:', error);
    throw error;
  }
};

export const updatePrediction = async (id: string, prediction: Partial<PredictionData>): Promise<PredictionData> => {
  try {
    const response = await api.put(`/predictions/${id}`, prediction);
    return response.data;
  } catch (error) {
    console.error(`Error updating prediction ${id}:`, error);
    throw error;
  }
};

export const deletePrediction = async (id: string): Promise<void> => {
  try {
    await api.delete(`/predictions/${id}`);
  } catch (error) {
    console.error(`Error deleting prediction ${id}:`, error);
    throw error;
  }
};

// Similar functions for News, Events, Researchers, etc.
export const getNews = async (params?: QueryParams): Promise<NewsArticle[]> => {
  // Mock data implementation - replace with API call when backend is ready
  const mockNews: NewsArticle[] = [
    {
      _id: '1',
      headline: 'New Satellite Data Enhances Drought Prediction Accuracy',
      excerpt: 'Advanced satellite technology is revolutionizing how we predict and monitor drought conditions.',
      content: 'Full article content here...',
      publish_date: '2024-05-10',
      featured_image: 'https://images.pexels.com/photos/60013/desert-drought-dehydrated-clay-soil-60013.jpeg',
      createdAt: '2024-05-10T08:00:00Z',
      updatedAt: '2024-05-10T08:00:00Z'
    },
    {
      _id: '2',
      headline: 'Research Team Receives $2.5M Grant for Drought Studies',
      excerpt: 'Major funding will support innovative approaches to drought prediction and mitigation strategies.',
      content: 'Full article content here...',
      publish_date: '2024-05-03',
      featured_image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg',
      createdAt: '2024-05-03T09:30:00Z',
      updatedAt: '2024-05-03T09:30:00Z'
    }
  ];
  
  return mockNews;
};

// Mock implementations for other API functions
// Replace with actual API calls when backend is ready

export default api;