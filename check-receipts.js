import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pgrnltvaydqwvcpncjvi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBncm5sdHZheWRxd3ZjcG5janZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNDI1OTEsImV4cCI6MjA2ODgxODU5MX0.fAprNsPgnx1433Yg6cBLxbXHtAsYvyaPOMjrrjxs3cc'

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkPaymentReceipts() {
  console.log('🔍 Checking payment receipts in bookings...')
  
  try {
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('id, name, payment_screenshot, payment_screenshot_url, created_at')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('❌ Error:', error.message)
      return
    }
    
    console.log(`📊 Found ${bookings.length} bookings`)
    
    let receiptsFound = 0
    bookings.forEach((booking, index) => {
      const hasReceipt = booking.payment_screenshot || booking.payment_screenshot_url
      if (hasReceipt) {
        receiptsFound++
        console.log(`${index + 1}. ${booking.name}:`)
        if (booking.payment_screenshot_url) {
          console.log(`   📸 Image URL: ${booking.payment_screenshot_url}`)
        }
        if (booking.payment_screenshot) {
          console.log(`   📄 Screenshot: ${booking.payment_screenshot}`)
        }
      } else {
        console.log(`${index + 1}. ${booking.name}: No receipt`)
      }
    })
    
    console.log(`\n📈 Summary: ${receiptsFound}/${bookings.length} bookings have payment receipts`)
    
    // Test image accessibility for the first receipt found
    if (receiptsFound > 0) {
      const bookingWithReceipt = bookings.find(b => b.payment_screenshot_url)
      if (bookingWithReceipt) {
        console.log('\n🌐 Testing image accessibility...')
        try {
          const response = await fetch(bookingWithReceipt.payment_screenshot_url)
          console.log(`   Image accessible: ${response.ok} (Status: ${response.status})`)
          if (!response.ok) {
            console.log(`   Error: ${response.statusText}`)
          }
        } catch (fetchError) {
          console.log(`   Fetch error: ${fetchError.message}`)
        }
      }
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message)
  }
}

checkPaymentReceipts()