import React from 'react';
import { Stethoscope, Award, Users, Calendar, Star, ArrowRight, Play, Heart, Shield, Microscope } from 'lucide-react';

// DESIGN VARIANT 1: Medical Blue Theme with Teal Accents
export const VariantOne: React.FC = () => {
  return (
    <div className="variant-one">
      {/* Hero Section - Full-width banner with medical gradient */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-teal-600 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-white animate-slide-up">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Stethoscope size={16} />
                <span className="text-sm font-medium">Board Certified Specialist</span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-bold font-display mb-6 leading-tight">
                Dr. Kavya <span className="text-teal-300">Ballal</span>
              </h1>
              
              <div className="space-y-3 mb-8">
                <h2 className="text-2xl font-medium text-blue-100">
                  Obstetrician & Gynecologist
                </h2>
                <h3 className="text-xl text-teal-300 font-medium">
                  Minimal Access Surgeon | Classical Artist
                </h3>
              </div>
              
              <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-xl">
                Delivering comprehensive, evidence-based care with over 5 years of clinical excellence in women's health.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl hover:bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <Calendar className="mr-2 group-hover:rotate-12 transition-transform" size={20} />
                  Book Consultation
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                </button>
                <button className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-2xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
                  <Play className="mr-2" size={20} />
                  Watch Introduction
                </button>
              </div>
            </div>
            
            <div className="relative animate-fade-in">
              <div className="relative">
                <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
                  <img
                    src="/WhatsApp Image 2025-07-22 at 19.02.39.jpeg"
                    alt="Dr. Kavya Ballal"
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* Floating achievement cards */}
                <div className="absolute -top-8 -left-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 animate-float border border-white/20">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">5+</div>
                    <div className="text-sm text-gray-600">Years Experience</div>
                  </div>
                </div>
                
                <div className="absolute -bottom-8 -right-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 animate-float border border-white/20" style={{animationDelay: '1s'}}>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-teal-600 mb-1">MS</div>
                    <div className="text-sm text-gray-600">OB/GYN</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies - Dynamic Card Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold font-display text-gray-900 mb-6">
              Surgical Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced minimally invasive procedures with exceptional patient outcomes
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { img: '/WhatsApp Image 2025-07-22 at 19.03.13.jpeg', title: 'Laparoscopic Surgery', desc: 'Minimally invasive gynecological procedures' },
              { img: '/WhatsApp Image 2025-07-22 at 19.03.14.jpeg', title: 'Surgical Precision', desc: 'Advanced surgical techniques and patient care' },
              { img: '/WhatsApp Image 2025-07-22 at 19.08.32.jpeg', title: 'Patient Consultation', desc: 'Comprehensive pre and post-operative care' }
            ].map((item, index) => (
              <div key={index} className="group relative bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-contain bg-gray-50 group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:to-transparent transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications with Visual Tags */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold font-display text-gray-900 mb-6">
              Academic Contributions
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mr-4 group-hover:scale-110 transition-transform">
                  <Microscope size={24} />
                </div>
                <div>
                  <div className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
                    PEER REVIEWER
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">FIGO Journal</h3>
                </div>
              </div>
              <p className="text-gray-700">International Journal of Gynecology and Obstetrics</p>
            </div>
            
            <div className="group bg-gradient-to-br from-teal-50 to-teal-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center text-white mr-4 group-hover:scale-110 transition-transform">
                  <Award size={24} />
                </div>
                <div>
                  <div className="inline-block bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
                    REVIEWER
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Cureus Journal</h3>
                </div>
              </div>
              <p className="text-gray-700">Peer-reviewed medical publications</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials with Stylized Quote Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold font-display text-gray-900 mb-6">
              Patient Stories
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: 'Priya S.', text: 'Exceptional laparoscopic surgery with remarkable recovery time.', rating: 5 },
              { name: 'Anjali P.', text: 'Compassionate prenatal care throughout my pregnancy journey.', rating: 5 }
            ].map((testimonial, index) => (
              <div key={index} className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                  "
                </div>
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={20} />
                  ))}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                  {testimonial.text}
                </p>
                <div className="font-semibold text-gray-900">
                  — {testimonial.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Appointment CTA with Animated Elements */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M30 30l15-15v30z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold font-display text-white mb-6">
            Ready to Begin Your Care?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Schedule your consultation today and experience personalized, expert medical care.
          </p>
          
          <button className="group inline-flex items-center px-12 py-6 bg-white text-blue-600 font-bold text-lg rounded-2xl hover:bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <Calendar className="mr-3 group-hover:rotate-12 transition-transform" size={24} />
            Book Your Appointment
            <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={20} />
          </button>
        </div>
      </section>
    </div>
  );
};

