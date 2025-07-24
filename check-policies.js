import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pgrnltvaydqwvcpncjvi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBncm5sdHZheWRxd3ZjcG5janZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNDI1OTEsImV4cCI6MjA2ODgxODU5MX0.fAprNsPgnx1433Yg6cBLxbXHtAsYvyaPOMjrrjxs3cc'

const supabase = createClient(supabaseUrl, supabaseKey)

async function fixRLSPolicies() {
  console.log('Attempting to fix RLS policies...')
  
  try {
    // First check if we can see the table structure
    const { data: tableInfo, error: tableError } = await supabase
      .from('bookings')
      .select('*')
      .limit(1)
    
    if (tableError) {
      console.error('Table access error:', tableError)
    } else {
      console.log('Table accessible, columns:', Object.keys(tableInfo[0] || {}))
    }
    
    // Try to query RLS policies (this might not work with anon key)
    const { data: policies, error: policyError } = await supabase
      .rpc('get_policies')
    
    if (policyError) {
      console.log('Cannot query policies with anon key (expected):', policyError.message)
    } else {
      console.log('Current policies:', policies)
    }
    
  } catch (err) {
    console.error('Unexpected error:', err)
  }
}

fixRLSPolicies()
