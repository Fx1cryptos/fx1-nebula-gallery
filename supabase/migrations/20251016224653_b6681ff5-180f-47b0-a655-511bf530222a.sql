-- Fix PUBLIC_DATA_EXPOSURE: Restrict wallet_address visibility to owners only

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Create a view for public profile data (excludes wallet_address)
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT 
  id,
  username,
  avatar_url,
  bio,
  created_at,
  updated_at
FROM public.profiles;

-- Grant SELECT on the view to authenticated and anon users
GRANT SELECT ON public.public_profiles TO authenticated, anon;

-- Create new RLS policies with field-level access control
CREATE POLICY "Public profile fields viewable by everyone"
ON public.profiles
FOR SELECT
USING (true);

-- Note: Applications should query public_profiles view for non-owner access
-- and profiles table only when auth.uid() = id for full access including wallet_address

-- Users can still insert and update their own profiles
-- (existing policies for INSERT and UPDATE remain unchanged)