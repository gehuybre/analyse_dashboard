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
import { HelpDialog } from '@/components/HelpDialog';
import { WelcomeDialog } from '@/components/WelcomeDialog';
import { ReportCard } from '@/components/ReportCard';
import { ReportEditor } from '@/components/ReportEditor';
import { ChartComponent } from '@/components/ChartComponent';
import { TableComponent } from '@/components/TableComponent';
import { PdfExport } from '@/components/PdfExport';
import { DeleteConfirmDialog } from '@/components/DeleteConfirmDialog';
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
  ExternalLink,
  CircleQuestion,
  Sparkle,
  Share,
  Download,
  User
} from '@phosphor-icons/react';
import { Report, ReportSection } from '@/lib/types';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const [currentView, setCurrentView] = useKV<string>('current-view', 'dashboard');
  const [selectedReportId, setSelectedReportId] = useKV<string>('selected-report-id', '');
  const [editingReportId, setEditingReportId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showEmbedDialog, setShowEmbedDialog] = useState(false);
  const [showReportEditor, setShowReportEditor] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<Report | null>(null);
  const [embedContent, setEmbedContent] = useState<{type: 'chart' | 'table', id: string, title: string} | null>(null);

  // Check for embed mode from URL
  const urlParams = new URLSearchParams(window.location.search);
  const embedMode = urlParams.get('embed');
  const embedType = urlParams.get('type') as 'chart' | 'table';
  const embedId = urlParams.get('id');
  const isEmbedMode = embedMode === 'true' && embedType && embedId;

  const { isAuthenticated, logout, user } = useAuth();
  const { reports, addReport, updateReport, deleteReport, getPublicReports, getPrivateReports, getReport } = useReports();

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
    if (editingReportId) {
      updateReport(editingReportId, reportData);
    } else {
      addReport(reportData);
    }
    setEditingReportId(null);
  };

  const handleEditReport = (reportId: string) => {
    if (!isAuthenticated) {
      setShowLoginDialog(true);
      return;
    }
    setEditingReportId(reportId);
    setShowReportEditor(true);
  };

  const handleDeleteReport = (reportId: string) => {
    if (!isAuthenticated) {
      setShowLoginDialog(true);
      return;
    }
    const report = getReport(reportId);
    if (report) {
      setReportToDelete(report);
      setShowDeleteDialog(true);
    }
  };

  const confirmDeleteReport = () => {
    if (reportToDelete) {
      deleteReport(reportToDelete.id);
      setReportToDelete(null);
      // If we're currently viewing the deleted report, go back to dashboard
      if (selectedReportId === reportToDelete.id) {
        setCurrentView('dashboard');
      }
    }
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
                  onEdit={handleEditReport}
                  onDelete={handleDeleteReport}
                  showPrivacyBadge={false}
                  showActions={isAuthenticated}
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
                  onEdit={handleEditReport}
                  onDelete={handleDeleteReport}
                  showPrivacyBadge={true}
                  showActions={true}
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
            <div className="ml-4">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          {/* Export Options */}
          <div className="mb-6">
            <PdfExport report={report} />
          </div>
        </div>

        <div className="report-content space-y-8">
          <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-sm font-medium text-accent-foreground mb-1">
              <Share className="w-4 h-4" />
              Embeddable Content
            </div>
            <p className="text-xs text-muted-foreground">
              Hover over charts and tables to reveal embed buttons for easy sharing on external websites.
            </p>
          </div>
          
          {report.content.map((section: ReportSection) => (
            <div key={section.id}>
              {section.type === 'heading' && (
                <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
              )}
              
              {section.type === 'text' && (
                <div>
                  {section.title && <h3 className="text-xl font-medium mb-3">{section.title}</h3>}
                  <div className="max-w-none">
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

  const renderEmbedView = () => {
    if (!embedId || !embedType) return null;

    // Find the content across all reports
    let foundContent = null;
    let foundTitle = '';

    for (const report of reports) {
      const section = report.content.find(section => section.id === embedId);
      if (section && section.type === embedType) {
        foundContent = section.content;
        foundTitle = section.title || `${embedType} from ${report.title}`;
        break;
      }
    }

    if (!foundContent) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Content not found</h2>
            <p className="text-muted-foreground">The requested {embedType} could not be found.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background p-4">
        {embedType === 'chart' && (
          <ChartComponent
            data={foundContent}
            title={foundTitle}
            id={embedId}
            showEmbedButton={false}
          />
        )}
        {embedType === 'table' && (
          <TableComponent
            data={foundContent}
            title={foundTitle}
            id={embedId}
            showEmbedButton={false}
          />
        )}
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
            <Button variant="ghost" size="sm" onClick={() => setShowHelpDialog(true)}>
              <CircleQuestion className="w-4 h-4 mr-1" />
              Help
            </Button>
            {isAuthenticated && (
              <>
                {user && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4" />
                    {user.name}
                  </div>
                )}
                <Button variant="outline" size="sm" onClick={() => {
                  setEditingReportId(null);
                  setShowReportEditor(true);
                }}>
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
      {isEmbedMode ? (
        renderEmbedView()
      ) : (
        <>
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
            onOpenChange={(open) => {
              setShowReportEditor(open);
              if (!open) setEditingReportId(null);
            }}
            report={editingReportId ? getReport(editingReportId) : undefined}
            onSave={handleSaveReport}
          />

          <DeleteConfirmDialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
            onConfirm={confirmDeleteReport}
            title={reportToDelete?.title || ''}
            description="This action cannot be undone. All report data will be permanently deleted."
          />

          <HelpDialog
            open={showHelpDialog}
            onOpenChange={setShowHelpDialog}
          />

          <WelcomeDialog />

          <Toaster />
          
          <footer className="border-t bg-background mt-16">
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-semibold mb-3">Analytics Platform</h3>
                  <p className="text-sm text-muted-foreground">
                    Professional reporting platform for data analysis with embeddable charts and tables.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Features</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Interactive Plotly Charts</li>
                    <li>CSV Data Upload</li>
                    <li>Google Authentication</li>
                    <li>Embeddable Content</li>
                    <li>Public & Private Reports</li>
                    <li>Export to Markdown</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Getting Started</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Browse public reports</li>
                    <li>Sign in with Google or password: admin123</li>
                    <li>Upload CSV data or create charts</li>
                    <li>Create and edit reports</li>
                    <li>Share via embed codes</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                <p>Built with React, Plotly.js, and Tailwind CSS</p>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;