import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bjixyukzsuaflpxiriva.supabase.co'; // Ganti dengan URL Supabase Anda
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqaXh5dWt6c3VhZmxweGlyaXZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwNzQzNDksImV4cCI6MjA1NTY1MDM0OX0.3INUixBawZEVSLLl6Pbz61PDvQ7ChrFsTr34C9Yr7FQ'; // Ganti dengan Anon Key Supabase Anda
export const supabase = createClient(supabaseUrl, supabaseKey);
