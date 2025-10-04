import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Mrs. Vani',
      procedure: 'Normal Delivery',
      rating: 5,
      text: 'Dr. Kavya Ballal made my delivery journey smooth and stress-free. She is caring, approachable and highly skilled. Forever grateful for her support.',
      location: 'Udupi'
    },
    {
      name: 'Mrs. Sumati',
      procedure: 'Pregnancy Care',
      rating: 5,
      text: 'Wonderful experience with Dr. Kavya Ballal. She guided me throughout pregnancy with patience and ensured a safe delivery. Truly compassionate doctor.',
      location: 'Kundapura'
    },
    {
      name: 'Veena Shet',
      procedure: 'LSCS (C-Section)',
      rating: 5,
      text: 'I had to undergo an LSCS and Dr. Kavya Ballal made me feel safe throughout. Her surgical skills and gentle approach gave me complete confidence.',
      location: 'Mangalore'
    },
    {
      name: 'Reshma',
      procedure: 'Delivery',
      rating: 5,
      text: 'From start to finish, Dr. Kavya Ballal was like a pillar of strength. My delivery was safe and smooth thanks to her guidance and kindness.',
      location: 'Manipal'
    },
    {
      name: 'Nayana S',
      procedure: 'Normal Delivery',
      rating: 5,
      text: 'Amazing doctor! Dr. Kavya Ballal patiently explained everything, answered my doubts, and was with me throughout my delivery. Couldn’t have asked for better care.',
      location: 'Udupi'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Patient Testimonials
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Read what our patients have to say about their experience with Dr. Kavya Ballal.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 relative">
              <div className="absolute top-4 right-4">
                <Quote className="text-blue-100" size={24} />
              </div>
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={16} />
                ))}
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              <div className="border-t border-gray-100 pt-4">
                <h4 className="font-semibold text-gray-900">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-blue-900 font-medium">
                  {testimonial.procedure}
                </p>
                <p className="text-sm text-gray-500">
                  {testimonial.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-900 px-6 py-3 rounded-full">
            <Star className="fill-current" size={20} />
            <span className="font-semibold">4.9/5 Patient Satisfaction Rating</span>
          </div>
        </div>

        
      </div>
    </section>
  );
};

export default Testimonials;
