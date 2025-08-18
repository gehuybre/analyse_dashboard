import React from 'react';
import Plot from 'react-plotly.js';
import { Button } from '@/components/ui/button';
import { Share, BarChart3 } from '@phosphor-icons/react';
import { ChartData } from '@/lib/types';

interface ChartComponentProps {
  data: ChartData;
  title: string;
  id: string;
  onEmbed?: (id: string, title: string) => void;
  showEmbedButton?: boolean;
}

export function ChartComponent({ 
  data, 
  title, 
  id, 
  onEmbed, 
  showEmbedButton = true 
}: ChartComponentProps) {
  const handleEmbed = () => {
    onEmbed?.(id, title);
  };

  // Validate chart data
  if (!data || !data.data || !Array.isArray(data.data)) {
    return (
      <div className="embeddable-content chart-container">
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 mx-auto mb-2" />
            <p>Chart data not available</p>
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
            className="bg-background/95 backdrop-blur-sm hover:bg-background embed-button"
          >
            <Share className="w-4 h-4 mr-1" />
            Embed
          </Button>
        </div>
      )}
      
      <Plot
        data={data.data}
        layout={{
          ...data.layout,
          title: {
            text: title,
            font: { family: 'Inter, sans-serif', size: 18 }
          },
          font: { family: 'Inter, sans-serif' },
          autosize: true,
          paper_bgcolor: 'rgba(0,0,0,0)',
          plot_bgcolor: 'rgba(0,0,0,0)'
        }}
        config={{
          displayModeBar: false,
          responsive: true,
          ...data.config
        }}
        style={{ width: '100%', height: 'auto', minHeight: '300px' }}
        useResizeHandler={true}
      />
    </div>
  );
}