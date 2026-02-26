import { createClient } from '@supabase/supabase-js';

// Using provided credentials as fallbacks to prevent initialization errors
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://czxpzzlokxeayjgzqrgs.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6eHB6emxva3hlYXlqZ3pxcmdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzOTY3ODksImV4cCI6MjA3NTk3Mjc4OX0.vQDiW-OZtPqAzmhsrDGaor_86FeGvRo7tRlXwS16s0E';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
