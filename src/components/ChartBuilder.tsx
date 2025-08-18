import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ChartComponent } from '@/components/ChartComponent';
import { CsvUpload } from '@/components/CsvUpload';
import { BarChart3, TrendUp, PieChart, Scatter, Target, Activity } from '@phosphor-icons/react';
import { ChartData, TableData } from '@/lib/types';
import { toast } from 'sonner';

interface ChartBuilderProps {
  onChartCreate: (chartData: ChartData, title: string) => void;
  initialData?: ChartData;
  initialTitle?: string;
}

type ChartType = 'bar' | 'line' | 'scatter' | 'pie' | 'area' | 'histogram' | 'box' | 'heatmap' | 'radar' | 'funnel';

const CHART_TYPES = [
  { value: 'bar', label: 'Bar Chart', icon: BarChart3, description: 'Compare categories' },
  { value: 'line', label: 'Line Chart', icon: TrendUp, description: 'Show trends over time' },
  { value: 'scatter', label: 'Scatter Plot', icon: Scatter, description: 'Show correlations' },
  { value: 'pie', label: 'Pie Chart', icon: PieChart, description: 'Show proportions' },
  { value: 'area', label: 'Area Chart', icon: Activity, description: 'Show cumulative values' },
  { value: 'histogram', label: 'Histogram', icon: BarChart3, description: 'Show distributions' },
  { value: 'box', label: 'Box Plot', icon: Target, description: 'Show statistical summaries' },
  { value: 'heatmap', label: 'Heatmap', icon: Target, description: 'Show data density' },
  { value: 'radar', label: 'Radar Chart', icon: Target, description: 'Compare multiple metrics' },
  { value: 'funnel', label: 'Funnel Chart', icon: Target, description: 'Show process flows' }
];

const COLOR_SCHEMES = [
  { name: 'Default', colors: ['#636EFA', '#EF553B', '#00CC96', '#AB63FA', '#FFA15A'] },
  { name: 'Viridis', colors: ['#440154', '#31688e', '#35b779', '#fde725'] },
  { name: 'Blues', colors: ['#08519c', '#3182bd', '#6baed6', '#9ecae1', '#c6dbef'] },
  { name: 'Reds', colors: ['#a50f15', '#de2d26', '#fb6a4a', '#fc9272', '#fcbba1'] },
  { name: 'Greens', colors: ['#00441b', '#238b45', '#66c2a4', '#abdda4', '#e5f5f9'] },
  { name: 'Oranges', colors: ['#7f2704', '#a63603', '#d94801', '#f16913', '#fd8d3c'] },
  { name: 'Purples', colors: ['#3f007d', '#54278f', '#756bb1', '#9e9ac8', '#cbc9e2'] }
];

