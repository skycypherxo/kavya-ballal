import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pgrnltvaydqwvcpncjvi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBncm5sdHZheWRxd3ZjcG5janZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNDI1OTEsImV4cCI6MjA2ODgxODU5MX0.fAprNsPgnx1433Yg6cBLxbXHtAsYvyaPOMjrrjxs3cc'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testDirectUpload() {
  console.log('🧪 Testing direct upload to receipts bucket...')
  
  try {
    // Create a simple test file
    const testContent = new Blob(['Test payment receipt content'], { type: 'text/plain' })
    const testFileName = `test_receipt_${Date.now()}.txt`
    
    console.log('📤 Attempting upload...')
    
    const { data, error } = await supabase.storage
      .from('receipts')
      .upload(testFileName, testContent)
    
    if (error) {
      console.error('❌ Upload failed:', error.message)
      if (error.message.includes('row-level security')) {
        console.log('💡 Still a RLS policy issue. The bucket policy might not be saved correctly.')
      } else if (error.message.includes('not found')) {
        console.log('💡 Bucket really doesn\'t exist or isn\'t accessible.')
      }
      return
    }
    
    console.log('✅ Upload successful!')
    console.log('📄 Upload data:', data)
    
    // Test getting the public URL
    const { data: urlData } = supabase.storage
      .from('receipts')
      .getPublicUrl(testFileName)
    
    console.log('🔗 Public URL:', urlData.publicUrl)
    
    // Test if the URL is accessible
    try {
      const response = await fetch(urlData.publicUrl)
      console.log(`🌐 URL accessible: ${response.ok} (Status: ${response.status})`)
    } catch (fetchError) {
      console.log('🌐 URL fetch failed:', fetchError.message)
    }
    
    // Clean up
    const { error: deleteError } = await supabase.storage
      .from('receipts')
      .remove([testFileName])
    
    if (!deleteError) {
      console.log('🧹 Test file cleaned up')
    }
    
    console.log('\n🎉 SUCCESS! Storage is working correctly!')
    console.log('✅ Now try uploading a payment receipt through the booking form!')
    
  } catch (err) {
    console.error('❌ Error:', err.message)
  }
}

testDirectUpload()