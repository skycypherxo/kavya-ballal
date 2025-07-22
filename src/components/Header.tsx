import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-900">
              Dr. Kavya Ballal
            </h1>
            <div className="hidden sm:block ml-4 text-sm text-gray-600">
              <p>Obstetrician & Gynecologist</p>
              <p>Laparoscopic Surgeon</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-blue-900 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-blue-900 transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('credentials')}
              className="text-gray-700 hover:text-blue-900 transition-colors"
            >
              Credentials
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-blue-900 transition-colors"
            >
              Contact
            </button>
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <a href="tel:+1234567890" className="flex items-center space-x-2 text-blue-900 hover:text-blue-700 transition-colors">
              <Phone size={16} />
              <span className="text-sm">(123) 456-7890</span>
            </a>
            <a href="mailto:dr.kavya@example.com" className="flex items-center space-x-2 text-blue-900 hover:text-blue-700 transition-colors">
              <Mail size={16} />
              <span className="text-sm">Contact</span>
            </a>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4 pt-4">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-left text-gray-700 hover:text-blue-900 transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-left text-gray-700 hover:text-blue-900 transition-colors"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('credentials')}
                className="text-left text-gray-700 hover:text-blue-900 transition-colors"
              >
                Credentials
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-left text-gray-700 hover:text-blue-900 transition-colors"
              >
                Contact
              </button>
              <div className="flex flex-col space-y-2 pt-2">
                <a href="tel:+1234567890" className="flex items-center space-x-2 text-blue-900">
                  <Phone size={16} />
                  <span>(123) 456-7890</span>
                </a>
                <a href="mailto:dr.kavya@example.com" className="flex items-center space-x-2 text-blue-900">
                  <Mail size={16} />
                  <span>dr.kavya@example.com</span>
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