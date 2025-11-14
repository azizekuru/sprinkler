import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import AuthForm from "../components/auth/AuthForm";
import Communities from "../pages/Communities/Communities";
import MapPage from "../pages/Map/MapPage";
import Profile from "../pages/Profile/Profile";
import Announcements from "../pages/Announcements/Announcements";
import VerifyEmail from "../components/auth/VerifyEmail";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import { useAuth } from "../contexts/AuthContext";

const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      
      {/* Auth Routes - Giriş yaptıysa communities'e yönlendir */}
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/communities" replace /> : <AuthForm />} 
      />
      <Route 
        path="/register" 
        element={isAuthenticated ? <Navigate to="/communities" replace /> : <AuthForm />} 
      />
      <Route path="/verify-email" element={<VerifyEmail />} />

      {/* Protected Routes */}
      <Route 
        path="/map" 
        element={
          <ProtectedRoute>
            <MapPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/communities" 
        element={
          <ProtectedRoute>
            <Communities />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/announcements" 
        element={
          <ProtectedRoute>
            <Announcements />
          </ProtectedRoute>
        } 
      />

      {/* Not Found */}
      <Route path="*" element={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">Sayfa Bulunamadı</p>
            <a href="/" className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
              Ana Sayfaya Dön
            </a>
          </div>
        </div>
      } />
    </Routes>
  );
};

export default AppRouter;