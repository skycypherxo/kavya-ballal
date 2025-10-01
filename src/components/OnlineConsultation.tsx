import React, { useState } from 'react';
import { Calendar, Video, Phone, MessageCircle, CheckCircle, Send, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

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
    sex: '',
    address: '',
    concern: '',
    previousConsultation: 'no'
  });
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      description: 'Professional consultation over phone call',
      price: '₹600',
      duration: '20 minutes'
    },
    {
      id: 'chat',
      icon: MessageCircle,
      title: 'Chat Consultation',
      description: 'Text-based consultation with detailed responses',
      price: '₹400',
      duration: 'Within 24 hours'
    }
  ];

  // Helper to send booking email
  const sendBookingEmail = async (bookingData: any) => {
    try {
      console.log('Sending email with data:', bookingData);
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-booking-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            booking: bookingData,
            type: 'new_booking'
          })
        }
      );

      const responseText = await response.text();
      console.log('Email response status:', response.status);
      console.log('Email response:', responseText);

      if (!response.ok) {
        throw new Error(`Email service error: ${response.status} - ${responseText}`);
      }

      const result = JSON.parse(responseText);
      
      if (result.success) {
        return { success: true };
      } else {
        throw new Error(result.error || 'Unknown email error');
      }
    } catch (error) {
      console.error('Email sending error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time for your consultation.');
      return;
    }

    if (isSubmitting) {
      return; // Prevent double submission
    }

    setIsSubmitting(true);

    try {
      // Prepare booking data
      const bookingData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        age: parseInt(formData.age),
        sex: formData.sex,
        address: formData.address,
        concern: formData.concern,
        previous_consultation: formData.previousConsultation === 'yes',
        consultation_type: consultationType,
        appointment_date: selectedDate.toISOString().split('T')[0],
        appointment_time: selectedTime,
        status: 'pending',
        payment_screenshot: paymentScreenshot ? paymentScreenshot.name : null
      };

      console.log('Inserting booking into database...');
      
      // Insert into Supabase
      const { data, error } = await supabase
        .from('bookings')
        .insert([bookingData])
        .select();

      if (error) {
        console.error('Database error:', error);
        throw new Error(`Failed to save booking: ${error.message}`);
      }

      console.log('Booking saved successfully:', data);

      // Send email notification
      console.log('Sending email notification...');
      const emailResult = await sendBookingEmail(bookingData);

      if (emailResult.success) {
        alert('🎉 Booking confirmed! Confirmation emails have been sent to you and Dr. Kavya.');
      } else {
        alert(`✅ Booking saved successfully! However, there was an issue sending the email: ${emailResult.error}\n\nYour booking is confirmed and Dr. Kavya will contact you soon.`);
      }

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        age: '',
        sex: '',
        address: '',
        concern: '',
        previousConsultation: 'no'
      });
      setPaymentScreenshot(null);
      setSelectedDate(null);
      setSelectedTime('');
      setConsultationType('video');
      
    } catch (error) {
      console.error('Booking error:', error);
      alert(`❌ Error: ${error instanceof Error ? error.message : 'Failed to book appointment. Please try again.'}`);
    } finally {
      setIsSubmitting(false);
    }
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

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const selectDate = (day: number) => {
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selected >= today) {
      setSelectedDate(selected);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
    const today = new Date();
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isToday = date.toDateString() === today.toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      const isPast = date < today;

      days.push(
        <div
          key={day}
          className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''} ${isPast ? 'past' : ''}`}
          onClick={() => !isPast && selectDate(day)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return (
    <section id="consultation" className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="text-blue-600 mr-3" size={32} />
            <h2 className="text-display font-bold text-gray-900">
              Online Consultation
            </h2>
          </div>
          <p className="text-body-xl text-gray-600 max-w-3xl mx-auto">
            Get professional medical advice from the comfort of your home. Choose your preferred consultation method and book an appointment that fits your schedule.
          </p>
        </div>

        {/* Consultation Types */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {consultationTypes.map((type, index) => {
            const IconComponent = type.icon;
            const gradients = [
              'from-blue-500 to-indigo-600',
              'from-emerald-500 to-teal-600', 
              'from-purple-500 to-pink-600'
            ];
            const bgGradients = [
              'from-blue-50 to-indigo-50',
              'from-emerald-50 to-teal-50',
              'from-purple-50 to-pink-50'
            ];
            const isSelected = consultationType === type.id;
            
            return (
              <div
                key={type.id}
                onClick={() => setConsultationType(type.id)}
                className={`group relative overflow-hidden cursor-pointer transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${
                  isSelected ? 'scale-105 -translate-y-2' : ''
                }`}
              >
                <div className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                  isSelected 
                    ? `border-transparent bg-gradient-to-br ${bgGradients[index]} shadow-xl` 
                    : 'border-gray-100 bg-white shadow-md hover:shadow-lg hover:border-gray-200'
                }`}>
                  
                  {isSelected && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} opacity-5 rounded-2xl`}></div>
                  )}
                  
                  <div className="relative flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl transition-all duration-300 ${
                      isSelected 
                        ? `bg-gradient-to-br ${gradients[index]} text-white shadow-md` 
                        : `bg-gradient-to-br ${gradients[index]} bg-opacity-10 text-gray-600 group-hover:bg-opacity-15`
                    }`}>
                      <IconComponent size={24} className={isSelected ? 'text-white' : `text-${gradients[index].split('-')[1]}-600`} />
                    </div>
                    
                    {isSelected && (
                      <div className={`p-1.5 rounded-full bg-gradient-to-br ${gradients[index]} text-white animate-pulse`}>
                        <CheckCircle size={16} />
                      </div>
                    )}
                  </div>
                  
                  <div className="relative space-y-3">
                    <h3 className={`text-heading-md font-bold transition-colors duration-300 ${
                      isSelected ? 'text-gray-900' : 'text-gray-800 group-hover:text-gray-900'
                    }`}>
                      {type.title}
                    </h3>
                    
                    <p className={`text-body-sm leading-relaxed transition-colors duration-300 ${
                      isSelected ? 'text-gray-700' : 'text-gray-600 group-hover:text-gray-700'
                    }`}>
                      {type.description}
                    </p>
                    
                    <div className="pt-3 border-t border-gray-100 space-y-1">
                      <div className={`text-heading-md font-black transition-colors duration-300 ${
                        isSelected 
                          ? `text-transparent bg-gradient-to-r ${gradients[index]} bg-clip-text` 
                          : `text-gray-800 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:${gradients[index]} group-hover:bg-clip-text`
                      }`}>
                        {type.price}
                      </div>
                      <div className={`text-body-sm font-medium transition-colors duration-300 ${
                        isSelected ? 'text-gray-600' : 'text-gray-500 group-hover:text-gray-600'
                      }`}>
                        {type.duration}
                      </div>
                    </div>
                  </div>
                  
                  {isSelected && (
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradients[index]} rounded-b-2xl`}></div>
                  )}
                  
                  <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${gradients[index]} pointer-events-none`}></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Booking Form */}
        <div className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
          
          <div className="relative premium-card p-8 lg:p-12 bg-white/80 backdrop-blur-sm border border-gray-100 shadow-2xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-6 shadow-lg">
                <Calendar className="text-white" size={24} />
              </div>
              <h3 className="text-heading-xl font-bold text-gray-900 mb-4">
                Book Your Consultation
              </h3>
              <p className="text-body text-gray-600 max-w-2xl mx-auto">
                Fill out the form below to schedule your appointment. We'll confirm your booking within 24 hours.
              </p>
            </div>

          <form onSubmit={handleBookingSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h4 className="text-heading-lg font-semibold text-gray-900 mb-4">Personal Information</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-body font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-body"
                  />
                </div>
                <div>
                  <label className="block text-body font-medium text-gray-700 mb-2">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-body"
                  />
                </div>
                <div>
                  <label className="block text-body font-medium text-gray-700 mb-2">
                    Sex *
                  </label>
                  <select
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-body"
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-body font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-body"
                  />
                </div>
                <div>
                  <label className="block text-body font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-body"
                  />
                </div>
                <div>
                  <label className="block text-body font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-body"
                  />
                </div>
                <div>
                  <label className="block text-body font-medium text-gray-700 mb-2">
                    Payment Confirmation (Upload Screenshot) *
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => setPaymentScreenshot(e.target.files?.[0] || null)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-body"
                  />
                  {paymentScreenshot && (
                    <div className="mt-2 text-body-sm text-gray-600">Selected: {paymentScreenshot.name}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Date and Time Selection */}
            <div>
              <h4 className="text-heading-lg font-semibold text-gray-900 mb-6">Select Date & Time</h4>
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Calendar */}
                <div>
                  <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 border border-gray-100 shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                      <button
                        type="button"
                        onClick={prevMonth}
                        className="p-3 hover:bg-white rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 bg-white/70 backdrop-blur-sm"
                      >
                        <ChevronLeft size={20} className="text-gray-600" />
                      </button>
                      <h5 className="text-heading-md font-bold text-gray-800 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
                        {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </h5>
                      <button
                        type="button"
                        onClick={nextMonth}
                        className="p-3 hover:bg-white rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 bg-white/70 backdrop-blur-sm"
                      >
                        <ChevronRight size={20} className="text-gray-600" />
                      </button>
                    </div>
                    <div className="calendar-grid">
                      {renderCalendar()}
                    </div>
                  </div>
                </div>
                
                {/* Time Slots */}
                <div>
                  <label className="flex items-center text-body-lg font-semibold text-gray-800 mb-6">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Available Time Slots
                  </label>
                  {selectedDate ? (
                    <div className="grid grid-cols-2 gap-4">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.time}
                          type="button"
                          disabled={!slot.available}
                          onClick={() => setSelectedTime(slot.time)}
                          className={`group relative overflow-hidden p-4 rounded-2xl border-2 font-semibold transition-all duration-300 transform ${
                            selectedTime === slot.time
                              ? 'border-blue-500 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xl scale-105'
                              : slot.available
                              ? 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:scale-105 shadow-md hover:shadow-lg'
                              : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed opacity-60'
                          }`}
                        >
                          <div className="relative z-10">
                            <div className="text-body font-bold">{slot.time}</div>
                            {!slot.available && (
                              <div className="text-body-sm text-red-500 font-medium mt-1">Booked</div>
                            )}
                          </div>
                          
                          {selectedTime === slot.time && (
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-20 animate-pulse"></div>
                          )}
                          
                          {slot.available && selectedTime !== slot.time && (
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 px-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl border-2 border-dashed border-gray-200">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center">
                        <Calendar size={32} className="text-blue-500" />
                      </div>
                      <p className="text-body-lg font-medium text-gray-600">Please select a date first</p>
                      <p className="text-body-sm text-gray-500 mt-2">Choose an available date from the calendar above</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Medical Information */}
            <div>
              <h4 className="text-heading-lg font-semibold text-gray-900 mb-4">Medical Information</h4>
              <div className="space-y-6">
                <div>
                  <label className="block text-body font-medium text-gray-700 mb-2">
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
                      <span className="text-body">Yes</span>
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
                      <span className="text-body">No</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-body font-medium text-gray-700 mb-2">
                    Chief Concern / Reason for Consultation *
                  </label>
                  <textarea
                    name="concern"
                    value={formData.concern}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-body"
                    placeholder="Please describe your symptoms or health concerns in detail..."
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-8">
              <div className="relative inline-block">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative inline-flex items-center justify-center px-12 py-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold rounded-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl text-body-lg overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative flex items-center">
                    <div className="mr-3 p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors duration-300">
                      <Send size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <span className="relative">
                      {isSubmitting ? 'Booking...' : 'Book Consultation Now'}
                      <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-500"></div>
                    </span>
                  </div>
                  
                  <div className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>
                
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce opacity-80"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-green-400 rounded-full animate-pulse opacity-60"></div>
              </div>
              
              <p className="text-body-sm text-gray-500 mt-4 max-w-md mx-auto">
                Secure booking • Instant confirmation • 24/7 support
              </p>
            </div>
          </form>
          </div>
        </div>

        {/* Important Notes */}
        <div className="mt-16 relative">
          <div className="premium-card p-8 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 border border-amber-200 shadow-xl">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <Sparkles className="text-white" size={20} />
              </div>
              <h4 className="text-heading-md font-bold text-gray-900">Important Guidelines</h4>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-body text-gray-700">Please join the consultation 5 minutes before your scheduled time</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-body text-gray-700">Have your medical history and current medications list ready</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-body text-gray-700">Ensure stable internet connection for video consultations</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-body text-gray-700">Cancellations must be made at least 24 hours in advance</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-body text-gray-700"><span className="font-semibold text-red-700">Emergency cases</span> should contact emergency services immediately</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnlineConsultation;