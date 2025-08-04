-- MentoLoop Database Schema for Supabase
-- Run this in your Supabase SQL editor to set up the database

-- Create the waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL CHECK (role IN ('student', 'preceptor', 'school')),
  referral_source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- Create an index on created_at for chronological queries
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at);

-- Create an index on role for filtering
CREATE INDEX IF NOT EXISTS idx_waitlist_role ON waitlist(role);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to insert (for waitlist signup)
-- but restricts reading to authenticated users (for admin purposes)
CREATE POLICY "Anyone can insert into waitlist" ON waitlist
  FOR INSERT WITH CHECK (true);

-- Create a policy for reading (only for authenticated users - for admin dashboard)
CREATE POLICY "Only authenticated users can read waitlist" ON waitlist
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create a view for basic statistics (without exposing personal data)
CREATE OR REPLACE VIEW waitlist_stats AS
SELECT 
  role,
  referral_source,
  DATE_TRUNC('day', created_at) as signup_date,
  COUNT(*) as count
FROM waitlist 
GROUP BY role, referral_source, DATE_TRUNC('day', created_at)
ORDER BY signup_date DESC;

-- Grant access to the stats view for anonymous users
GRANT SELECT ON waitlist_stats TO anon;

-- Optional: Create a function to get total counts by role
CREATE OR REPLACE FUNCTION get_waitlist_counts()
RETURNS TABLE(role TEXT, count BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT w.role, COUNT(*)
  FROM waitlist w
  GROUP BY w.role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION get_waitlist_counts() TO anon;