import type { MetaFunction } from '@remix-run/cloudflare'

import { Button } from '~/presentation/components/ui/button'

export const meta: MetaFunction = () => {
    return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }]
}

export default function Index() {
    return (
        <>
            <h1 className="text-3xl font-bold underline">Welcome to Remix!</h1>
            <Button variant="outline">Button</Button>
        </>
    )
}
