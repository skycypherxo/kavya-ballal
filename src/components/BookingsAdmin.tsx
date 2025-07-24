import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Mail, Phone, User, FileText, Check, X, RefreshCw } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  consultation_type: string;
  appointment_date: string;
  appointment_time: string;
  concern: string;
  previous_consultation: boolean;
  status: string;
  created_at: string;
}

const BookingsAdmin: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: fetchError } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('Fetch error:', fetchError);
        setError(`Database Error: ${fetchError.message} (Code: ${fetchError.code})`);
      } else {
        setBookings(data || []);
        console.log(`Found ${data?.length || 0} bookings`);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Failed to connect to database');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getConsultationTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Calendar className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      case 'inperson': return <User className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-display font-bold text-gray-900 mb-4">
            📋 Bookings Administration
          </h1>
          <p className="text-heading-sm text-gray-600 mb-6">
            View and manage all appointment bookings
          </p>
          
          <button
            onClick={fetchBookings}
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Bookings
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3">
              <X className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="text-heading-sm font-semibold text-red-900">Database Connection Issue</h3>
                <p className="text-body text-red-700 mt-1">{error}</p>
                <p className="text-body-sm text-red-600 mt-2">
                  💡 <strong>Solution:</strong> Run the RLS policy fix in your Supabase dashboard to allow read access.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-heading-sm text-gray-600">Loading bookings...</p>
          </div>
        )}

        {/* Bookings Grid */}
        {!loading && !error && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-heading-lg font-bold text-gray-900">
                Recent Bookings ({bookings.length})
              </h2>
              {bookings.length === 0 && (
                <div className="text-body text-gray-500">
                  No bookings found. Try making a test booking!
                </div>
              )}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-200">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {getConsultationTypeIcon(booking.consultation_type)}
                      <span className="text-body-sm font-medium text-gray-600 capitalize">
                        {booking.consultation_type}
                      </span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-body-sm font-medium border ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>

                  {/* Patient Info */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="text-heading-sm font-semibold text-gray-900">{booking.name}</p>
                        <p className="text-body-sm text-gray-600">Age: {booking.age}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <p className="text-body-sm text-gray-600">{booking.email}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <p className="text-body-sm text-gray-600">{booking.phone}</p>
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <p className="text-body-sm font-medium text-gray-900">
                        {formatDate(booking.appointment_date)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <p className="text-body-sm font-medium text-gray-900">
                        {booking.appointment_time}
                      </p>
                    </div>
                  </div>

                  {/* Concern */}
                  {booking.concern && (
                    <div className="mb-4">
                      <div className="flex items-start gap-2">
                        <FileText className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-body-sm font-medium text-gray-700 mb-1">Concern:</p>
                          <p className="text-body-sm text-gray-600 leading-relaxed">{booking.concern}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Previous Consultation */}
                  <div className="flex items-center gap-2 mb-4">
                    {booking.previous_consultation ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <X className="w-4 h-4 text-gray-400" />
                    )}
                    <p className="text-body-sm text-gray-600">
                      {booking.previous_consultation ? 'Previous consultation' : 'First time patient'}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-body-sm text-gray-500">
                      Booked: {formatDateTime(booking.created_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsAdmin;
