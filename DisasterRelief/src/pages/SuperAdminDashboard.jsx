import React, { useState, useEffect } from 'react';

const SuperAdminDashboard = ({ user, onLogout }) => {
  const [sosAlerts, setSosAlerts] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
    byDepartment: {}
  });
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');

  // Dummy data for demonstration
  const dummyAlerts = [
    {
      id: '1',
      department: 'emergency_response',
      category: 'Fire',
      location: 'Downtown Area',
      description: 'Major building fire reported',
      status: 'pending',
      createdAt: new Date(Date.now() - 30 * 60000), // 30 minutes ago
      priority: 'high'
    },
    {
      id: '2',
      department: 'medical_health',
      category: 'Injuries',
      location: 'Central Park',
      description: 'Multiple injuries from accident',
      status: 'acknowledged',
      createdAt: new Date(Date.now() - 15 * 60000), // 15 minutes ago
      priority: 'high'
    },
    {
      id: '3',
      department: 'infrastructure_utilities',
      category: 'Power Outage',
      location: 'North District',
      description: 'Large area without electricity',
      status: 'resolved',
      createdAt: new Date(Date.now() - 120 * 60000), // 2 hours ago
      priority: 'medium'
    },
    {
      id: '4',
      department: 'environment_hazards',
      category: 'Floods',
      location: 'Riverside Area',
      description: 'Flash floods reported',
      status: 'pending',
      createdAt: new Date(Date.now() - 45 * 60000), // 45 minutes ago
      priority: 'critical'
    }
  ];

  useEffect(() => {
    // For now, use dummy data instead of Firestore
    setSosAlerts(dummyAlerts);
    calculateStats(dummyAlerts);
    
    // Uncomment when Firestore is set up:
    /*
    const q = query(collection(db, 'sosAlerts'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const alerts = [];
      snapshot.forEach((doc) => {
        alerts.push({ id: doc.id, ...doc.data() });
      });
      setSosAlerts(alerts);
      calculateStats(alerts);
    });
    return () => unsubscribe();
    */
  }, []);

  const calculateStats = (alerts) => {
    const stats = {
      total: alerts.length,
      pending: alerts.filter(a => a.status === 'pending').length,
      resolved: alerts.filter(a => a.status === 'resolved').length,
      acknowledged: alerts.filter(a => a.status === 'acknowledged').length,
      byDepartment: {}
    };

    Object.keys(SOS_CATEGORIES).forEach(dept => {
      stats.byDepartment[dept] = alerts.filter(a => a.department === dept).length;
    });

    setStats(stats);
  };

  const updateAlertStatus = async (alertId, status) => {
    try {
      // For demo purposes, update local state
      setSosAlerts(prev => prev.map(alert => 
        alert.id === alertId ? { ...alert, status } : alert
      ));
      
      // Uncomment when Firestore is set up:
      // await updateDoc(doc(db, 'sosAlerts', alertId), {
      //   status,
      //   resolvedAt: status === 'resolved' ? new Date() : null,
      //   resolvedBy: user.email
      // });
    } catch (error) {
      console.error('Error updating alert:', error);
    }
  };

  const filteredAlerts = selectedDepartment === 'all' 
    ? sosAlerts 
    : sosAlerts.filter(alert => alert.department === selectedDepartment);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'acknowledged': return 'bg-blue-500';
      case 'resolved': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">🚨 Emergency Response Command Center</h1>
              <p className="text-gray-400 mt-1">Super Admin Dashboard • {user.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                Super Administrator
              </span>
              <button
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-medium transition duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {['overview', 'alerts', 'departments', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition duration-300 ${
                  activeTab === tab
                    ? 'border-red-500 text-red-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <>
            {/* Statistics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-500 rounded-lg">
                    <span className="text-2xl">📊</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-300">Total Alerts</h3>
                    <p className="text-3xl font-bold text-white">{stats.total}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="p-3 bg-yellow-500 rounded-lg">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-300">Pending</h3>
                    <p className="text-3xl font-bold text-white">{stats.pending}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-500 rounded-lg">
                    <span className="text-2xl">👁️</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-300">Acknowledged</h3>
                    <p className="text-3xl font-bold text-white">{stats.acknowledged}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="flex items-center">
                  <div className="p-3 bg-green-500 rounded-lg">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-300">Resolved</h3>
                    <p className="text-3xl font-bold text-white">{stats.resolved}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Department Statistics */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Department Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {Object.entries(SOS_CATEGORIES).map(([key, category]) => (
                  <div key={key} className="bg-gray-800 p-4 rounded-lg text-center hover:bg-gray-750 transition duration-300">
                    <div className="text-3xl mb-2">
                      {key === 'emergency_response' && '🚒'}
                      {key === 'medical_health' && '🏥'}
                      {key === 'infrastructure_utilities' && '🏗️'}
                      {key === 'relief_shelter' && '🏠'}
                      {key === 'environment_hazards' && '🌪️'}
                      {key === 'community_support' && '👥'}
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{category.name}</h4>
                    <p className="text-2xl font-bold text-blue-400">{stats.byDepartment[key] || 0}</p>
                    <p className="text-xs text-gray-400 mt-1">Active Alerts</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Critical Alerts */}
            <div className="bg-gray-800 rounded-lg shadow-lg">
              <div className="px-6 py-4 border-b border-gray-700">
                <h2 className="text-xl font-semibold">Recent Critical Alerts</h2>
              </div>
              <div className="p-6">
                {sosAlerts.filter(alert => alert.priority === 'critical' || alert.priority === 'high').length > 0 ? (
                  <div className="space-y-4">
                    {sosAlerts.filter(alert => alert.priority === 'critical' || alert.priority === 'high').map((alert) => (
                      <div key={alert.id} className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <div>
                          <div className="flex items-center space-x-3">
                            <span className={`w-3 h-3 rounded-full ${getPriorityColor(alert.priority)}`}></span>
                            <span className="font-semibold">{SOS_CATEGORIES[alert.department]?.name}</span>
                            <span className="text-gray-400">•</span>
                            <span>{alert.category}</span>
                          </div>
                          <p className="text-sm text-gray-300 mt-1">{alert.location} • {alert.description}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                          {alert.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-8">No critical alerts at the moment</p>
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === 'alerts' && (
          <div className="bg-gray-800 rounded-lg shadow-lg">
            <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-semibold">All SOS Alerts</h2>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm"
              >
                <option value="all">All Departments</option>
                {Object.entries(SOS_CATEGORIES).map(([key, category]) => (
                  <option key={key} value={key}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredAlerts.map((alert) => (
                    <tr key={alert.id} className="hover:bg-gray-750 transition duration-300">
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {alert.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="mr-2">
                            {alert.department === 'emergency_response' && '🚒'}
                            {alert.department === 'medical_health' && '🏥'}
                            {alert.department === 'infrastructure_utilities' && '🏗️'}
                            {alert.department === 'relief_shelter' && '🏠'}
                            {alert.department === 'environment_hazards' && '🌪️'}
                            {alert.department === 'community_support' && '👥'}
                          </span>
                          {SOS_CATEGORIES[alert.department]?.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{alert.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{alert.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(alert.priority)}`}>
                          {alert.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                          {alert.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap space-x-2">
                        {alert.status !== 'resolved' && (
                          <>
                            <button
                              onClick={() => updateAlertStatus(alert.id, 'acknowledged')}
                              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs"
                            >
                              Ack
                            </button>
                            <button
                              onClick={() => updateAlertStatus(alert.id, 'resolved')}
                              className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-xs"
                            >
                              Resolve
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'departments' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(SOS_CATEGORIES).map(([key, category]) => (
              <div key={key} className="bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                  <span className="text-2xl">
                    {key === 'emergency_response' && '🚒'}
                    {key === 'medical_health' && '🏥'}
                    {key === 'infrastructure_utilities' && '🏗️'}
                    {key === 'relief_shelter' && '🏠'}
                    {key === 'environment_hazards' && '🌪️'}
                    {key === 'community_support' && '👥'}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Active Alerts:</span>
                    <span className="font-semibold">{stats.byDepartment[key] || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Response Time:</span>
                    <span className="font-semibold text-green-400">~15min</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Success Rate:</span>
                    <span className="font-semibold text-green-400">94%</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-gray-700 hover:bg-gray-600 py-2 rounded text-sm transition duration-300">
                  Manage Department
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">System Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border border-gray-700 rounded-lg">
                <h3 className="font-semibold mb-3">Alert Trends</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Today:</span>
                    <span className="text-blue-400">12 alerts</span>
                  </div>
                  <div className="flex justify-between">
                    <span>This Week:</span>
                    <span className="text-blue-400">84 alerts</span>
                  </div>
                  <div className="flex justify-between">
                    <span>This Month:</span>
                    <span className="text-blue-400">312 alerts</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border border-gray-700 rounded-lg">
                <h3 className="font-semibold mb-3">Performance Metrics</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Avg Response Time:</span>
                    <span className="text-green-400">8.2min</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Resolution Rate:</span>
                    <span className="text-green-400">96.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>User Satisfaction:</span>
                    <span className="text-green-400">4.8/5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdminDashboard;