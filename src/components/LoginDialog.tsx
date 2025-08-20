import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { GoogleAuth } from '@/components/GoogleAuth';
import { useAuth } from '@/hooks/use-auth';
import { GoogleUser } from '@/lib/types';
import { Lock } from '@phosphor-icons/react';
import { toast } from 'sonner';

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const [password, setPassword] = useState('');
  const { loginWithPassword, loginWithGoogle, user } = useAuth();

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginWithPassword(password)) {
      toast.success('Successfully authenticated');
      onOpenChange(false);
      setPassword('');
    } else {
      toast.error('Invalid password');
      setPassword('');
    }
  };

  const handleGoogleLogin = (googleUser: GoogleUser) => {
    loginWithGoogle(googleUser);
    toast.success(`Welcome back, ${googleUser.name}!`);
    onOpenChange(false);
  };

  const handleGoogleLogout = () => {
    // This shouldn't happen in the login dialog, but included for completeness
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Admin Access Required
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Google Login */}
          <GoogleAuth
            onLogin={handleGoogleLogin}
            onLogout={handleGoogleLogout}
            currentUser={user}
          />

          <div className="flex items-center gap-2">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">OR</span>
            <Separator className="flex-1" />
          </div>

          {/* Password Login */}
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Demo password: admin123
              </p>
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Login
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}