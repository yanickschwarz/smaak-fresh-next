"use client";

import { createClient } from "@supabase/supabase-js";

/**
 * Supabase Client für client-seitige Form-Submission an Edge Functions.
 *
 * Wir nutzen kein Auth — daher persistSession=false. Die Edge Functions
 * (smaak-send-email, smaak-send-order, smaak-google-reviews) sind als
 * öffentliche Endpunkte konfiguriert und akzeptieren den anon-Key.
 *
 * Spam-Schutz erfolgt über Cloudflare Turnstile (Token wird im Body
 * mitgesendet und in der Edge Function validiert).
 */

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://ahlgamswoyeeimkvpuoz.supabase.co";

const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFobGdhbXN3b3llZWlta3ZwdW96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwODEwNTEsImV4cCI6MjA4ODY1NzA1MX0.XAWYmx552pVo1Kj4kuryDBTitYpjKzhoIWjii17vzLo";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
