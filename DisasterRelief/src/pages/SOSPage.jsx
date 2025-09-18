// pages/SOSReporting.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SOSReporting = ({ user, alerts, setAlerts }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Type, 2: Details, 3: Confirmation
  const [formData, setFormData] = useState({
    emergencyType: '',
    peopleAffected: 1,
    description: '',
    severity: 'high',
    location: {
      lat: null,
      lng: null,
      address: 'Current location'
    }
  });
  const [isConfirming, setIsConfirming] = useState(false);

  const emergencyTypes = [
    'medical',
    'fire',
    'flood',
    'earthquake',
    'trapped',
    'structural collapse',
    'stranded',
    'other'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              address: 'Current location'
            }
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enter it manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAlert = {
      id: Date.now(),
      userId: user.id,
      userName: user.name,
      timestamp: new Date().toISOString(),
      status: 'pending',
      verified: false,
      verificationScore: 0,
      upvotes: 0,
      downvotes: 0,
      ...formData
    };
    
    setAlerts([...alerts, newAlert]);
    alert('SOS Alert sent successfully! Help is on the way.');
    setFormData({
      emergencyType: '',
      peopleAffected: 1,
      description: '',
      severity: 'high',
      location: {
        lat: null,
        lng: null,
        address: 'Current location'
      }
    });
    setStep(1);
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="mr-3 p-2 rounded-full hover:bg-gray-800 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">Emergency SOS Reporting</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8 relative">
          <div className="flex-1 flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-400'} mb-2`}>
              1
            </div>
            <span className="text-xs">Emergency Type</span>
          </div>
          <div className="absolute top-4 left-1/4 right-1/4 h-0.5 bg-gray-700 -z-10">
            <div className={`h-full ${step >= 2 ? 'bg-red-600' : 'bg-gray-700'}`} style={{ width: step >= 2 ? '100%' : '0%' }}></div>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-400'} mb-2`}>
              2
            </div>
            <span className="text-xs">Details</span>
          </div>
          <div className="absolute top-4 left-1/2 right-1/4 h-0.5 bg-gray-700 -z-10">
            <div className={`h-full ${step >= 3 ? 'bg-red-600' : 'bg-gray-700'}`} style={{ width: step >= 3 ? '100%' : '0%' }}></div>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-400'} mb-2`}>
              3
            </div>
            <span className="text-xs">Confirm</span>
          </div>
        </div>

        {/* Step 1: Emergency Type */}
        {step === 1 && (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">What type of emergency are you reporting?</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {emergencyTypes.map(type => (
                <button
                  key={type}
                  onClick={() => {
                    setFormData(prev => ({ ...prev, emergencyType: type }));
                    setStep(2);
                  }}
                  className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-left transition-colors capitalize"
                >
                  {type.replace('_', ' ')}
                </button>
              ))}
            </div>
            
            <div className="bg-red-900 bg-opacity-20 p-4 rounded-lg border border-red-800">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-red-200 text-sm">Only use this for real emergencies. False reports may restrict your access to the platform.</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Provide emergency details</h2>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Number of people affected</label>
              <div className="flex items-center">
                <button 
                  onClick={() => setFormData(prev => ({ ...prev, peopleAffected: Math.max(1, prev.peopleAffected - 1) }))}
                  className="bg-gray-700 w-10 h-10 rounded-l-md flex items-center justify-center hover:bg-gray-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <input
                  type="number"
                  name="peopleAffected"
                  value={formData.peopleAffected}
                  onChange={handleChange}
                  min="1"
                  className="bg-gray-700 h-10 text-center w-16 border-y border-gray-600"
                />
                <button 
                  onClick={() => setFormData(prev => ({ ...prev, peopleAffected: prev.peopleAffected + 1 }))}
                  className="bg-gray-700 w-10 h-10 rounded-r-md flex items-center justify-center hover:bg-gray-600 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Severity level</label>
              <div className="grid grid-cols-3 gap-2">
                {['low', 'medium', 'high'].map(level => (
                  <button
                    key={level}
                    onClick={() => setFormData(prev => ({ ...prev, severity: level }))}
                    className={`py-2 rounded-md capitalize ${formData.severity === level ? 
                      (level === 'high' ? 'bg-red-600 text-white' : 
                       level === 'medium' ? 'bg-yellow-600 text-white' : 
                       'bg-green-600 text-white') : 
                      'bg-gray-700 hover:bg-gray-600'}`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Additional details (optional)</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Please provide any additional information that could help responders"
                rows="3"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Location</label>
              <div className="flex space-x-2">
                <button
                  onClick={getCurrentLocation}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-sm transition-colors"
                >
                  Use My Location
                </button>
                <input
                  type="text"
                  placeholder="Or enter address manually"
                  value={formData.location.address}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    location: { ...prev.location, address: e.target.value } 
                  }))}
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-md transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm Emergency Alert</h2>
            
            <div className="bg-red-900 bg-opacity-20 p-4 rounded-lg border border-red-800 mb-6">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <p className="text-red-200 font-medium">This is a real emergency alert</p>
                  <p className="text-red-200 text-sm mt-1">By confirming, this alert will be sent to emergency responders and nearby volunteers.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-lg mb-6">
              <h3 className="font-medium mb-2">Emergency Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Type:</span>
                  <span className="capitalize">{formData.emergencyType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">People Affected:</span>
                  <span>{formData.peopleAffected}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Severity:</span>
                  <span className="capitalize">{formData.severity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Location:</span>
                  <span>{formData.location.address}</span>
                </div>
                {formData.description && (
                  <div>
                    <div className="text-gray-400 mb-1">Additional Info:</div>
                    <div>{formData.description}</div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setIsConfirming(true)}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-md transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Confirm Emergency Alert
              </button>
            </div>
            
            {/* Final confirmation modal */}
            {isConfirming && (
              <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 max-w-md w-full mx-4">
                  <h3 className="text-xl font-semibold mb-4 text-center">Final Confirmation</h3>
                  <p className="text-gray-300 mb-6 text-center">Are you sure you want to send this emergency alert? This will notify responders and authorities.</p>
                  
                  <div className="flex space-x-4 justify-center">
                    <button
                      onClick={() => setIsConfirming(false)}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-md transition-colors"
                    >
                      Yes, Send Alert
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SOSReporting;