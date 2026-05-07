import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';

// Public Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VerifyEmailPage from './pages/VerifyEmailPage';

// Protected Pages
import DashboardPage from './pages/DashboardPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import TopicDetailPage from './pages/TopicDetailPage';
import MaterialsPage from './pages/MaterialsPage';
import TestPage from './pages/TestPage';
import TestResultPage from './pages/TestResultPage';
import MyResultsPage from './pages/MyResultsPage';
import GlossaryPage from './pages/GlossaryPage';
import ReferencesPage from './pages/ReferencesPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <SpeedInsights />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />

          {/* Protected Dashboard Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <DashboardPage />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/courses" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CoursesPage />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/courses/:slug" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <CourseDetailPage />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/topics/:id" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <TopicDetailPage />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/topics/:id/materials" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <MaterialsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/topics/:id/test" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <TestPage />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/results" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <MyResultsPage />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/test-result" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <TestResultPage />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/glossary" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <GlossaryPage />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/references" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ReferencesPage />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <ProfilePage />
                </DashboardLayout>
              </ProtectedRoute>
            } 
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
