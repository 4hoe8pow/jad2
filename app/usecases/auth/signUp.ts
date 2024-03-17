import { SupabaseClient } from '@supabase/supabase-js'

const signUp = (supabase: SupabaseClient<any, 'public', any>) => {
    supabase.auth.signUp({ email: 'test@test.com', password: 'test' })
}

export default signUp