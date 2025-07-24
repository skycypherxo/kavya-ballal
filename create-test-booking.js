import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pgrnltvaydqwvcpncjvi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBncm5sdHZheWRxd3ZjcG5janZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNDI1OTEsImV4cCI6MjA2ODgxODU5MX0.fAprNsPgnx1433Yg6cBLxbXHtAsYvyaPOMjrrjxs3cc'

const supabase = createClient(supabaseUrl, supabaseKey)

async function createTestBooking() {
  console.log('Creating test booking...')
  
  const testBooking = {
    name: 'Test User from Script',
    email: 'test@example.com',
    phone: '9876543210',
    age: 25,
    consultation_type: 'video',
    appointment_date: '2025-01-25',
    appointment_time: '10:00 AM',
    concern: 'Test booking to verify admin panel functionality',
    previous_consultation: false,
    status: 'pending'
  }
  
  try {
    const { data, error } = await supabase
      .from('bookings')
      .insert([testBooking])
      .select()
    
    if (error) {
      console.error('❌ Booking failed:', error)
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      })
      
      if (error.code === '42501') {
        console.log('\n💡 RLS Policy Error - To fix this:')
        console.log('1. Go to your Supabase Dashboard')
        console.log('2. Navigate to SQL Editor')
        console.log('3. Copy and paste the content from fix-rls.sql')
        console.log('4. Click "Run" to execute the SQL')
      }
    } else {
      console.log('✅ Test booking created successfully!')
      console.log('Booking data:', data[0])
      console.log('\n🎉 Now check the admin panel at: http://localhost:5175/#admin')
    }
    
  } catch (err) {
    console.error('Unexpected error:', err)
  }
}

createTestBooking()
