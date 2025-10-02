import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pgrnltvaydqwvcpncjvi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBncm5sdHZheWRxd3ZjcG5janZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNDI1OTEsImV4cCI6MjA2ODgxODU5MX0.fAprNsPgnx1433Yg6cBLxbXHtAsYvyaPOMjrrjxs3cc'

// Try with service role key if available (this would be the proper solution)
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBncm5sdHZheWRxd3ZjcG5janZpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzI0MjU5MSwiZXhwIjoyMDY4ODE4NTkxfQ.eZuWq16xjOEQe3dWL-yQQbPaJnHPNVJvKhF9ltX9XSU'

const supabase = createClient(supabaseUrl, supabaseKey)
const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)

async function testAdminUpdates() {
  console.log('🧪 Testing admin updates with different keys...')
  
  try {
    // First get a booking to test with
    const { data: bookings, error: fetchError } = await supabase
      .from('bookings')
      .select('*')
      .eq('status', 'pending')
      .limit(1)
    
    if (fetchError) {
      console.error('❌ Fetch error:', fetchError.message)
      return
    }
    
    if (bookings.length === 0) {
      console.log('ℹ️ No pending bookings found')
      return
    }
    
    const booking = bookings[0]
    console.log(`📋 Testing update for booking: ${booking.name} (ID: ${booking.id})`)
    
    // Test 1: Try with anonymous key
    console.log('\n🔑 Test 1: Updating with anonymous key...')
    const { data: anonData, error: anonError } = await supabase
      .from('bookings')
      .update({ status: 'confirmed' })
      .eq('id', booking.id)
      .select()
    
    if (anonError) {
      console.error('❌ Anonymous key update failed:', anonError.message)
      console.log('   Code:', anonError.code)
      console.log('   Details:', anonError.details)
    } else {
      console.log('✅ Anonymous key update successful!')
      console.log('   Updated booking:', anonData[0])
    }
    
    // Test 2: Try with service role key
    console.log('\n🔑 Test 2: Updating with service role key...')
    const { data: adminData, error: adminError } = await supabaseAdmin
      .from('bookings')
      .update({ status: 'cancelled', cancellation_reason: 'Test with service role' })
      .eq('id', booking.id)
      .select()
    
    if (adminError) {
      console.error('❌ Service role update failed:', adminError.message)
      console.log('   Code:', adminError.code)
      console.log('   Details:', adminError.details)
    } else {
      console.log('✅ Service role update successful!')
      console.log('   Updated booking:', adminData[0])
    }
    
    // Test 3: Verify the final status
    console.log('\n🔍 Checking final status...')
    const { data: finalData, error: finalError } = await supabase
      .from('bookings')
      .select('id, name, status, cancellation_reason')
      .eq('id', booking.id)
      .single()
    
    if (finalError) {
      console.error('❌ Final check failed:', finalError.message)
    } else {
      console.log('📊 Final booking status:', finalData)
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message)
  }
}

testAdminUpdates()