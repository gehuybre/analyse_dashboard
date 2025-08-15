import React from 'react';
import Plot from 'react-plotly.js';
import { Button } from '@/components/ui/button';
import { Share } from '@phosphor-icons/react';
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
        }}
        config={{
          displayModeBar: false,
          responsive: true,
          ...data.config
        }}
        style={{ width: '100%', height: '400px' }}
        useResizeHandler={true}
      />
    </div>
  );
}