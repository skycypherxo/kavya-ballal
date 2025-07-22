import React from 'react';
import { Calendar, MapPin, Award } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="pt-32 pb-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Dr. Kavya Ballal
            </h1>
            <h2 className="text-xl lg:text-2xl text-blue-900 mb-6 font-medium">
              Obstetrician & Gynecologist<br />
              Laparoscopic Surgeon
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Providing comprehensive women's healthcare with over 15 years of experience 
              in obstetrics, gynecology, and minimally invasive laparoscopic surgery. 
              Committed to compassionate, patient-centered care.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-3">
                <Award className="text-blue-900" size={20} />
                <span className="text-gray-700">Board Certified</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-blue-900" size={20} />
                <span className="text-gray-700">Multiple Locations</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors"
              >
                <Calendar className="mr-2" size={20} />
                Schedule Appointment
              </a>
              <a
                href="#about"
                className="inline-flex items-center justify-center px-6 py-3 border border-blue-900 text-blue-900 font-medium rounded-lg hover:bg-blue-50 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl shadow-xl flex items-center justify-center">
              <img
                src="https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=500"
                alt="Dr. Kavya Ballal"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-900">15+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;