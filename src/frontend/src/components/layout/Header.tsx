import { Button } from '@/components/ui/button';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { User } from 'lucide-react';

export function Header() {
  const { identity, login, clear, isLoggingIn } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  const handleSignOut = async () => {
    await clear();
    // Clear all cached data on sign out
    queryClient.clear();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold tracking-tight sm:text-xl">
            Study Mate Pro <span className="text-muted-foreground">by John</span>
          </h1>
        </div>
        
        <nav className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {identity.getPrincipal().toString().slice(0, 8)}...
                </span>
              </div>
              <Button onClick={handleSignOut} variant="outline" size="sm">
                Sign Out
              </Button>
            </div>
          ) : (
            <Button onClick={login} disabled={isLoggingIn} size="sm">
              {isLoggingIn ? 'Connecting...' : 'Sign In'}
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
