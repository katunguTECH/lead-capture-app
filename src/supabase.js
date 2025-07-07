import { createClient } from '@supabase/supabase-js';

// 🔑 Replace these with your actual Supabase values
const supabaseUrl = 'https://supabase.com/dashboard/project/nzrmlbknrkehumxwouvk/settings/api-keys';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56cm1sYmtucmtlaHVteHdvdXZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE4Mzg4MTgsImV4cCI6MjA2NzQxNDgxOH0.gW_DuPao6CRGt5MgF1gHdGEwmQvbzkplC0cb5RBFerc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
