import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getRoleBadge = () => {
    const badges = {
      'super_admin': { text: 'Super Admin', color: 'bg-red-500' },
      'department_admin': { text: 'Admin', color: 'bg-green-500' },
      'user': { text: 'User', color: 'bg-blue-500' }
    };
    
    const badge = badges[user.role] || badges.user;
    return (
      <span className={`${badge.color} text-white px-2 py-1 rounded text-xs font-medium`}>
        {badge.text}
      </span>
    );
  };

  const getUserDisplayName = () => {
    return user.name || user.email?.split('@')[0] || 'User';
  };

  const getUserInitials = () => {
    const name = getUserDisplayName();
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  // Navigation links based on user role
  const getNavigationLinks = () => {
    const links = {
      user: [
        { path: '/dashboard', label: 'Dashboard', icon: '📊' },
        { path: '/sos', label: 'SOS Alert', icon: '🚨' },
        { path: '/map', label: 'Map', icon: '🗺️' },
        { path: '/roads', label: 'Roads', icon: '🛣️' },
        { path: '/shelters', label: 'Shelters', icon: '🏠' },
        { path: '/profile', label: 'Profile', icon: '👤' }
      ],
      department_admin: [
        { path: '/admin-dashboard', label: 'Admin Dashboard', icon: '⚙️' }
      ],
      super_admin: [
        { path: '/superadmin-dashboard', label: 'Super Admin', icon: '👑' }
      ]
    };

    return links[user.role] || [];
  };

  const handleLogout = () => {
    onLogout();
    setIsMenuOpen(false);
    navigate('/');
  };

  const navigationLinks = getNavigationLinks();

  const getRoleBanner = () => {
    const banners = {
      'super_admin': {
        color: 'bg-gradient-to-r from-red-600 to-red-700',
        text: '⚡ SUPER ADMINISTRATOR MODE - Full System Access'
      },
      'department_admin': {
        color: 'bg-gradient-to-r from-green-600 to-green-700',
        text: `🛡️ ADMIN MODE - ${user.department?.replace(/_/g, ' ').toUpperCase()}`
      }
    };
    
    return banners[user.role];
  };

  const roleBanner = getRoleBanner();

  return (
    <>
      {/* Role Banner */}
      {roleBanner && (
        <div className={`${roleBanner.color} text-white text-center py-2`}>
          <div className="max-w-7xl mx-auto px-4">
            <span className="text-sm font-medium">{roleBanner.text}</span>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link 
                to={navigationLinks[0]?.path || '/'} 
                className="flex items-center space-x-3"
              >
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🚨</span>
                </div>
                <div>
                  <span className="text-white text-xl font-bold">Emergency</span>
                  <span className="text-red-400 text-xl font-bold">Response</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            {navigationLinks.length > 0 && (
              <div className="hidden md:flex items-center space-x-1">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                      location.pathname === link.path
                        ? 'bg-gray-700 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <span className="text-base">{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            )}

            {/* User Section - Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-3 bg-gray-700 rounded-lg px-3 py-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {getUserInitials()}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white font-medium truncate max-w-[120px]">
                      {getUserDisplayName()}
                    </div>
                    {getRoleBadge()}
                  </div>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm text-white font-medium transition duration-200 flex items-center space-x-2"
                  title="Logout"
                >
                  <span>🚪</span>
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white p-2 rounded-lg bg-gray-700"
              >
                {isMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-700 bg-gray-800">
            <div className="px-4 py-3 space-y-2">
              {/* Mobile Navigation Links */}
              {navigationLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-lg text-base font-medium flex items-center space-x-3 ${
                    location.pathname === link.path
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}

              {/* Mobile User Info */}
              <div className="border-t border-gray-700 pt-3 mt-3">
                <div className="px-4 py-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {getUserInitials()}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-white font-medium">{getUserDisplayName()}</div>
                      <div className="text-xs text-gray-400">{user.email}</div>
                    </div>
                    {getRoleBadge()}
                  </div>
                  
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm text-white font-medium transition duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>🚪</span>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;