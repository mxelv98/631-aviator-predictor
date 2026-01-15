-- Admin Policies
-- Run this in Supabase SQL Editor

-- 1. Create a function to check if the user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid()
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Grant Admin Access to 'users' table
CREATE POLICY "Admins can view all users" ON public.users
FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can update users" ON public.users
FOR UPDATE USING (public.is_admin());

-- 3. Grant Admin Access to 'payments' table
CREATE POLICY "Admins can view all payments" ON public.payments
FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can update payments" ON public.payments
FOR UPDATE USING (public.is_admin());

-- 4. Grant Admin Access to 'vip_subscriptions' table
CREATE POLICY "Admins can view all subscriptions" ON public.vip_subscriptions
FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can update subscriptions" ON public.vip_subscriptions
FOR UPDATE USING (public.is_admin());

-- 5. Grant Admin Access to 'admin_logs' table
CREATE POLICY "Admins can view logs" ON public.admin_logs
FOR SELECT USING (public.is_admin());

CREATE POLICY "Admins can insert logs" ON public.admin_logs
FOR INSERT WITH CHECK (public.is_admin());
