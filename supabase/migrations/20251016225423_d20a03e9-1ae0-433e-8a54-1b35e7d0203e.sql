-- Fix security definer view warning by recreating the view with explicit SECURITY INVOKER

-- Drop and recreate the view with SECURITY INVOKER (default behavior)
DROP VIEW IF EXISTS public.public_profiles;

CREATE VIEW public.public_profiles 
WITH (security_invoker = true)
AS
SELECT 
  id,
  username,
  avatar_url,
  bio,
  created_at,
  updated_at
FROM public.profiles;

-- Grant SELECT on the view
GRANT SELECT ON public.public_profiles TO authenticated, anon;