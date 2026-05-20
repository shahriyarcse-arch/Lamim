-- ==========================================
-- SUPABASE PERFORMANCE OPTIMIZATION INDEXES
-- ==========================================
-- Instructions:
-- 1. Go to your Supabase Dashboard
-- 2. Click on "SQL Editor" on the left menu
-- 3. Click "New Query"
-- 4. Paste this entire file into the editor
-- 5. Click "Run" (or press Cmd/Ctrl + Enter)

-- 1. Optimize Profile Fetching and Sorting
-- This speeds up the Admin Panel when loading all users based on creation/update time
CREATE INDEX IF NOT EXISTS idx_profiles_created_at ON profiles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_updated_at ON profiles(updated_at DESC);

-- 2. Optimize Profile Role Queries
-- Speeds up filtering users by "admin" vs "user"
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- 3. Optimize Leaderboard / Scores
-- Speeds up the leaderboard sorting if you have a spirit_score column
CREATE INDEX IF NOT EXISTS idx_profiles_spirit_score ON profiles(spirit_score DESC);

-- 4. Optimize Broadcast fetching
-- Speeds up loading notifications ordered by newest first
CREATE INDEX IF NOT EXISTS idx_broadcasts_created_at ON app_broadcasts(created_at DESC);

-- Note: If you don't have the 'spirit_score' or 'app_broadcasts' table yet, 
-- those specific lines might throw a harmless warning. That is perfectly fine!
