// pages/Profile.js
import React, { useState } from 'react';

const Profile = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    address: user.address || '',
    bloodGroup: user.bloodGroup || '',
    medicalConditions: user.medicalConditions || '',
    emergencyContacts: user.emergencyContacts || [
      { name: '', relationship: '', phone: '' },
      { name: '', relationship: '', phone: '' }
    ]
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const relationships = ['Parent', 'Sibling', 'Spouse', 'Child', 'Friend', 'Relative', 'Colleague', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEmergencyContactChange = (index, field, value) => {
    const updatedContacts = [...formData.emergencyContacts];
    updatedContacts[index][field] = value;
    setFormData(prev => ({ ...prev, emergencyContacts: updatedContacts }));
  };

  const addEmergencyContact = () => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: [...prev.emergencyContacts, { name: '', relationship: '', phone: '' }]
    }));
  };

  const removeEmergencyContact = (index) => {
    if (formData.emergencyContacts.length > 1) {
      const updatedContacts = [...formData.emergencyContacts];
      updatedContacts.splice(index, 1);
      setFormData(prev => ({ ...prev, emergencyContacts: updatedContacts }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would update the user via API
    setUser({ ...user, ...formData });
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      bloodGroup: user.bloodGroup || '',
      medicalConditions: user.medicalConditions || '',
      emergencyContacts: user.emergencyContacts || [
        { name: '', relationship: '', phone: '' },
        { name: '', relationship: '', phone: '' }
      ]
    });
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Profile</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md text-white transition-colors flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Profile
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleCancel}
              className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-md text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-md text-white transition-colors"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Personal Information</h2>
              
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                ) : (
                  <div className="px-3 py-2 bg-gray-700 rounded-md">{user.name || 'Not provided'}</div>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                ) : (
                  <div className="px-3 py-2 bg-gray-700 rounded-md">{user.email || 'Not provided'}</div>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="px-3 py-2 bg-gray-700 rounded-md">{user.phone || 'Not provided'}</div>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Address</label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="px-3 py-2 bg-gray-700 rounded-md whitespace-pre-line">{user.address || 'Not provided'}</div>
                )}
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Medical Information</h2>
              
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Blood Group</label>
                {isEditing ? (
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map(group => (
                      <option key={group} value={group}>{group}</option>
                    ))}
                  </select>
                ) : (
                  <div className="px-3 py-2 bg-gray-700 rounded-md">{user.bloodGroup || 'Not provided'}</div>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-300 mb-2">Medical Conditions</label>
                {isEditing ? (
                  <textarea
                    name="medicalConditions"
                    value={formData.medicalConditions}
                    onChange={handleChange}
                    rows="3"
                    placeholder="List any medical conditions, allergies, or special needs"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="px-3 py-2 bg-gray-700 rounded-md whitespace-pre-line">{user.medicalConditions || 'Not provided'}</div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold border-b border-gray-700 pb-2">Emergency Contacts</h2>
              {isEditing && (
                <button
                  type="button"
                  onClick={addEmergencyContact}
                  className="bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded-md text-white text-sm transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Contact
                </button>
              )}
            </div>
            
            <div className="space-y-4">
              {formData.emergencyContacts.map((contact, index) => (
                <div key={index} className="bg-gray-700 p-4 rounded-lg relative">
                  {isEditing && formData.emergencyContacts.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEmergencyContact(index)}
                      className="absolute top-2 right-2 text-red-400 hover:text-red-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-300 mb-2">Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={contact.name}
                          onChange={(e) => handleEmergencyContactChange(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="px-3 py-2 bg-gray-600 rounded-md">{contact.name || 'Not provided'}</div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-2">Relationship</label>
                      {isEditing ? (
                        <select
                          value={contact.relationship}
                          onChange={(e) => handleEmergencyContactChange(index, 'relationship', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select Relationship</option>
                          {relationships.map(rel => (
                            <option key={rel} value={rel}>{rel}</option>
                          ))}
                        </select>
                      ) : (
                        <div className="px-3 py-2 bg-gray-600 rounded-md">{contact.relationship || 'Not provided'}</div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-gray-300 mb-2">Phone Number</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={contact.phone}
                          onChange={(e) => handleEmergencyContactChange(index, 'phone', e.target.value)}
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <div className="px-3 py-2 bg-gray-600 rounded-md">{contact.phone || 'Not provided'}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {isEditing && (
            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-700">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-600 hover:bg-gray-500 px-4 py-2 rounded-md text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-md text-white transition-colors"
              >
                Save Changes
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Account Information Section (Non-editable) */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg mt-6">
        <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Account Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 mb-2">User ID</label>
            <div className="px-3 py-2 bg-gray-700 rounded-md text-sm font-mono">{user.id}</div>
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">Account Type</label>
            <div className="px-3 py-2 bg-gray-700 rounded-md capitalize">{user.role}</div>
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">Member Since</label>
            <div className="px-3 py-2 bg-gray-700 rounded-md">
              {user.joinDate || new Date().toLocaleDateString()}
            </div>
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">Trust Score</label>
            <div className="px-3 py-2 bg-gray-700 rounded-md flex items-center">
              <div className="w-full bg-gray-600 rounded-full h-2 mr-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${user.trustScore || 80}%` }}
                ></div>
              </div>
              <span>{user.trustScore || 80}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Preparedness Section */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg mt-6">
        <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-2">Emergency Preparedness</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="font-medium text-blue-400 mb-2">Emergency Kit Checklist</h3>
            <ul className="text-sm space-y-1">
              <li className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Water (1 gallon per person per day)</span>
              </li>
              <li className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Non-perishable food</span>
              </li>
              <li className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Flashlight with extra batteries</span>
              </li>
              <li className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>First aid kit</span>
              </li>
              <li className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span>Medications (7-day supply)</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="font-medium text-blue-400 mb-2">Emergency Plan</h3>
            <ul className="text-sm space-y-2">
              <li>
                <button className="text-blue-400 hover:text-blue-300 text-left">
                  Download Emergency Plan Template
                </button>
              </li>
              <li>
                <button className="text-blue-400 hover:text-blue-300 text-left">
                  Share Your Plan with Emergency Contacts
                </button>
              </li>
              <li>
                <button className="text-blue-400 hover:text-blue-300 text-left">
                  Practice Your Evacuation Route
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;