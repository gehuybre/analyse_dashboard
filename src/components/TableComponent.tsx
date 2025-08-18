import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Share, FileText } from '@phosphor-icons/react';
import { TableData } from '@/lib/types';

interface TableComponentProps {
  data: TableData;
  title: string;
  id: string;
  onEmbed?: (id: string, title: string) => void;
  showEmbedButton?: boolean;
}

export function TableComponent({ 
  data, 
  title, 
  id, 
  onEmbed, 
  showEmbedButton = true 
}: TableComponentProps) {
  const handleEmbed = () => {
    onEmbed?.(id, title);
  };

  // Validate table data
  if (!data || !data.headers || !data.rows || !Array.isArray(data.headers) || !Array.isArray(data.rows)) {
    return (
      <div className="embeddable-content chart-container">
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          <div className="text-center">
            <FileText className="w-12 h-12 mx-auto mb-2" />
            <p>Table data not available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="embeddable-content chart-container">
      {showEmbedButton && (
        <div className="embed-overlay">
          <Button
            variant="outline"
            size="sm"
            onClick={handleEmbed}
            className="bg-background/90 backdrop-blur-sm"
          >
            <Share className="w-4 h-4 mr-1" />
            Embed
          </Button>
        </div>
      )}
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {data.headers.map((header, index) => (
                  <TableHead key={index} className="font-semibold">
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.rows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <TableCell key={cellIndex} className="font-mono text-sm">
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}