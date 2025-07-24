-- Update RLS policies for bookings table
-- This script fixes potential policy conflicts

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own bookings" ON bookings;
DROP POLICY IF EXISTS "Anyone can create bookings" ON bookings;
DROP POLICY IF EXISTS "Service role can manage bookings" ON bookings;
DROP POLICY IF EXISTS "Users can create bookings" ON bookings;
DROP POLICY IF EXISTS "Admin can manage all bookings" ON bookings;

-- Create simplified policies
-- Allow anyone (including anonymous users) to insert bookings
CREATE POLICY "Allow public booking creation"
  ON bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow service role to do everything
CREATE POLICY "Service role full access"
  ON bookings
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Allow users to read their own bookings
CREATE POLICY "Users read own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt() ->> 'email');

-- Allow admin to manage all bookings
CREATE POLICY "Admin full access"
  ON bookings
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'kavyabhat23895@gmail.com')
  WITH CHECK (auth.jwt() ->> 'email' = 'kavyabhat23895@gmail.com');
