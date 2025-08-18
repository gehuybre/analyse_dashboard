import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, FileText, AlertCircle, CheckCircle } from '@phosphor-icons/react';
import { TableData } from '@/lib/types';

interface CsvUploadProps {
  onDataLoaded: (data: TableData, fileName: string) => void;
  onError: (error: string) => void;
}

export function CsvUpload({ onDataLoaded, onError }: CsvUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseCSV = (text: string): TableData => {
    const lines = text.trim().split('\n');
    if (lines.length === 0) {
      throw new Error('CSV file is empty');
    }

    // Parse first line as headers
    const headers = lines[0].split(',').map(header => header.trim().replace(/"/g, ''));
    
    // Parse remaining lines as data rows
    const rows = lines.slice(1).map(line => {
      return line.split(',').map(cell => {
        // Remove quotes and trim
        let value = cell.trim().replace(/"/g, '');
        
        // Try to convert to number if possible
        const numValue = parseFloat(value);
        if (!isNaN(numValue) && isFinite(numValue)) {
          return numValue;
        }
        
        return value;
      });
    });

    return { headers, rows };
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.csv')) {
      onError('Please select a CSV file');
      return;
    }

    setIsUploading(true);
    setProgress(0);
    setFileName(file.name);
    setUploadStatus('idle');

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      const text = await file.text();
      
      clearInterval(progressInterval);
      setProgress(95);

      const data = parseCSV(text);
      
      if (data.headers.length === 0) {
        throw new Error('No headers found in CSV file');
      }

      if (data.rows.length === 0) {
        throw new Error('No data rows found in CSV file');
      }

      setProgress(100);
      setUploadStatus('success');
      onDataLoaded(data, file.name);

    } catch (error) {
      setUploadStatus('error');
      onError(error instanceof Error ? error.message : 'Failed to parse CSV file');
    } finally {
      setIsUploading(false);
      setTimeout(() => {
        setProgress(0);
        setUploadStatus('idle');
        setFileName('');
      }, 2000);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Upload CSV Data
        </CardTitle>
        <CardDescription>
          Upload a CSV file to create data tables for your reports. The first row should contain column headers.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="csv-upload">Select CSV File</Label>
          <div className="flex gap-2">
            <Input
              id="csv-upload"
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              disabled={isUploading}
              ref={fileInputRef}
              className="hidden"
            />
            <Button
              variant="outline"
              onClick={handleButtonClick}
              disabled={isUploading}
              className="flex-1"
            >
              <FileText className="w-4 h-4 mr-2" />
              {fileName || 'Choose CSV File'}
            </Button>
          </div>
        </div>

        {isUploading && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Uploading {fileName}...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        {uploadStatus === 'success' && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              CSV file uploaded and parsed successfully! Data is ready to be added to your report.
            </AlertDescription>
          </Alert>
        )}

        {uploadStatus === 'error' && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to upload CSV file. Please check the file format and try again.
            </AlertDescription>
          </Alert>
        )}

        <div className="text-xs text-muted-foreground">
          <p><strong>Supported format:</strong> CSV files with comma-separated values</p>
          <p><strong>Requirements:</strong> First row should contain column headers</p>
          <p><strong>Example:</strong> Name,Age,City<br/>John,25,New York</p>
        </div>
      </CardContent>
    </Card>
  );
}