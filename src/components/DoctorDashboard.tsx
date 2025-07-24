import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, CheckCircle, XCircle, MessageSquare, Upload, FileText, Download, Eye, Star, Image, FlaskConical } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface PatientDocument {
  id: string;
  original_filename: string;
  file_url: string;
  file_size: number;
  file_type: string;
  document_category: string;
  upload_date: string;
  is_reviewed: boolean;
  doctor_notes?: string;
  reviewed_at?: string;
}

interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender?: string;
  weight?: number;
  height?: number;
  consultation_type: string;
  appointment_date: string;
  appointment_time: string;
  concern: string;
  symptoms?: string;
  current_medications?: string;
  allergies?: string;
  medical_history?: string;
  emergency_contact?: string;
  previous_consultation: boolean;
  uploaded_files_count?: number;
  total_documents?: number;
  reviewed_documents?: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  doctor_notes?: string;
  doctor_response?: string;
  created_at: string;
}

const DoctorDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled' | 'completed'>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [doctorResponse, setDoctorResponse] = useState('');
  const [doctorNotes, setDoctorNotes] = useState('');
  const [showDocuments, setShowDocuments] = useState<string | null>(null);
  const [patientDocuments, setPatientDocuments] = useState<PatientDocument[]>([]);
  const [loadingDocuments, setLoadingDocuments] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchPatientDocuments = async (bookingId: string) => {
    setLoadingDocuments(true);
    try {
      const { data, error } = await supabase
        .from('patient_documents')
        .select('*')
        .eq('booking_id', bookingId)
        .order('upload_date', { ascending: false });

      if (error) {
        console.error('Error fetching documents:', error);
        return;
      }

      setPatientDocuments(data || []);
      setShowDocuments(bookingId);
    } catch (err) {
      console.error('Failed to fetch documents:', err);
    } finally {
      setLoadingDocuments(false);
    }
  };

  const markDocumentReviewed = async (documentId: string, notes?: string) => {
    try {
      const { error } = await supabase
        .from('patient_documents')
        .update({
          is_reviewed: true,
          reviewed_by: 'Dr. Kavya Ballal',
          reviewed_at: new Date().toISOString(),
          doctor_notes: notes
        })
        .eq('id', documentId);

      if (error) {
        console.error('Error marking document as reviewed:', error);
        return;
      }

      // Refresh documents
      if (showDocuments) {
        fetchPatientDocuments(showDocuments);
      }
      // Refresh bookings to update counts
      fetchBookings();
    } catch (err) {
      console.error('Failed to mark document as reviewed:', err);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'xray': return <Image className="text-purple-600" size={20} />;
      case 'lab_report': return <FlaskConical className="text-green-600" size={20} />;
      case 'prescription': return <FileText className="text-blue-600" size={20} />;
      case 'imaging': return <Image className="text-indigo-600" size={20} />;
      case 'medical_record': return <FileText className="text-gray-600" size={20} />;
      default: return <FileText className="text-gray-600" size={20} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'xray': return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'lab_report': return 'bg-green-50 text-green-800 border-green-200';
      case 'prescription': return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'imaging': return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      case 'medical_record': return 'bg-gray-50 text-gray-800 border-gray-200';
      default: return 'bg-gray-50 text-gray-800 border-gray-200';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching bookings:', error);
        return;
      }

      setBookings(data || []);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: string, response?: string) => {
    try {
      const updates: any = { 
        status,
        doctor_response: response || doctorResponse,
        doctor_notes: doctorNotes
      };

      const { error } = await supabase
        .from('bookings')
        .update(updates)
        .eq('id', bookingId);

      if (error) {
        console.error('Error updating booking:', error);
        alert('Failed to update booking status');
        return;
      }

      // Refresh bookings
      fetchBookings();
      setSelectedBooking(null);
      setDoctorResponse('');
      setDoctorNotes('');
      
      alert(`Appointment ${status} successfully!`);
    } catch (err) {
      console.error('Failed to update booking:', err);
      alert('Failed to update booking status');
    }
  };

  const filteredBookings = bookings.filter(booking => 
    filter === 'all' || booking.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={16} />;
      case 'confirmed': return <CheckCircle size={16} />;
      case 'cancelled': return <XCircle size={16} />;
      case 'completed': return <CheckCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-body-lg text-gray-600">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-heading-xl font-bold text-gray-900 mb-2">
                Doctor Dashboard
              </h1>
              <p className="text-body-lg text-gray-600">
                Manage patient appointments and consultations
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-heading-lg font-bold text-blue-600">{bookings.length}</div>
                <div className="text-body-sm text-gray-600">Total Bookings</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-heading-lg font-bold text-green-600">
                  {bookings.filter(b => b.status === 'pending').length}
                </div>
                <div className="text-body-sm text-gray-600">Pending</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4">
            {['all', 'pending', 'confirmed', 'cancelled', 'completed'].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption as any)}
                className={`px-6 py-3 rounded-xl font-medium transition-all capitalize ${
                  filter === filterOption
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {filterOption} ({filterOption === 'all' ? bookings.length : bookings.filter(b => b.status === filterOption).length})
              </button>
            ))}
          </div>
        </div>

        {/* Bookings Grid */}
        <div className="grid gap-6">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                      <User className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-heading-md font-bold text-gray-900">{booking.name}</h3>
                      <p className="text-body text-gray-600">
                        {booking.age} years old • {booking.gender || 'N/A'}
                      </p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-body-sm font-medium flex items-center space-x-1 ${getStatusColor(booking.status)}`}>
                    {getStatusIcon(booking.status)}
                    <span className="capitalize">{booking.status}</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="text-blue-600" size={16} />
                    <span className="text-body text-gray-700">{booking.appointment_date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="text-green-600" size={16} />
                    <span className="text-body text-gray-700">{booking.appointment_time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="text-purple-600" size={16} />
                    <span className="text-body text-gray-700">{booking.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="text-red-600" size={16} />
                    <span className="text-body text-gray-700">{booking.email}</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <h4 className="text-body font-semibold text-gray-900 mb-2">Chief Concern:</h4>
                  <p className="text-body text-gray-700">{booking.concern}</p>
                  {booking.symptoms && (
                    <>
                      <h4 className="text-body font-semibold text-gray-900 mt-3 mb-2">Symptoms:</h4>
                      <p className="text-body text-gray-700">{booking.symptoms}</p>
                    </>
                  )}
                </div>

                {(booking.current_medications || booking.allergies || booking.medical_history) && (
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    {booking.current_medications && (
                      <div className="bg-blue-50 rounded-lg p-3">
                        <h5 className="text-body-sm font-semibold text-blue-900 mb-1">Medications:</h5>
                        <p className="text-body-sm text-blue-800">{booking.current_medications}</p>
                      </div>
                    )}
                    {booking.allergies && (
                      <div className="bg-red-50 rounded-lg p-3">
                        <h5 className="text-body-sm font-semibold text-red-900 mb-1">Allergies:</h5>
                        <p className="text-body-sm text-red-800">{booking.allergies}</p>
                      </div>
                    )}
                    {booking.medical_history && (
                      <div className="bg-green-50 rounded-lg p-3">
                        <h5 className="text-body-sm font-semibold text-green-900 mb-1">Medical History:</h5>
                        <p className="text-body-sm text-green-800">{booking.medical_history}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Documents Section */}
                {(booking.total_documents && booking.total_documents > 0) && (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 mb-4 border border-green-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Upload className="text-green-600" size={20} />
                        </div>
                        <div>
                          <h5 className="text-body font-semibold text-gray-900">
                            {booking.total_documents} Document(s) Uploaded
                          </h5>
                          <p className="text-body-sm text-gray-600">
                            {booking.reviewed_documents || 0} reviewed • {(booking.total_documents || 0) - (booking.reviewed_documents || 0)} pending review
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => fetchPatientDocuments(booking.id)}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Eye size={16} />
                        <span>View Documents</span>
                      </button>
                    </div>
                  </div>
                )}

                {booking.uploaded_files_count && booking.uploaded_files_count > 0 && (
                  <div className="flex items-center space-x-2 mb-4 p-3 bg-green-50 rounded-lg">
                    <Upload className="text-green-600" size={16} />
                    <span className="text-body-sm text-green-800 font-medium">
                      {booking.uploaded_files_count} file(s) uploaded
                    </span>
                  </div>
                )}

                {booking.status === 'pending' && (
                  <div className="border-t pt-4">
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-body-sm font-medium text-gray-700 mb-2">
                          Response to Patient:
                        </label>
                        <textarea
                          value={selectedBooking?.id === booking.id ? doctorResponse : ''}
                          onChange={(e) => {
                            setDoctorResponse(e.target.value);
                            setSelectedBooking(booking);
                          }}
                          placeholder="Write a message to the patient..."
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-body-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-body-sm font-medium text-gray-700 mb-2">
                          Private Notes:
                        </label>
                        <textarea
                          value={selectedBooking?.id === booking.id ? doctorNotes : ''}
                          onChange={(e) => {
                            setDoctorNotes(e.target.value);
                            setSelectedBooking(booking);
                          }}
                          placeholder="Private notes for your reference..."
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-body-sm"
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => updateBookingStatus(booking.id, 'confirmed', 'Your appointment has been confirmed. We look forward to seeing you!')}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <CheckCircle size={16} />
                        <span>Accept</span>
                      </button>
                      <button
                        onClick={() => updateBookingStatus(booking.id, 'cancelled', 'Unfortunately, we cannot accommodate this appointment time. Please contact us to reschedule.')}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <XCircle size={16} />
                        <span>Decline</span>
                      </button>
                      <button
                        onClick={() => {
                          if (selectedBooking?.id === booking.id && doctorResponse) {
                            updateBookingStatus(booking.id, 'pending');
                          } else {
                            alert('Please write a response first');
                          }
                        }}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <MessageSquare size={16} />
                        <span>Send Custom Response</span>
                      </button>
                    </div>
                  </div>
                )}

                {booking.doctor_response && (
                  <div className="border-t pt-4 mt-4">
                    <h4 className="text-body font-semibold text-gray-900 mb-2">Doctor's Response:</h4>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-body text-blue-800">{booking.doctor_response}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredBookings.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="text-gray-400" size={32} />
            </div>
            <h3 className="text-heading-md font-bold text-gray-900 mb-2">No appointments found</h3>
            <p className="text-body text-gray-600">
              {filter === 'all' ? 'No appointments have been booked yet.' : `No ${filter} appointments found.`}
            </p>
          </div>
        )}
      </div>

      {/* Document Viewer Modal */}
      {showDocuments && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-heading-lg font-bold text-gray-900">Patient Documents</h3>
                <p className="text-body text-gray-600">
                  {patientDocuments.length} document(s) uploaded
                </p>
              </div>
              <button
                onClick={() => setShowDocuments(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircle className="text-gray-500" size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {loadingDocuments ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">Loading documents...</span>
                </div>
              ) : patientDocuments.length > 0 ? (
                <div className="grid gap-4">
                  {patientDocuments.map((doc) => (
                    <div key={doc.id} className={`border rounded-xl p-4 transition-all hover:shadow-md ${getCategoryColor(doc.document_category)}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className="flex-shrink-0">
                            {getCategoryIcon(doc.document_category)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="text-body font-semibold text-gray-900 truncate">
                                {doc.original_filename}
                              </h4>
                              <span className="px-2 py-1 text-xs font-medium bg-white bg-opacity-60 rounded-full capitalize">
                                {doc.document_category.replace('_', ' ')}
                              </span>
                              {doc.is_reviewed && (
                                <span className="flex items-center space-x-1 text-green-600">
                                  <CheckCircle size={14} />
                                  <span className="text-xs">Reviewed</span>
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-4 text-body-sm text-gray-600 mb-2">
                              <span>{formatFileSize(doc.file_size)}</span>
                              <span>•</span>
                              <span>{new Date(doc.upload_date).toLocaleDateString()}</span>
                              <span>•</span>
                              <span>{doc.file_type}</span>
                            </div>
                            {doc.doctor_notes && (
                              <div className="bg-white bg-opacity-60 rounded-lg p-3 mt-2">
                                <p className="text-body-sm text-gray-700">
                                  <strong>Doctor's Notes:</strong> {doc.doctor_notes}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <a
                            href={doc.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors"
                            title="View/Download"
                          >
                            <Download size={16} />
                          </a>
                          {!doc.is_reviewed && (
                            <button
                              onClick={() => markDocumentReviewed(doc.id, 'Document reviewed by Dr. Kavya')}
                              className="p-2 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg transition-colors"
                              title="Mark as Reviewed"
                            >
                              <Star size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="text-gray-400" size={32} />
                  </div>
                  <h4 className="text-heading-md font-bold text-gray-900 mb-2">No documents found</h4>
                  <p className="text-body text-gray-600">No documents have been uploaded for this appointment.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
