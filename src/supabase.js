import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uuzqvmghxnlxosxmfxih.supabase.co'; // Ganti dengan URL Supabase Anda
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1enF2bWdoeG5seG9zeG1meGloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwOTc1NDAsImV4cCI6MjA1MTY3MzU0MH0.CqmkH8icL6ubi4U8ZDlqzjRFyndIrd94hOU8qpVL_tI'; // Ganti dengan Anon Key Supabase Anda
export const supabase = createClient(supabaseUrl, supabaseKey);
