/* =============================================
   LAMIM — SUPABASE CLIENT INITIALIZATION
   ============================================= */

// Replace these with your actual Supabase URL and Anon Key
const SUPABASE_URL = 'https://bfgcuuidbjsioortfcde.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmZ2N1dWlkYmpzaW9vcnRmY2RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0OTQ3MDQsImV4cCI6MjA5MzA3MDcwNH0.VkYUsiDJglxcXhxGFahUbqFiYCA-m4DDjh2bzhiO3Js';

// Initialize the Supabase client
// We use window.supabase which is loaded via CDN in index.html
if (typeof supabase !== 'undefined') {
  const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  window.supabaseClient = supabaseClient;
  console.log("Supabase successfully initialized.");
} else if (typeof window.supabase !== 'undefined') {
  const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  window.supabaseClient = supabaseClient;
  console.log("Supabase successfully initialized from window object.");
} else {
  console.error("Supabase CDN script failed to load. window.supabase is undefined.");
}
