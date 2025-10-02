import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pgrnltvaydqwvcpncjvi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBncm5sdHZheWRxd3ZjcG5janZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNDI1OTEsImV4cCI6MjA2ODgxODU5MX0.fAprNsPgnx1433Yg6cBLxbXHtAsYvyaPOMjrrjxs3cc'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testAdminWorkflow() {
  console.log('🧪 Testing updated admin workflow...')
  
  try {
    // Get current bookings status
    console.log('\n📊 Current status before updates:')
    const { data: beforeData } = await supabase
      .from('bookings')
      .select('id, name, status')
      .order('created_at', { ascending: false })
    
    const beforeCounts = beforeData.reduce((acc, booking) => {
      acc[booking.status] = (acc[booking.status] || 0) + 1
      return acc
    }, {})
    
    console.log('   Status counts:', beforeCounts)
    
    // Find a pending booking
    const pendingBooking = beforeData.find(b => b.status === 'pending')
    if (!pendingBooking) {
      console.log('ℹ️ No pending bookings found to test with')
      return
    }
    
    console.log(`\n🎯 Testing with: ${pendingBooking.name} (${pendingBooking.id})`)
    
    // Simulate admin approval
    console.log('\n✅ Simulating admin approval...')
    const { error: updateError } = await supabase
      .from('bookings')
      .update({ status: 'confirmed' })
      .eq('id', pendingBooking.id)
    
    if (updateError) {
      console.error('❌ Update failed:', updateError.message)
      return
    }
    
    console.log('   Update command completed (no error)')
    
    // Wait a moment
    console.log('   Waiting 500ms...')
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Check status immediately
    const { data: immediateCheck } = await supabase
      .from('bookings')
      .select('status')
      .eq('id', pendingBooking.id)
      .single()
    
    console.log('   Immediate check status:', immediateCheck?.status)
    
    // Wait another moment and check again
    console.log('   Waiting another 1000ms...')
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const { data: delayedCheck } = await supabase
      .from('bookings')
      .select('status')
      .eq('id', pendingBooking.id)
      .single()
    
    console.log('   Delayed check status:', delayedCheck?.status)
    
    // Get final status counts
    console.log('\n📊 Final status counts:')
    const { data: afterData } = await supabase
      .from('bookings')
      .select('status')
    
    const afterCounts = afterData.reduce((acc, booking) => {
      acc[booking.status] = (acc[booking.status] || 0) + 1
      return acc
    }, {})
    
    console.log('   Status counts:', afterCounts)
    
    // Compare
    const pendingBefore = beforeCounts.pending || 0
    const pendingAfter = afterCounts.pending || 0
    const confirmedBefore = beforeCounts.confirmed || 0
    const confirmedAfter = afterCounts.confirmed || 0
    
    console.log('\n📈 Changes:')
    console.log(`   Pending: ${pendingBefore} → ${pendingAfter} (${pendingAfter - pendingBefore})`)
    console.log(`   Confirmed: ${confirmedBefore} → ${confirmedAfter} (${confirmedAfter - confirmedBefore})`)
    
    if (delayedCheck?.status === 'confirmed') {
      console.log('\n🎉 SUCCESS: Status update worked!')
    } else {
      console.log('\n❌ FAILED: Status still not updated')
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message)
  }
}

testAdminWorkflow()