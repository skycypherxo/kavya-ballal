-- Fix RLS policies for bookings table to allow anonymous booking creation and reading

-- First, drop ALL existing policies to start fresh
DROP POLICY IF EXISTS "Anyone can create bookings" ON bookings;
DROP POLICY IF EXISTS "Users can create bookings" ON bookings;
DROP POLICY IF EXISTS "Users can read own bookings" ON bookings;
DROP POLICY IF EXISTS "Allow anonymous booking creation" ON bookings;
DROP POLICY IF EXISTS "Allow authenticated booking creation" ON bookings;
DROP POLICY IF EXISTS "Service role can manage bookings" ON bookings;
DROP POLICY IF EXISTS "Admin can manage all bookings" ON bookings;

-- Create comprehensive policies for full functionality

-- 1. Allow anonymous users (public) to INSERT bookings (for booking form)
CREATE POLICY "Public can create bookings"
  ON bookings
  FOR INSERT
  TO anon, public
  WITH CHECK (true);

-- 2. Allow anonymous users to SELECT/READ all bookings (for admin panel)
CREATE POLICY "Public can read all bookings"
  ON bookings
  FOR SELECT
  TO anon, public
  USING (true);

-- 3. Allow authenticated users to create bookings
CREATE POLICY "Authenticated users can create bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 4. Allow authenticated users to read all bookings
CREATE POLICY "Authenticated users can read all bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (true);

-- 5. Allow service role full access (for Edge Functions)
CREATE POLICY "Service role full access"
  ON bookings
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Verify the table has RLS enabled
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
