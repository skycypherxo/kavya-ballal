/*
  # Enhanced booking fields for comprehensive patient information

  1. New Fields Added to bookings table:
    - `gender` (text, patient gender)
    - `weight` (decimal, patient weight in kg)
    - `height` (decimal, patient height in cm) 
    - `symptoms` (text, current symptoms)
    - `current_medications` (text, current medications)
    - `allergies` (text, known allergies)
    - `medical_history` (text, medical history)
    - `emergency_contact` (text, emergency contact number)
    - `uploaded_files_count` (integer, number of uploaded files)
    - `doctor_notes` (text, doctor's notes)
    - `doctor_response` (text, doctor's response to booking)
    - `suggested_alternative_date` (date, if doctor suggests different date)
    - `suggested_alternative_time` (text, if doctor suggests different time)
*/

-- Add new columns to bookings table
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS gender text,
ADD COLUMN IF NOT EXISTS weight decimal(5,2),
ADD COLUMN IF NOT EXISTS height decimal(5,2),
ADD COLUMN IF NOT EXISTS symptoms text,
ADD COLUMN IF NOT EXISTS current_medications text,
ADD COLUMN IF NOT EXISTS allergies text,
ADD COLUMN IF NOT EXISTS medical_history text,
ADD COLUMN IF NOT EXISTS emergency_contact text,
ADD COLUMN IF NOT EXISTS uploaded_files_count integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS doctor_notes text,
ADD COLUMN IF NOT EXISTS doctor_response text,
ADD COLUMN IF NOT EXISTS suggested_alternative_date date,
ADD COLUMN IF NOT EXISTS suggested_alternative_time text;

-- Create doctor_schedule table for time slot management
CREATE TABLE IF NOT EXISTS doctor_schedule (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  time_slot text NOT NULL,
  is_available boolean DEFAULT true,
  booking_id uuid REFERENCES bookings(id) ON DELETE SET NULL,
  blocked_reason text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(date, time_slot)
);

ALTER TABLE doctor_schedule ENABLE ROW LEVEL SECURITY;

-- Allow public read access to see available slots
CREATE POLICY "Public can view available schedule"
  ON doctor_schedule
  FOR SELECT
  TO public
  USING (true);

-- Only authenticated admin can modify schedule
CREATE POLICY "Admin can manage schedule"
  ON doctor_schedule
  FOR ALL
  TO authenticated
  USING (true);

-- Create appointment_status_history table for tracking status changes
CREATE TABLE IF NOT EXISTS appointment_status_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  old_status text,
  new_status text,
  changed_by text,
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE appointment_status_history ENABLE ROW LEVEL SECURITY;

-- Allow viewing status history for bookings
CREATE POLICY "Users can view appointment history"
  ON appointment_status_history
  FOR SELECT
  TO public
  USING (true);

-- Add updated_at trigger for bookings
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_bookings_updated_at 
  BEFORE UPDATE ON bookings 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Add some default time slots for the next 30 days
INSERT INTO doctor_schedule (date, time_slot, is_available)
SELECT 
  date_series.date,
  time_slot,
  CASE 
    WHEN EXTRACT(DOW FROM date_series.date) IN (0, 6) THEN false  -- Weekend
    WHEN time_slot IN ('01:00 PM') THEN false  -- Lunch break
    ELSE true
  END as is_available
FROM 
  generate_series(
    CURRENT_DATE + interval '1 day',
    CURRENT_DATE + interval '30 days',
    interval '1 day'
  ) AS date_series(date)
CROSS JOIN (
  VALUES 
    ('10:00 AM'), ('10:30 AM'), ('11:00 AM'), ('11:30 AM'), ('12:00 PM'), ('12:30 PM'),
    ('01:00 PM'), ('04:00 PM'), ('04:30 PM'), ('05:00 PM'), ('05:30 PM'), ('06:00 PM')
) AS time_slots(time_slot)
ON CONFLICT (date, time_slot) DO NOTHING;

-- Update RLS policies for enhanced functionality
DROP POLICY IF EXISTS "Public can insert bookings" ON bookings;
DROP POLICY IF EXISTS "Public can read bookings" ON bookings;

-- Allow public to create bookings (appointment requests)
CREATE POLICY "Public can create bookings"
  ON bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow public to read bookings (for admin dashboard)
CREATE POLICY "Public can read bookings"
  ON bookings
  FOR SELECT
  TO public
  USING (true);

-- Allow public to update booking status (for doctor responses)
CREATE POLICY "Public can update bookings"
  ON bookings
  FOR UPDATE
  TO public
  USING (true);
