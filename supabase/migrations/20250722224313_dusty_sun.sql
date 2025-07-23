/*
  # Create bookings table for appointment management

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `name` (text, patient name)
      - `email` (text, patient email)
      - `phone` (text, patient phone)
      - `age` (integer, patient age)
      - `consultation_type` (text, type of consultation)
      - `appointment_date` (date, appointment date)
      - `appointment_time` (text, appointment time)
      - `concern` (text, patient concern)
      - `previous_consultation` (boolean, has consulted before)
      - `status` (text, booking status)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `bookings` table
    - Add policy for authenticated users to read their own bookings
    - Add policy for admin to manage all bookings
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  age integer NOT NULL,
  consultation_type text NOT NULL DEFAULT 'video',
  appointment_date date NOT NULL,
  appointment_time text NOT NULL,
  concern text NOT NULL,
  previous_consultation boolean DEFAULT false,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own bookings
CREATE POLICY "Users can read own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt() ->> 'email');

-- Policy for users to create bookings
CREATE POLICY "Users can create bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy for admin to manage all bookings (you can modify this based on your admin setup)
CREATE POLICY "Admin can manage all bookings"
  ON bookings
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'kavyabhat23895@gmail.com');

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(appointment_date);
CREATE INDEX IF NOT EXISTS idx_bookings_email ON bookings(email);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);