import React, { useState } from 'react';
import { Calendar, Clock, Video, Phone, MessageCircle, CheckCircle, Send, ChevronLeft, ChevronRight } from 'lucide-react';

const OnlineConsultation: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState('video');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    concern: '',
    previousConsultation: 'no'
  });

  const timeSlots = [
    { time: '09:00 AM', available: true },
    { time: '09:30 AM', available: true },
    { time: '10:00 AM', available: false },
    { time: '10:30 AM', available: true },
    { time: '11:00 AM', available: true },
    { time: '11:30 AM', available: true },
    { time: '02:00 PM', available: true },
    { time: '02:30 PM', available: false },
    { time: '03:00 PM', available: true },
    { time: '03:30 PM', available: true },
    { time: '04:00 PM', available: true },
    { time: '04:30 PM', available: true },
    { time: '05:00 PM', available: true },
    { time: '05:30 PM', available: true }
  ];

  const consultationTypes = [
    {
      id: 'video',
      icon: Video,
      title: 'Video Consultation',
      description: 'Face-to-face consultation via secure video call',
      price: '₹800',
      duration: '30 minutes'
    },
    {
      id: 'phone',
      icon: Phone,
      title: 'Phone Consultation',
      description: 'Voice consultation for quick queries',
      price: '₹500',
      duration: '20 minutes'
    },
    {
      id: 'chat',
      icon: MessageCircle,
      title: 'Chat Consultation',
      description: 'Text-based consultation with detailed responses',
      price: '₹300',
      duration: '24 hours response'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create email content
    const emailSubject = `Online Consultation Booking - ${formData.name}`;
    const emailBody = `
New Online Consultation Booking:

Patient Details:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Age: ${formData.age}

Consultation Details:
- Type: ${consultationTypes.find(type => type.id === consultationType)?.title}
- Date: ${selectedDate?.toLocaleDateString()}
- Time: ${selectedTime}
- Previous Consultation: ${formData.previousConsultation}

Chief Concern:
${formData.concern}

Please confirm the appointment and send consultation link/details.
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
      age: '',
      concern: '',
      previousConsultation: 'no'
    });
    setSelectedDate(null);
    setSelectedTime('');
    
    alert('Thank you for your message. Your email client will open to send the message.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Calendar functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateAvailable = (date: Date) => {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 30);
    return date >= today && date <= maxDate && date.getDay() !== 0; // Not Sunday
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Day headers
    dayNames.forEach(day => {
      days.push(
        <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
          {day}
        </div>
      );
    });

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isAvailable = isDateAvailable(date);
      const isSelected = selectedDate && 
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear();

      days.push(
        <div
          key={day}
          className={`calendar-day ${isSelected ? 'selected' : ''} ${!isAvailable ? 'disabled' : ''}`}
          onClick={() => isAvailable && setSelectedDate(date)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    const today = new Date();
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
    if (newMonth >= new Date(today.getFullYear(), today.getMonth())) {
      setCurrentMonth(newMonth);
    }
  };

  return (
    <section id="consultation" className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold font-display text-gray-900 mb-6">
            Online Consultation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Book a convenient online consultation from the comfort of your home. 
            Available for routine check-ups, follow-ups, and general gynecological concerns.
          </p>
        </div>

        {/* Consultation Types */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {consultationTypes.map((type) => (
            <div
              key={type.id}
              className={`premium-card p-8 cursor-pointer transition-all duration-300 border-2 ${
                consultationType === type.id 
                  ? 'border-blue-500 ring-4 ring-blue-100' 
                  : 'border-gray-100 hover:border-blue-200'
              }`}
              onClick={() => setConsultationType(type.id)}
            >
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${
                  consultationType === type.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  <type.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {type.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {type.description}
                </p>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-blue-600">
                    {type.price}
                  </div>
                  <div className="text-sm text-gray-500">
                    {type.duration}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Form */}
        <div className="premium-card p-8 lg:p-12">
          <h3 className="text-2xl font-bold font-display text-gray-900 mb-8 text-center">
            Book Your Consultation
          </h3>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h4>
              <div className="grid md:grid-cols-2 gap-6">
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
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    min="1"
                    max="100"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
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
            </div>

            {/* Date and Time Selection */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-6">Select Date & Time</h4>
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Calendar */}
                <div>
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <button
                        type="button"
                        onClick={prevMonth}
                        className="p-2 hover:bg-white rounded-lg transition-colors"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <h5 className="text-lg font-semibold">
                        {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </h5>
                      <button
                        type="button"
                        onClick={nextMonth}
                        className="p-2 hover:bg-white rounded-lg transition-colors"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                    <div className="calendar-grid">
                      {renderCalendar()}
                    </div>
                  </div>
                </div>
                
                {/* Time Slots */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Available Time Slots
                  </label>
                  {selectedDate ? (
                    <div className="grid grid-cols-2 gap-3">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.time}
                          type="button"
                          disabled={!slot.available}
                          onClick={() => setSelectedTime(slot.time)}
                          className={`time-slot ${selectedTime === slot.time ? 'selected' : ''} ${!slot.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {slot.time}
                          {!slot.available && <div className="text-xs text-gray-500 mt-1">Booked</div>}
                        </button>
                    ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Calendar size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Please select a date first</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Medical Information */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h4>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Have you consulted Dr. Kavya before?
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="previousConsultation"
                        value="yes"
                        checked={formData.previousConsultation === 'yes'}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      Yes
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="previousConsultation"
                        value="no"
                        checked={formData.previousConsultation === 'no'}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      No
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chief Concern / Reason for Consultation *
                  </label>
                  <textarea
                    name="concern"
                    value={formData.concern}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Please describe your symptoms or concerns in detail..."
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={!selectedDate || !selectedTime}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send className="mr-2" size={20} />
                Book Consultation
              </button>
              <p className="text-sm text-gray-500 mt-4">
                You will receive confirmation details via email within 24 hours
              </p>
            </div>
          </form>
        </div>

        {/* Important Notes */}
        <div className="mt-16 premium-card p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <CheckCircle className="text-green-600 mr-3" size={24} />
            Important Information
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-gray-600">
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                Consultations are available Monday to Saturday
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                Emergency cases require immediate in-person consultation
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                Payment can be made via UPI, bank transfer, or online
              </li>
            </ul>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                Prescription will be sent digitally after consultation
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                Follow-up consultations available at discounted rates
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                All consultations are completely confidential
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnlineConsultation;