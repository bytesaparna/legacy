-- Migration: Add wellness check fields to User table
-- Run this in your Supabase SQL Editor

-- Add lastWellnessCheck column
ALTER TABLE "User" 
ADD COLUMN IF NOT EXISTS "lastWellnessCheck" TIMESTAMP(3);

-- Add wellnessCheckEnabled column with default value
ALTER TABLE "User" 
ADD COLUMN IF NOT EXISTS "wellnessCheckEnabled" BOOLEAN NOT NULL DEFAULT true;

-- Add index on lastWellnessCheck for performance
CREATE INDEX IF NOT EXISTS "User_lastWellnessCheck_idx" ON "User"("lastWellnessCheck");

-- Verify the changes
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'User'
AND column_name IN ('lastWellnessCheck', 'wellnessCheckEnabled');

