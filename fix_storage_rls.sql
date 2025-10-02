-- Fix storage bucket RLS policies for receipts bucket
-- This will allow public uploads to the receipts bucket

-- Policy to allow anyone to upload files to receipts bucket
CREATE POLICY "Allow public uploads to receipts bucket"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'receipts');

-- Policy to allow anyone to view files in receipts bucket
CREATE POLICY "Allow public access to receipts bucket"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'receipts');

-- Policy to allow updating files in receipts bucket (for overwriting)
CREATE POLICY "Allow public updates to receipts bucket"
ON storage.objects
FOR UPDATE
TO public
USING (bucket_id = 'receipts');

-- Policy to allow deleting files in receipts bucket (for cleanup)
CREATE POLICY "Allow public deletes from receipts bucket"
ON storage.objects
FOR DELETE
TO public
USING (bucket_id = 'receipts');