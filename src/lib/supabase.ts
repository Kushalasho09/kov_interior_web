import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ythxnotnnudsmlkpvddq.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_5g4Rm347GzE_7DmlmJba8Q_AR9Q1Ba1';

// Standard client for application operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
