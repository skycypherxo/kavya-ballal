import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pgrnltvaydqwvcpncjvi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBncm5sdHZheWRxd3ZjcG5janZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNDI1OTEsImV4cCI6MjA2ODgxODU5MX0.fAprNsPgnx1433Yg6cBLxbXHtAsYvyaPOMjrrjxs3cc'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testEdgeFunction() {
  console.log('🧪 Testing edge function for status updates...')
  
  try {
    // Get a pending booking to test with
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
    console.log(`📋 Testing with booking: ${booking.name} (ID: ${booking.id})`)
    
    // Test confirming the booking
    console.log('\n✅ Testing confirmation...')
    const confirmResponse = await fetch(
      `${supabaseUrl}/functions/v1/update-booking-status`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          bookingId: booking.id,
          status: 'confirmed'
        })
      }
    );

    const confirmResult = await confirmResponse.json();
    console.log('📤 Confirm response status:', confirmResponse.status)
    console.log('📤 Confirm result:', confirmResult)

    if (confirmResponse.ok && confirmResult.success) {
      console.log('✅ Booking confirmed successfully!')
      
      // Verify the change
      const { data: updatedBooking } = await supabase
        .from('bookings')
        .select('status')
        .eq('id', booking.id)
        .single()
      
      console.log('🔍 Verified status:', updatedBooking?.status)
    } else {
      console.error('❌ Confirmation failed')
    }

    // Test cancelling the booking
    console.log('\n❌ Testing cancellation...')
    const cancelResponse = await fetch(
      `${supabaseUrl}/functions/v1/update-booking-status`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          bookingId: booking.id,
          status: 'cancelled',
          cancellationReason: 'Test cancellation'
        })
      }
    );

    const cancelResult = await cancelResponse.json();
    console.log('📤 Cancel response status:', cancelResponse.status)
    console.log('📤 Cancel result:', cancelResult)

    if (cancelResponse.ok && cancelResult.success) {
      console.log('❌ Booking cancelled successfully!')
      
      // Verify the change
      const { data: finalBooking } = await supabase
        .from('bookings')
        .select('status, cancellation_reason')
        .eq('id', booking.id)
        .single()
      
      console.log('🔍 Final status:', finalBooking?.status)
      console.log('🔍 Cancellation reason:', finalBooking?.cancellation_reason)
    } else {
      console.error('❌ Cancellation failed')
    }

  } catch (err) {
    console.error('❌ Error:', err.message)
  }
}

testEdgeFunction()