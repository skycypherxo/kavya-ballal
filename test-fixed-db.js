import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pgrnltvaydqwvcpncjvi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBncm5sdHZheWRxd3ZjcG5janZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNDI1OTEsImV4cCI6MjA2ODgxODU5MX0.fAprNsPgnx1433Yg6cBLxbXHtAsYvyaPOMjrrjxs3cc'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testFixedDatabase() {
  console.log('🧪 Testing the fixed database...')
  
  // Test 1: Create a booking
  const testBooking = {
    name: 'Test Patient After Fix',
    email: 'test@fixed.com',
    phone: '9999999999',
    age: 30,
    consultation_type: 'video',
    appointment_date: '2025-01-25',
    appointment_time: '2:00 PM',
    concern: 'Testing database after RLS policy fix',
    previous_consultation: false,
    status: 'pending'
  }
  
  console.log('📝 Creating test booking...')
  
  try {
    const { data: insertData, error: insertError } = await supabase
      .from('bookings')
      .insert([testBooking])
      .select()
    
    if (insertError) {
      console.error('❌ INSERT still failing:', insertError.message)
      return
    }
    
    console.log('✅ Booking created successfully!')
    console.log('📄 Booking ID:', insertData[0].id)
    
    // Test 2: Read all bookings
    console.log('📖 Reading all bookings...')
    
    const { data: readData, error: readError } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (readError) {
      console.error('❌ READ still failing:', readError.message)
      return
    }
    
    console.log('✅ Reading successful!')
    console.log(`📊 Total bookings in database: ${readData.length}`)
    
    if (readData.length > 0) {
      console.log('📋 Latest booking:', {
        name: readData[0].name,
        email: readData[0].email,
        consultation_type: readData[0].consultation_type,
        appointment_date: readData[0].appointment_date,
        appointment_time: readData[0].appointment_time
      })
    }
    
    console.log('\n🎉 DATABASE FIX SUCCESSFUL!')
    console.log('🔗 Check admin panel: http://localhost:5173/#admin')
    console.log('📝 Try booking form: http://localhost:5173 (scroll to Online Consultation)')
    
  } catch (err) {
    console.error('❌ Unexpected error:', err)
  }
}

testFixedDatabase()
