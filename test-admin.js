import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pgrnltvaydqwvcpncjvi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBncm5sdHZheWRxd3ZjcG5janZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNDI1OTEsImV4cCI6MjA2ODgxODU5MX0.fAprNsPgnx1433Yg6cBLxbXHtAsYvyaPOMjrrjxs3cc'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testAdminAccess() {
  console.log('Testing admin panel database access...')
  
  try {
    // Test fetching bookings
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Admin fetch error:', error)
      console.error('Error details:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      })
      
      if (error.code === '42501') {
        console.log('❌ RLS Policy Error: Anonymous users cannot read bookings')
        console.log('💡 Solution: Need to add RLS policy for reading bookings')
      }
    } else {
      console.log('✅ Admin access successful!')
      console.log('Found bookings:', data?.length || 0)
      if (data && data.length > 0) {
        console.log('Sample booking:', data[0])
      }
    }
    
  } catch (err) {
    console.error('Unexpected error:', err)
  }
}

testAdminAccess()
