import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Eye, Lock } from '@phosphor-icons/react';
import { Report } from '@/lib/types';

interface ReportCardProps {
  report: Report;
  onView: (id: string) => void;
  showPrivacyBadge?: boolean;
}

export function ReportCard({ report, onView, showPrivacyBadge = true }: ReportCardProps) {
  const formattedDate = new Date(report.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {report.title}
            </CardTitle>
            <CardDescription className="mt-1">
              {report.description}
            </CardDescription>
          </div>
          {showPrivacyBadge && report.isPrivate && (
            <Badge variant="secondary" className="ml-2">
              <Lock className="w-3 h-3 mr-1" />
              Private
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <FileText className="w-4 h-4" />
              {report.topic}
            </div>
            <span>{formattedDate}</span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(report.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Eye className="w-4 h-4 mr-1" />
            View Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}