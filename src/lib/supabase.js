import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const SETTINGS_ROW = '00000000-0000-0000-0000-000000000001'

export async function trackVisitor(name) {
  try {
    const { data } = await supabase
      .from('visitors')
      .select('id, visit_count, name')
      .ilike('name', name.trim())
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (data) {
      await supabase
        .from('visitors')
        .update({ last_visit: new Date().toISOString(), visit_count: (data.visit_count || 1) + 1 })
        .eq('id', data.id)
    } else {
      await supabase.from('visitors').insert({ name: name.trim() })
    }
  } catch (e) {
    console.warn('Visitor tracking failed', e)
  }
}

export async function validateAdmin() {
  const { data } = await supabase.auth.getSession()
  if (!data.session) return false
  const { data: profile, error } = await supabase
    .from('admin_profiles')
    .select('is_admin')
    .eq('id', data.session.user.id)
    .maybeSingle()
  return !error && profile?.is_admin === true
}