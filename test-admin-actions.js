import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pgrnltvaydqwvcpncjvi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBncm5sdHZheWRxd3ZjcG5janZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNDI1OTEsImV4cCI6MjA2ODgxODU5MX0.fAprNsPgnx1433Yg6cBLxbXHtAsYvyaPOMjrrjxs3cc'

const supabase = createClient(supabaseUrl, supabaseKey)

async function simulateAdminActions() {
  console.log('🧪 Testing admin actions...')
  
  try {
    // Get the first few pending bookings
    const { data: pendingBookings, error: fetchError } = await supabase
      .from('bookings')
      .select('*')
      .eq('status', 'pending')
      .limit(3)
    
    if (fetchError) {
      console.error('❌ Fetch error:', fetchError.message)
      return
    }
    
    console.log(`📋 Found ${pendingBookings.length} pending bookings`)
    
    if (pendingBookings.length === 0) {
      console.log('ℹ️ No pending bookings found')
      return
    }
    
    // Confirm the first booking
    const firstBooking = pendingBookings[0]
    console.log(`✅ Confirming booking for ${firstBooking.name}...`)
    
    const { error: confirmError } = await supabase
      .from('bookings')
      .update({ status: 'confirmed' })
      .eq('id', firstBooking.id)
    
    if (confirmError) {
      console.error('❌ Confirm error:', confirmError.message)
    } else {
      console.log('✅ Booking confirmed successfully!')
    }
    
    // Cancel the second booking if it exists
    if (pendingBookings.length > 1) {
      const secondBooking = pendingBookings[1]
      console.log(`❌ Cancelling booking for ${secondBooking.name}...`)
      
      const { error: cancelError } = await supabase
        .from('bookings')
        .update({ 
          status: 'cancelled',
          cancellation_reason: 'Test cancellation from admin'
        })
        .eq('id', secondBooking.id)
      
      if (cancelError) {
        console.error('❌ Cancel error:', cancelError.message)
      } else {
        console.log('❌ Booking cancelled successfully!')
      }
    }
    
    // Complete the third booking if it exists
    if (pendingBookings.length > 2) {
      const thirdBooking = pendingBookings[2]
      console.log(`🏁 Completing booking for ${thirdBooking.name}...`)
      
      const { error: completeError } = await supabase
        .from('bookings')
        .update({ status: 'completed' })
        .eq('id', thirdBooking.id)
      
      if (completeError) {
        console.error('❌ Complete error:', completeError.message)
      } else {
        console.log('🏁 Booking completed successfully!')
      }
    }
    
    // Show updated status summary
    console.log('\n📊 Updated status summary:')
    const { data: allBookings } = await supabase
      .from('bookings')
      .select('status')
    
    const statusCounts = allBookings.reduce((acc, booking) => {
      acc[booking.status] = (acc[booking.status] || 0) + 1
      return acc
    }, {})
    
    Object.entries(statusCounts).forEach(([status, count]) => {
      console.log(`  ${status}: ${count}`)
    })
    
    console.log('\n🌐 Check the admin panel at: http://localhost:5174/#admin')
    
  } catch (err) {
    console.error('❌ Error:', err.message)
  }
}

simulateAdminActions()