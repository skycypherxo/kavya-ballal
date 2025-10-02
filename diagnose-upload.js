import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pgrnltvaydqwvcpncjvi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBncm5sdHZheWRxd3ZjcG5janZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNDI1OTEsImV4cCI6MjA2ODgxODU5MX0.fAprNsPgnx1433Yg6cBLxbXHtAsYvyaPOMjrrjxs3cc'

const supabase = createClient(supabaseUrl, supabaseKey)

async function diagnoseUploadIssue() {
  console.log('🔍 Diagnosing image upload issue...')
  
  try {
    // Check storage buckets
    console.log('\n📦 Checking storage buckets...')
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets()
    
    if (bucketError) {
      console.error('❌ Error accessing storage:', bucketError.message)
      console.log('\n💡 This suggests a storage permission issue.')
      return
    }
    
    console.log('📋 Available buckets:', buckets.map(b => `${b.name} (${b.public ? 'public' : 'private'})`))
    
    const receiptsBucket = buckets.find(b => b.name === 'receipts')
    
    if (!receiptsBucket) {
      console.log('\n❌ ISSUE FOUND: "receipts" bucket does not exist!')
      console.log('\n🔧 TO FIX THIS:')
      console.log('1. Go to your Supabase dashboard: https://supabase.com/dashboard')
      console.log('2. Select your project: pgrnltvaydqwvcpncjvi')
      console.log('3. Navigate to Storage in the left sidebar')
      console.log('4. Click "Create bucket"')
      console.log('5. Name it "receipts"')
      console.log('6. Make it PUBLIC (so images can be displayed)')
      console.log('7. Click "Create bucket"')
      console.log('\n✅ After creating the bucket, test the booking form again!')
      return
    }
    
    console.log('✅ "receipts" bucket exists!')
    
    // Test upload permission with a small text file
    console.log('\n🧪 Testing upload permissions...')
    
    const testFileName = `test_${Date.now()}.txt`
    const testContent = new Blob(['This is a test file for upload permissions'], { type: 'text/plain' })
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('receipts')
      .upload(testFileName, testContent)
    
    if (uploadError) {
      console.error('❌ Upload test failed:', uploadError.message)
      console.log('\n💡 This suggests a permissions issue with the bucket.')
      console.log('🔧 Check bucket policies in your Supabase dashboard.')
    } else {
      console.log('✅ Upload test successful!')
      
      // Test public URL generation
      const { data: urlData } = supabase.storage
        .from('receipts')
        .getPublicUrl(testFileName)
      
      console.log('🔗 Test file URL:', urlData.publicUrl)
      
      // Clean up test file
      await supabase.storage
        .from('receipts')
        .remove([testFileName])
      
      console.log('🧹 Test file cleaned up')
      console.log('\n✅ Storage is working correctly!')
      console.log('💡 The issue might be in the form validation or file handling.')
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message)
  }
}

diagnoseUploadIssue()