-- 1. Update public.users to store email and phone (for easy admin viewing)
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS email text,
ADD COLUMN IF NOT EXISTS phone text;

-- 2. Create admin_messages table
CREATE TABLE IF NOT EXISTS public.admin_messages (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    sender_id uuid REFERENCES public.users(id) NOT NULL,
    receiver_id uuid REFERENCES public.users(id), -- Nullable for broadcast
    message text NOT NULL,
    created_at timestamptz DEFAULT now(),
    is_read boolean DEFAULT false
);

-- 3. Trigger to sync email/phone from auth.users on signup
-- First, recreate the function to include email/phone
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, role, email, phone)
  VALUES (
    new.id, 
    'user', 
    new.email, 
    new.phone
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Enable RLS on admin_messages
ALTER TABLE public.admin_messages ENABLE ROW LEVEL SECURITY;

-- 5. Policies for admin_messages
-- Admins can do everything
CREATE POLICY "Admins can do everything on messages" 
ON public.admin_messages 
FOR ALL 
TO authenticated 
USING (is_admin());

-- Users can read messages sent to them or broadcasts (receiver_id is null)
CREATE POLICY "Users can see their messages" 
ON public.admin_messages 
FOR SELECT 
TO authenticated 
USING (
    receiver_id = auth.uid() OR receiver_id IS NULL
);

-- 6. Grant permissions
GRANT ALL ON public.admin_messages TO authenticated;
GRANT ALL ON public.admin_messages TO service_role;
