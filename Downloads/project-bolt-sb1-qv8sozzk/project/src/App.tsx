import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import PredictionsPage from './pages/PredictionsPage';
import PredictionDetailPage from './pages/PredictionDetailPage';
import ResearchersPage from './pages/ResearchersPage';
import NewsPage from './pages/NewsPage';
import EventsPage from './pages/EventsPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="predictions" element={<PredictionsPage />} />
        <Route path="predictions/:id" element={<PredictionDetailPage />} />
        <Route path="researchers" element={<ResearchersPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="events" element={<EventsPage />} />
        <Route path="admin/login" element={<AdminLogin />} />
        <Route 
          path="admin/*" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Route>
    </Routes>
  );
}

export default App;