import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useKV } from '@github/spark/hooks';
import { 
  BarChart3, 
  FileText, 
  Share, 
  Sparkle,
  Plus,
  Upload
} from '@phosphor-icons/react';

export function WelcomeDialog() {
  const [hasSeenWelcome, setHasSeenWelcome] = useKV<boolean>('has-seen-welcome', false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (!hasSeenWelcome) {
      // Show welcome after a brief delay
      const timer = setTimeout(() => {
        setShowWelcome(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasSeenWelcome]);

  const handleClose = () => {
    setShowWelcome(false);
    setHasSeenWelcome(true);
  };

  if (!showWelcome) return null;

  return (
    <Dialog open={showWelcome} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkle className="w-5 h-5 text-primary" />
            Welcome to Analytics Platform
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <p className="text-muted-foreground">
            Professional reporting platform for data analysis with embeddable charts and tables. 
            Create, share, and embed interactive reports with ease.
          </p>

          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <FileText className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Sample Reports</h4>
                <p className="text-sm text-muted-foreground">
                  Browse existing reports with real data examples
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <Plus className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Create Reports</h4>
                <p className="text-sm text-muted-foreground">
                  Upload CSV data and build interactive charts and tables
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <Share className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Embeddable Content</h4>
                <p className="text-sm text-muted-foreground">
                  Share charts and tables via iframe codes for external websites
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose}>
              Explore on my own
            </Button>
            <Button onClick={handleClose}>
              Get Started
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}