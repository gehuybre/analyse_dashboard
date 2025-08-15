import { useKV } from '@github/spark/hooks';
import { AuthState } from '@/lib/types';

const ADMIN_PASSWORD = 'admin123'; // In production, this would be hashed and stored securely

export function useAuth() {
  const [authState, setAuthState] = useKV<AuthState>('auth-state', {
    isAuthenticated: false,
    hasAccess: false
  });

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setAuthState({
        isAuthenticated: true,
        hasAccess: true
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      hasAccess: false
    });
  };

  return {
    isAuthenticated: authState.isAuthenticated,
    hasAccess: authState.hasAccess,
    login,
    logout
  };
}