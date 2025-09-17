// pages/Landing.js
import React from 'react';

const Landing = ({ navigateTo }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-gray-900 bg-opacity-90 backdrop-blur-sm py-4 sticky top-0 z-50 border-b border-gray-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-blue-600 text-white p-2 rounded-md mr-3 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              CommunityRelief
            </span>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={() => navigateTo('login')}
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              Login
            </button>
            <button 
              onClick={() => navigateTo('signup')}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md font-medium shadow-md transition-colors"
            >
              Join Us
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-90"></div>
          <img 
            src="https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
            alt="Community helping each other" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Community-Powered <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Disaster Relief</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              A free, open platform where communities support each other during emergencies. Share resources, find safe routes, and connect with neighbors when it matters most.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => navigateTo('signup')}
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-md font-medium text-lg shadow-lg transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Join Our Community
              </button>
              <button 
                onClick={() => navigateTo('login')}
                className="border border-blue-600 text-blue-400 hover:bg-blue-900 hover:bg-opacity-20 px-6 py-3 rounded-md font-medium text-lg transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Member Login
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-gray-800 p-6 rounded-xl shadow-2xl max-w-md border border-gray-700">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-4 rounded-lg mb-4 text-center">
                <h3 className="text-xl font-semibold">Community Solidarity Network</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-500 p-2 rounded-md mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-300">Neighbors helping neighbors in times of need</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-500 p-2 rounded-md mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-300">Community-sourced safe routes and shelter locations</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-500 p-2 rounded-md mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-300">Built with care by volunteers, for communities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Community Impact</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Our volunteer-powered platform has helped communities coordinate during emergencies across the globe.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">10K+</div>
              <div className="text-gray-400 mt-2">Community Members</div>
            </div>
            <div className="text-center bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">5K+</div>
              <div className="text-gray-400 mt-2">Helpers Connected</div>
            </div>
            <div className="text-center bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">200+</div>
              <div className="text-gray-400 mt-2">Community Organizations</div>
            </div>
            <div className="text-center bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">100%</div>
              <div className="text-gray-400 mt-2">Volunteer-Powered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-800 bg-opacity-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Our Community Platform Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Our community-built platform connects those in need with those who can help during emergencies.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Alerts</h3>
              <p className="text-gray-400">Share and receive real-time emergency alerts within your community network.</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-green-500 transition-colors text-center">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Resource Sharing</h3>
              <p className="text-gray-400">Find and share safe shelters, resources, and information within your community.</p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-purple-500 transition-colors text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Support</h3>
              <p className="text-gray-400">Connect with volunteers and neighbors offering assistance during crises.</p>
            </div>
          </div>
          
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Community Stories</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Hear how our platform has helped communities support each other during difficult times.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  MC
                </div>
                <div>
                  <h4 className="font-semibold">Maria Chen</h4>
                  <p className="text-blue-400 text-sm">Community Organizer</p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "During the floods, this platform helped our neighborhood coordinate shelter spaces and resources. We were able to ensure everyone had a safe place to go because neighbors opened their homes to each other."
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  JS
                </div>
                <div>
                  <h4 className="font-semibold">James Smith</h4>
                  <p className="text-green-400 text-sm">Local Volunteer</p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "I've used CommunityRelief to organize volunteer efforts after the hurricane. The way it connects people who need help with those who can provide it is amazing. This is what community is all about."
              </p>
            </div>
            
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  AK
                </div>
                <div>
                  <h4 className="font-semibold">Aisha Khan</h4>
                  <p className="text-purple-400 text-sm">Community Member</p>
                </div>
              </div>
              <p className="text-gray-300 italic">
                "When the wildfires forced us to evacuate, this platform helped me find safe routes and connect with neighbors who could take in my pets. The community support was incredible when we needed it most."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community of Helpers</h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8">
            Together, we can build stronger, more resilient communities ready to support each other in times of need.
          </p>
          <button 
            onClick={() => navigateTo('signup')}
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-md font-medium text-lg shadow-lg transition-colors"
          >
            Join Our Community
          </button>
          <p className="text-blue-100 mt-4 text-sm">Always free, always community-powered</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-blue-600 text-white p-2 rounded-md mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <span className="text-xl font-bold">CommunityRelief</span>
              </div>
              <p className="text-gray-400 mb-4">A community-powered platform helping neighbors support each other during emergencies.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Get Involved</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Join as Volunteer</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community Guidelines</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Organize in Your Area</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Training Resources</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Community Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Safety Preparedness</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Emergency Planning</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community Toolkit</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Local Resources</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Our Community Story</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Volunteer Team</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community Partners</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Our Team</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
            <p>CommunityRelief is a volunteer-driven, open source project. © 2023 CommunityRelief Collective. All rights reserved.</p>
            <p className="mt-2 text-sm">This platform is built and maintained by volunteers for community benefit.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;