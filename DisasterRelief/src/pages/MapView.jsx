// components/MapView.js
import React, { useState, useEffect } from 'react';

const MapView = ({ user }) => {
  const [userLocation, setUserLocation] = useState({ lat: 19.0760, lng: 72.8777 }); // Default to Mumbai
  const [sosMarkers, setSosMarkers] = useState([]);
  const [shelterMarkers, setShelterMarkers] = useState([]);
  const [roadMarkers, setRoadMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  // Mock data for demonstration
  useEffect(() => {
    // SOS markers
    setSosMarkers([
      { id: 1, lat: 19.0760, lng: 72.8777, type: 'sos', priority: 'high', reportedBy: 'User123', time: '5 min ago' },
      { id: 2, lat: 19.2183, lng: 72.9781, type: 'sos', priority: 'medium', reportedBy: 'User456', time: '15 min ago' },
    ]);
    
    // Shelter markers
    setShelterMarkers([
      { id: 1, lat: 19.0860, lng: 72.8877, type: 'shelter', name: 'Mumbai Central Shelter', capacity: '120/200', facilities: 'Food, Water, Medical' },
      { id: 2, lat: 19.1080, lng: 72.8477, type: 'shelter', name: 'Western Line Shelter', capacity: '80/150', facilities: 'Food, Water' },
    ]);
    
    // Road markers
    setRoadMarkers([
      { id: 1, lat: 19.0660, lng: 72.8677, type: 'road-blocked', reportedBy: 'User789', time: '25 min ago' },
      { id: 2, lat: 19.0960, lng: 72.9077, type: 'road-clear', reportedBy: 'User012', time: '40 min ago' },
    ]);
    
    // Get user's actual location if available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, []);

  // This is a simplified map visualization using divs
  // In a real app, you would use a proper mapping library like Leaflet or Google Maps
  const MapVisualization = () => {
    return (
      <div className="relative w-full h-96 bg-gray-800 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <p className="mt-2 text-gray-400">Map visualization would appear here</p>
            <p className="text-sm text-gray-500">In a real implementation, this would show actual map data</p>
          </div>
        </div>
        
        {/* User location marker */}
        <div 
          className="absolute w-4 h-4 bg-blue-500 rounded-full border-2 border-white"
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          title="Your location"
        ></div>
        
        {/* SOS markers */}
        {sosMarkers.map(marker => (
          <div 
            key={marker.id}
            className="absolute w-4 h-4 bg-red-500 rounded-full border-2 border-white cursor-pointer"
            style={{ top: `${50 + (marker.lat - userLocation.lat) * 100}%`, left: `${50 + (marker.lng - userLocation.lng) * 100}%` }}
            onClick={() => setSelectedMarker(marker)}
            title="SOS Alert"
          ></div>
        ))}
        
        {/* Shelter markers */}
        {shelterMarkers.map(marker => (
          <div 
            key={marker.id}
            className="absolute w-4 h-4 bg-green-500 rounded-full border-2 border-white cursor-pointer"
            style={{ top: `${50 + (marker.lat - userLocation.lat) * 100}%`, left: `${50 + (marker.lng - userLocation.lng) * 100}%` }}
            onClick={() => setSelectedMarker(marker)}
            title="Shelter"
          ></div>
        ))}
        
        {/* Road markers */}
        {roadMarkers.map(marker => (
          <div 
            key={marker.id}
            className="absolute w-4 h-4 bg-yellow-500 rounded-full border-2 border-white cursor-pointer"
            style={{ top: `${50 + (marker.lat - userLocation.lat) * 100}%`, left: `${50 + (marker.lng - userLocation.lng) * 100}%` }}
            onClick={() => setSelectedMarker(marker)}
            title={marker.type === 'road-blocked' ? 'Blocked Road' : 'Clear Road'}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h2 className="text-2xl font-bold text-white mb-6">Live Map View</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg shadow p-6">
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                    SOS Alerts
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                    Shelters
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></span>
                    Road Reports
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
                    Your Location
                  </span>
                </div>
              </div>
              
              <MapVisualization />
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-red-500 rounded-md p-2">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">{sosMarkers.length}</p>
                      <p className="text-sm text-gray-400">Active SOS</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-500 rounded-md p-2">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">{shelterMarkers.length}</p>
                      <p className="text-sm text-gray-400">Shelters</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-yellow-500 rounded-md p-2">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">{roadMarkers.length}</p>
                      <p className="text-sm text-gray-400">Road Reports</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            {selectedMarker ? (
              <div className="bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-white mb-4">Marker Details</h3>
                
                {selectedMarker.type === 'sos' && (
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 bg-red-500 rounded-md p-2">
                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-white">SOS Alert</p>
                        <p className="text-sm text-gray-400">Priority: {selectedMarker.priority}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400"><span className="font-medium text-white">Reported by:</span> {selectedMarker.reportedBy}</p>
                      <p className="text-sm text-gray-400"><span className="font-medium text-white">Time:</span> {selectedMarker.time}</p>
                      <p className="text-sm text-gray-400"><span className="font-medium text-white">Location:</span> {selectedMarker.lat.toFixed(4)}, {selectedMarker.lng.toFixed(4)}</p>
                    </div>
                    
                    <div className="mt-4">
                      <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        Respond to SOS
                      </button>
                    </div>
                  </div>
                )}
                
                {selectedMarker.type === 'shelter' && (
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 bg-green-500 rounded-md p-2">
                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-white">Shelter</p>
                        <p className="text-sm text-gray-400">Capacity: {selectedMarker.capacity}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-white">{selectedMarker.name}</p>
                      <p className="text-sm text-gray-400"><span className="font-medium text-white">Facilities:</span> {selectedMarker.facilities}</p>
                      <p className="text-sm text-gray-400"><span className="font-medium text-white">Location:</span> {selectedMarker.lat.toFixed(4)}, {selectedMarker.lng.toFixed(4)}</p>
                    </div>
                    
                    <div className="mt-4">
                      <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        Navigate to Shelter
                      </button>
                    </div>
                  </div>
                )}
                
                {selectedMarker.type.includes('road') && (
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 bg-yellow-500 rounded-md p-2">
                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-white">
                          {selectedMarker.type === 'road-blocked' ? 'Blocked Road' : 'Clear Road'}
                        </p>
                        <p className="text-sm text-gray-400">Reported: {selectedMarker.time}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400"><span className="font-medium text-white">Reported by:</span> {selectedMarker.reportedBy}</p>
                      <p className="text-sm text-gray-400"><span className="font-medium text-white">Status:</span> {selectedMarker.type === 'road-blocked' ? 'Blocked' : 'Clear'}</p>
                      <p className="text-sm text-gray-400"><span className="font-medium text-white">Location:</span> {selectedMarker.lat.toFixed(4)}, {selectedMarker.lng.toFixed(4)}</p>
                    </div>
                    
                    <div className="mt-4">
                      <button className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                        {selectedMarker.type === 'road-blocked' ? 'Report Cleared' : 'Confirm Status'}
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="mt-4">
                  <button 
                    onClick={() => setSelectedMarker(null)}
                    className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-white mb-4">Map Legend</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">SOS Alerts</p>
                      <p className="text-sm text-gray-400">Emergency requests for help</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">Shelters</p>
                      <p className="text-sm text-gray-400">Safe locations with resources</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-4 h-4 bg-yellow-500 rounded-full border-2 border-white"></div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">Road Reports</p>
                      <p className="text-sm text-gray-400">Road condition information</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">Your Location</p>
                      <p className="text-sm text-gray-400">Where you are currently</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-white mb-2">Map Instructions</h4>
                  <p className="text-sm text-gray-400">
                    Click on any marker to see details and take action. Zoom in/out to see more area.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;