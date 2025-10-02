import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pgrnltvaydqwvcpncjvi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBncm5sdHZheWRxd3ZjcG5janZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNDI1OTEsImV4cCI6MjA2ODgxODU5MX0.fAprNsPgnx1433Yg6cBLxbXHtAsYvyaPOMjrrjxs3cc'

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkBookingStatuses() {
  console.log('🔍 Checking booking statuses...')
  
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('id, name, status, created_at')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('❌ Error:', error.message)
      return
    }
    
    console.log('📊 All bookings:')
    data.forEach((booking, index) => {
      console.log(`${index + 1}. ${booking.name} - Status: ${booking.status} - Created: ${new Date(booking.created_at).toLocaleDateString()}`)
    })
    
    // Count by status
    const statusCounts = data.reduce((acc, booking) => {
      acc[booking.status] = (acc[booking.status] || 0) + 1
      return acc
    }, {})
    
    console.log('\n📈 Status counts:')
    Object.entries(statusCounts).forEach(([status, count]) => {
      console.log(`  ${status}: ${count}`)
    })
    
    // Update a few to test status changes
    console.log('\n🔄 Testing status updates...')
    
    if (data.length > 0) {
      const firstBooking = data[0]
      console.log(`Updating ${firstBooking.name} status from ${firstBooking.status} to confirmed...`)
      
      const { error: updateError } = await supabase
        .from('bookings')
        .update({ status: 'confirmed' })
        .eq('id', firstBooking.id)
      
      if (updateError) {
        console.error('❌ Update error:', updateError.message)
      } else {
        console.log('✅ Status updated successfully!')
      }
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message)
  }
}

checkBookingStatuses()