import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, Calendar, Stethoscope } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'glass-effect shadow-lg py-3' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-600 rounded-xl flex items-center justify-center">
              <Stethoscope className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display text-gray-900">
                Dr. Kavya Ballal
              </h1>
              <p className="text-xs text-gray-600 hidden sm:block">
                Obstetrician & Gynecologist
              </p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('credentials')}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Credentials
            </button>
            <button 
              onClick={() => scrollToSection('consultation')}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Online Consultation
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Contact
            </button>
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <a 
              href="tel:+918296048243" 
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors group"
            >
              <Phone size={16} className="group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">8296048243</span>
            </a>
            <button
              onClick={() => scrollToSection('consultation')}
              className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
            >
              <Calendar size={16} />
              <span className="text-sm font-medium">Book Online</span>
            </button>
          </div>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 glass-effect rounded-lg p-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('credentials')}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              >
                Credentials
              </button>
              <button 
                onClick={() => scrollToSection('consultation')}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              >
                Online Consultation
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              >
                Contact
              </button>
              <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                <a href="tel:+918296048243" className="flex items-center space-x-2 text-blue-600">
                  <Phone size={16} />
                  <span className="font-medium">8296048243</span>
                </a>
                <a href="mailto:kavyabhat23895@gmail.com" className="flex items-center space-x-2 text-blue-600">
                  <Mail size={16} />
                  <span className="font-medium">Email</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;