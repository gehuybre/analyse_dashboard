import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CsvUpload } from '@/components/CsvUpload';
import { ChartBuilder } from '@/components/ChartBuilder';
import { Plus, Save, X, Upload, BarChart3 } from '@phosphor-icons/react';
import { Report, ReportSection, TableData, ChartData } from '@/lib/types';
import { toast } from 'sonner';

interface ReportEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  report?: Report;
  onSave: (report: Omit<Report, 'id'>) => void;
}

const TOPICS = [
  'Market Analysis',
  'Financial Performance',
  'Customer Insights',
  'Operational Metrics',
  'Product Analytics',
  'Risk Assessment',
  'Competitive Intelligence',
  'Trend Analysis'
];

export function ReportEditor({ open, onOpenChange, report, onSave }: ReportEditorProps) {
  const [title, setTitle] = useState(report?.title || '');
  const [description, setDescription] = useState(report?.description || '');
  const [topic, setTopic] = useState(report?.topic || '');
  const [sections, setSections] = useState<ReportSection[]>(report?.content || []);

  const addSection = (type: ReportSection['type']) => {
    const newSection: ReportSection = {
      id: Date.now().toString(),
      type,
      title: '',
      content: type === 'text' ? '' : type === 'table' ? { headers: [], rows: [] } : { data: [], layout: {} }
    };
    setSections(current => [...current, newSection]);
  };

  const updateSection = (id: string, updates: Partial<ReportSection>) => {
    setSections(current =>
      current.map(section =>
        section.id === id ? { ...section, ...updates } : section
      )
    );
  };

  const removeSection = (id: string) => {
    setSections(current => current.filter(section => section.id !== id));
  };

  const handleCsvUpload = (sectionId: string) => (data: TableData, fileName: string) => {
    updateSection(sectionId, { 
      content: data,
      title: fileName.replace('.csv', '')
    });
    toast.success('CSV data loaded successfully');
  };

  const handleChartCreate = (sectionId: string) => (chartData: ChartData, title: string) => {
    updateSection(sectionId, {
      content: chartData,
      title: title
    });
    toast.success('Chart created successfully');
  };

  const handleSave = () => {
    if (!title.trim() || !topic.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const reportData: Omit<Report, 'id'> = {
      title: title.trim(),
      description: description.trim(),
      topic,
      content: sections,
      status: 'published',
      publishedAt: new Date().toISOString()
    };

    onSave(reportData);
    onOpenChange(false);
    toast.success('Report saved successfully');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {report ? 'Edit Report' : 'Create New Report'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Report Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter report title..."
              />
            </div>
            <div>
              <Label htmlFor="topic">Topic</Label>
              <Select value={topic} onValueChange={setTopic}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  {TOPICS.map(t => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the report..."
              rows={3}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <Label>Report Content</Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addSection('heading')}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Heading
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addSection('text')}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Text
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addSection('chart')}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Chart
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addSection('table')}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Table
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {sections.map((section, index) => (
                <Card key={section.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">
                        {section.type.charAt(0).toUpperCase() + section.type.slice(1)} Section
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSection(section.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Input
                        placeholder="Section title..."
                        value={section.title || ''}
                        onChange={(e) => updateSection(section.id, { title: e.target.value })}
                      />
                      {section.type === 'text' && (
                        <Textarea
                          placeholder="Write your content here..."
                          value={section.content}
                          onChange={(e) => updateSection(section.id, { content: e.target.value })}
                          rows={4}
                        />
                      )}
                      {section.type === 'chart' && (
                        <Tabs defaultValue="builder" className="w-full">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="builder">Chart Builder</TabsTrigger>
                            <TabsTrigger value="manual">Manual JSON</TabsTrigger>
                          </TabsList>
                          <TabsContent value="builder" className="mt-4">
                            <ChartBuilder
                              onChartCreate={handleChartCreate(section.id)}
                              initialData={section.content}
                              initialTitle={section.title}
                            />
                          </TabsContent>
                          <TabsContent value="manual" className="mt-4">
                            <Textarea
                              placeholder="Paste Plotly chart JSON data here..."
                              value={JSON.stringify(section.content, null, 2)}
                              onChange={(e) => {
                                try {
                                  const content = JSON.parse(e.target.value);
                                  updateSection(section.id, { content });
                                } catch {}
                              }}
                              rows={6}
                              className="font-mono text-sm"
                            />
                          </TabsContent>
                        </Tabs>
                      )}
                      {section.type === 'table' && (
                        <Tabs defaultValue="manual" className="w-full">
                          <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                            <TabsTrigger value="upload">CSV Upload</TabsTrigger>
                          </TabsList>
                          <TabsContent value="manual" className="mt-4">
                            <Textarea
                              placeholder="Paste table data as JSON: {headers: [...], rows: [[...], [...]]}"
                              value={JSON.stringify(section.content, null, 2)}
                              onChange={(e) => {
                                try {
                                  const content = JSON.parse(e.target.value);
                                  updateSection(section.id, { content });
                                } catch {}
                              }}
                              rows={6}
                              className="font-mono text-sm"
                            />
                          </TabsContent>
                          <TabsContent value="upload" className="mt-4">
                            <CsvUpload
                              onDataLoaded={handleCsvUpload(section.id)}
                              onError={handleCsvError}
                            />
                          </TabsContent>
                        </Tabs>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-1" />
              Save Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}