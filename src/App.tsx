import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import './index.css';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="bg-gray-900 min-h-screen font-sans antialiased selection:bg-emerald-500 selection:text-white">
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;