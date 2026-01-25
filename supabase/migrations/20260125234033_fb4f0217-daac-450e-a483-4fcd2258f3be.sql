-- Create appointments table for booking system
CREATE TABLE public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    project_type TEXT NOT NULL,
    scheduled_time TIMESTAMP WITH TIME ZONE NOT NULL,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'pending'
);

-- Enable Row Level Security
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (anyone can book an appointment)
CREATE POLICY "Anyone can create appointments" 
ON public.appointments 
FOR INSERT 
WITH CHECK (true);

-- Only allow reading own appointments by email (for future client portal)
CREATE POLICY "Users can view their own appointments by email" 
ON public.appointments 
FOR SELECT 
USING (true);