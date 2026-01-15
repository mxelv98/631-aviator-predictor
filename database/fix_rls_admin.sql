-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vip_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_logs ENABLE ROW LEVEL SECURITY;

-- Policy 1: Users can read their own data
DROP POLICY IF EXISTS "Users can read own data" ON public.users;
CREATE POLICY "Users can read own data" ON public.users FOR SELECT USING (auth.uid() = id);

-- Policy 2: Admins can do EVERYTHING on users table
DROP POLICY IF EXISTS "Admins can do everything on users" ON public.users;
CREATE POLICY "Admins can do everything on users" ON public.users FOR ALL USING (
  public.is_admin(auth.uid())
);

-- Policy 3: VIP Subscriptions - Users read own
DROP POLICY IF EXISTS "Users read own vip" ON public.vip_subscriptions;
CREATE POLICY "Users read own vip" ON public.vip_subscriptions FOR SELECT USING (auth.uid() = user_id);

-- Policy 4: Admins can do EVERYTHING on vip_subscriptions
DROP POLICY IF EXISTS "Admins full access vip" ON public.vip_subscriptions;
CREATE POLICY "Admins full access vip" ON public.vip_subscriptions FOR ALL USING (
  public.is_admin(auth.uid())
);

-- Policy 5: Admin Logs - Only Admins can insert/select
DROP POLICY IF EXISTS "Admins access logs" ON public.admin_logs;
CREATE POLICY "Admins access logs" ON public.admin_logs FOR ALL USING (
  public.is_admin(auth.uid())
);

-- helper function to check admin without infinite recursion
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = user_id AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
