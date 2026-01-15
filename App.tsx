import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from './lib/supabase';
import { Crown } from 'lucide-react';
import Header from './components/Header';
import PredictorCard from './components/PredictorCard';
import { AppStatus } from './types';
import clsx from 'clsx';

import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import UpdatePassword from './components/UpdatePassword';
import Profile from './components/Profile';
import VIP from './components/VIP';
import AboutUs from './components/AboutUs';
import { useLanguage } from './context/LanguageContext';
import { useTheme } from './context/ThemeContext';
import useSound from './hooks/useSound';
import Notifications from './components/Notifications';
import VipAccessModal from './components/VipAccessModal';

// Admin Imports
import AdminRoute from './components/AdminRoute';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import UserList from './components/admin/UserList';
import Payments from './components/admin/Payments';
import VipManager from './components/admin/VipManager';
import Predictions from './components/admin/Predictions';

import MobileV2Layout from './components/mobile_v2/MobileV2Layout';

// Internal component to handle Router context
const AppContent: React.FC = () => {
  return (
    <Routes>
      {/* Admin Routes */}
      <Route path="/admin" element={
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      }>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<UserList />} />
        <Route path="vip" element={<VipManager />} />
        <Route path="payments" element={<Payments />} />
        <Route path="predictions" element={<Predictions />} />
      </Route>

      {/* Main App (Mobile V2 Layout for all users) */}
      <Route path="*" element={<MobileV2Layout />} />
    </Routes>
  );
}

const App: React.FC = () => {
  // Mobile V2 is now the default for all layouts
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;