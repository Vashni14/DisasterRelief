// components/Shelters.js
import React, { useState } from 'react';

const Shelters = ({ user }) => {
  const [shelters, setShelters] = useState([
    { id: 1, name: 'Mumbai Central Shelter', location: 'Mumbai Central', capacity: 200, occupied: 120, facilities: ['Food', 'Water', 'Medical', 'Beds'], contact: '022-12345678', verified: true },
    { id: 2, name: 'Western Line Shelter', location: 'Andheri East', capacity: 150, occupied: 80, facilities: ['Food', 'Water'], contact: '022-87654321', verified: true },
    { id: 3, name: 'Delhi Relief Camp', location: 'Connaught Place', capacity: 300, occupied: 250, facilities: ['Food', 'Water', 'Medical', 'Beds', 'Sanitation'], contact: '011-12345678', verified: true },
    { id: 4, name: 'Chennai Safe Zone', location: 'Anna Nagar', capacity: 100, occupied: 40, facilities: ['Food', 'Water', 'Beds'], contact: '044-12345678', verified: false },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newShelter, setNewShelter] = useState({
    name: '',
    location: '',
    capacity: '',
    facilities: [],
    contact: ''
  });
  const [selectedFacilities, setSelectedFacilities] = useState([]);

  const facilityOptions = ['Food', 'Water', 'Medical', 'Beds', 'Sanitation', 'Electricity', 'WiFi'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewShelter({
      ...newShelter,
      [name]: value
    });
  };

  const handleFacilityToggle = (facility) => {
    if (selectedFacilities.includes(facility)) {
      setSelectedFacilities(selectedFacilities.filter(f => f !== facility));
    } else {
      setSelectedFacilities([...selectedFacilities, facility]);
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
      verified: user.role === 'admin' // Auto-verify if added by admin
    };
    
    setShelters([shelter, ...shelters]);
    setNewShelter({ name: '', location: '', capacity: '', facilities: [], contact: '' });
    setSelectedFacilities([]);
    setShowAddForm(false);
  };

  const updateOccupancy = (id, change) => {
    setShelters(shelters.map(shelter => {
      if (shelter.id === id) {
        const newOccupied = shelter.occupied + change;
        if (newOccupied >= 0 && newOccupied <= shelter.capacity) {
          return { ...shelter, occupied: newOccupied };
        }
      }
      return shelter;
    }));
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Emergency Shelters</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {showAddForm ? 'Cancel' : 'Add New Shelter'}
          </button>
        </div>
        
        {showAddForm && (
          <div className="bg-gray-800 rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-medium text-white mb-4">Add New Shelter</h3>
            <form onSubmit={handleSubmitShelter}>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-300">Shelter Name</label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="name"
                      value={newShelter.name}
                      onChange={handleInputChange}
                      required
                      className="block w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter shelter name"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300">Location</label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="location"
                      value={newShelter.location}
                      onChange={handleInputChange}
                      required
                      className="block w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter location"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300">Capacity</label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="capacity"
                      value={newShelter.capacity}
                      onChange={handleInputChange}
                      required
                      min="1"
                      className="block w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter capacity"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300">Contact</label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="contact"
                      value={newShelter.contact}
                      onChange={handleInputChange}
                      className="block w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter contact information"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300">Facilities</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {facilityOptions.map(facility => (
                      <button
                        key={facility}
                        type="button"
                        onClick={() => handleFacilityToggle(facility)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          selectedFacilities.includes(facility)
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-700 text-gray-300'
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
                  className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Shelter
                </button>
              </div>
            </form>
          </div>
        )}
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shelters.map((shelter) => (
            <div key={shelter.id} className="bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-white">{shelter.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">{shelter.location}</p>
                  </div>
                  {shelter.verified ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Pending Verification
                    </span>
                  )}
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-300">Capacity</span>
                    <span className="text-sm text-gray-400">{shelter.occupied}/{shelter.capacity}</span>
                  </div>
                  <div className="mt-1 w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(shelter.occupied / shelter.capacity) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-300">Facilities</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {shelter.facilities.map(facility => (
                      <span key={facility} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>
                
                {shelter.contact && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-300">Contact</h4>
                    <p className="text-sm text-gray-400 mt-1">{shelter.contact}</p>
                  </div>
                )}
              </div>
              
              <div className="bg-gray-700 px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  {user.role === 'admin' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateOccupancy(shelter.id, 1)}
                        disabled={shelter.occupied >= shelter.capacity}
                        className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                      >
                        +1
                      </button>
                      <button
                        onClick={() => updateOccupancy(shelter.id, -1)}
                        disabled={shelter.occupied <= 0}
                        className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                      >
                        -1
                      </button>
                    </div>
                  )}
                  
                  <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Navigate to Shelter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shelters;