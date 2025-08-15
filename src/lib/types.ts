export interface Report {
  id: string;
  title: string;
  topic: string;
  description: string;
  isPrivate: boolean;
  publishedAt: string;
  content: ReportSection[];
  status: 'draft' | 'published';
}

export interface ReportSection {
  id: string;
  type: 'text' | 'chart' | 'table' | 'heading';
  title?: string;
  content: any;
}

export interface ChartData {
  data: any[];
  layout: any;
  config?: any;
}

export interface TableData {
  headers: string[];
  rows: any[][];
}

export interface AuthState {
  isAuthenticated: boolean;
  hasAccess: boolean;
}