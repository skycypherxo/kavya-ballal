import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pgrnltvaydqwvcpncjvi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBncm5sdHZheWRxd3ZjcG5janZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNDI1OTEsImV4cCI6MjA2ODgxODU5MX0.fAprNsPgnx1433Yg6cBLxbXHtAsYvyaPOMjrrjxs3cc'

const supabase = createClient(supabaseUrl, supabaseKey)

async function debugRLSPolicies() {
  console.log('🔍 Debugging RLS policies...')
  
  try {
    // First, let's check what policies exist
    console.log('\n📋 Checking current booking policies...')
    
    const { data: policies, error: policyError } = await supabase
      .rpc('check_policies')
      .single()
    
    if (policyError) {
      console.log('   Could not check policies:', policyError.message)
    } else {
      console.log('   Policies found:', policies)
    }
    
    // Try a simple select to see if we can read
    console.log('\n📖 Testing SELECT permission...')
    const { data: selectData, error: selectError } = await supabase
      .from('bookings')
      .select('id, status')
      .limit(1)
    
    if (selectError) {
      console.error('❌ SELECT failed:', selectError.message)
    } else {
      console.log('✅ SELECT successful, found', selectData.length, 'records')
    }
    
    // Try an update without any conditions to see the exact error
    console.log('\n🔧 Testing UPDATE permission with detailed error...')
    const { data: updateData, error: updateError } = await supabase
      .from('bookings')
      .update({ status: 'confirmed' })
      .eq('id', '00000000-0000-0000-0000-000000000000') // Non-existent ID
      .select()
    
    if (updateError) {
      console.error('❌ UPDATE failed with error:')
      console.error('   Message:', updateError.message)
      console.error('   Code:', updateError.code)
      console.error('   Details:', updateError.details)
      console.error('   Hint:', updateError.hint)
    } else {
      console.log('✅ UPDATE successful (unexpected)')
    }
    
    // Try to get a real booking and update it
    console.log('\n🎯 Testing real booking update...')
    const { data: realBooking } = await supabase
      .from('bookings')
      .select('id, name, status')
      .eq('status', 'pending')
      .limit(1)
      .single()
    
    if (realBooking) {
      console.log(`   Found booking: ${realBooking.name} (${realBooking.id})`)
      
      const { data: realUpdateData, error: realUpdateError } = await supabase
        .from('bookings')
        .update({ status: 'confirmed' })
        .eq('id', realBooking.id)
        .select()
      
      if (realUpdateError) {
        console.error('❌ Real UPDATE failed:')
        console.error('   Message:', realUpdateError.message)
        console.error('   Code:', realUpdateError.code)
        console.error('   Details:', realUpdateError.details)
      } else {
        console.log('✅ Real UPDATE result:', realUpdateData)
        
        // Verify the change
        const { data: verifyData } = await supabase
          .from('bookings')
          .select('status')
          .eq('id', realBooking.id)
          .single()
        
        console.log('🔍 Verified status after update:', verifyData?.status)
      }
    }
    
  } catch (err) {
    console.error('❌ Error during debugging:', err.message)
  }
}

debugRLSPolicies()