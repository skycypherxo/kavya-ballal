import React from 'react';
import { Calendar, MapPin, Award, Palette, Stethoscope, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 pt-20 pb-16 relative overflow-hidden">
      {/* Professional background elements - inspired by modern medical websites */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-slate-100 to-blue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-float" style={{animationDelay: '4s'}}></div>
      
      {/* Clean geometric shapes */}
      <div className="absolute top-32 right-1/4 w-32 h-32 border border-blue-200 rounded-3xl rotate-45 opacity-20 animate-rotate-slow"></div>
      <div className="absolute bottom-32 left-1/3 w-24 h-24 bg-gradient-to-br from-cyan-200 to-blue-200 clip-professional opacity-25 animate-bounce-gentle"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-20 items-center min-h-[85vh]">
          <div className="animate-slide-up space-y-8">
            <div className="inline-flex items-center space-x-3 bg-white/90 backdrop-blur-sm text-blue-700 px-6 py-3 rounded-full text-body-sm font-semibold mb-6 shadow-lg">
              <Stethoscope size={18} />
              <span className="text-body-sm">Practicing in Udupi, Karnataka</span>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
            
            <div className="space-y-6">
                <span className="block text-transparent bg-gradient-to-r from-pink-600 via-yellow-600 to-red-800 bg-clip-text text-display font-black">Dr. Kavya Ballal</span>
              
              
              <div className="space-y-3">
                <h2 className="text-heading-lg lg:text-heading-xl text-gray-700 font-bold">
                  Obstetrician & Gynecologist
                </h2>
                <h3 className="text-heading-md lg:text-heading-lg text-transparent bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text font-semibold">
                  Minimal Access Surgeon | Classical Artist
                </h3>
              </div>
            </div>
            
            <p className="text-body text-gray-600 leading-relaxed max-w-xl font-medium">
              Delivering comprehensive, compassionate, and evidence-based care across all stages 
              of a woman's reproductive life with over <span className="font-bold text-blue-600">5 years</span> of clinical experience.
            </p>
            
            {/* Professional credential cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-blue-100">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Award size={24} className="text-white" />
                  </div>
                  <div>
                    <span className="text-gray-900 font-bold text-heading-md">MS in OB/GYN</span>
                    <p className="text-body-sm text-gray-600 font-medium">A.J. Institute, Mangalore</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-blue-100">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Palette size={24} className="text-white" />
                  </div>
                  <div>
                    <span className="text-gray-900 font-bold text-heading-md">Classical Artist</span>
                    <p className="text-body-sm text-gray-600 font-medium">Bharatanatyam & Kuchipudi</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <button
                onClick={() => scrollToSection('consultation')}
                className="btn-medical-primary group relative inline-flex items-center justify-center text-body-lg overflow-hidden"
              >
                <Calendar className="mr-3 group-hover:rotate-12 transition-transform" size={24} />
                Book Online Consultation
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="btn-medical-outline inline-flex items-center justify-center text-body-lg"
              >
                Learn More About Me
              </button>
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="relative">
              {/* Main image with professional styling */}
              <div className="relative group">
                <div className="aspect-[4/5] bg-gradient-to-br from-blue-50 via-white to-cyan-50 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 border border-blue-100">
                  <img
                    src="/images/WhatsApp Image 2025-07-22 at 19.02.39.jpeg"
                    alt="Dr. Kavya Ballal"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 via-transparent to-transparent"></div>
                </div>
                
                {/* Professional decorative frame */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-200 via-cyan-200 to-blue-200 rounded-3xl -z-10 blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              </div>
              
              {/* Professional floating stats - compact and elegant */}
              <div className="absolute -top-3 -right-3 bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-md border border-blue-100 animate-float">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">5+</div>
                  <div className="text-xs text-gray-600 font-medium">Years</div>
                </div>
              </div>
              
              <div className="absolute -bottom-3 -left-3 bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-md border border-cyan-100 animate-float" style={{animationDelay: '1s'}}>
                <div className="text-center">
                  <div className="text-lg font-bold text-cyan-600">2</div>
                  <div className="text-xs text-gray-600 font-medium">Locations</div>
                </div>
              </div>

              {/* Clean decorative elements */}
              <div className="absolute top-1/4 -left-8 w-20 h-20 bg-gradient-to-br from-yellow-200 to-orange-300 rounded-full opacity-40 blur-sm animate-bounce-gentle"></div>
              <div className="absolute bottom-1/3 -right-8 w-16 h-16 bg-gradient-to-br from-green-200 to-emerald-300 clip-professional opacity-40 animate-float" style={{animationDelay: '3s'}}></div>
            </div>
          </div>
        </div>

        {/* Enhanced practice locations with map links */}
        <div className="mt-24 grid md:grid-cols-2 gap-8 animate-fade-in">
          <a 
            href="https://maps.app.goo.gl/3yC17cmT4SLEjNrbA" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-blue-100 hover:border-blue-200"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <MapPin className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 font-heading">Government Hospital</h3>
                <p className="text-gray-600 text-lg font-medium">Kundapura, Karnataka</p>
              </div>
            </div>
          </a>
          
          <a 
            href="https://maps.app.goo.gl/q9Z8857RKL2Daa7o7" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-blue-100 hover:border-blue-200"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <MapPin className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 font-heading">Ballal's Healthcare</h3>
                <p className="text-gray-600 text-lg font-medium">Santhekatte, Udupi</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;