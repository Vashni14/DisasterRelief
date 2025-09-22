import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const UserLogin = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Attempting login with:', formData.email);
      
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      const user = userCredential.user;
      console.log('Firebase Auth login successful:', user.uid);

      let userData = {};
      
      // Try to fetch user data from Firestore
      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          userData = userDoc.data();
          console.log('Firestore data found:', userData);
        } else {
          console.log('No Firestore data found, creating default user data');
          // If no Firestore data exists, create basic user data
          userData = {
            name: user.displayName || formData.email.split('@')[0],
            phone: '',
            role: 'user',
            trustScore: 80,
            isPhoneVerified: false
          };
        }
      } catch (firestoreError) {
        console.warn('Firestore error, using default data:', firestoreError);
        userData = {
          name: user.displayName || formData.email.split('@')[0],
          phone: '',
          role: 'user',
          trustScore: 80,
          isPhoneVerified: false
        };
      }

      // Prepare user data for login
      const loginUserData = {
        id: user.uid,
        email: user.email,
        name: userData.name || user.displayName || formData.email.split('@')[0],
        phone: userData.phone || '',
        role: userData.role || 'user',
        trustScore: userData.trustScore || 80,
        isPhoneVerified: userData.isPhoneVerified || false,
        isEmailVerified: user.emailVerified || false
      };

      console.log('Calling onLogin with:', loginUserData);
      
      // Call the login handler
      onLogin(loginUserData);
      
      // Show success and redirect
      console.log('Login successful, redirecting to dashboard');
      navigate('/dashboard');

    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = getErrorMessage(error.code);
      setError(errorMessage);
      
      // Provide demo credentials hint for testing
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setError(`${errorMessage} 
        
Demo: Try signing up first or use test@example.com / password123`);
      }
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'Invalid email address format.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/user-not-found':
        return 'No account found with this email. Please sign up first.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection.';
      case 'auth/invalid-credential':
        return 'Invalid login credentials. Please check your email and password.';
      default:
        return 'Failed to sign in. Please try again.';
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const fillDemoCredentials = () => {
    setFormData({
      email: 'test@example.com',
      password: 'password123'
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link to="/" className="inline-block mb-4 text-blue-400 hover:text-blue-300">
            ← Back to Role Selection
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            User Login
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Sign in with your email and password
          </p>
        </div>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-300 px-4 py-3 rounded relative whitespace-pre-line">
            {error}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white rounded-t-md bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-700 placeholder-gray-500 text-white rounded-b-md bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/user-signup" className="font-medium text-blue-400 hover:text-blue-300">
                Don't have an account? Sign up
              </Link>
            </div>
            <div className="text-sm">
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="font-medium text-blue-400 hover:text-blue-300"
              >
                Fill Demo Credentials
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign in'
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Troubleshooting:</h3>
          <div className="text-xs text-gray-400 space-y-1">
            <p>• Make sure you've signed up first</p>
            <p>• Check your email and password</p>
            <p>• Try the "Fill Demo Credentials" button</p>
            <p>• Or go to Sign Up to create a new account</p>
          </div>
        </div>

        {/* Debug info - remove in production */}
        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500 rounded-lg">
          <h4 className="text-sm font-medium text-yellow-300 mb-2">Debug Info:</h4>
          <div className="text-xs text-yellow-400 space-y-1">
            <p>Email: {formData.email}</p>
            <p>Password: {formData.password.replace(/./g, '•')}</p>
            <p>Firebase Project: {import.meta.env.VITE_FIREBASE_PROJECT_ID || 'Check config'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;