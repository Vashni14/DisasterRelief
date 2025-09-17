// App.js
import React, { useState } from 'react';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [user, setUser] = useState(null);

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      {currentPage === 'landing' && <Landing navigateTo={navigateTo} />}
      {currentPage === 'login' && <Login navigateTo={navigateTo} setUser={setUser} />}
      {currentPage === 'signup' && <Signup navigateTo={navigateTo} setUser={setUser} />}
    </div>
  );
}

export default App;