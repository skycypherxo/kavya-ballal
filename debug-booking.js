import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pgrnltvaydqwvcpncjvi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBncm5sdHZheWRxd3ZjcG5janZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNDI1OTEsImV4cCI6MjA2ODgxODU5MX0.fAprNsPgnx1433Yg6cBLxbXHtAsYvyaPOMjrrjxs3cc'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testBooking() {
  console.log('Testing database connection...')
  
  try {
    // First, check if we can connect
    const { data: connectionTest, error: connectionError } = await supabase.from('bookings').select('count')
    
    if (connectionError) {
      console.error('Connection error:', connectionError)
      return
    }
    
    console.log('Connection successful!')
    
    // Now try to insert a test booking
    const testBooking = {
      name: 'Test User',
      email: 'test@test.com',
      phone: '1234567890',
      age: 30,
      consultation_type: 'general',
      appointment_date: '2025-01-30',
      appointment_time: '10:00',
      concern: 'Test booking concern',
      previous_consultation: false,
      status: 'pending'
    }
    
    console.log('Inserting test booking:', testBooking)
    
    const { data, error } = await supabase
      .from('bookings')
      .insert([testBooking])
      .select()
    
    if (error) {
      console.error('Booking insertion error:', error)
      console.error('Error code:', error.code)
      console.error('Error message:', error.message)
      console.error('Error details:', error.details)
      console.error('Error hint:', error.hint)
    } else {
      console.log('Booking successful:', data)
    }
    
  } catch (err) {
    console.error('Unexpected error:', err)
  }
}

testBooking()
