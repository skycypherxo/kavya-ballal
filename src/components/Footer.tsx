import React from 'react';
import { Heart, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-4">Dr. Kavya Ballal</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Dedicated to providing exceptional women's healthcare with expertise in 
                obstetrics, gynecology, and laparoscopic surgery. Your health and 
                well-being are our top priorities.
              </p>
              <div className="flex items-center text-gray-300 mb-4">
                <Heart className="mr-2" size={16} />
                <span className="text-sm">Compassionate Care Since 2005</span>
              </div>
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
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-wrap justify-between items-center w-full gap-6">
            <div className="flex items-center gap-6">
              <span className="text-gray-400 text-sm">© 2024 Dr. Kavya Ballal. All rights reserved.</span>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Medical Disclaimer</a>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/dr_kavyabhatballal?igsh=MTZvMWRvMDRiZWRpeQ==" target="_blank" rel="noopener noreferrer" className="flex items-center group hover:bg-gray-800 px-3 py-2 rounded transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-pink-500 transition-colors mr-2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>
                <span className="text-sm text-gray-400 group-hover:text-pink-500 transition-colors">Instagram</span>
              </a>
              <a href="https://www.facebook.com/kavya.bhat.921" target="_blank" rel="noopener noreferrer" className="flex items-center group hover:bg-gray-800 px-3 py-2 rounded transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 group-hover:text-blue-500 transition-colors mr-2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                <span className="text-sm text-gray-400 group-hover:text-blue-500 transition-colors">Facebook</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;