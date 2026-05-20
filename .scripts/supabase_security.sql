-- ==========================================
-- SUPABASE PROFESSIONAL SECURITY (RLS)
-- ==========================================
-- Instructions: Run this in your Supabase SQL Editor.
-- This locks down your database so hackers cannot bypass the frontend UI.

-- 1. Enable Row Level Security (RLS) on Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Clean up any existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON profiles;

-- 2. Allow users to see and edit ONLY their own profile
CREATE POLICY "Users can view own profile" 
ON profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON profiles FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
ON profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- ==========================================
-- ADMIN SECURITY (FIXING INFINITE RECURSION)
-- ==========================================
-- We create a SECURITY DEFINER function. This allows the database to check the user's role 
-- without triggering a loop of RLS policy checks on the exact same table.

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean 
LANGUAGE sql 
SECURITY DEFINER 
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- 3. The Admin Override Policies
CREATE POLICY "Admins can view all profiles" 
ON profiles FOR SELECT 
USING ( public.is_admin() );

CREATE POLICY "Admins can update all profiles" 
ON profiles FOR UPDATE 
USING ( public.is_admin() );

-- ==========================================
-- BROADCAST SECURITY
-- ==========================================
ALTER TABLE app_broadcasts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read broadcasts" ON app_broadcasts;
DROP POLICY IF EXISTS "Only admins can insert broadcasts" ON app_broadcasts;

-- Anyone can read broadcasts
CREATE POLICY "Anyone can read broadcasts" 
ON app_broadcasts FOR SELECT 
USING (true);

-- Only admins can send broadcasts
CREATE POLICY "Only admins can insert broadcasts" 
ON app_broadcasts FOR INSERT 
WITH CHECK ( public.is_admin() );

-- ==========================================
-- USER DATA TABLES SECURITY (salah_logs, dhikr_logs, finance_store, mujahid_habits, user_settings, goals, dhikr_presets)
-- ==========================================
-- All user data tables must restrict access strictly to their owner (user_id = auth.uid())

DO $$
DECLARE
    tbl text;
    tables text[] := ARRAY['salah_logs', 'dhikr_logs', 'finance_store', 'mujahid_habits', 'user_settings', 'goals', 'dhikr_presets'];
BEGIN
    FOREACH tbl IN ARRAY tables LOOP
        -- Enable RLS
        EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY;', tbl);
        
        -- Drop existing policies if any
        EXECUTE format('DROP POLICY IF EXISTS "Users can manage their own %s" ON %I;', tbl, tbl);
        EXECUTE format('DROP POLICY IF EXISTS "Admins can view all %s" ON %I;', tbl, tbl);
        
        -- Create owner policy
        EXECUTE format('
            CREATE POLICY "Users can manage their own %1$s" 
            ON %2$I FOR ALL 
            USING (auth.uid() = user_id) 
            WITH CHECK (auth.uid() = user_id);
        ', tbl, tbl);
        
        -- Create admin view policy (optional but recommended for administrative analytics)
        EXECUTE format('
            CREATE POLICY "Admins can view all %1$s" 
            ON %2$I FOR SELECT 
            USING (public.is_admin());
        ', tbl, tbl);
    END LOOP;
END $$;
