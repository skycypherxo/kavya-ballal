import React from 'react';
import { Baby, Stethoscope, Scissors, Heart, Shield, Calendar, Microscope, Users, MapPin, Star, CheckCircle, ArrowRight } from 'lucide-react';

const Services: React.FC = () => {
  const mainServices = [
    {
      icon: Baby,
      title: 'Obstetric Care',
      description: 'Comprehensive prenatal, delivery, and postnatal care for healthy pregnancies.',
      features: ['High-risk pregnancy management', 'Prenatal checkups & monitoring', 'Delivery services', 'Postpartum care & support'],
      iconBg: 'from-blue-500 to-cyan-600',
      cardBg: 'from-blue-50 to-cyan-50'
    },
    {
      icon: Stethoscope,
      title: 'Gynecological Services',
      description: 'Complete women\'s health services from routine exams to specialized treatments.',
      features: ['Annual wellness examinations', 'Contraceptive counseling', 'Menopause management', 'Reproductive health care'],
      iconBg: 'from-cyan-500 to-blue-600',
      cardBg: 'from-cyan-50 to-blue-50'
    },
    {
      icon: Scissors,
      title: 'Minimal Access Surgery',
      description: 'Advanced laparoscopic and hysteroscopic procedures for faster recovery.',
      features: ['Laparoscopic ovarian surgery', 'Endometriosis treatment', 'Minimally invasive hysterectomy', 'Fibroid removal'],
      iconBg: 'from-indigo-500 to-purple-600',
      cardBg: 'from-indigo-50 to-purple-50'
    },
    {
      icon: Heart,
      title: 'Fertility Services',
      description: 'Comprehensive fertility evaluation and treatment options for couples.',
      features: ['Fertility assessment & counseling', 'Ovulation induction', 'IUI procedures', 'Reproductive health optimization'],
      iconBg: 'from-pink-500 to-rose-600',
      cardBg: 'from-pink-50 to-rose-50'
    },
    {
      icon: Shield,
      title: 'Preventive Care',
      description: 'Early detection and prevention of women\'s health conditions.',
      features: ['Cancer screening programs', 'Bone health assessment', 'Hormonal evaluations', 'Health maintenance plans'],
      iconBg: 'from-emerald-500 to-green-600',
      cardBg: 'from-emerald-50 to-green-50'
    },
    {
      icon: Calendar,
      title: 'Emergency Services',
      description: '24/7 emergency care for urgent obstetric and gynecological conditions.',
      features: ['Emergency consultations', 'Urgent surgical procedures', 'On-call availability', 'Hospital coordination'],
      iconBg: 'from-red-500 to-orange-600',
      cardBg: 'from-red-50 to-orange-50'
    }
  ];

  const specializations = [
    {
      icon: Microscope,
      title: 'Research & Evidence-Based Medicine',
      description: 'Contributing to medical knowledge through research and implementing the latest evidence-based practices for optimal patient outcomes.',
      stat: '15+',
      statLabel: 'Research Papers'
    },
    {
      icon: Users,
      title: 'Patient Education & Community Outreach',
      description: 'Empowering patients through comprehensive education and active participation in community health programs.',
      stat: '1000+',
      statLabel: 'Patients Educated'
    },
    {
      icon: Star,
      title: 'Multidisciplinary Collaboration',
      description: 'Working with specialists across various medical fields to provide comprehensive, coordinated patient care.',
      stat: '4',
  statLabel: 'Years Experience'
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Professional background elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{animationDelay: '3s'}}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Professional header */}
        <div className="text-center mb-15 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm text-blue-700 px-4 py-2 rounded-full text-xs font-semibold mb-6 shadow-lg border border-blue-100">
            <Star size={14} />
            <span className="font-heading">Our Medical Expertise</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-black font-heading text-gray-900 mb-6">
            Comprehensive <span className="text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text font-display">Services</span>
          </h2>
          <p className="text-base text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
            Providing a full spectrum of <span className="font-bold text-blue-600">obstetric and gynecological services</span> with expertise in 
            minimally invasive procedures and evidence-based care.
          </p>
        </div>

        {/* Professional service cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-18">
          {mainServices.map((service, index) => (
            <div key={index} className={`bg-gradient-to-br ${service.cardBg} p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group border border-white/50 backdrop-blur-sm relative overflow-hidden`}>
              {/* Service header */}
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${service.iconBg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <service.icon size={21} className="text-white" />
                </div>
                <h3 className="text-base font-bold font-heading text-gray-900 ml-3 group-hover:text-blue-700 transition-colors">
                  {service.title}
                </h3>
              </div>
              
              <p className="text-gray-700 mb-4 leading-relaxed font-medium text-sm">
                {service.description}
              </p>
              
              {/* Feature list */}
              <ul className="space-y-2 mb-4">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start text-xs text-gray-700">
                    <CheckCircle size={12} className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {/* Learn more link */}
              <div className="flex items-center text-blue-600 font-semibold text-xs group-hover:text-blue-700 transition-colors cursor-pointer">
                <span>Learn More</span>
                <ArrowRight size={12} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
              
              {/* Background decoration */}
              <div className="absolute -bottom-3 -right-3 w-18 h-18 bg-white/30 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
            </div>
          ))}
        </div>

        {/* Specializations section */}
        <div className="mb-20 animate-fade-in">
          <div className="text-center mb-16 mt-16">
            <h3 className="text-2xl font-black font-heading text-gray-900 mb-4">
              Areas of <span className="text-transparent bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text">Specialization</span>
            </h3>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              Specialized expertise in advanced medical areas that set us apart
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {specializations.map((spec, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 group border border-blue-100">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <spec.icon size={32} className="text-white" />
                  </div>
                  <div className="text-3xl font-black text-blue-600 mb-1">{spec.stat}</div>
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide">{spec.statLabel}</div>
                </div>
                
                <h4 className="text-xl font-bold font-heading text-gray-900 mb-4 text-center group-hover:text-blue-700 transition-colors">
                  {spec.title}
                </h4>
                <p className="text-gray-700 leading-relaxed font-medium text-center">
                  {spec.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Professional CTA section */}
        <div className="text-center bg-white/80 backdrop-blur-sm p-9 rounded-3xl shadow-2xl border border-blue-100 animate-fade-in">
          <div className="mb-6">
            <h3 className="text-xl font-black font-heading text-gray-900 mb-3">
              Ready to Schedule Your <span className="text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text">Consultation?</span>
            </h3>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto font-medium">
              Take the first step towards comprehensive women's healthcare with personalized treatment plans.
            </p>
          </div>
          
          {/* Practice locations with embedded maps */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-3 rounded-xl border border-blue-100 shadow-md">
              <div className="mb-2">
                <h4 className="text-base font-bold font-heading text-gray-900 mb-1">Government Hospital</h4>
                <p className="text-gray-600 text-xs font-medium">Kundapura, Karnataka</p>
              </div>
              <div className="w-full h-48 rounded-lg overflow-hidden border-2 border-dashed border-blue-300">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3882.234567890123!2d74.69123456789012!3d13.616789012345678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDM3JzAwLjQiTiA3NMKwNDEnMjguNCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Government Hospital Kundapura"
                ></iframe>
              </div>
              <a 
                href="https://maps.app.goo.gl/3yC17cmT4SLEjNrbA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block mt-2 text-center text-xs text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-colors duration-200"
              >
                📍 View Larger Map →
              </a>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-3 rounded-xl border border-blue-100 shadow-md">
              <div className="mb-2">
                <h4 className="text-base font-bold font-heading text-gray-900 mb-1">Ballal's Healthcare</h4>
                <p className="text-gray-600 text-xs font-medium">Santhekatte, Udupi</p>
              </div>
              <div className="w-full h-48 rounded-lg overflow-hidden border-2 border-dashed border-blue-300">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3882.987654321098!2d74.75123456789012!3d13.345678901234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDIwJzQ0LjQiTiA3NMKwNDUnMDQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ballal's Healthcare Santhekatte"
                ></iframe>
              </div>
              <a 
                href="https://maps.app.goo.gl/q9Z8857RKL2Daa7o7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block mt-2 text-center text-xs text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-colors duration-200"
              >
                📍 View Larger Map →
              </a>
            </div>
          </div>
          
          <button
            onClick={() => document.getElementById('consultation')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-medical-primary inline-flex items-center text-base font-heading"
          >
            Book Your Appointment
            <Calendar className="ml-3" size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
