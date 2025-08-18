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
              <li>• <strong>Charts:</strong> Interactive visualizations with Chart Builder</li>
              <li>• <strong>Tables:</strong> Structured data display</li>
            </ul>
            
            <div className="mt-4 bg-accent/10 p-3 rounded-lg">
              <h4 className="font-medium text-sm mb-2">📊 Chart Builder Features:</h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>
                  <strong>Chart Types:</strong>
                  <ul className="ml-2 mt-1 space-y-1">
                    <li>• Bar & Column Charts</li>
                    <li>• Line & Area Charts</li>
                    <li>• Pie & Donut Charts</li>
                    <li>• Scatter Plots</li>
                    <li>• Histograms</li>
                  </ul>
                </div>
                <div>
                  <strong>Advanced Types:</strong>
                  <ul className="ml-2 mt-1 space-y-1">
                    <li>• Box Plots</li>
                    <li>• Heatmaps</li>
                    <li>• Radar Charts</li>
                    <li>• Funnel Charts</li>
                    <li>• Stacked Variants</li>
                  </ul>
                </div>
              </div>
              <div className="mt-2">
                <strong className="text-xs">Data Sources:</strong>
                <span className="text-xs text-muted-foreground ml-2">CSV Upload, Manual Entry, Copy & Paste</span>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Share className="w-4 h-4" />
              Embedding Content
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Embed individual charts and tables on external websites:
            </p>
            <div className="space-y-3">
              <div className="bg-muted p-3 rounded-lg">
                <h4 className="font-medium text-sm mb-2">How to Embed:</h4>
                <ol className="text-sm text-muted-foreground space-y-1 ml-4 list-decimal">
                  <li>Hover over any chart or table in a report</li>
                  <li>Click the "Embed" button that appears</li>
                  <li>Choose your preferred format:</li>
                  <ul className="ml-4 mt-1 space-y-1">
                    <li>• <strong>HTML iframe:</strong> Standard web embedding</li>
                    <li>• <strong>Direct Link:</strong> Share standalone view</li>
                    <li>• <strong>WordPress:</strong> Shortcode for WordPress sites</li>
                    <li>• <strong>Markdown:</strong> For GitHub, docs, and wikis</li>
                  </ul>
                  <li>Adjust width and height as needed</li>
                  <li>Copy the code and paste into your website</li>
                </ol>
              </div>
              <div className="bg-accent/10 p-3 rounded-lg">
                <h4 className="font-medium text-sm mb-2">✨ Features:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Responsive design adapts to container</li>
                  <li>• Interactive charts work in embeds</li>
                  <li>• Clean, borderless appearance</li>
                  <li>• Live preview before embedding</li>
                  <li>• Works on any website or platform</li>
                </ul>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Chart Data & Styling
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              Create stunning visualizations with powerful customization options:
            </p>
            
            <div className="space-y-3">
              <div className="bg-muted p-3 rounded-lg">
                <h4 className="font-medium text-sm mb-2">🎨 Styling Options:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Multiple color schemes (Viridis, Blues, Reds, etc.)</li>
                  <li>• Customizable grid lines and legends</li>
                  <li>• Stacked and grouped chart variants</li>
                  <li>• Responsive layouts for all devices</li>
                </ul>
              </div>
              
              <div className="bg-muted p-3 rounded-lg">
                <h4 className="font-medium text-sm mb-2">📤 Data Import:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Upload CSV files directly</li>
                  <li>• Paste data from spreadsheets</li>
                  <li>• Manual JSON entry for advanced users</li>
                  <li>• Automatic column detection</li>
                </ul>
              </div>

              <div className="bg-accent/10 p-3 rounded-lg">
                <h4 className="font-medium text-sm mb-2">💡 Pro Tip:</h4>
                <p className="text-sm text-muted-foreground">
                  Use the Chart Builder for quick setup, then switch to Manual JSON for advanced customizations.
                  Plotly.js format supported for maximum flexibility.
                </p>
              </div>
            </div>
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