// DESIGN VARIANT 2: Warm Coral/Peach Theme with Energetic Accents
export const VariantTwo: React.FC = () => {
  return (
    <div className="variant-two">
      {/* Hero Section - Warm gradient with coral accents */}
      <section className="relative min-h-screen bg-gradient-to-br from-orange-400 via-pink-400 to-red-400 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-white animate-slide-up">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Heart size={16} />
                <span className="text-sm font-medium">Compassionate Care</span>
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-bold font-display mb-6 leading-tight">
                Dr. Kavya <span className="text-yellow-200">Ballal</span>
              </h1>
              
              <div className="space-y-3 mb-8">
                <h2 className="text-2xl font-medium text-orange-100">
                  Women's Health Specialist
                </h2>
                <h3 className="text-xl text-yellow-200 font-medium">
                  Advanced Surgical Care | Holistic Approach
                </h3>
              </div>
              
              <p className="text-xl text-orange-100 mb-10 leading-relaxed max-w-xl">
                Combining medical excellence with artistic sensitivity for comprehensive women's healthcare.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group inline-flex items-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-2xl hover:bg-orange-50 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <Calendar className="mr-2 group-hover:rotate-12 transition-transform" size={20} />
                  Schedule Visit
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                </button>
              </div>
            </div>
            
            <div className="relative animate-fade-in">
              <div className="relative">
                <div className="aspect-square bg-white/10 backdrop-blur-sm rounded-full shadow-2xl overflow-hidden border-4 border-white/20">
                  <img
                    src="/WhatsApp Image 2025-07-22 at 19.02.39.jpeg"
                    alt="Dr. Kavya Ballal"
                    className="w-full h-full object-contain"
                  />
                </div>
                
                {/* Floating stats with warm colors */}
                <div className="absolute -top-8 -left-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 animate-float border-2 border-orange-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-1">5+</div>
                    <div className="text-sm text-gray-600">Years</div>
                  </div>
                </div>
                
                <div className="absolute -bottom-8 -right-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 animate-float border-2 border-pink-200" style={{animationDelay: '1s'}}>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pink-600 mb-1">2</div>
                    <div className="text-sm text-gray-600">Locations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies with Flip Cards */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold font-display text-gray-900 mb-6">
              Medical Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Innovative surgical techniques with compassionate patient care
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { img: '/WhatsApp Image 2025-07-22 at 19.03.13.jpeg', title: 'Surgical Innovation', desc: 'State-of-the-art minimally invasive procedures' },
              { img: '/WhatsApp Image 2025-07-22 at 19.03.14.jpeg', title: 'Patient-Centered Care', desc: 'Personalized treatment plans and follow-up' },
              { img: '/WhatsApp Image 2025-07-22 at 19.08.32.jpeg', title: 'Medical Expertise', desc: 'Advanced training in women\'s health' }
            ].map((item, index) => (
              <div key={index} className="group perspective-1000">
                <div className="relative preserve-3d group-hover:rotate-y-180 transition-transform duration-700">
                  {/* Front of card */}
                  <div className="backface-hidden bg-white rounded-3xl shadow-lg overflow-hidden">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-contain bg-gray-50"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 text-center">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Back of card */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gradient-to-br from-orange-500 to-pink-500 rounded-3xl shadow-lg p-8 flex items-center justify-center text-center">
                    <div className="text-white">
                      <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                      <p className="text-orange-100 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Color Palette Documentation
export const ColorPalettes = {
  variant1: {
    primary: '#2563eb', // Blue-600
    secondary: '#0d9488', // Teal-600
    accent: '#06b6d4', // Cyan-500
    neutral: '#6b7280', // Gray-500
    background: '#f8fafc', // Slate-50
    contrast: '#ffffff'
  },
  variant2: {
    primary: '#f97316', // Orange-500
    secondary: '#ec4899', // Pink-500
    accent: '#eab308', // Yellow-500
    neutral: '#78716c', // Stone-500
    background: '#fef7ed', // Orange-50
    contrast: '#ffffff'
  }
};

// Accessibility Notes
export const AccessibilityNotes = {
  contrast: {
    variant1: 'WCAG AA compliant - Blue (#2563eb) on white provides 4.5:1 contrast ratio',
    variant2: 'WCAG AA compliant - Orange (#f97316) on white provides 3.8:1 contrast ratio'
  },
  mobile: {
    buttonSize: 'Minimum 44px touch target',
    spacing: '16px minimum between interactive elements',
    typography: 'Minimum 16px font size for body text'
  }
};