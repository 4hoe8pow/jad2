import { createCookieSessionStorage } from '@remix-run/cloudflare'
import { createThemeSessionResolver } from 'remix-themes'

// You can default to 'development' if process.env.NODE_ENV is not set
const isProduction = process.env.NODE_ENV === 'production'

// Theme session storage configuration
const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: 'theme',
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secrets: ['s3cr3t'],
        // Set domain and secure only if in production
        ...(isProduction ? { domain: 'your-production-domain.com', secure: true } : {}),
    },
})

export const themeSessionResolver = createThemeSessionResolver(sessionStorage)

// Session storage configuration
const { getSession, commitSession, destroySession } = createCookieSessionStorage({
    cookie: {
        name: '__session',
        expires: new Date(Date.now() + 180), //3 minutes
        httpOnly: true,
        maxAge: 180, //3 minutes
        path: '/',
        sameSite: 'lax',
        secrets: ['test'],
        secure: true,
    },
})

export { getSession, commitSession, destroySession }
