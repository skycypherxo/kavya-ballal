import React from 'react';
import { Baby, Stethoscope, Scissors, Heart, Shield, Calendar } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Baby,
      title: 'Obstetric Care',
      description: 'Comprehensive prenatal, delivery, and postnatal care for healthy pregnancies.',
      features: ['Prenatal checkups', 'High-risk pregnancy management', 'Delivery services', 'Postpartum care']
    },
    {
      icon: Stethoscope,
      title: 'Gynecological Services',
      description: 'Complete women\'s health services from routine exams to specialized treatments.',
      features: ['Annual wellness exams', 'Contraceptive counseling', 'Menopause management', 'Reproductive health']
    },
    {
      icon: Scissors,
      title: 'Laparoscopic Surgery',
      description: 'Minimally invasive surgical procedures for faster recovery and better outcomes.',
      features: ['Ovarian cyst removal', 'Endometriosis treatment', 'Hysterectomy', 'Fibroid removal']
    },
    {
      icon: Heart,
      title: 'Fertility Services',
      description: 'Comprehensive fertility evaluation and treatment options for couples.',
      features: ['Fertility assessment', 'Ovulation induction', 'IUI procedures', 'Fertility counseling']
    },
    {
      icon: Shield,
      title: 'Preventive Care',
      description: 'Early detection and prevention of women\'s health conditions.',
      features: ['Cancer screenings', 'Bone health assessment', 'Hormonal evaluations', 'Health maintenance']
    },
    {
      icon: Calendar,
      title: 'Emergency Services',
      description: '24/7 emergency care for urgent obstetric and gynecological conditions.',
      features: ['Emergency consultations', 'Urgent surgical procedures', 'On-call services', 'Hospital privileges']
    }
  ];

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Providing a full range of obstetric and gynecological services with 
            expertise in minimally invasive laparoscopic procedures.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group">
              <div className="flex items-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-900 rounded-lg group-hover:bg-blue-900 group-hover:text-white transition-colors">
                  <service.icon size={20} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-4">
                  {service.title}
                </h3>
              </div>
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-blue-900 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors"
          >
            Schedule Consultation
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;