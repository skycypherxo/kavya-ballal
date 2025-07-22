import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Calendar, Send, Stethoscope } from 'lucide-react';

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
    
    // Create email content
    const emailSubject = `Contact Form Submission - ${formData.name}`;
    const emailBody = `
New contact form submission:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Service Interest: ${formData.service}

Message:
${formData.message}
    `;

    // Create mailto link
    const mailtoLink = `mailto:kavyabhat23895@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
    
    alert('Thank you for your message. Your email client will open to send the message.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const locations = [
    {
      name: 'Government Hospital',
      address: 'Kundapura, Karnataka',
      phone: '+91 8296048243',
      hours: 'Mon-Fri: 9:00 AM - 5:00 PM',
      type: 'Government Practice',
      color: 'blue'
    },
    {
      name: 'Ballal\'s Clinic',
      address: 'Santhekatte, Udupi, Karnataka',
      phone: '+91 8296048243',
      hours: 'Mon-Sat: 6:00 PM - 8:00 PM',
      type: 'Private Practice',
      color: 'teal'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold font-display text-gray-900 mb-6">
            Contact & Visit
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to schedule your appointment? Get in touch with us today or visit one of our clinic locations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="animate-slide-up">
            <h3 className="text-2xl font-bold font-display text-gray-900 mb-8">
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select a service</option>
                  <option value="obstetric">Obstetric Care</option>
                  <option value="gynecological">Gynecological Services</option>
                  <option value="laparoscopic">Minimal Access Surgery</option>
                  <option value="fertility">Fertility Services</option>
                  <option value="preventive">Preventive Care</option>
                  <option value="consultation">Online Consultation</option>
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
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Please describe your concern or question..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Send className="mr-2" size={20} />
                Send Message
              </button>
            </form>
          </div>

          {/* Clinic Information */}
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold font-display text-gray-900 mb-8">
              Clinic Locations
            </h3>
            <div className="space-y-8">
              {locations.map((location, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-8 hover-lift">
                  <div className="flex items-center mb-4">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${
                      location.color === 'blue' ? 'bg-blue-100 text-blue-600' : 'bg-teal-100 text-teal-600'
                    }`}>
                      <Stethoscope size={20} />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-xl font-semibold text-gray-900">
                        {location.name}
                      </h4>
                      <span className={`text-sm font-medium ${
                        location.color === 'blue' ? 'text-blue-600' : 'text-teal-600'
                      }`}>
                        {location.type}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="text-gray-500 mt-1" size={16} />
                      <span className="text-gray-700">{location.address}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="text-gray-500" size={16} />
                      <a href={`tel:${location.phone}`} className="text-gray-700 hover:text-blue-600 transition-colors">
                        {location.phone}
                      </a>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="text-gray-500 mt-1" size={16} />
                      <span className="text-gray-700">{location.hours}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Contact */}
            <div className="mt-8 bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl p-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Phone className="text-blue-600 mr-3" size={20} />
                Quick Contact
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="text-blue-600" size={16} />
                  <a href="tel:+918296048243" className="text-gray-700 hover:text-blue-600 font-medium">
                    +91 8296048243
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="text-blue-600" size={16} />
                  <a href="mailto:kavyabhat23895@gmail.com" className="text-gray-700 hover:text-blue-600 font-medium">
                    kavyabhat23895@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Emergency Notice */}
            <div className="mt-8 bg-red-50 border border-red-200 rounded-2xl p-6">
              <div className="flex items-center mb-3">
                <Calendar className="text-red-600 mr-3" size={20} />
                <h4 className="text-lg font-semibold text-red-900">
                  Emergency Services
                </h4>
              </div>
              <p className="text-red-700 mb-4">
                For urgent obstetric and gynecological emergencies, please call directly 
                or visit the nearest emergency department.
              </p>
              <a
                href="tel:+918296048243"
                className="inline-flex items-center px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                <Phone className="mr-2" size={16} />
                Emergency: +91 8296048243
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;