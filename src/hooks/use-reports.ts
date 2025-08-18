import { Report } from '@/lib/types';
import { sampleReports } from '@/lib/sample-data';
import { useKV } from '@github/spark/hooks';

export function useReports() {
  const [reports, setReports] = useKV<Report[]>('reports', sampleReports);

  const addReport = (report: Omit<Report, 'id'>) => {
    const newReport: Report = {
      ...report,
      id: Date.now().toString(),
    };
    setReports(currentReports => [...currentReports, newReport]);
    return newReport.id;
  };

  const updateReport = (id: string, updates: Partial<Report>) => {
    setReports(currentReports =>
      currentReports.map(report =>
        report.id === id ? { ...report, ...updates } : report
      )
    );
  };

  const deleteReport = (id: string) => {
    setReports(currentReports =>
      currentReports.filter(report => report.id !== id)
    );
  };

  const getReport = (id: string) => {
    return reports.find(report => report.id === id);
  };

  const getReportsByTopic = (topic: string) => {
    return reports.filter(report => report.topic === topic && report.status === 'published');
  };

  return {
    reports,
    addReport,
    updateReport,
    deleteReport,
    getReport,
    getReportsByTopic
  };
}