import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Mail, Phone, MapPin, FileText, CheckCircle, XCircle, Clock3, Filter, Search, AlertCircle, Loader } from 'lucide-react';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const AdminCRM = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Initialize Supabase client
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL',
    import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'
  );

  // Fetch bookings from Supabase
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setBookings(data || []);
      setFilteredBookings(data || []);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter bookings
  useEffect(() => {
    let filtered = bookings;

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(b => b.status === statusFilter);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(b => 
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.phone.includes(searchQuery)
      );
    }

    setFilteredBookings(filtered);
  }, [statusFilter, searchQuery, bookings]);

  // Approve booking
  const handleApprove = async (bookingId) => {
    try {
      setActionLoading(true);

      const { error } = await supabase
        .from('bookings')
        .update({ status: 'confirmed' })
        .eq('id', bookingId);

      if (error) throw error;

      // Send confirmation email
      const booking = bookings.find(b => b.id === bookingId);
      await sendConfirmationEmail(booking, 'confirmed');

      // Refresh bookings
      await fetchBookings();
      setSelectedBooking(null);
      alert('✅ Booking confirmed successfully! Confirmation email sent to patient.');
    } catch (err) {
      console.error('Error approving booking:', err);
      alert('Failed to approve booking: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Deny booking
  const handleDeny = async (bookingId) => {
    const reason = prompt('Enter reason for cancellation (optional):');
    
    try {
      setActionLoading(true);

      const { error } = await supabase
        .from('bookings')
        .update({ 
          status: 'cancelled',
          cancellation_reason: reason || 'Cancelled by doctor'
        })
        .eq('id', bookingId);

      if (error) throw error;

      // Send cancellation email
      const booking = bookings.find(b => b.id === bookingId);
      await sendConfirmationEmail(booking, 'cancelled', reason);

      // Refresh bookings
      await fetchBookings();
      setSelectedBooking(null);
      alert('❌ Booking cancelled. Notification email sent to patient.');
    } catch (err) {
      console.error('Error denying booking:', err);
      alert('Failed to cancel booking: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Send confirmation/cancellation email
  const sendConfirmationEmail = async (booking, status, reason = '') => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL'}/functions/v1/send-booking-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY'}`,
          },
          body: JSON.stringify({
            booking: {
              ...booking,
              cancellation_reason: reason
            },
            type: status === 'confirmed' ? 'confirmation' : 'cancellation'
          })
        }
      );

      if (!response.ok) {
        console.error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      confirmed: 'bg-green-100 text-green-800 border-green-300',
      cancelled: 'bg-red-100 text-red-800 border-red-300',
      completed: 'bg-blue-100 text-blue-800 border-blue-300'
    };

    const icons = {
      pending: <Clock3 size={14} />,
      confirmed: <CheckCircle size={14} />,
      cancelled: <XCircle size={14} />,
      completed: <CheckCircle size={14} />
    };

    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
          <p className="text-gray-600 font-medium">Loading bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 max-w-md">
          <AlertCircle className="text-red-600 mx-auto mb-4" size={48} />
          <h2 className="text-xl font-bold text-red-900 mb-2">Error Loading Bookings</h2>
          <p className="text-red-700 mb-4">{error}</p>
          <button 
            onClick={fetchBookings}
            className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">📋 Booking Management</h1>
          <p className="text-gray-600">Review and manage patient appointments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Calendar className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.pending}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock3 className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Confirmed</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.confirmed}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Cancelled</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.cancelled}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <XCircle className="text-red-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-4 py-3 rounded-lg font-medium transition ${
                  statusFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('pending')}
                className={`px-4 py-3 rounded-lg font-medium transition ${
                  statusFilter === 'pending'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setStatusFilter('confirmed')}
                className={`px-4 py-3 rounded-lg font-medium transition ${
                  statusFilter === 'confirmed'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Confirmed
              </button>
              <button
                onClick={() => setStatusFilter('cancelled')}
                className={`px-4 py-3 rounded-lg font-medium transition ${
                  statusFilter === 'cancelled'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Cancelled
              </button>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-xl p-12 shadow-lg text-center">
            <Calendar className="text-gray-300 mx-auto mb-4" size={64} />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Bookings Found</h3>
            <p className="text-gray-600">
              {searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'No bookings have been made yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Patient Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{booking.name}</h3>
                          <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <User size={14} />
                              {booking.age} years, {booking.sex}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {new Date(booking.appointment_date).toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              {booking.appointment_time}
                            </span>
                          </div>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>

                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Mail size={16} className="text-blue-600" />
                          <a href={`mailto:${booking.email}`} className="hover:text-blue-600">
                            {booking.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <Phone size={16} className="text-green-600" />
                          <a href={`tel:${booking.phone}`} className="hover:text-green-600">
                            {booking.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin size={16} className="text-red-600" />
                          {booking.address}
                        </div>
                        <div className="flex items-center gap-2 text-gray-700">
                          <FileText size={16} className="text-purple-600" />
                          {booking.consultation_type} consultation
                        </div>
                      </div>

                      {booking.concern && (
                        <div className="mt-3 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
                          <p className="text-sm font-semibold text-blue-900 mb-1">Chief Concern:</p>
                          <p className="text-sm text-gray-700">{booking.concern}</p>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex lg:flex-col gap-3 min-w-[180px]">
                      {booking.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => handleApprove(booking.id)}
                            disabled={actionLoading}
                            className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                          >
                            <CheckCircle size={20} />
                            Approve
                          </button>
                          <button
                            onClick={() => handleDeny(booking.id)}
                            disabled={actionLoading}
                            className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                          >
                            <XCircle size={20} />
                            Deny
                          </button>
                        </>
                      ) : (
                        <div className={`px-6 py-3 rounded-lg text-center font-semibold ${
                          booking.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : booking.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {booking.status === 'confirmed' && '✅ Approved'}
                          {booking.status === 'cancelled' && '❌ Denied'}
                          {booking.status === 'completed' && '✓ Completed'}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span>
                      Booking ID: #{booking.id} • Submitted:{' '}
                      {new Date(booking.created_at).toLocaleString()}
                    </span>
                    {booking.previous_consultation && (
                      <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded font-medium">
                        Previous Patient
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCRM;