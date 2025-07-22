import React from 'react';
import { Heart, Users, Star, Shield } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: 'Compassionate Care',
      description: 'Every patient receives personalized attention and care tailored to their unique needs.'
    },
    {
      icon: Star,
      title: 'Excellence',
      description: 'Committed to the highest standards of medical practice and continuous learning.'
    },
    {
      icon: Users,
      title: 'Patient-Centered',
      description: 'Building strong relationships based on trust, communication, and mutual respect.'
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Utilizing the latest techniques and technology to ensure the safest outcomes.'
    }
  ];

  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            About Dr. Kavya Ballal
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A dedicated healthcare professional committed to providing exceptional 
            women's health services with expertise in both traditional and minimally invasive procedures.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="https://images.pexels.com/photos/7689942/pexels-photo-7689942.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Dr. Kavya in medical setting"
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Professional Background
            </h3>
            <div className="space-y-4 text-gray-700">
              <p>
                Dr. Kavya Ballal brings over 15 years of specialized experience in obstetrics, 
                gynecology, and laparoscopic surgery. She is passionate about providing 
                comprehensive women's healthcare from adolescence through menopause.
              </p>
              <p>
                With expertise in minimally invasive laparoscopic procedures, Dr. Ballal 
                ensures patients receive the most advanced treatment options with faster 
                recovery times and minimal scarring.
              </p>
              <p>
                She believes in building strong doctor-patient relationships through open 
                communication, education, and collaborative decision-making to achieve 
                the best possible outcomes for every patient.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-900 rounded-full mb-4 group-hover:bg-blue-900 group-hover:text-white transition-colors">
                <value.icon size={24} />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">
                {value.title}
              </h4>
              <p className="text-gray-600">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;