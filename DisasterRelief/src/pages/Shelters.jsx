// components/Shelters.js
import React, { useState, useEffect } from 'react';

const Shelters = ({ user }) => {
  const [shelters, setShelters] = useState([
    { 
      id: 1, 
      name: 'Mumbai Central Shelter', 
      location: 'Mumbai Central', 
      capacity: 200, 
      occupied: 120, 
      facilities: ['Food', 'Water', 'Medical', 'Beds'], 
      contact: '022-12345678', 
      verified: true,
      lastUpdated: '2023-10-15T14:30:00Z',
      coordinates: { lat: 19.0760, lng: 72.8777 }
    },
    { 
      id: 2, 
      name: 'Western Line Shelter', 
      location: 'Andheri East', 
      capacity: 150, 
      occupied: 80, 
      facilities: ['Food', 'Water'], 
      contact: '022-87654321', 
      verified: true,
      lastUpdated: '2023-10-15T10:15:00Z',
      coordinates: { lat: 19.1197, lng: 72.8464 }
    },
    { 
      id: 3, 
      name: 'Delhi Relief Camp', 
      location: 'Connaught Place', 
      capacity: 300, 
      occupied: 250, 
      facilities: ['Food', 'Water', 'Medical', 'Beds', 'Sanitation'], 
      contact: '011-12345678', 
      verified: true,
      lastUpdated: '2023-10-14T16:45:00Z',
      coordinates: { lat: 28.6139, lng: 77.2090 }
    },
    { 
      id: 4, 
      name: 'Chennai Safe Zone', 
      location: 'Anna Nagar', 
      capacity: 100, 
      occupied: 40, 
      facilities: ['Food', 'Water', 'Beds'], 
      contact: '044-12345678', 
      verified: false,
      lastUpdated: '2023-10-13T09:20:00Z',
      coordinates: { lat: 13.0827, lng: 80.2707 }
    },
    { 
      id: 5, 
      name: 'Kolkata Aid Center', 
      location: 'Park Street', 
      capacity: 180, 
      occupied: 95, 
      facilities: ['Food', 'Water', 'Medical', 'Sanitation'], 
      contact: '033-24681357', 
      verified: true,
      lastUpdated: '2023-10-15T08:45:00Z',
      coordinates: { lat: 22.5726, lng: 88.3639 }
    },
    { 
      id: 6, 
      name: 'Bangalore Help Station', 
      location: 'MG Road', 
      capacity: 120, 
      occupied: 65, 
      facilities: ['Food', 'Water', 'WiFi'], 
      contact: '080-36925814', 
      verified: true,
      lastUpdated: '2023-10-14T19:30:00Z',
      coordinates: { lat: 12.9716, lng: 77.5946 }
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newShelter, setNewShelter] = useState({
    name: '',
    location: '',
    capacity: '',
    facilities: [],
    contact: '',
    coordinates: { lat: '', lng: '' }
  });
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVerified, setFilterVerified] = useState('all');
  const [filterFacilities, setFilterFacilities] = useState([]);
  const [sortBy, setSortBy] = useState('name');

  const facilityOptions = ['Food', 'Water', 'Medical', 'Beds', 'Sanitation', 'Electricity', 'WiFi', 'Childcare', 'Accessibility'];

  // Filter and sort shelters
  const filteredShelters = shelters
    .filter(shelter => {
      const matchesSearch = shelter.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           shelter.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesVerified = filterVerified === 'all' || 
                             (filterVerified === 'verified' && shelter.verified) ||
                             (filterVerified === 'unverified' && !shelter.verified);
      const matchesFacilities = filterFacilities.length === 0 || 
                               filterFacilities.every(facility => shelter.facilities.includes(facility));
      
      return matchesSearch && matchesVerified && matchesFacilities;
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'capacity':
          return b.capacity - a.capacity;
        case 'availability':
          return (b.capacity - b.occupied) - (a.capacity - a.occupied);
        case 'recent':
          return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        default:
          return 0;
      }
    });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewShelter({
      ...newShelter,
      [name]: value
    });
  };

  const handleCoordinateChange = (field, value) => {
    setNewShelter({
      ...newShelter,
      coordinates: {
        ...newShelter.coordinates,
        [field]: value
      }
    });
  };

  const handleFacilityToggle = (facility) => {
    if (selectedFacilities.includes(facility)) {
      setSelectedFacilities(selectedFacilities.filter(f => f !== facility));
    } else {
      setSelectedFacilities([...selectedFacilities, facility]);
    }
  };

  const handleFilterFacilityToggle = (facility) => {
    if (filterFacilities.includes(facility)) {
      setFilterFacilities(filterFacilities.filter(f => f !== facility));
    } else {
      setFilterFacilities([...filterFacilities, facility]);
    }
  };

  const handleSubmitShelter = (e) => {
    e.preventDefault();
    const shelter = {
      id: shelters.length + 1,
      name: newShelter.name,
      location: newShelter.location,
      capacity: parseInt(newShelter.capacity),
      occupied: 0,
      facilities: selectedFacilities,
      contact: newShelter.contact,
      coordinates: {
        lat: parseFloat(newShelter.coordinates.lat),
        lng: parseFloat(newShelter.coordinates.lng)
      },
      verified: user.role === 'admin', // Auto-verify if added by admin
      lastUpdated: new Date().toISOString()
    };
    
    setShelters([shelter, ...shelters]);
    setNewShelter({ name: '', location: '', capacity: '', facilities: [], contact: '', coordinates: { lat: '', lng: '' } });
    setSelectedFacilities([]);
    setShowAddForm(false);
  };

  const updateOccupancy = (id, change) => {
    setShelters(shelters.map(shelter => {
      if (shelter.id === id) {
        const newOccupied = shelter.occupied + change;
        if (newOccupied >= 0 && newOccupied <= shelter.capacity) {
          return { 
            ...shelter, 
            occupied: newOccupied,
            lastUpdated: new Date().toISOString()
          };
        }
      }
      return shelter;
    }));
  };

  const toggleVerification = (id) => {
    if (user.role === 'admin') {
      setShelters(shelters.map(shelter => {
        if (shelter.id === id) {
          return { ...shelter, verified: !shelter.verified };
        }
        return shelter;
      }));
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setNewShelter(prev => ({
            ...prev,
            coordinates: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enter coordinates manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const getAvailabilityStatus = (occupied, capacity) => {
    const percentage = (occupied / capacity) * 100;
    if (percentage >= 90) return { text: 'Almost Full', color: 'bg-red-500' };
    if (percentage >= 70) return { text: 'Limited Space', color: 'bg-yellow-500' };
    if (percentage >= 50) return { text: 'Moderate', color: 'bg-orange-500' };
    return { text: 'Available', color: 'bg-green-500' };
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Emergency Shelters</h1>
          <p className="text-gray-400 mt-1">Find safe places with available resources</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md text-white transition-colors flex items-center mt-4 md:mt-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          {showAddForm ? 'Cancel' : 'Add New Shelter'}
        </button>
      </div>
      
      {/* Filters and Search */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-gray-300 mb-2">Search Shelters</label>
            <input
              type="text"
              placeholder="Search by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">Verification Status</label>
            <select
              value={filterVerified}
              onChange={(e) => setFilterVerified(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Shelters</option>
              <option value="verified">Verified Only</option>
              <option value="unverified">Unverified Only</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Name</option>
              <option value="capacity">Capacity</option>
              <option value="availability">Availability</option>
              <option value="recent">Recently Updated</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-gray-300 mb-2">Filter by Facilities</label>
          <div className="flex flex-wrap gap-2">
            {facilityOptions.map(facility => (
              <button
                key={facility}
                type="button"
                onClick={() => handleFilterFacilityToggle(facility)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  filterFacilities.includes(facility)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {facility}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Add New Shelter Form */}
      {showAddForm && (
        <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
          <h3 className="text-lg font-medium mb-4">Add New Shelter</h3>
          <form onSubmit={handleSubmitShelter}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2">Shelter Name</label>
                <input
                  type="text"
                  name="name"
                  value={newShelter.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter shelter name"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={newShelter.location}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter location"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  value={newShelter.capacity}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter capacity"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Contact Information</label>
                <input
                  type="text"
                  name="contact"
                  value={newShelter.contact}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter contact information"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Latitude</label>
                <input
                  type="number"
                  step="any"
                  value={newShelter.coordinates.lat}
                  onChange={(e) => handleCoordinateChange('lat', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter latitude"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Longitude</label>
                <input
                  type="number"
                  step="any"
                  value={newShelter.coordinates.lng}
                  onChange={(e) => handleCoordinateChange('lng', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter longitude"
                />
              </div>
              
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-gray-300">Facilities</label>
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    className="text-sm text-blue-400 hover:text-blue-300"
                  >
                    Use My Current Location
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {facilityOptions.map(facility => (
                    <button
                      key={facility}
                      type="button"
                      onClick={() => handleFacilityToggle(facility)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        selectedFacilities.includes(facility)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {facility}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md text-white transition-colors"
              >
                Add Shelter
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Shelters Grid */}
      {filteredShelters.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-4 0H9m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v12m4 0V9" />
          </svg>
          <h3 className="text-lg font-medium text-gray-300 mb-2">No shelters found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShelters.map((shelter) => {
            const availability = getAvailabilityStatus(shelter.occupied, shelter.capacity);
            
            return (
              <div key={shelter.id} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 transition-transform hover:translate-y-1">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-white">{shelter.name}</h3>
                      <p className="text-sm text-gray-400 mt-1">{shelter.location}</p>
                    </div>
                    {shelter.verified ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-300">
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-900 text-yellow-300">
                        Pending
                      </span>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-300">Capacity</span>
                      <span className="text-sm text-gray-400">{shelter.occupied}/{shelter.capacity}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${availability.color}`}
                        style={{ width: `${(shelter.occupied / shelter.capacity) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-400">{shelter.capacity - shelter.occupied} spots available</span>
                      <span className={`text-xs ${availability.color.replace('bg-', 'text-')}`}>
                        {availability.text}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Facilities</h4>
                    <div className="flex flex-wrap gap-2">
                      {shelter.facilities.map(facility => (
                        <span key={facility} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900 text-blue-300">
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {shelter.contact && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-300">Contact</h4>
                      <p className="text-sm text-gray-400">{shelter.contact}</p>
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500">
                    Updated {new Date(shelter.lastUpdated).toLocaleString()}
                  </div>
                </div>
                
                <div className="bg-gray-700 px-4 py-4">
                  <div className="flex items-center justify-between">
                    {user.role === 'admin' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => updateOccupancy(shelter.id, 1)}
                          disabled={shelter.occupied >= shelter.capacity}
                          className="px-2 py-1 bg-green-600 hover:bg-green-500 rounded-md text-white text-xs transition-colors disabled:opacity-50"
                        >
                          +1
                        </button>
                        <button
                          onClick={() => updateOccupancy(shelter.id, -1)}
                          disabled={shelter.occupied <= 0}
                          className="px-2 py-1 bg-red-600 hover:bg-red-500 rounded-md text-white text-xs transition-colors disabled:opacity-50"
                        >
                          -1
                        </button>
                        <button
                          onClick={() => toggleVerification(shelter.id)}
                          className="px-2 py-1 bg-purple-600 hover:bg-purple-500 rounded-md text-white text-xs transition-colors"
                        >
                          {shelter.verified ? 'Unverify' : 'Verify'}
                        </button>
                      </div>
                    )}
                    
                    <button className="bg-blue-600 hover:bg-blue-500 px-3 py-2 rounded-md text-white text-sm transition-colors flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Navigate
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Shelters;