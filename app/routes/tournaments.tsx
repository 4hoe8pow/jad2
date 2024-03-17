import { LoaderFunctionArgs } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'
import { createClient } from '@supabase/supabase-js'

export const loader = async ({  context }: LoaderFunctionArgs) => {
    const supabase = createClient(
        context.cloudflare.env.SUPABASE_URL!,
        context.cloudflare.env.SUPABASE_ANON_KEY!
    )
    const { data } = await supabase.from('season').select()
    return {
        data,
    }
}

const TournamentsPage = () => {
    const data = useLoaderData()
    return (
        <>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
    )
}

export default TournamentsPage
