import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../modules/auth/Login';
import PlayerList from '../modules/players/PlayerList';
import Leaderboard from '../modules/awards/Leaderboard';
import MatchDashboard from '../modules/match/MatchDashboard';
import Ledger from '../modules/finance/Ledger';
import ProtectedRoute from './ProtectedRoute';
import DashboardLayout from '../components/DashboardLayout'; 
import Register from '../modules/auth/Register';

const Unauthorized: React.FC = () => (
  <div className="p-8 text-center text-red-400 bg-gray-900 min-h-screen flex flex-col justify-center items-center">
    <h1 className="text-3xl font-extrabold tracking-tight">403 - Unauthorized Access</h1>
    <p className="text-sm mt-2 text-gray-450 max-w-md">
      Your current authenticated role assignment does not possess security clearance for this management zone.
    </p>
  </div>
);

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Unprotected Base Paths */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected Routes encapsulated cleanly within our App Dashboard Frame Wrapper Layout */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['ADMIN', 'COACH', 'PLAYER', 'PARENT']}>
            <DashboardLayout><PlayerList /></DashboardLayout>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/analytics" 
        element={
          <ProtectedRoute allowedRoles={['ADMIN', 'COACH']}>
            <DashboardLayout><Leaderboard /></DashboardLayout>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/matches" 
        element={
          <ProtectedRoute allowedRoles={['ADMIN', 'COACH', 'PLAYER']}>
            <DashboardLayout><MatchDashboard /></DashboardLayout>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/finance" 
        element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <DashboardLayout><Ledger /></DashboardLayout>
          </ProtectedRoute>
        } 
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;




