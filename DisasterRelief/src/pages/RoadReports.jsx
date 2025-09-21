// components/RoadReports.js
import React, { useState } from 'react';

const RoadReports = ({ user }) => {
  const [reports, setReports] = useState([
    { id: 1, type: 'blocked', location: 'Mumbai - Andheri East', description: 'Flood water has blocked the entire road', reportedBy: 'User123', time: '2 hours ago', verified: true, verifications: 5, critical: true, myReport: false },
    { id: 2, type: 'clear', location: 'Delhi - Connaught Place', description: 'Road cleared of debris, safe to travel', reportedBy: 'User456', time: '45 minutes ago', verified: true, verifications: 3, critical: false, myReport: false },
    { id: 3, type: 'blocked', location: 'Chennai - Anna Salai', description: 'Fallen trees blocking the road', reportedBy: user.name, time: '30 minutes ago', verified: false, verifications: 1, critical: true, myReport: true },
    { id: 4, type: 'clear', location: 'Bangalore - MG Road', description: 'Road is clear and safe for travel', reportedBy: user.name, time: '15 minutes ago', verified: false, verifications: 0, critical: false, myReport: true },
    { id: 5, type: 'blocked', location: 'Kolkata - Park Street', description: 'Major landslide blocking both lanes', reportedBy: 'User789', time: '1 hour ago', verified: false, verifications: 2, critical: true, myReport: false },
  ]);
  
  const [showReportForm, setShowReportForm] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [newReport, setNewReport] = useState({
    type: 'blocked',
    location: '',
    description: '',
    critical: false
  });

  // Filter reports based on active tab
  const filteredReports = reports.filter(report => {
    switch (activeTab) {
      case 'my-reports':
        return report.myReport;
      case 'verified':
        return report.verified;
      case 'unverified':
        return !report.verified;
      case 'critical':
        return report.critical;
      case 'safe':
        return !report.critical && report.type === 'clear';
      case 'blocked':
        return report.type === 'blocked';
      default:
        return true;
    }
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewReport({
      ...newReport,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmitReport = (e) => {
    e.preventDefault();
    const report = {
      id: reports.length + 1,
      type: newReport.type,
      location: newReport.location,
      description: newReport.description,
      critical: newReport.critical,
      reportedBy: user.name,
      time: 'Just now',
      verified: false,
      verifications: 0,
      myReport: true
    };
    
    setReports([report, ...reports]);
    setNewReport({ type: 'blocked', location: '', description: '', critical: false });
    setShowReportForm(false);
    setActiveTab('my-reports'); // Switch to my reports tab after submission
  };

  const verifyReport = (id) => {
    setReports(reports.map(report => {
      if (report.id === id) {
        return { 
          ...report, 
          verifications: report.verifications + 1,
          verified: report.verifications + 1 >= 3
        };
      }
      return report;
    }));
  };

  const markAsCritical = (id, isCritical) => {
    setReports(reports.map(report => {
      if (report.id === id) {
        return { ...report, critical: isCritical };
      }
      return report;
    }));
  };

  // Count reports for each category
  const reportCounts = {
    all: reports.length,
    'my-reports': reports.filter(r => r.myReport).length,
    verified: reports.filter(r => r.verified).length,
    unverified: reports.filter(r => !r.verified).length,
    critical: reports.filter(r => r.critical).length,
    safe: reports.filter(r => !r.critical && r.type === 'clear').length,
    blocked: reports.filter(r => r.type === 'blocked').length,
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Road Condition Reports</h2>
          <button
            onClick={() => setShowReportForm(!showReportForm)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {showReportForm ? 'Cancel' : 'Report Road Condition'}
          </button>
        </div>
        
        {showReportForm && (
          <div className="bg-gray-800 rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-medium text-white mb-4">Report Road Condition</h3>
            <form onSubmit={handleSubmitReport}>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300">Road Status</label>
                  <div className="mt-1">
                    <select
                      name="type"
                      value={newReport.type}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="blocked">Blocked/Damaged</option>
                      <option value="clear">Clear/Safe</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300">Location</label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="location"
                      value={newReport.location}
                      onChange={handleInputChange}
                      required
                      className="block w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter road name and area"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300">Description</label>
                  <div className="mt-1">
                    <textarea
                      name="description"
                      value={newReport.description}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="block w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Provide details about the road condition"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="critical"
                    name="critical"
                    type="checkbox"
                    checked={newReport.critical}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded"
                  />
                  <label htmlFor="critical" className="ml-2 block text-sm text-gray-300">
                    Mark as critical (emergency situation)
                  </label>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="submit"
                  className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="border-b border-gray-700 mb-6">
          <nav className="-mb-px flex space-x-4 overflow-x-auto">
            {[
              { id: 'all', name: 'All Reports' },
              { id: 'my-reports', name: 'My Reports' },
              { id: 'verified', name: 'Verified' },
              { id: 'unverified', name: 'Unverified' },
              { id: 'critical', name: 'Critical' },
              { id: 'safe', name: 'Safe Roads' },
              { id: 'blocked', name: 'Blocked' },
             
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap pb-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-400 hover:border-gray-400'
                }`}
              >
                {tab.name} ({reportCounts[tab.id]})
              </button>
            ))}
          </nav>
        </div>
        
        {filteredReports.length === 0 ? (
          <div className="bg-gray-800 rounded-lg shadow p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-white">No reports found</h3>
            <p className="mt-1 text-sm text-gray-400">
              {activeTab === 'my-reports' 
                ? "You haven't submitted any road reports yet." 
                : `There are no ${activeTab} road reports at the moment.`}
            </p>
            {activeTab === 'my-reports' && (
              <div className="mt-6">
                <button
                  onClick={() => setShowReportForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit Your First Report
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-800 shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-700">
              {filteredReports.map((report) => (
                <li key={report.id} className={report.critical ? 'bg-red-900 bg-opacity-20' : ''}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                          report.type === 'blocked' ? 'bg-red-500' : 'bg-green-500'
                        }`}>
                          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {report.type === 'blocked' ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            )}
                          </svg>
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center">
                            <h3 className="text-sm font-medium text-white">
                              {report.location}
                              {report.critical && (
                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                  Critical
                                </span>
                              )}
                            </h3>
                            {report.verified && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                Verified
                              </span>
                            )}
                            {report.myReport && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                My Report
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-400 mt-1">
                            {report.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-sm text-gray-400">{report.time}</p>
                        <p className="text-xs text-gray-500">by {report.reportedBy}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-400">
                          {report.verifications} verification{report.verifications !== 1 ? 's' : ''}
                        </span>
                        {user.role === 'admin' && (
                          <button
                            onClick={() => markAsCritical(report.id, !report.critical)}
                            className={`inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm ${
                              report.critical 
                                ? 'bg-yellow-600 text-white hover:bg-yellow-700' 
                                : 'bg-gray-600 text-white hover:bg-gray-700'
                            }`}
                          >
                            {report.critical ? 'Mark as Normal' : 'Mark as Critical'}
                          </button>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        {!report.verified && (
                          <button
                            onClick={() => verifyReport(report.id)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Verify This Report
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
      </div>
    </div>
  );
};

export default RoadReports;