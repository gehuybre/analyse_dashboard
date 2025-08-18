import { BarChart3 } from '@phosphor-icons/react';

export function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <BarChart3 className="w-12 h-12 mx-auto mb-4 text-primary animate-pulse" />
        <h2 className="text-xl font-semibold text-foreground mb-2">Loading Analytics Platform</h2>
        <p className="text-muted-foreground">Preparing your data reports...</p>
      </div>
    </div>
  );
}