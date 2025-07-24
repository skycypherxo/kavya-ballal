/*
  # Patient Documents Management System

  1. New Tables:
    - `patient_documents` - Store uploaded document metadata
    - `document_categories` - Categorize document types
    - `doctor_document_notes` - Doctor's notes on specific documents

  2. Storage:
    - Create storage bucket for patient documents
    - Set up RLS policies for secure access

  3. Functions:
    - Function to get patient documents by booking
    - Function to mark documents as reviewed
*/

-- Create patient_documents table
CREATE TABLE IF NOT EXISTS patient_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  original_filename text NOT NULL,
  stored_filename text NOT NULL,
  file_size bigint NOT NULL,
  file_type text NOT NULL,
  file_url text NOT NULL,
  document_category text DEFAULT 'general' CHECK (document_category IN ('xray', 'lab_report', 'prescription', 'medical_record', 'imaging', 'general')),
  upload_date timestamptz DEFAULT now(),
  is_reviewed boolean DEFAULT false,
  reviewed_by text,
  reviewed_at timestamptz,
  doctor_notes text,
  patient_email text,
  patient_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create document_categories table for better organization
CREATE TABLE IF NOT EXISTS document_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_name text UNIQUE NOT NULL,
  description text,
  icon_name text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Insert default document categories
INSERT INTO document_categories (category_name, description, icon_name, display_order) VALUES
('xray', 'X-Ray Images and Radiological Reports', 'scan', 1),
('lab_report', 'Laboratory Test Results and Blood Work', 'flask', 2),
('prescription', 'Previous Prescriptions and Medication Lists', 'pill', 3),
('medical_record', 'Medical History and Previous Treatment Records', 'file-text', 4),
('imaging', 'CT Scans, MRI, Ultrasound and Other Imaging', 'image', 5),
('general', 'Other Medical Documents', 'folder', 6)
ON CONFLICT (category_name) DO NOTHING;

-- Create doctor_document_notes table for detailed doctor feedback
CREATE TABLE IF NOT EXISTS doctor_document_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid REFERENCES patient_documents(id) ON DELETE CASCADE,
  doctor_name text DEFAULT 'Dr. Kavya Ballal',
  note_text text NOT NULL,
  note_type text DEFAULT 'observation' CHECK (note_type IN ('observation', 'concern', 'recommendation', 'follow_up')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE patient_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_document_notes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for patient_documents
CREATE POLICY "Public can insert documents"
  ON patient_documents
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can view documents"
  ON patient_documents
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated can update documents"
  ON patient_documents
  FOR UPDATE
  TO authenticated
  USING (true);

-- RLS Policies for document_categories
CREATE POLICY "Public can view document categories"
  ON document_categories
  FOR SELECT
  TO public
  USING (is_active = true);

-- RLS Policies for doctor_document_notes
CREATE POLICY "Public can view doctor notes"
  ON doctor_document_notes
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated can manage doctor notes"
  ON doctor_document_notes
  FOR ALL
  TO authenticated
  USING (true);

-- Create storage bucket for patient documents
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'patient-documents',
  'patient-documents',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'image/tiff', 'image/bmp']
)
ON CONFLICT (id) DO NOTHING;

-- RLS Policies for storage
CREATE POLICY "Public can upload documents"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'patient-documents');

CREATE POLICY "Public can view documents"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'patient-documents');

CREATE POLICY "Authenticated can delete documents"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'patient-documents');

-- Function to automatically categorize documents based on filename/type
CREATE OR REPLACE FUNCTION categorize_document(filename text, file_type text)
RETURNS text AS $$
BEGIN
  -- Convert filename to lowercase for pattern matching
  filename := LOWER(filename);
  
  -- Categorize based on filename patterns
  IF filename LIKE '%xray%' OR filename LIKE '%radiolog%' OR filename LIKE '%radiology%' THEN
    RETURN 'xray';
  ELSIF filename LIKE '%lab%' OR filename LIKE '%blood%' OR filename LIKE '%test%' OR filename LIKE '%report%' THEN
    RETURN 'lab_report';
  ELSIF filename LIKE '%prescription%' OR filename LIKE '%medicine%' OR filename LIKE '%drug%' OR filename LIKE '%medication%' THEN
    RETURN 'prescription';
  ELSIF filename LIKE '%ct%' OR filename LIKE '%mri%' OR filename LIKE '%ultrasound%' OR filename LIKE '%scan%' THEN
    RETURN 'imaging';
  ELSIF filename LIKE '%medical%' OR filename LIKE '%history%' OR filename LIKE '%record%' THEN
    RETURN 'medical_record';
  ELSE
    RETURN 'general';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-categorize documents on insert
