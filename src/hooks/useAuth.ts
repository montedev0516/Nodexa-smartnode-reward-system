import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export function useAuth() {
  const router = useRouter();
  const { status: nextAuthStatus, data: session } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMethod, setAuthMethod] = useState<'nextauth' | 'custom' | null>(null);
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);

  useEffect(() => {
    // Check if user is authenticated via NextAuth
    const isNextAuthAuthenticated = nextAuthStatus === 'authenticated' && !!session;
    
    if (isNextAuthAuthenticated) {
      console.log('Authenticated via NextAuth:', session?.user?.email);
      setIsAuthenticated(true);
      setAuthMethod('nextauth');
      setUser({
        id: session.user.id,
        email: session.user.email
      });
      setIsLoading(false);
      return;
    }
    
    // If not authenticated via NextAuth, check custom auth
    const checkCustomAuth = async () => {
      try {
        console.log('Checking custom authentication...');
        const response = await fetch('/api/auth/check');
        const data = await response.json();
        
        console.log('Auth check response:', data);
        
        if (data.authenticated) {
          setIsAuthenticated(true);
          setAuthMethod(data.nextAuth ? 'nextauth' : 'custom');
          
          // If we have a userId but no user data yet, fetch user data
          if (data.userId && !user) {
            const userResponse = await fetch('/api/auth/myaccount');
            const userData = await userResponse.json();
            
            if (userData.email) {
              setUser({
                id: data.userId,
                email: userData.email
              });
            }
          }
        } else {
          setIsAuthenticated(false);
          setAuthMethod(null);
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
        setAuthMethod(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    // Only check custom auth if NextAuth is not authenticated
    if (nextAuthStatus !== 'loading') {
      checkCustomAuth();
    }
  }, [nextAuthStatus, session, user]);

  const logout = async () => {
    try {
      // Try to logout from both systems
      await Promise.all([
        fetch('/api/auth/logout', { method: 'POST' }),
        fetch('/api/auth/signout', { method: 'POST' })
      ]);
      
      setIsAuthenticated(false);
      setAuthMethod(null);
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    isLoading,
    isAuthenticated,
    authMethod,
    user,
    logout
  };
} 