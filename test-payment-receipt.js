import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pgrnltvaydqwvcpncjvi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBncm5sdHZheWRxd3ZjcG5janZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNDI1OTEsImV4cCI6MjA2ODgxODU5MX0.fAprNsPgnx1433Yg6cBLxbXHtAsYvyaPOMjrrjxs3cc'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testPaymentReceiptFlow() {
  console.log('🧪 Testing payment receipt functionality...')
  
  try {
    // First, let's check if the receipts bucket exists
    console.log('\n🗂️ Checking receipts storage bucket...')
    
    const { data: buckets, error: bucketListError } = await supabase.storage.listBuckets()
    
    if (bucketListError) {
      console.error('❌ Error listing buckets:', bucketListError.message)
    } else {
      console.log('📋 Available buckets:', buckets.map(b => b.name))
      
      const receiptsBucket = buckets.find(b => b.name === 'receipts')
      if (!receiptsBucket) {
        console.log('⚠️ "receipts" bucket not found. This might cause image upload issues.')
      } else {
        console.log('✅ "receipts" bucket exists and is', receiptsBucket.public ? 'public' : 'private')
      }
    }
    
    // Create a test booking with a simulated payment receipt URL
    console.log('\n📝 Creating test booking with payment receipt...')
    
    const testBookingWithReceipt = {
      name: 'Test Patient With Receipt',
      email: 'test.receipt@example.com',
      phone: '9876543210',
      age: 25,
      sex: 'Female',
      address: 'Test Address for Receipt Demo',
      concern: 'Testing payment receipt display in CRM',
      previous_consultation: false,
      consultation_type: 'video',
      appointment_date: '2025-10-05',
      appointment_time: '3:00 PM',
      status: 'pending',
      // Simulate a payment receipt URL (using a sample image URL for demo)
      payment_screenshot_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=600&fit=crop&auto=format'
    }
    
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert([testBookingWithReceipt])
      .select()
      .single()
    
    if (bookingError) {
      console.error('❌ Error creating booking:', bookingError.message)
      return
    }
    
    console.log('✅ Test booking created successfully!')
    console.log('📄 Booking ID:', booking.id)
    console.log('🖼️ Payment receipt URL:', booking.payment_screenshot_url)
    
    // Verify the booking appears in our query
    console.log('\n🔍 Verifying booking retrieval...')
    
    const { data: allBookings, error: fetchError } = await supabase
      .from('bookings')
      .select('id, name, payment_screenshot_url')
      .order('created_at', { ascending: false })
    
    if (fetchError) {
      console.error('❌ Error fetching bookings:', fetchError.message)
    } else {
      console.log('📊 Current bookings with payment receipts:')
      allBookings.forEach((booking, index) => {
        const hasReceipt = booking.payment_screenshot_url && booking.payment_screenshot_url.trim() !== ''
        console.log(`${index + 1}. ${booking.name}: ${hasReceipt ? '✅ Has receipt' : '❌ No receipt'}`)
        if (hasReceipt) {
          console.log(`   🔗 URL: ${booking.payment_screenshot_url}`)
        }
      })
    }
    
    console.log('\n🌐 Now check the admin panel at: http://localhost:5174/#admin')
    console.log('   You should see the payment receipt displayed for the test booking!')
    
  } catch (err) {
    console.error('❌ Error:', err.message)
  }
}

testPaymentReceiptFlow()