CREATE OR REPLACE FUNCTION auto_categorize_document()
RETURNS TRIGGER AS $$
BEGIN
  -- Auto-categorize if category is not specified or is 'general'
  IF NEW.document_category = 'general' OR NEW.document_category IS NULL THEN
    NEW.document_category := categorize_document(NEW.original_filename, NEW.file_type);
  END IF;
  
  -- Set patient info from booking if not provided
  IF NEW.patient_email IS NULL OR NEW.patient_name IS NULL THEN
    SELECT email, name INTO NEW.patient_email, NEW.patient_name
    FROM bookings 
    WHERE id = NEW.booking_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_auto_categorize_document
  BEFORE INSERT ON patient_documents
  FOR EACH ROW
  EXECUTE FUNCTION auto_categorize_document();

-- Function to get all documents for a booking with category info
CREATE OR REPLACE FUNCTION get_booking_documents(booking_uuid uuid)
RETURNS TABLE (
  document_id uuid,
  original_filename text,
  file_url text,
  file_size bigint,
  file_type text,
  document_category text,
  category_description text,
  category_icon text,
  upload_date timestamptz,
  is_reviewed boolean,
  doctor_notes text,
  reviewed_at timestamptz
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pd.id,
    pd.original_filename,
    pd.file_url,
    pd.file_size,
    pd.file_type,
    pd.document_category,
    dc.description,
    dc.icon_name,
    pd.upload_date,
    pd.is_reviewed,
    pd.doctor_notes,
    pd.reviewed_at
  FROM patient_documents pd
  LEFT JOIN document_categories dc ON pd.document_category = dc.category_name
  WHERE pd.booking_id = booking_uuid
  ORDER BY pd.upload_date DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to mark document as reviewed
CREATE OR REPLACE FUNCTION mark_document_reviewed(
  document_uuid uuid,
  reviewer_name text DEFAULT 'Dr. Kavya Ballal',
  notes text DEFAULT NULL
)
RETURNS boolean AS $$
BEGIN
  UPDATE patient_documents 
  SET 
    is_reviewed = true,
    reviewed_by = reviewer_name,
    reviewed_at = now(),
    doctor_notes = COALESCE(notes, doctor_notes),
    updated_at = now()
  WHERE id = document_uuid;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_patient_documents_booking_id ON patient_documents(booking_id);
CREATE INDEX IF NOT EXISTS idx_patient_documents_category ON patient_documents(document_category);
CREATE INDEX IF NOT EXISTS idx_patient_documents_reviewed ON patient_documents(is_reviewed);
CREATE INDEX IF NOT EXISTS idx_patient_documents_upload_date ON patient_documents(upload_date);

-- Update the bookings table to track document summary
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS total_documents integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS reviewed_documents integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS latest_document_upload timestamptz;

-- Function to update booking document counts
CREATE OR REPLACE FUNCTION update_booking_document_counts()
RETURNS TRIGGER AS $$
BEGIN
  -- Update counts for the affected booking
  UPDATE bookings 
  SET 
    total_documents = (
      SELECT COUNT(*) 
      FROM patient_documents 
      WHERE booking_id = COALESCE(NEW.booking_id, OLD.booking_id)
    ),
    reviewed_documents = (
      SELECT COUNT(*) 
      FROM patient_documents 
      WHERE booking_id = COALESCE(NEW.booking_id, OLD.booking_id) 
      AND is_reviewed = true
    ),
    latest_document_upload = (
      SELECT MAX(upload_date) 
      FROM patient_documents 
      WHERE booking_id = COALESCE(NEW.booking_id, OLD.booking_id)
    )
  WHERE id = COALESCE(NEW.booking_id, OLD.booking_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Triggers to keep booking document counts updated
CREATE TRIGGER trigger_update_booking_documents_on_insert
  AFTER INSERT ON patient_documents
  FOR EACH ROW
  EXECUTE FUNCTION update_booking_document_counts();

CREATE TRIGGER trigger_update_booking_documents_on_update
  AFTER UPDATE ON patient_documents
  FOR EACH ROW
  EXECUTE FUNCTION update_booking_document_counts();

CREATE TRIGGER trigger_update_booking_documents_on_delete
  AFTER DELETE ON patient_documents
  FOR EACH ROW
  EXECUTE FUNCTION update_booking_document_counts();
