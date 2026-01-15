import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { Resend } from "npm:resend";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const resend = new Resend(RESEND_API_KEY);

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const supabase = createClient(
            Deno.env.get("SUPABASE_URL") ?? "",
            Deno.env.get("SUPABASE_STATE_KEY") ?? "", // Use Service Role Key for Admin actions
            { global: { headers: { Authorization: req.headers.get("Authorization")! } } }
        );

        // 1. Verify User is Admin
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) throw new Error("Unauthorized");

        const { data: userRole } = await supabase
            .from('users')
            .select('role')
            .eq('id', user.id)
            .single();

        if (userRole?.role !== 'admin') {
            throw new Error("Forbidden: Admin access only");
        }

        const { subject, message, recipient_ids } = await req.json();

        // 2. Fetch Recipients
        let emails = [];
        if (recipient_ids === 'all') {
            const { data } = await supabase.from('users').select('email').not('email', 'is', null);
            emails = data?.map(u => u.email) || [];
        } else if (Array.isArray(recipient_ids)) {
            const { data } = await supabase.from('users').select('email').in('id', recipient_ids);
            emails = data?.map(u => u.email) || [];
        } else {
            // Single ID
            const { data } = await supabase.from('users').select('email').eq('id', recipient_ids).single();
            if (data?.email) emails = [data.email];
        }

        if (emails.length === 0) {
            return new Response(JSON.stringify({ message: "No recipients found" }), {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        // 3. Send Emails via Resend (Batching if needed, but simple loop for now)
        // Note: Resend Free tier has limits, check logs.
        const results = [];
        for (const email of emails) {
            try {
                const data = await resend.emails.send({
                    from: "1631 Admin <onboarding@resend.dev>", // Change this if you have a custom domain
                    to: [email],
                    subject: subject,
                    html: `<div style="font-family: sans-serif; padding: 20px;">
                        <h2>${subject}</h2>
                        <p>${message.replace(/\n/g, '<br>')}</p>
                        <hr />
                        <p style="font-size: 12px; color: #888;">1631 Aviator Predictor</p>
                       </div>`,
                });
                results.push({ email, status: 'sent', id: data.id });
            } catch (err) {
                console.error(`Failed to send to ${email}`, err);
                results.push({ email, status: 'failed', error: err });
            }
        }

        return new Response(JSON.stringify({ success: true, results }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});
