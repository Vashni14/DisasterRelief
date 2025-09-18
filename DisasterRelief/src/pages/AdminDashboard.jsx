// components/AdminDashboard.js
import React, { useState } from 'react';

const AdminDashboard = ({ user }) => {
  const [activeTab, setActiveTab] = useState('sos');
  const [sosAlerts, setSosAlerts] = useState([
    { id: 1, user: 'User123', location: 'Mumbai', time: '10 minutes ago', status: 'pending', priority: 'high' },
    { id: 2, user: 'User456', location: 'Delhi', time: '25 minutes ago', status: 'verified', priority: 'medium' },
    { id: 3, user: 'User789', location: 'Chennai', time: '1 hour ago', status: 'resolved', priority: 'low' },
  ]);
  const [userReports, setUserReports] = useState([
    { id: 1, user: 'User123', trustScore: 85, reports: 12, verified: 10 },
    { id: 2, user: 'User456', trustScore: 92, reports: 8, verified: 8 },
    { id: 3, user: 'User789', trustScore: 65, reports: 5, verified: 2 },
  ]);
  const [systemStats, setSystemStats] = useState({
    totalUsers: 1245,
    activeSOS: 24,
    roadReports: 142,
    shelters: 35
  });

  // Check if user is admin, if not redirect (this is a fallback)
  if (user.role !== 'admin') {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-red-900 text-red-200 p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-2">Access Denied</h2>
            <p>You don't have permission to access the admin dashboard.</p>
          </div>
        </div>
      </div>
    );
  }

  const updateSOSStatus = (id, status) => {
    setSosAlerts(sosAlerts.map(alert => 
      alert.id === id ? { ...alert, status } : alert
    ));
  };

  const updateUserTrustScore = (id, change) => {
    setUserReports(userReports.map(user => 
      user.id === id ? { ...user, trustScore: Math.min(100, Math.max(0, user.trustScore + change)) } : user
    ));
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h2 className="text-2xl font-bold text-white mb-6">Admin Dashboard</h2>
        <p className="text-gray-400 mb-6">Welcome, Administrator. Manage system operations and user reports.</p>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 mb-8">
          <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-300 truncate">Total Users</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-white">{systemStats.totalUsers}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-300 truncate">Active SOS</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-white">{systemStats.activeSOS}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-300 truncate">Road Reports</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-white">{systemStats.roadReports}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-300 truncate">Shelters</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-white">{systemStats.shelters}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('sos')}
              className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'sos'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-400 hover:border-gray-400'
              }`}
            >
              SOS Alerts
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-400 hover:border-gray-400'
              }`}
            >
              User Management
            </button>
            <button
              onClick={() => setActiveTab('system')}
              className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'system'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-400 hover:border-gray-400'
              }`}
            >
              System Settings
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'sos' && (
            <div className="bg-gray-800 shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-700">
                {sosAlerts.map((alert) => (
                  <li key={alert.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                            alert.priority === 'high' ? 'bg-red-500' : 
                            alert.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}>
                            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                          </div>
                          <div className="ml-4">
                            <div className="flex items-center">
                              <h3 className="text-sm font-medium text-white">
                                SOS from {alert.user}
                              </h3>
                              <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                alert.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                alert.status === 'verified' ? 'bg-blue-100 text-blue-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-400 mt-1">
                              Location: {alert.location} • {alert.time}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {alert.status !== 'verified' && (
                            <button
                              onClick={() => updateSOSStatus(alert.id, 'verified')}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                              Verify
                            </button>
                          )}
                          {alert.status !== 'resolved' && (
                            <button
                              onClick={() => updateSOSStatus(alert.id, 'resolved')}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              Resolve
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-gray-800 shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-700">
                {userReports.map((user) => (
                  <li key={user.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="relative">
                              <svg className="h-10 w-10" viewBox="0 0 36 36">
                                <path
                                  d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke="#333"
                                  strokeWidth="3"
                                />
                                <path
                                  d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                  fill="none"
                                  stroke="#3B82F6"
                                  strokeWidth="3"
                                  strokeDasharray={`${user.trustScore}, 100`}
                                />
                              </svg>
                              <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
                                {user.trustScore}%
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-sm font-medium text-white">
                              {user.user}
                            </h3>
                            <p className="text-sm text-gray-400 mt-1">
                              {user.reports} reports • {user.verified} verified
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => updateUserTrustScore(user.id, 5)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            +5 Trust
                          </button>
                          <button
                            onClick={() => updateUserTrustScore(user.id, -5)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            -5 Trust
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-white mb-4">System Settings</h3>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300">AI Verification Threshold</label>
                  <div className="mt-1">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      defaultValue="75"
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Low</span>
                      <span>Medium</span>
                      <span>High</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300">Automatic Alert Priority</label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <input
                        id="priority-high"
                        name="priority-level"
                        type="radio"
                        defaultChecked
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600"
                      />
                      <label htmlFor="priority-high" className="ml-3 block text-sm font-medium text-gray-300">
                        High (More alerts)
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="priority-medium"
                        name="priority-level"
                        type="radio"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600"
                      />
                      <label htmlFor="priority-medium" className="ml-3 block text-sm font-medium text-gray-300">
                        Medium (Balanced)
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="priority-low"
                        name="priority-level"
                        type="radio"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600"
                      />
                      <label htmlFor="priority-low" className="ml-3 block text-sm font-medium text-gray-300">
                        Low (Fewer alerts)
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300">Data Retention Period</label>
                  <div className="mt-1">
                    <select className="block w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500">
                      <option>30 days</option>
                      <option>60 days</option>
                      <option>90 days</option>
                      <option>1 year</option>
                      <option>Indefinitely</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <button className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;