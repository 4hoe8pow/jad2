import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { createClient } from '@supabase/supabase-js'
import { useState } from 'react'

import { Button } from '~/presentation/components/ui/button'
import signIn from '~/usecases/auth/signIn'
import signUp from '~/usecases/auth/signUp'

export const meta: MetaFunction = () => {
    return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }]
}

export async function loader({ context }: LoaderFunctionArgs) {
    const env = {
        SUPABASE_URL: context.cloudflare.env.SUPABASE_URL!,
        SUPABASE_ANON_KEY: context.cloudflare.env.SUPABASE_ANON_KEY!,
    }
    return {
        env,
    }
}

export default function Index() {
    const { env } = useLoaderData<typeof loader>()
    const [supabase] = useState(() => createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY))
    return (
        <>
            <h1 className="text-3xl font-bold underline">Welcome to Remix!</h1>
            <Button variant="outline" onClick={() => signUp(supabase)}>
                Sign Up
            </Button>
            <Button variant="outline" onClick={() => signIn(supabase)}>
                Sign In
            </Button>
        </>
    )
}
