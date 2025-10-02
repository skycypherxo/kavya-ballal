import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pgrnltvaydqwvcpncjvi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBncm5sdHZheWRxd3ZjcG5janZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNDI1OTEsImV4cCI6MjA2ODgxODU5MX0.fAprNsPgnx1433Yg6cBLxbXHtAsYvyaPOMjrrjxs3cc'

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkDatabaseSchema() {
  console.log('🔍 Checking current database schema...')
  
  try {
    // Get a sample booking to see what fields exist
    const { data: bookings, error } = await supabase
      .from('bookings')
      .select('*')
      .limit(1)
    
    if (error) {
      console.error('❌ Error:', error.message)
      return
    }
    
    if (bookings.length > 0) {
      console.log('📋 Available fields in bookings table:')
      Object.keys(bookings[0]).forEach(field => {
        console.log(`   - ${field}: ${typeof bookings[0][field]} = ${bookings[0][field]}`)
      })
    } else {
      console.log('📋 No bookings found, but table exists')
    }
    
    // Check if we can access the receipts storage bucket
    console.log('\n🗂️ Checking storage buckets...')
    try {
      const { data: buckets, error: bucketError } = await supabase
        .storage
        .listBuckets()
      
      if (bucketError) {
        console.log('   Storage error:', bucketError.message)
      } else {
        console.log('   Available buckets:')
        buckets.forEach(bucket => {
          console.log(`   - ${bucket.name} (public: ${bucket.public})`)
        })
      }
    } catch (storageError) {
      console.log('   Storage check failed:', storageError.message)
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message)
  }
}

checkDatabaseSchema()