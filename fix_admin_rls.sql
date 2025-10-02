-- Fix RLS policies to allow admin panel updates with anonymous key
-- This approach allows anonymous users to update bookings (for admin panel)
-- while still maintaining some security

-- First, disable RLS temporarily to clean up policies
ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Allow public booking creation" ON bookings;
DROP POLICY IF EXISTS "Service role full access" ON bookings;
DROP POLICY IF EXISTS "Users read own bookings" ON bookings;
DROP POLICY IF EXISTS "Admin full access" ON bookings;

-- Re-enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert bookings (for patient booking form)
CREATE POLICY "Allow public booking creation"
  ON bookings
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow anyone to read all bookings (for admin panel)
CREATE POLICY "Allow public read access"
  ON bookings
  FOR SELECT
  TO public
  USING (true);

-- Allow anyone to update booking status and related fields (for admin panel)
CREATE POLICY "Allow admin updates"
  ON bookings
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Allow service role to do everything (for functions)
CREATE POLICY "Service role full access"
  ON bookings
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Prevent deletion by anonymous users (only service role can delete)
CREATE POLICY "Prevent public deletion"
  ON bookings
  FOR DELETE
  TO public
  USING (false);