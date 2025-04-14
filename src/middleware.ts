import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

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

// Helper function to validate JWT token format
function isValidJwtFormat(token: string): boolean {
  const parts = token.split('.');
  return parts.length === 3 && 
         parts.every(part => /^[A-Za-z0-9-_]+$/.test(part));
}

// Helper function to validate JWT token
function validateJwtToken(token: string): boolean {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('JWT_SECRET is not set');
      return false;
    }
    
    // Verify the token and get decoded payload
    const decoded = jwt.verify(token, secret) as { iat: number };
    
    // Check if token is older than 1 hour (3600 seconds)
    const tokenAge = Math.floor(Date.now() / 1000) - decoded.iat;
    if (tokenAge > 3600) {
      console.log('Token expired (older than 1 hour)');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('JWT validation error:', error);
    return false;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is public
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path))

  // Get the token from the cookies
  const token = request.cookies.get('auth-token')?.value
  console.log('##middleware##Token:', token);

  // If the path is public, allow access
  if (isPublicPath) {
    console.log('##middleware##isPublicPath:', isPublicPath);
    // If user is already logged in and tries to access login/signup pages, redirect to dashboard
    if (token && (pathname === '/login' || pathname === '/signup')) {
      // Validate token before redirecting
      if (isValidJwtFormat(token) && validateJwtToken(token)) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }
    return NextResponse.next()
  }

  // If there's no token and the path is not public, redirect to login
  if (!token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Validate token format and signature
  if (!isValidJwtFormat(token) || !validateJwtToken(token)) {
    // Clear invalid token
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('auth-token')
    return response
  }

  // If there's a valid token and the path is not public, allow access
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