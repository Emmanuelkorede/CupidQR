import { createClient } from '@supabase/supabase-js'
 const supabaseUrl = 'https://lrfbbrjsfjpvycvbmgyd.supabase.co'
const supabaseAnonKey = 'sb_publishable_Nkdp-JHU9V0hFzAyu__47A_OtmSA8T4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)