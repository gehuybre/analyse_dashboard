import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FilePdf, Download, AlertCircle, CheckCircle } from '@phosphor-icons/react';
import { Report } from '@/lib/types';

interface PdfExportProps {
  report: Report;
  onExportComplete?: () => void;
}

export function PdfExport({ report, onExportComplete }: PdfExportProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [exportStatus, setExportStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const generatePdfContent = (report: Report): string => {
    let content = `# ${report.title}\n\n`;
    content += `**Topic:** ${report.topic}\n`;
    content += `**Published:** ${new Date(report.publishedAt).toLocaleDateString()}\n`;
    content += `**Description:** ${report.description}\n\n`;
    content += `---\n\n`;

    report.content.forEach(section => {
      switch (section.type) {
        case 'heading':
          content += `## ${section.title}\n\n`;
          break;
        case 'text':
          if (section.title) {
            content += `### ${section.title}\n\n`;
          }
          content += `${section.content}\n\n`;
          break;
        case 'chart':
          content += `### ${section.title || 'Chart'}\n\n`;
          content += `[Chart: ${section.title || 'Untitled Chart'}]\n`;
          content += `*Chart data cannot be exported to PDF format. Please view the interactive version online.*\n\n`;
          break;
        case 'table':
          content += `### ${section.title || 'Table'}\n\n`;
          if (section.content && section.content.headers && section.content.rows) {
            // Create markdown table
            const headers = section.content.headers.join(' | ');
            const separator = section.content.headers.map(() => '---').join(' | ');
            content += `| ${headers} |\n`;
            content += `| ${separator} |\n`;
            
            section.content.rows.forEach((row: any[]) => {
              const rowText = row.map(cell => String(cell || '')).join(' | ');
              content += `| ${rowText} |\n`;
            });
            content += '\n';
          }
          break;
      }
    });

    content += `\n---\n\n`;
    content += `*Generated from Analytics Platform - ${window.location.origin}*\n`;
    
    return content;
  };

  const downloadTextFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExport = async () => {
    setIsExporting(true);
    setProgress(0);
    setExportStatus('idle');

    try {
      // Simulate processing time with progress updates
      const intervals = [20, 40, 60, 80, 95];
      for (let i = 0; i < intervals.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setProgress(intervals[i]);
      }

      // Generate content
      const content = generatePdfContent(report);
      
      // Create filename
      const safeTitle = report.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const filename = `${safeTitle}_report.md`;
      
      // Download the file
      downloadTextFile(content, filename);
      
      setProgress(100);
      setExportStatus('success');
      onExportComplete?.();

    } catch (error) {
      setExportStatus('error');
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
      setTimeout(() => {
        setProgress(0);
        setExportStatus('idle');
      }, 3000);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FilePdf className="w-5 h-5" />
          Export Report
        </CardTitle>
        <CardDescription>
          Export this report as a Markdown file for offline viewing or further processing.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          onClick={handleExport}
          disabled={isExporting}
          className="w-full"
        >
          <Download className="w-4 h-4 mr-2" />
          {isExporting ? 'Exporting...' : 'Export as Markdown'}
        </Button>

        {isExporting && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Generating export...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        {exportStatus === 'success' && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Report exported successfully! The Markdown file has been downloaded to your device.
            </AlertDescription>
          </Alert>
        )}

        {exportStatus === 'error' && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to export report. Please try again.
            </AlertDescription>
          </Alert>
        )}

        <div className="text-xs text-muted-foreground space-y-1">
          <p><strong>Export format:</strong> Markdown (.md file)</p>
          <p><strong>Includes:</strong> All text content and table data</p>
          <p><strong>Note:</strong> Interactive charts will be referenced but not embedded</p>
          <p><strong>Use case:</strong> Perfect for documentation, sharing, or further processing</p>
        </div>
      </CardContent>
    </Card>
  );
}