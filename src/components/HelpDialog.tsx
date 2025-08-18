import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Share, 
  Lock, 
  Eye, 
  BarChart3,
  Plus,
  ExternalLink
} from '@phosphor-icons/react';

interface HelpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HelpDialog({ open, onOpenChange }: HelpDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Getting Started
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Public Reports
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Browse public reports that anyone can view. These demonstrate the platform's capabilities 
              with sample data analysis including charts and tables.
            </p>
            <Badge variant="outline">No login required</Badge>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Private Reports
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Access password-protected reports with sensitive data. Use the admin login to view 
              confidential financial and internal analytics.
            </p>
            <div className="bg-muted p-3 rounded-lg text-sm">
              <strong>Demo Password:</strong> <code className="font-mono bg-background px-2 py-1 rounded">admin123</code>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Creating Reports
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Build your own reports with multiple content types:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• <strong>Headings:</strong> Structure your content</li>
              <li>• <strong>Text:</strong> Analysis and explanations</li>
              <li>• <strong>Charts:</strong> Plotly.js JSON data</li>
              <li>• <strong>Tables:</strong> Structured data display</li>
            </ul>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Share className="w-4 h-4" />
              Embedding Content
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Share individual charts and tables via iframe embedding:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Hover over charts/tables and click the share button</li>
              <li>• Get direct links and iframe codes</li>
              <li>• Customize dimensions for your website</li>
              <li>• Preview before embedding</li>
            </ul>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Chart Data Format
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Use Plotly.js format for charts. Example:
            </p>
            <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto">
{`{
  "data": [{
    "x": ["A", "B", "C"],
    "y": [1, 2, 3],
    "type": "bar"
  }],
  "layout": {
    "title": "Sample Chart"
  }
}`}
            </pre>
          </div>

          <div className="flex justify-between items-center pt-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open('https://plotly.com/javascript/', '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Plotly Documentation
            </Button>
            <Button onClick={() => onOpenChange(false)}>
              Got it!
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}