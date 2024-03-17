import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
} from '@remix-run/react'
import clsx from 'clsx'
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from 'remix-themes'

import JadHeader from './presentation/components/jad-header'
import { themeSessionResolver } from './sessions.server'

import type { LinksFunction, LoaderFunctionArgs } from '@remix-run/cloudflare'

import styles from '~/presentation/tailwind.css'
import { createClient } from '@supabase/supabase-js'
import { useState } from 'react'

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export async function loader({ request, context }: LoaderFunctionArgs) {
    const { getTheme } = await themeSessionResolver(request)
    const env = {
        SUPABASE_URL: context.cloudflare.env.SUPABASE_URL!,
        SUPABASE_ANON_KEY: context.cloudflare.env.SUPABASE_ANON_KEY!,
    }
    return {
        sessionTheme: getTheme(),
        env,
    }
}

export function App() {
    const { sessionTheme, env } = useLoaderData<typeof loader>()
    const [theme] = useTheme()


    const [supabase] = useState(() => createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY))
    return (
        <html lang="en" className={clsx(theme)}>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <PreventFlashOnWrongTheme ssrTheme={Boolean(sessionTheme)} />
                <Links />
            </head>
            <body>
                <JadHeader />
                <Outlet context={{ supabase }} />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}

export default function AppWithProviders() {
    const { sessionTheme } = useLoaderData<typeof loader>()
    return (
        <ThemeProvider specifiedTheme={sessionTheme} themeAction="/action/set-theme">
            <App />
        </ThemeProvider>
    )
}
