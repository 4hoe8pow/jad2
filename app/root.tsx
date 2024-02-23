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

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export async function loader({ request }: LoaderFunctionArgs) {
    const { getTheme } = await themeSessionResolver(request)
    return {
        theme: getTheme(),
    }
}

export function App() {
    const data = useLoaderData<typeof loader>()
    const [theme] = useTheme()
    return (
        <html lang="en" className={clsx(theme)}>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
                <Links />
            </head>
            <body>
                <JadHeader />
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}

export default function AppWithProviders() {
    const data = useLoaderData<typeof loader>()
    return (
        <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
            <App />
        </ThemeProvider>
    )
}
