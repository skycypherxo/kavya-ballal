import React from 'react';
import { Baby, Stethoscope, Scissors, Heart, Shield, Calendar, Microscope, Users, MapPin } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Baby,
      title: 'Obstetric Care',
      description: 'Comprehensive prenatal, delivery, and postnatal care for healthy pregnancies.',
      features: ['High-risk pregnancy management', 'Prenatal checkups & monitoring', 'Delivery services', 'Postpartum care & support'],
      color: 'blue'
    },
    {
      icon: Stethoscope,
      title: 'Gynecological Services',
      description: 'Complete women\'s health services from routine exams to specialized treatments.',
      features: ['Annual wellness examinations', 'Contraceptive counseling', 'Menopause management', 'Reproductive health care'],
      color: 'teal'
    },
    {
      icon: Scissors,
      title: 'Minimal Access Surgery',
      description: 'Advanced laparoscopic and hysteroscopic procedures for faster recovery.',
      features: ['Laparoscopic ovarian surgery', 'Endometriosis treatment', 'Minimally invasive hysterectomy', 'Fibroid removal'],
      color: 'purple'
    },
    {
      icon: Heart,
      title: 'Fertility Services',
      description: 'Comprehensive fertility evaluation and treatment options for couples.',
      features: ['Fertility assessment & counseling', 'Ovulation induction', 'IUI procedures', 'Reproductive health optimization'],
      color: 'pink'
    },
    {
      icon: Shield,
      title: 'Preventive Care',
      description: 'Early detection and prevention of women\'s health conditions.',
      features: ['Cancer screening programs', 'Bone health assessment', 'Hormonal evaluations', 'Health maintenance plans'],
      color: 'green'
    },
    {
      icon: Calendar,
      title: 'Emergency Services',
      description: '24/7 emergency care for urgent obstetric and gynecological conditions.',
      features: ['Emergency consultations', 'Urgent surgical procedures', 'On-call availability', 'Hospital coordination'],
      color: 'red'
    }
  ];

  const specializations = [
    {
      icon: Microscope,
      title: 'High-Risk Obstetrics',
      description: 'Specialized care for complex pregnancies requiring advanced monitoring and management.'
    },
    {
      icon: Users,
      title: 'Adolescent Gynecology',
      description: 'Sensitive and age-appropriate care for young women entering reproductive years.'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-100 to-blue-200 text-blue-600',
      teal: 'from-teal-100 to-teal-200 text-teal-600',
      purple: 'from-purple-100 to-purple-200 text-purple-600',
      pink: 'from-pink-100 to-pink-200 text-pink-600',
      green: 'from-green-100 to-green-200 text-green-600',
      red: 'from-red-100 to-red-200 text-red-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold font-display text-gray-900 mb-6">
            Comprehensive Services
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Providing a full spectrum of obstetric and gynecological services with expertise in 
            minimally invasive procedures and evidence-based care.
          </p>
        </div>

        {/* Main Services */}
        <div className="masonry-grid mb-20">
          {services.map((service, index) => (
            <div key={index} className="masonry-item">
              <div className="premium-card p-8 group transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${getColorClasses(service.color)} rounded-2xl group-hover:scale-110 transition-transform`}>
                  <service.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-4">
                  {service.title}
                </h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>
              <ul className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start text-sm text-gray-700">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Specializations */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold font-display text-center text-gray-900 mb-12">
            Areas of Specialization
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {specializations.map((spec, index) => (
              <div key={index} className="premium-card p-8 hover-lift bg-gradient-to-br from-blue-50 to-teal-50">
                <div className="flex items-center mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-md">
                    <spec.icon className="text-blue-600" size={20} />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 ml-4">
                    {spec.title}
                  </h4>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {spec.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center premium-card p-12">
          {/* Practice Images */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold font-display text-gray-900 mb-8">
              Our Practice & Facilities
            </h3>
            <div className="masonry-grid">
              <div className="masonry-item">
                <div className="premium-card overflow-hidden group">
                <img
                  src="/WhatsApp Image 2025-07-22 at 19.04.39.jpeg"
                  alt="Dr. Kavya at Government Hospital Kundapura"
                  className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <MapPin className="text-blue-600" size={18} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Government Hospital</h4>
                      <p className="text-sm text-gray-600">Kundapura, Karnataka</p>
                    </div>
                  </div>
                </div>
                </div>
              </div>
              <div className="masonry-item">
                <div className="premium-card overflow-hidden group">
                <img
                  src="/WhatsApp Image 2025-07-22 at 19.02.39.jpeg"
                  alt="Ballal's Clinic Santhekatte"
                  className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                      <MapPin className="text-teal-600" size={18} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Ballal's Clinic</h4>
                      <p className="text-sm text-gray-600">Santhekatte, Udupi</p>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold font-display text-gray-900 mb-4">
            Ready to Schedule Your Consultation?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you need routine care or specialized treatment, Dr. Kavya is here to provide 
            personalized, compassionate healthcare tailored to your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#consultation"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Calendar className="mr-2" size={20} />
              Book Online Consultation
            </a>
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-300"
            >
              Visit Clinic
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;