-- Allow users to insert their own admin role during setup
-- This is needed for the initial admin creation flow
CREATE POLICY "Users can create own admin role"
ON public.user_roles
FOR INSERT
WITH CHECK (auth.uid() = user_id);