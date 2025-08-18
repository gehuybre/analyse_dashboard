import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { FileText, Eye, Lock, DotsThree, Pencil, Trash } from '@phosphor-icons/react';
import { Report } from '@/lib/types';

interface ReportCardProps {
  report: Report;
  onView: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  showPrivacyBadge?: boolean;
  showActions?: boolean;
}

export function ReportCard({ 
  report, 
  onView, 
  onEdit, 
  onDelete, 
  showPrivacyBadge = true, 
  showActions = false 
}: ReportCardProps) {
  const formattedDate = new Date(report.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(report.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete?.(report.id);
  };

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
          <div className="flex items-center gap-2">
            {showPrivacyBadge && report.isPrivate && (
              <Badge variant="secondary">
                <Lock className="w-3 h-3 mr-1" />
                Private
              </Badge>
            )}
            {showActions && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <DotsThree className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleEdit}>
                    <Pencil className="w-4 h-4 mr-2" />
                    Edit Report
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={handleDelete}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash className="w-4 h-4 mr-2" />
                    Delete Report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
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