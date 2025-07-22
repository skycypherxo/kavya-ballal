import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Calendar, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message. We will contact you soon!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const locations = [
    {
      name: 'Main Clinic',
      address: '123 Medical Center Drive, Healthcare Complex, Mumbai 400001',
      phone: '+91 98765 43210',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM, Sat: 9:00 AM - 2:00 PM'
    },
    {
      name: 'Secondary Clinic',
      address: '456 Women\'s Health Plaza, Medical District, Pune 411001',
      phone: '+91 98765 43211',
      hours: 'Tue, Thu, Sat: 10:00 AM - 4:00 PM'
    }
  ];

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Contact & Schedule
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to schedule your appointment? Get in touch with us today.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service of Interest
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a service</option>
                  <option value="obstetric">Obstetric Care</option>
                  <option value="gynecological">Gynecological Services</option>
                  <option value="laparoscopic">Laparoscopic Surgery</option>
                  <option value="fertility">Fertility Services</option>
                  <option value="preventive">Preventive Care</option>
                  <option value="emergency">Emergency Consultation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Please describe your concern or question..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center px-6 py-3 bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors"
              >
                <Send className="mr-2" size={20} />
                Send Message
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Clinic Information
            </h3>
            <div className="space-y-8">
              {locations.map((location, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    {location.name}
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="text-blue-900 mt-1" size={16} />
                      <span className="text-gray-700">{location.address}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="text-blue-900" size={16} />
                      <a href={`tel:${location.phone}`} className="text-gray-700 hover:text-blue-900">
                        {location.phone}
                      </a>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="text-blue-900 mt-1" size={16} />
                      <span className="text-gray-700">{location.hours}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-blue-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Calendar className="text-blue-900 mr-3" size={20} />
                <h4 className="text-lg font-semibold text-gray-900">
                  Emergency Services
                </h4>
              </div>
              <p className="text-gray-700 mb-4">
                24/7 emergency obstetric and gynecological care available.
                For urgent situations, please call directly.
              </p>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                <Phone className="mr-2" size={16} />
                Emergency: +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;