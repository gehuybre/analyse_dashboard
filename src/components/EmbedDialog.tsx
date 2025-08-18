import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Share, Copy, ExternalLink, Code, Info } from '@phosphor-icons/react';
import { toast } from 'sonner';

interface EmbedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contentType: 'chart' | 'table';
  contentId: string;
  title: string;
}

export function EmbedDialog({ open, onOpenChange, contentType, contentId, title }: EmbedDialogProps) {
  const [width, setWidth] = useState('600');
  const [height, setHeight] = useState('400');

  const baseUrl = window.location.origin;
  const embedUrl = `${baseUrl}/?embed=true&type=${contentType}&id=${contentId}`;
  const iframeCode = `<iframe src="${embedUrl}" width="${width}" height="${height}" frameborder="0" scrolling="no" title="${title}" style="border: 1px solid #e2e8f0; border-radius: 8px;"></iframe>`;
  
  // WordPress shortcode style
  const wordpressCode = `[iframe src="${embedUrl}" width="${width}" height="${height}"]`;
  
  // Markdown embed
  const markdownCode = `<iframe src="${embedUrl}" width="${width}" height="${height}" frameborder="0" scrolling="no" title="${title}"></iframe>`;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share className="w-5 h-5" />
            Embed {contentType}: {title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              Use these embed codes to display this {contentType} on external websites. 
              The content will be displayed in an iframe with responsive design.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="width" className="text-sm font-medium">Width (px)</Label>
              <Input
                id="width"
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                min="300"
                max="1200"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="height" className="text-sm font-medium">Height (px)</Label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                min="200"
                max="800"
                className="mt-1"
              />
            </div>
          </div>

          <Tabs defaultValue="iframe" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="iframe">HTML iframe</TabsTrigger>
              <TabsTrigger value="link">Direct Link</TabsTrigger>
              <TabsTrigger value="wordpress">WordPress</TabsTrigger>
              <TabsTrigger value="markdown">Markdown</TabsTrigger>
            </TabsList>

            <TabsContent value="iframe" className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium">HTML Iframe Code</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(iframeCode, 'Iframe code')}
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={iframeCode}
                  readOnly
                  className="font-mono text-sm"
                  rows={4}
                />
              </div>
            </TabsContent>

            <TabsContent value="link" className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium">Direct Link</Label>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(embedUrl, 'Link')}
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(embedUrl, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <Input value={embedUrl} readOnly className="font-mono text-sm" />
                <p className="text-xs text-muted-foreground mt-2">
                  Use this link to open the {contentType} in a new tab or share directly.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="wordpress" className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium">WordPress Shortcode</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(wordpressCode, 'WordPress shortcode')}
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={wordpressCode}
                  readOnly
                  className="font-mono text-sm"
                  rows={2}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Paste this shortcode into your WordPress post or page editor.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="markdown" className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label className="text-sm font-medium">Markdown/HTML</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(markdownCode, 'Markdown code')}
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                </div>
                <Textarea
                  value={markdownCode}
                  readOnly
                  className="font-mono text-sm"
                  rows={4}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Use in Markdown files, GitHub README, or any platform that supports HTML.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Code className="w-4 h-4" />
              <h4 className="font-medium">Live Preview</h4>
            </div>
            <div className="border rounded bg-white p-2 max-h-80 overflow-hidden">
              <iframe
                src={embedUrl}
                width={Math.min(parseInt(width), 500)}
                height={Math.min(parseInt(height), 300)}
                frameBorder="0"
                scrolling="no"
                title={title}
                className="w-full"
                style={{ border: '1px solid #e2e8f0', borderRadius: '6px' }}
              />
            </div>
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <p><strong>Note:</strong> Embedded content will automatically adapt to your website's styling.</p>
            <p><strong>Tip:</strong> For responsive designs, consider using percentage-based widths in your CSS.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}