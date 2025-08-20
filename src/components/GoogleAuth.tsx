import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GoogleUser } from '@/lib/types';
import { GoogleLogo, SignOut, AlertCircle, CheckCircle } from '@phosphor-icons/react';

interface GoogleAuthProps {
  onLogin: (user: GoogleUser) => void;
  onLogout: () => void;
  currentUser?: GoogleUser | null;
}

export function GoogleAuth({ onLogin, onLogout, currentUser }: GoogleAuthProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulate Google OAuth flow since we can't use real Google APIs in this environment
  const simulateGoogleLogin = async (): Promise<GoogleUser> => {
    // In a real implementation, this would use Google OAuth
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 'user_' + Date.now(),
          email: 'user@example.com',
          name: 'Demo User',
          picture: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face`
        });
      }, 1500);
    });
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real implementation, you would:
      // 1. Load the Google Identity Services library
      // 2. Initialize with your Google Client ID
      // 3. Handle the OAuth flow
      // 4. Get the user's profile information

      const user = await simulateGoogleLogin();
      onLogin(user);
    } catch (err) {
      setError('Failed to sign in with Google. Please try again.');
      console.error('Google login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    onLogout();
    setError(null);
  };

  if (currentUser) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Signed In
          </CardTitle>
          <CardDescription>
            You are signed in with your Google account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted">
            <Avatar>
              <AvatarImage src={currentUser.picture} alt={currentUser.name} />
              <AvatarFallback>
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium">{currentUser.name}</p>
              <p className="text-sm text-muted-foreground">{currentUser.email}</p>
            </div>
          </div>
          
          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full"
          >
            <SignOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GoogleLogo className="w-5 h-5" />
          Google Sign In
        </CardTitle>
        <CardDescription>
          Sign in with your Google account to access all features
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full"
          variant="outline"
        >
          <GoogleLogo className="w-4 h-4 mr-2" />
          {isLoading ? 'Signing in...' : 'Continue with Google'}
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="text-xs text-muted-foreground space-y-1">
          <p><strong>Demo Mode:</strong> This is a simulated Google login for demonstration</p>
          <p><strong>Production Setup:</strong> Requires Google Cloud Console configuration</p>
          <p><strong>Features:</strong> Access to private reports and admin functions</p>
        </div>
      </CardContent>
    </Card>
  );
}