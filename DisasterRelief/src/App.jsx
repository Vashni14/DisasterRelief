import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import RoleSelection from './components/RoleSelection';
import UserLogin from './components/UserLogin';
import UserSignup from './components/UserSignup';
import AdminLogin from './components/AdminLogin';
import SuperAdminLogin from './components/SuperAdminLogin'; // Add this import
import Dashboard from './pages/Dashboard';
import SOSPage from './pages/SOSPage';
import MapView from './pages/MapView';
import RoadReports from './pages/RoadReports';
import Shelters from './pages/Shelters';
import AdminDashboard from './pages/AdminDashboard';
import SuperAdminDashboard from './pages/SuperAdminDashboard'; // Add this import
import ChatBot from './pages/ChatBot';
import Profile from './pages/Profile';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App bg-gray-900 min-h-screen text-gray-100">
        {user && user.role !== 'guest' && <Navbar user={user} onLogout={handleLogout} />}
        
        <Routes>
          {/* Role selection always default */}
          <Route path="/" element={<RoleSelection />} />

          {/* User Routes */}
          <Route 
            path="/user-login" 
            element={user && user.role === 'user' ? <Navigate to="/dashboard" /> : <UserLogin onLogin={handleLogin} />} 
          />
          <Route 
            path="/user-signup" 
            element={user && user.role === 'user' ? <Navigate to="/dashboard" /> : <UserSignup onLogin={handleLogin} />} 
          />

          {/* Admin Routes */}
          <Route 
            path="/admin-login" 
            element={user && user.role === 'department_admin' ? <Navigate to="/admin-dashboard" /> : <AdminLogin onLogin={handleLogin} />} 
          />

          {/* Super Admin Routes */}
          <Route 
            path="/superadmin-login" 
            element={user && user.role === 'super_admin' ? <Navigate to="/superadmin-dashboard" /> : <SuperAdminLogin onLogin={handleLogin} />} 
          />

          {/* Protected User Pages */}
          <Route 
            path="/dashboard" 
            element={user && user.role === 'user' ? <Dashboard user={user} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/profile" 
            element={user && user.role === 'user' ? <Profile user={user} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/sos" 
            element={user && user.role === 'user' ? <SOSPage user={user} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/map" 
            element={user && user.role === 'user' ? <MapView user={user} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/roads" 
            element={user && user.role === 'user' ? <RoadReports user={user} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/shelters" 
            element={user && user.role === 'user' ? <Shelters user={user} /> : <Navigate to="/" />} 
          />

          {/* Protected Admin Pages */}
          <Route 
            path="/admin-dashboard" 
            element={user && user.role === 'department_admin' ? <AdminDashboard user={user} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/superadmin-dashboard" 
            element={user && user.role === 'super_admin' ? <SuperAdminDashboard user={user} /> : <Navigate to="/" />} 
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {user && user.role === 'user' && <ChatBot />}
      </div>
    </Router>
  );
}

export default App;