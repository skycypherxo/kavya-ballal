import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import OnlineConsultation from './components/OnlineConsultation';
import Credentials from './components/Credentials';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BookingsAdmin from './components/BookingsAdmin';

function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  // Check URL for admin access
  React.useEffect(() => {
    if (window.location.hash === '#admin') {
      setShowAdmin(true);
    }
  }, []);

  if (showAdmin) {
    return (
      <div className="min-h-screen bg-white">
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setShowAdmin(false)}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            ← Back to Website
          </button>
        </div>
        <BookingsAdmin />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Services />
      <OnlineConsultation />
      <Credentials />
      <Testimonials />
      <Contact />
      <Footer />
      
      {/* Secret admin access */}
      <div className="hidden">
        <button onClick={() => setShowAdmin(true)}>Admin</button>
      </div>
    </div>
  );
}

export default App;