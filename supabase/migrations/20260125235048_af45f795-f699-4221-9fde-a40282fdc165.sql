-- Add UPDATE policy for admin to change appointment status
CREATE POLICY "Allow updating appointments" 
ON public.appointments 
FOR UPDATE 
USING (true)
WITH CHECK (true);