-- Run this SQL in your Supabase SQL Editor to fix RLS policies

-- Temporarily disable RLS to clean up
ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Anyone can create bookings" ON bookings;
DROP POLICY IF EXISTS "Users can create bookings" ON bookings;
DROP POLICY IF EXISTS "Public can create bookings" ON bookings;
DROP POLICY IF EXISTS "Users can read own bookings" ON bookings;
DROP POLICY IF EXISTS "Anyone can read bookings" ON bookings;
DROP POLICY IF EXISTS "Service role can manage bookings" ON bookings;
DROP POLICY IF EXISTS "Admin can manage all bookings" ON bookings;
DROP POLICY IF EXISTS "Allow public booking creation" ON bookings;
DROP POLICY IF EXISTS "Service role full access" ON bookings;
DROP POLICY IF EXISTS "Users read own bookings" ON bookings;
DROP POLICY IF EXISTS "Admin full access" ON bookings;

-- Re-enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create simple, working policies
CREATE POLICY "Enable insert for anonymous users" ON bookings
  FOR INSERT 
  TO anon 
  WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users" ON bookings
  FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Enable read for service role" ON bookings
  FOR SELECT 
  TO service_role 
  USING (true);

CREATE POLICY "Enable all for service role" ON bookings
  FOR ALL 
  TO service_role 
  USING (true) 
  WITH CHECK (true);

-- Allow admin to see all bookings
CREATE POLICY "Admin can view all bookings" ON bookings
  FOR SELECT 
  TO authenticated 
  USING (auth.jwt() ->> 'email' = 'kavyabhat23895@gmail.com');
