
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://uyfiukgtxkjavgvitzvf.supabase.co'
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;