import React from 'react';
import { Heart, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Dr. Kavya Ballal</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Dedicated to providing exceptional women's healthcare with expertise in 
              obstetrics, gynecology, and laparoscopic surgery. Your health and 
              well-being are our top priorities.
            </p>
            <div className="flex items-center text-gray-300">
              <Heart className="mr-2" size={16} />
              <span className="text-sm">Compassionate Care Since 2005</span>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#services" className="hover:text-white transition-colors">Obstetric Care</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Gynecological Services</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Laparoscopic Surgery</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Fertility Services</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Preventive Care</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start space-x-3">
                <MapPin className="mt-1" size={16} />
                <span className="text-sm">123 Medical Center Drive<br />Mumbai 400001</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} />
                <a href="tel:+919876543210" className="text-sm hover:text-white">+91 98765 43210</a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} />
                <a href="mailto:dr.kavya@example.com" className="text-sm hover:text-white">dr.kavya@example.com</a>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="mt-1" size={16} />
                <span className="text-sm">Mon-Fri: 9:00 AM - 6:00 PM<br />Sat: 9:00 AM - 2:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Dr. Kavya Ballal. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Medical Disclaimer</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;