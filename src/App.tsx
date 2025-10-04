import React from 'react';
import { Helmet } from 'react-helmet';
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
      <Helmet>
        <title>Dr. Kavya Ballal | Obstetrician & Gynecologist | Udupi, Karnataka</title>
        <meta name="description" content="Dr. Kavya Ballal is a leading Obstetrician & Gynecologist in Udupi, Karnataka, specializing in minimal access surgery, women's health, and compassionate care. Book online consultations and learn more about her medical expertise and artistic achievements." />
        <meta name="keywords" content="Dr Kavya Ballal, Obstetrician, Gynecologist, Udupi, Karnataka, Minimal Access Surgery, Women's Health, Online Consultation, Ballal's Healthcare, Government Hospital Kundapura, Bharatanatyam, Kuchipudi" />
        <link rel="canonical" href="https://www.kavyaballal.com/" />
        <meta property="og:title" content="Dr. Kavya Ballal | Obstetrician & Gynecologist | Udupi, Karnataka" />
        <meta property="og:description" content="Comprehensive, compassionate, and evidence-based care for women's health. Book online consultations with Dr. Kavya Ballal in Udupi, Karnataka." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.kavyaballal.com/" />
        <meta property="og:image" content="https://www.kavyaballal.com/images/Logo.jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dr. Kavya Ballal | Obstetrician & Gynecologist | Udupi, Karnataka" />
        <meta name="twitter:description" content="Comprehensive, compassionate, and evidence-based care for women's health. Book online consultations with Dr. Kavya Ballal in Udupi, Karnataka." />
        <meta name="twitter:image" content="https://www.kavyaballal.com/images/Logo.jpeg" />
      </Helmet>
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