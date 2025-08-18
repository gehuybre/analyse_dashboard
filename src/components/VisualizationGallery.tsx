import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChartComponent } from '@/components/ChartComponent';
import { BarChart3, TrendUp, PieChart, Scatter, Target, Activity } from '@phosphor-icons/react';

const SAMPLE_CHARTS = [
  {
    id: 'sample-bar',
    title: 'Sales by Region',
    type: 'Bar Chart',
    icon: BarChart3,
    description: 'Compare categorical data across different regions',
    data: {
      data: [{
        x: ['North', 'South', 'East', 'West'],
        y: [45000, 38000, 52000, 41000],
        type: 'bar',
        marker: { color: '#636EFA' },
        name: 'Sales'
      }],
      layout: {
        xaxis: { title: 'Region' },
        yaxis: { title: 'Sales ($)' },
        showlegend: false,
        margin: { l: 60, r: 30, t: 60, b: 60 }
      }
    }
  },
  {
    id: 'sample-line',
    title: 'Monthly Revenue Trend',
    type: 'Line Chart',
    icon: TrendUp,
    description: 'Track performance over time periods',
    data: {
      data: [{
        x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        y: [12000, 15000, 18000, 16000, 22000, 25000],
        type: 'scatter',
        mode: 'lines+markers',
        line: { color: '#00CC96', width: 3 },
        marker: { color: '#00CC96', size: 6 },
        name: 'Revenue'
      }],
      layout: {
        xaxis: { title: 'Month' },
        yaxis: { title: 'Revenue ($)' },
        showlegend: false,
        margin: { l: 60, r: 30, t: 60, b: 60 }
      }
    }
  },
  {
    id: 'sample-pie',
    title: 'Market Share Distribution',
    type: 'Pie Chart',
    icon: PieChart,
    description: 'Show proportional relationships in data',
    data: {
      data: [{
        values: [35, 25, 20, 12, 8],
        labels: ['Product A', 'Product B', 'Product C', 'Product D', 'Others'],
        type: 'pie',
        marker: { colors: ['#636EFA', '#EF553B', '#00CC96', '#AB63FA', '#FFA15A'] },
        textinfo: 'label+percent',
        textposition: 'auto'
      }],
      layout: {
        showlegend: false,
        margin: { l: 30, r: 30, t: 60, b: 30 }
      }
    }
  },
  {
    id: 'sample-scatter',
    title: 'Price vs Sales Correlation',
    type: 'Scatter Plot',
    icon: Scatter,
    description: 'Explore relationships between variables',
    data: {
      data: [{
        x: [10, 15, 20, 25, 30, 35, 40],
        y: [100, 85, 70, 60, 45, 35, 25],
        type: 'scatter',
        mode: 'markers',
        marker: { 
          color: '#EF553B',
          size: 10,
          opacity: 0.8
        },
        name: 'Products'
      }],
      layout: {
        xaxis: { title: 'Price ($)' },
        yaxis: { title: 'Sales Volume' },
        showlegend: false,
        margin: { l: 60, r: 30, t: 60, b: 60 }
      }
    }
  },
  {
    id: 'sample-area',
    title: 'Cumulative Growth',
    type: 'Area Chart',
    icon: Activity,
    description: 'Visualize cumulative values and trends',
    data: {
      data: [{
        x: ['Q1', 'Q2', 'Q3', 'Q4'],
        y: [25, 45, 70, 100],
        type: 'scatter',
        mode: 'lines',
        fill: 'tonexty',
        fillcolor: 'rgba(171, 99, 250, 0.3)',
        line: { color: '#AB63FA', width: 2 },
        name: 'Growth'
      }],
      layout: {
        xaxis: { title: 'Quarter' },
        yaxis: { title: 'Growth (%)' },
        showlegend: false,
        margin: { l: 60, r: 30, t: 60, b: 60 }
      }
    }
  },
  {
    id: 'sample-radar',
    title: 'Performance Metrics',
    type: 'Radar Chart',
    icon: Target,
    description: 'Compare multiple metrics simultaneously',
    data: {
      data: [{
        type: 'scatterpolar',
        r: [80, 75, 90, 85, 70, 95],
        theta: ['Quality', 'Speed', 'Cost', 'Innovation', 'Support', 'Delivery'],
        fill: 'toself',
        fillcolor: 'rgba(255, 161, 90, 0.3)',
        line: { color: '#FFA15A' },
        name: 'Current'
      }],
      layout: {
        polar: {
          radialaxis: { 
            visible: true,
            range: [0, 100]
          }
        },
        showlegend: false,
        margin: { l: 60, r: 60, t: 60, b: 60 }
      }
    }
  }
];

export function VisualizationGallery() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Visualization Gallery</h2>
        <p className="text-muted-foreground">
          Explore different chart types available in the platform
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {SAMPLE_CHARTS.map((chart) => {
          const IconComponent = chart.icon;
          return (
            <Card key={chart.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{chart.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {chart.type}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardDescription className="mt-2">
                  {chart.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="bg-card border rounded-lg p-3">
                  <ChartComponent
                    data={chart.data}
                    title=""
                    id={chart.id}
                    showEmbedButton={false}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-accent/5 border-accent/20">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Ready to Create?</h3>
            <p className="text-muted-foreground mb-4">
              Use the Chart Builder to create interactive visualizations with your own data. 
              Upload CSV files or enter data manually to get started.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Badge variant="outline">10+ Chart Types</Badge>
              <Badge variant="outline">CSV Upload</Badge>
              <Badge variant="outline">Color Schemes</Badge>
              <Badge variant="outline">Interactive</Badge>
              <Badge variant="outline">Embeddable</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}