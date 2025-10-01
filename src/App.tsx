import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import OnlineConsultation from './components/OnlineConsultation';
import Credentials from './components/Credentials';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DoctorDashboard from './components/DoctorDashboard';
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
              <Contact />
              <Footer />
            </div>
          }
        />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/admin" element={<AdminCRM />} />
      </Routes>
    </Router>
  );
}

export default App;