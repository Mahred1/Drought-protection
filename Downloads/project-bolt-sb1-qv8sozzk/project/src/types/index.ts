export interface PredictionData {
  _id: string;
  title: string;
  content: string;
  prediction_date: string;
  severity_level: 'low' | 'moderate' | 'high' | 'extreme';
  geospatial_data?: any;
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface NewsArticle {
  _id: string;
  headline: string;
  excerpt: string;
  content: string;
  publish_date: string;
  featured_image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  datetime: string;
  location: string;
  registration_link?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Researcher {
  _id: string;
  name: string;
  title: string;
  bio: string;
  expertise: string[];
  institution: string;
  profile_image: string;
  publications: number;
  email?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ThematicFocus {
  _id: string;
  category: string;
  icon: string;
  detailed_description: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  [key: string]: any;
}