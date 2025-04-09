import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import jwt from 'jsonwebtoken';

export async function GET() {
  try {
    // Check for NextAuth session
    const session = await getServerSession(authOptions);
    const hasNextAuthSession = !!session && !!session.user;
    
    // Check for custom auth token
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;
    let hasCustomAuth = false;
    let customAuthUserId = null;
    
    if (token) {
      try {
        // Verify the JWT token
        const secret = process.env.JWT_SECRET || 'your-secret-key';
        const decoded = jwt.verify(token, secret) as { userId: string; email: string };
        hasCustomAuth = true;
        customAuthUserId = decoded.userId;
      } catch (error) {
        console.error('JWT verification error:', error);
        hasCustomAuth = false;
      }
    }
    
    console.log('Auth check:', { 
      hasNextAuthSession, 
      hasCustomAuth,
      sessionExists: !!session,
      userId: session?.user?.id || customAuthUserId
    });
    
    // User is authenticated if either method is valid
    return NextResponse.json({
      authenticated: hasNextAuthSession || hasCustomAuth,
      nextAuth: hasNextAuthSession,
      customAuth: hasCustomAuth,
      userId: session?.user?.id || customAuthUserId
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 