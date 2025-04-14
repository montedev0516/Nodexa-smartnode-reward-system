import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of public paths that don't require authentication
const publicPaths = [
  // Root path
  '/',

  // Authentication pages
  '/login',
  '/signup',
  '/reset-password',
  '/new-password',
  
  // Authentication API endpoints
  '/api/auth/login',
  '/api/auth/signup',
  '/api/auth/reset-password',
  '/api/auth/new-password',
  '/api/auth/check',
  '/api/auth/logout',
  
  // Static assets
  '/favicon.svg',
  '/images',
  '/fonts',
  '/styles',
  
  // Error pages
  '/404',
  '/500',
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is public
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path))

  // Get the token from the cookies
  const token = request.cookies.get('auth-token')?.value

  // If the path is public, allow access
  if (isPublicPath) {
    // If user is already logged in and tries to access login/signup pages, redirect to dashboard
    if (token && (pathname === '/login' || pathname === '/signup')) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
  }

  // If there's no token and the path is not public, redirect to login
  if (!token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If there's a token and the path is not public, allow access
  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/auth/* (authentication endpoints)
     * 2. /_next/* (Next.js internals)
     * 3. /static/* (static files)
     * 4. /*.png, /*.jpg, /*.jpeg, /*.gif, /*.svg (static images)
     * 5. /favicon.svg (favicon)
     * 6. /images/*, /fonts/*, /styles/* (public assets)
     * 7. /404, /500 (error pages)
     */
    '/((?!api/auth|_next|static|.*\\..*|favicon.svg|images|fonts|styles|404|500).*)',
  ],
} 