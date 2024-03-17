import { SupabaseClient } from '@supabase/supabase-js'

const signIn = (supabase: SupabaseClient<any, 'public', any>) => {
    supabase.auth.signInWithPassword({ email: 'test@agni.ninja', password: 'test' })
}

export default signIn
