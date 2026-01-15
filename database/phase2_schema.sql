-- Create a table for user settings (Dark Mode, Notifications, etc.)
CREATE TABLE IF NOT EXISTS public.user_settings (
    user_id uuid REFERENCES public.users(id) NOT NULL PRIMARY KEY,
    dark_mode boolean DEFAULT false,
    notifications_enabled boolean DEFAULT true,
    updated_at timestamptz DEFAULT now()
);

-- RLS Policies for user_settings
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;

-- Allow users to see their own settings
CREATE POLICY "Users can view own settings" ON public.user_settings
FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- Allow users to update their own settings
CREATE POLICY "Users can update own settings" ON public.user_settings
FOR UPDATE TO authenticated
USING (auth.uid() = user_id);

-- Allow users to insert their own settings
CREATE POLICY "Users can insert own settings" ON public.user_settings
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Trigger to create user_settings row when a new user signs up (optional but good practice)
-- For now, we will handle creation in the frontend (upsert) to keep it simple.
