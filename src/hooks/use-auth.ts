import { useKV } from '@github/spark/hooks';
import { AuthState, GoogleUser } from '@/lib/types';

const ADMIN_PASSWORD = 'admin123'; // In production, this would be hashed and stored securely

export function useAuth() {
  const [authState, setAuthState] = useKV<AuthState>('auth-state', {
    isAuthenticated: false,
    hasAccess: false
  });

  const loginWithPassword = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setAuthState({
        isAuthenticated: true,
        hasAccess: true
      });
      return true;
    }
    return false;
  };

  const loginWithGoogle = (user: GoogleUser) => {
    setAuthState({
      isAuthenticated: true,
      hasAccess: true,
      user
    });
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      hasAccess: false,
      user: undefined
    });
  };

  return {
    isAuthenticated: authState.isAuthenticated,
    hasAccess: authState.hasAccess,
    user: authState.user,
    loginWithPassword,
    loginWithGoogle,
    logout
  };
}