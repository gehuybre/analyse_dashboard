import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginDialog } from '@/components/LoginDialog';
import { EmbedDialog } from '@/components/EmbedDialog';
import { ReportCard } from '@/components/ReportCard';
import { ReportEditor } from '@/components/ReportEditor';
import { ChartComponent } from '@/components/ChartComponent';
import { TableComponent } from '@/components/TableComponent';
import { useAuth } from '@/hooks/use-auth';
import { useReports } from '@/hooks/use-reports';
import { useKV } from '@github/spark/hooks';
import { 
  BarChart3, 
  FileText, 
  Plus, 
  Search, 
  Lock, 
  Eye, 
  Settings,
  ArrowLeft,
  ExternalLink
} from '@phosphor-icons/react';
import { Report, ReportSection } from '@/lib/types';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const [currentView, setCurrentView] = useKV<string>('current-view', 'dashboard');
  const [selectedReportId, setSelectedReportId] = useKV<string>('selected-report-id', '');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showEmbedDialog, setShowEmbedDialog] = useState(false);
  const [showReportEditor, setShowReportEditor] = useState(false);
  const [embedContent, setEmbedContent] = useState<{type: 'chart' | 'table', id: string, title: string} | null>(null);

  const { isAuthenticated, logout } = useAuth();
  const { reports, addReport, getPublicReports, getPrivateReports, getReport } = useReports();

  // Get unique topics for filter
  const topics = Array.from(new Set(reports.map(r => r.topic)));

  // Filter reports based on search and topic
  const filterReports = (reportList: Report[]) => {
    return reportList.filter(report => {
      const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          report.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTopic = selectedTopic === 'all' || report.topic === selectedTopic;
      return matchesSearch && matchesTopic;
    });
  };

  const publicReports = filterReports(getPublicReports());
  const privateReports = filterReports(getPrivateReports());

  const handleViewReport = (reportId: string) => {
    setSelectedReportId(reportId);
    setCurrentView('report');
  };

  const handleEmbed = (contentId: string, title: string, type: 'chart' | 'table' = 'chart') => {
    setEmbedContent({ type, id: contentId, title });
    setShowEmbedDialog(true);
  };

  const handleCreateReport = () => {
    if (!isAuthenticated) {
      setShowLoginDialog(true);
      return;
    }
    setShowReportEditor(true);
  };

  const handleSaveReport = (reportData: Omit<Report, 'id'>) => {
    addReport(reportData);
  };

  const renderDashboard = () => (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Data Analytics Platform</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Professional reporting platform for data analysis with embeddable charts and tables
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        
        <Select value={selectedTopic} onValueChange={setSelectedTopic}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Filter by topic" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Topics</SelectItem>
            {topics.map(topic => (
              <SelectItem key={topic} value={topic}>{topic}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button onClick={handleCreateReport}>
          <Plus className="w-4 h-4 mr-2" />
          New Report
        </Button>
      </div>

      <Tabs defaultValue="public" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="public" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Public Reports ({publicReports.length})
          </TabsTrigger>
          <TabsTrigger 
            value="private" 
            className="flex items-center gap-2"
            onClick={() => !isAuthenticated && setShowLoginDialog(true)}
          >
            <Lock className="w-4 h-4" />
            Private Reports ({isAuthenticated ? privateReports.length : '?'})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="public" className="mt-6">
          {publicReports.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No public reports found</h3>
                <p className="text-muted-foreground text-center mb-4">
                  {searchTerm || selectedTopic !== 'all' 
                    ? 'Try adjusting your search or filter criteria'
                    : 'Create your first report to get started'
                  }
                </p>
                <Button variant="outline" onClick={handleCreateReport}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Report
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publicReports.map(report => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onView={handleViewReport}
                  showPrivacyBadge={false}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="private" className="mt-6">
          {!isAuthenticated ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Lock className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Authentication Required</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Please log in to access private reports
                </p>
                <Button onClick={() => setShowLoginDialog(true)}>
                  <Lock className="w-4 h-4 mr-2" />
                  Admin Login
                </Button>
              </CardContent>
            </Card>
          ) : privateReports.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No private reports found</h3>
                <p className="text-muted-foreground text-center mb-4">
                  {searchTerm || selectedTopic !== 'all' 
                    ? 'Try adjusting your search or filter criteria'
                    : 'Create your first private report'
                  }
                </p>
                <Button variant="outline" onClick={handleCreateReport}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Private Report
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {privateReports.map(report => (
                <ReportCard
                  key={report.id}
                  report={report}
                  onView={handleViewReport}
                  showPrivacyBadge={true}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderReport = () => {
    const report = getReport(selectedReportId);
    
    if (!report) {
      return (
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Report not found</h3>
              <Button onClick={() => setCurrentView('dashboard')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    if (report.isPrivate && !isAuthenticated) {
      return (
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Lock className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Access Restricted</h3>
              <p className="text-muted-foreground text-center mb-4">
                This report requires authentication to view
              </p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setCurrentView('dashboard')}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button onClick={() => setShowLoginDialog(true)}>
                  <Lock className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    const formattedDate = new Date(report.publishedAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => setCurrentView('dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{report.title}</h1>
              <p className="text-lg text-muted-foreground mb-4">{report.description}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <Badge variant="secondary">{report.topic}</Badge>
                <span>{formattedDate}</span>
                {report.isPrivate && (
                  <Badge variant="outline">
                    <Lock className="w-3 h-3 mr-1" />
                    Private
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <Separator className="my-6" />
        </div>

        <div className="report-content space-y-8">
          {report.content.map((section: ReportSection) => (
            <div key={section.id}>
              {section.type === 'heading' && (
                <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
              )}
              
              {section.type === 'text' && (
                <div>
                  {section.title && <h3 className="text-xl font-medium mb-3">{section.title}</h3>}
                  <div className="prose prose-lg max-w-none">
                    <p className="whitespace-pre-wrap">{section.content}</p>
                  </div>
                </div>
              )}
              
              {section.type === 'chart' && section.content && (
                <ChartComponent
                  data={section.content}
                  title={section.title || 'Chart'}
                  id={section.id}
                  onEmbed={(id, title) => handleEmbed(id, title, 'chart')}
                />
              )}
              
              {section.type === 'table' && section.content && (
                <TableComponent
                  data={section.content}
                  title={section.title || 'Table'}
                  id={section.id}
                  onEmbed={(id, title) => handleEmbed(id, title, 'table')}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderNavigation = () => (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="flex items-center gap-2 text-lg font-semibold hover:text-primary transition-colors"
            >
              <BarChart3 className="w-6 h-6" />
              Analytics Platform
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <>
                <Button variant="outline" size="sm" onClick={() => setShowReportEditor(true)}>
                  <Plus className="w-4 h-4 mr-1" />
                  New Report
                </Button>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Logout
                </Button>
              </>
            )}
            {!isAuthenticated && (
              <Button variant="outline" size="sm" onClick={() => setShowLoginDialog(true)}>
                <Lock className="w-4 h-4 mr-1" />
                Admin Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-background">
      {renderNavigation()}
      
      {currentView === 'dashboard' && renderDashboard()}
      {currentView === 'report' && renderReport()}

      <LoginDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
      />

      <EmbedDialog
        open={showEmbedDialog}
        onOpenChange={setShowEmbedDialog}
        contentType={embedContent?.type || 'chart'}
        contentId={embedContent?.id || ''}
        title={embedContent?.title || ''}
      />

      <ReportEditor
        open={showReportEditor}
        onOpenChange={setShowReportEditor}
        onSave={handleSaveReport}
      />

      <Toaster />
    </div>
  );
}

export default App;