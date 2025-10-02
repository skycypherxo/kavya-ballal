import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import OnlineConsultation from './components/OnlineConsultation';
import Credentials from './components/Credentials';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminCRM from './admin/main';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-white">
              <Header />
              <Hero />
              <About />
              <Services />
              <OnlineConsultation />
              <Credentials />
              <Testimonials />
              <Footer />
            </div>
          }
        />
        <Route path="/admin" element={<AdminCRM />} />
      </Routes>
    </Router>
  );
}

export default App;