export function ChartBuilder({ onChartCreate, initialData, initialTitle }: ChartBuilderProps) {
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [title, setTitle] = useState(initialTitle || '');
  const [data, setData] = useState<TableData>({ headers: [], rows: [] });
  const [xColumn, setXColumn] = useState('');
  const [yColumn, setYColumn] = useState('');
  const [colorColumn, setColorColumn] = useState('');
  const [colorScheme, setColorScheme] = useState('Default');
  const [showGrid, setShowGrid] = useState(true);
  const [showLegend, setShowLegend] = useState(true);
  const [isStacked, setIsStacked] = useState(false);
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    if (initialData) {
      setChartData(initialData);
    }
  }, [initialData]);

  const handleCsvUpload = (csvData: TableData, fileName: string) => {
    setData(csvData);
    if (!title) {
      setTitle(fileName.replace('.csv', ''));
    }
    if (csvData.headers.length > 0) {
      setXColumn(csvData.headers[0]);
      if (csvData.headers.length > 1) {
        setYColumn(csvData.headers[1]);
      }
    }
    toast.success('Data uploaded successfully');
  };

  const generateChartData = (): ChartData | null => {
    if (!data.headers.length || !data.rows.length || !xColumn || !yColumn) {
      return null;
    }

    const xIndex = data.headers.indexOf(xColumn);
    const yIndex = data.headers.indexOf(yColumn);
    const colorIndex = colorColumn ? data.headers.indexOf(colorColumn) : -1;

    if (xIndex === -1 || yIndex === -1) {
      return null;
    }

    const selectedColors = COLOR_SCHEMES.find(scheme => scheme.name === colorScheme)?.colors || COLOR_SCHEMES[0].colors;

    let plotData: any[] = [];
    let layout: any = {
      title: {
        text: title,
        font: { family: 'Inter, sans-serif', size: 18 }
      },
      font: { family: 'Inter, sans-serif' },
      showlegend: showLegend,
      plot_bgcolor: 'rgba(0,0,0,0)',
      paper_bgcolor: 'rgba(0,0,0,0)',
      margin: { l: 60, r: 30, t: 80, b: 60 }
    };

    // Add grid configuration
    if (showGrid) {
      layout.xaxis = { showgrid: true, gridcolor: 'rgba(0,0,0,0.1)' };
      layout.yaxis = { showgrid: true, gridcolor: 'rgba(0,0,0,0.1)' };
    }

    const xValues = data.rows.map(row => row[xIndex]);
    const yValues = data.rows.map(row => Number(row[yIndex]) || 0);

    switch (chartType) {
      case 'bar':
        plotData = [{
          x: xValues,
          y: yValues,
          type: 'bar',
          marker: { 
            color: colorIndex >= 0 ? 
              data.rows.map((row, i) => selectedColors[i % selectedColors.length]) : 
              selectedColors[0]
          },
          name: yColumn
        }];
        if (isStacked && colorIndex >= 0) {
          // Group by color column for stacked bars
          const groups = new Map();
          data.rows.forEach(row => {
            const group = row[colorIndex];
            if (!groups.has(group)) {
              groups.set(group, { x: [], y: [] });
            }
            groups.get(group).x.push(row[xIndex]);
            groups.get(group).y.push(Number(row[yIndex]) || 0);
          });
          
          plotData = Array.from(groups.entries()).map(([group, values], i) => ({
            x: values.x,
            y: values.y,
            type: 'bar',
            name: group,
            marker: { color: selectedColors[i % selectedColors.length] }
          }));
          layout.barmode = 'stack';
        }
        break;

      case 'line':
        plotData = [{
          x: xValues,
          y: yValues,
          type: 'scatter',
          mode: 'lines+markers',
          line: { color: selectedColors[0], width: 3 },
          marker: { color: selectedColors[0], size: 6 },
          name: yColumn
        }];
        break;

      case 'scatter':
        plotData = [{
          x: xValues,
          y: yValues,
          type: 'scatter',
          mode: 'markers',
          marker: { 
            color: colorIndex >= 0 ? 
              data.rows.map((row, i) => selectedColors[i % selectedColors.length]) : 
              selectedColors[0],
            size: 8
          },
          name: yColumn
        }];
        break;

      case 'pie':
        const pieValues = yValues.filter(val => val > 0);
        const pieLabels = xValues.filter((_, i) => yValues[i] > 0);
        plotData = [{
          values: pieValues,
          labels: pieLabels,
          type: 'pie',
          marker: { colors: selectedColors },
          textinfo: 'label+percent',
          textposition: 'auto'
        }];
        layout.showlegend = false;
        break;

      case 'area':
        plotData = [{
          x: xValues,
          y: yValues,
          type: 'scatter',
          mode: 'lines',
          fill: 'tonexty',
          fillcolor: selectedColors[0] + '40',
          line: { color: selectedColors[0], width: 2 },
          name: yColumn
        }];
        break;

      case 'histogram':
        plotData = [{
          x: yValues,
          type: 'histogram',
          marker: { color: selectedColors[0] },
          name: 'Frequency'
        }];
        layout.xaxis = { ...layout.xaxis, title: yColumn };
        layout.yaxis = { ...layout.yaxis, title: 'Frequency' };
        break;

      case 'box':
        plotData = [{
          y: yValues,
          type: 'box',
          name: yColumn,
          marker: { color: selectedColors[0] },
          boxpoints: 'outliers'
        }];
        break;

      case 'heatmap':
        // Create a simple heatmap from the data
        const uniqueX = [...new Set(xValues)];
        const uniqueY = [...new Set(yValues.map(String))];
        const zMatrix = uniqueY.map(y => 
          uniqueX.map(x => {
            const matches = data.rows.filter(row => 
              row[xIndex] === x && String(row[yIndex]) === y
            );
            return matches.length;
          })
        );
        
        plotData = [{
          z: zMatrix,
          x: uniqueX,
          y: uniqueY,
          type: 'heatmap',
          colorscale: 'Viridis'
        }];
        break;

      case 'radar':
        plotData = [{
          type: 'scatterpolar',
          r: yValues,
          theta: xValues,
          fill: 'toself',
          fillcolor: selectedColors[0] + '40',
          line: { color: selectedColors[0] },
          name: yColumn
        }];
        layout.polar = {
          radialaxis: { visible: true }
        };
        break;

      case 'funnel':
        plotData = [{
          type: 'funnel',
          y: xValues,
          x: yValues,
          textinfo: 'value+percent initial',
          marker: { colors: selectedColors }
        }];
        break;
    }

    return {
      data: plotData,
      layout,
      config: {
        displayModeBar: false,
        responsive: true
      }
    };
  };

  const handlePreview = () => {
    const generatedData = generateChartData();
    if (generatedData) {
      setChartData(generatedData);
    } else {
      toast.error('Please provide valid data and column selections');
    }
  };

  const handleCreate = () => {
    const generatedData = generateChartData();
    if (generatedData && title.trim()) {
      onChartCreate(generatedData, title.trim());
      toast.success('Chart created successfully');
    } else {
      toast.error('Please provide a title and valid chart data');
    }
  };

  const selectedChartType = CHART_TYPES.find(type => type.value === chartType);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Chart Builder
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="data" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="data">Data Source</TabsTrigger>
              <TabsTrigger value="config">Chart Config</TabsTrigger>
              <TabsTrigger value="style">Styling</TabsTrigger>
            </TabsList>

            <TabsContent value="data" className="space-y-4">
              <div>
                <Label htmlFor="chart-title">Chart Title</Label>
                <Input
                  id="chart-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter chart title..."
                />
              </div>

              <div>
                <Label>Data Source</Label>
                <Tabs defaultValue="upload" className="w-full mt-2">
                  <TabsList>
                    <TabsTrigger value="upload">CSV Upload</TabsTrigger>
                    <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                  </TabsList>
                  <TabsContent value="upload" className="mt-4">
                    <CsvUpload
                      onDataLoaded={handleCsvUpload}
                      onError={(error) => toast.error(error)}
                    />
                  </TabsContent>
                  <TabsContent value="manual" className="mt-4">
                    <Textarea
                      placeholder="Paste CSV data here..."
                      rows={6}
                      onChange={(e) => {
                        try {
                          const lines = e.target.value.trim().split('\n');
                          if (lines.length > 1) {
                            const headers = lines[0].split(',').map(h => h.trim());
                            const rows = lines.slice(1).map(line => 
                              line.split(',').map(cell => cell.trim())
                            );
                            setData({ headers, rows });
                          }
                        } catch (error) {
                          // Invalid data format
                        }
                      }}
                    />
                  </TabsContent>
                </Tabs>
              </div>

              {data.headers.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>X-Axis Column</Label>
                    <Select value={xColumn} onValueChange={setXColumn}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select X column" />
                      </SelectTrigger>
                      <SelectContent>
                        {data.headers.map(header => (
                          <SelectItem key={header} value={header}>{header}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Y-Axis Column</Label>
                    <Select value={yColumn} onValueChange={setYColumn}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Y column" />
                      </SelectTrigger>
                      <SelectContent>
                        {data.headers.map(header => (
                          <SelectItem key={header} value={header}>{header}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="config" className="space-y-4">
              <div>
                <Label>Chart Type</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {CHART_TYPES.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <Card 
                        key={type.value}
                        className={`cursor-pointer transition-all ${
                          chartType === type.value ? 'ring-2 ring-primary' : 'hover:bg-accent/50'
                        }`}
                        onClick={() => setChartType(type.value as ChartType)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <IconComponent className="w-6 h-6" />
                            <div>
                              <div className="font-medium text-sm">{type.label}</div>
                              <div className="text-xs text-muted-foreground">{type.description}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {(chartType === 'bar' || chartType === 'area') && data.headers.length > 2 && (
                <div className="flex items-center space-x-2">
                  <Switch
                    id="stacked"
                    checked={isStacked}
                    onCheckedChange={setIsStacked}
                  />
                  <Label htmlFor="stacked">Stacked</Label>
                </div>
              )}

              {data.headers.length > 2 && (
                <div>
                  <Label>Color/Group Column (Optional)</Label>
                  <Select value={colorColumn} onValueChange={setColorColumn}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grouping column" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      {data.headers.map(header => (
                        <SelectItem key={header} value={header}>{header}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </TabsContent>

            <TabsContent value="style" className="space-y-4">
              <div>
                <Label>Color Scheme</Label>
                <Select value={colorScheme} onValueChange={setColorScheme}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {COLOR_SCHEMES.map(scheme => (
                      <SelectItem key={scheme.name} value={scheme.name}>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            {scheme.colors.slice(0, 3).map((color, i) => (
                              <div
                                key={i}
                                className="w-3 h-3 rounded-full border"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                          {scheme.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-grid"
                    checked={showGrid}
                    onCheckedChange={setShowGrid}
                  />
                  <Label htmlFor="show-grid">Show Grid</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-legend"
                    checked={showLegend}
                    onCheckedChange={setShowLegend}
                  />
                  <Label htmlFor="show-legend">Show Legend</Label>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-2 mt-6">
            <Button onClick={handlePreview} variant="outline">
              Preview Chart
            </Button>
            <Button onClick={handleCreate} disabled={!title.trim() || !data.headers.length}>
              Create Chart
            </Button>
          </div>
        </CardContent>
      </Card>

      {chartData && (
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartComponent
              data={chartData}
              title={title}
              id="preview"
              showEmbedButton={false}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}