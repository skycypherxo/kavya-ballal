import React from 'react';
import { Calendar, MapPin, Award, Palette, Stethoscope } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 pt-20 pb-16 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '2s'}}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          <div className="animate-slide-up">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Stethoscope size={16} />
              <span>Practicing in Udupi, Karnataka</span>
            </div>
            
            <h1 className="text-6xl lg:text-7xl font-bold font-display text-gray-900 mb-6 leading-tight">
              Dr. Kavya <span className="gradient-text">Ballal</span>
            </h1>
            
            <div className="space-y-2 mb-8">
              <h2 className="text-2xl lg:text-3xl text-gray-700 font-medium">
                Obstetrician & Gynecologist
              </h2>
              <h3 className="text-xl lg:text-2xl text-blue-600 font-medium">
                Minimal Access Surgeon | Classical Artist
              </h3>
            </div>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-xl">
              Delivering comprehensive, compassionate, and evidence-based care across all stages 
              of a woman's reproductive life with over 5 years of clinical experience.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-3 group">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                  <Award size={18} />
                </div>
                <div>
                  <span className="text-gray-900 font-medium">MS in OB/GYN</span>
                  <p className="text-sm text-gray-600">A.J. Institute, Mangalore</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-all duration-300 group-hover:scale-110">
                  <Palette size={18} />
                </div>
                <div>
                  <span className="text-gray-900 font-medium">Classical Artist</span>
                  <p className="text-sm text-gray-600">Bharatanatyam & Kuchipudi</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('consultation')}
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Calendar className="mr-2" size={20} />
                Book Online Consultation
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300"
              >
                Learn More
              </button>
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-blue-100 via-white to-teal-100 rounded-3xl shadow-2xl overflow-hidden">
                <img
                  src="/WhatsApp Image 2025-07-22 at 19.02.39.jpeg"
                  alt="Dr. Kavya Ballal"
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Floating cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 animate-float">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">5+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 animate-float" style={{animationDelay: '1s'}}>
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-600">2</div>
                  <div className="text-sm text-gray-600">Practice Locations</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Practice locations */}
        <div className="mt-20 grid md:grid-cols-2 gap-8 animate-fade-in">
          <div className="premium-card p-8 hover-lift">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <MapPin className="text-blue-600" size={20} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Government Hospital</h3>
            </div>
            <p className="text-gray-600 text-lg">Kundapura, Karnataka</p>
          </div>
          <div className="premium-card p-8 hover-lift">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <MapPin className="text-teal-600" size={20} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Ballal's Clinic</h3>
            </div>
            <p className="text-gray-600 text-lg">Santhekatte, Udupi</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;