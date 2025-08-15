import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Share, Copy, ExternalLink } from '@phosphor-icons/react';
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
  const embedUrl = `${baseUrl}/embed/${contentType}/${contentId}`;
  const iframeCode = `<iframe src="${embedUrl}" width="${width}" height="${height}" frameborder="0" scrolling="no" title="${title}"></iframe>`;

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share className="w-5 h-5" />
            Embed {contentType}: {title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Width (px)</label>
              <Input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                min="300"
                max="1200"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Height (px)</label>
              <Input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                min="200"
                max="800"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Direct Link</label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(embedUrl, 'Link')}
              >
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </Button>
            </div>
            <div className="flex gap-2">
              <Input value={embedUrl} readOnly className="flex-1" />
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(embedUrl, '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium">Iframe Code</label>
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
              rows={3}
            />
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2">Preview</h4>
            <div className="border rounded bg-white p-2">
              <iframe
                src={embedUrl}
                width={Math.min(parseInt(width), 400)}
                height={Math.min(parseInt(height), 300)}
                frameBorder="0"
                scrolling="no"
                title={title}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}