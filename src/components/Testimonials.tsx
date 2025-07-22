import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: 'Priya Sharma',
      procedure: 'Laparoscopic Surgery',
      rating: 5,
      text: 'Dr. Kavya performed my laparoscopic surgery with such precision and care. The recovery was much faster than I expected, and her follow-up care was exceptional.',
      location: 'Mumbai'
    },
    {
      name: 'Anjali Patel',
      procedure: 'Prenatal Care',
      rating: 5,
      text: 'Throughout my pregnancy, Dr. Kavya was incredibly supportive and knowledgeable. She made me feel confident and comfortable during every visit.',
      location: 'Pune'
    },
    {
      name: 'Meera Reddy',
      procedure: 'Gynecological Care',
      rating: 5,
      text: 'Dr. Kavya is not just an excellent doctor but also a compassionate human being. She takes time to explain everything and addresses all concerns patiently.',
      location: 'Hyderabad'
    },
    {
      name: 'Sunita Gupta',
      procedure: 'Fertility Treatment',
      rating: 5,
      text: 'After years of trying, Dr. Kavya helped us achieve our dream of parenthood. Her expertise in fertility treatment is remarkable, and we are forever grateful.',
      location: 'Bangalore'
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