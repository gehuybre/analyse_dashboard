import { Report } from './types';

export const sampleReports: Report[] = [
  {
    id: '1',
    title: 'Q4 2024 Sales Performance Analysis',
    topic: 'Market Analysis',
    description: 'Comprehensive analysis of quarterly sales performance across all regions with growth projections.',
    isPrivate: false,
    publishedAt: '2024-01-15T10:00:00Z',
    status: 'published',
    content: [
      {
        id: 'h1',
        type: 'heading',
        title: 'Executive Summary',
        content: ''
      },
      {
        id: 't1',
        type: 'text',
        title: '',
        content: 'This report analyzes our Q4 2024 sales performance, highlighting key achievements and areas for improvement. Our team exceeded targets by 15% across all major product categories, with particularly strong performance in the technology sector.\n\nKey findings include:\n• Revenue growth of 23% year-over-year\n• Customer acquisition costs reduced by 18%\n• Net promoter score improved to 8.4/10\n• Market share increased in 3 of 4 target segments'
      },
      {
        id: 'c1',
        type: 'chart',
        title: 'Quarterly Revenue Trends',
        content: {
          data: [
            {
              x: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'],
              y: [485000, 512000, 548000, 612000],
              type: 'bar',
              marker: { color: '#3b82f6' },
              name: 'Revenue ($)',
              text: ['$485K', '$512K', '$548K', '$612K'],
              textposition: 'auto'
            }
          ],
          layout: {
            title: '',
            xaxis: { title: 'Quarter' },
            yaxis: { title: 'Revenue (USD)', tickformat: '$,.0f' },
            margin: { l: 60, r: 40, t: 40, b: 60 },
            plot_bgcolor: 'rgba(0,0,0,0)',
            paper_bgcolor: 'rgba(0,0,0,0)'
          }
        }
      },
      {
        id: 'h2',
        type: 'heading',
        title: 'Regional Performance Breakdown',
        content: ''
      },
      {
        id: 'table1',
        type: 'table',
        title: 'Sales by Region',
        content: {
          headers: ['Region', 'Q4 Revenue', 'YoY Growth', 'Market Share'],
          rows: [
            ['North America', '$285,000', '+18%', '35%'],
            ['Europe', '$178,000', '+25%', '22%'],
            ['Asia Pacific', '$112,000', '+31%', '18%'],
            ['Latin America', '$37,000', '+12%', '8%']
          ]
        }
      },
      {
        id: 't2',
        type: 'text',
        title: 'Key Insights',
        content: 'The data reveals strong performance across all regions, with Asia Pacific showing the highest growth rate despite representing a smaller revenue share. This suggests significant expansion opportunities in emerging markets.\n\nOur North American market continues to drive the majority of revenue, but the growth trajectory in Europe and Asia Pacific indicates successful international expansion strategies.'
      }
    ]
  },
  {
    id: '2',
    title: 'Customer Satisfaction Survey Results',
    topic: 'Customer Insights',
    description: 'Analysis of our annual customer satisfaction survey covering 2,500+ respondents across all service categories.',
    isPrivate: false,
    publishedAt: '2024-01-10T14:30:00Z',
    status: 'published',
    content: [
      {
        id: 'h1',
        type: 'heading',
        title: 'Survey Overview',
        content: ''
      },
      {
        id: 't1',
        type: 'text',
        title: '',
        content: 'Our annual customer satisfaction survey collected responses from 2,547 customers across all service categories. The survey was conducted between December 1-31, 2024, with a response rate of 34.2%.\n\nThis comprehensive analysis examines satisfaction trends, identifies improvement opportunities, and benchmarks our performance against industry standards.'
      },
      {
        id: 'c1',
        type: 'chart',
        title: 'Overall Satisfaction Scores',
        content: {
          data: [
            {
              labels: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
              values: [42, 35, 15, 6, 2],
              type: 'pie',
              hole: 0.4,
              marker: {
                colors: ['#22c55e', '#84cc16', '#eab308', '#f97316', '#ef4444']
              },
              textinfo: 'label+percent',
              textposition: 'auto'
            }
          ],
          layout: {
            title: '',
            margin: { l: 40, r: 40, t: 40, b: 40 },
            plot_bgcolor: 'rgba(0,0,0,0)',
            paper_bgcolor: 'rgba(0,0,0,0)',
            showlegend: true,
            legend: { orientation: 'h', y: -0.1 }
          }
        }
      },
      {
        id: 'table1',
        type: 'table',
        title: 'Satisfaction by Service Category',
        content: {
          headers: ['Service Category', 'Avg Score', 'Response Count', 'Improvement vs 2023'],
          rows: [
            ['Product Quality', '4.3/5', '2,547', '+0.2'],
            ['Customer Service', '4.1/5', '1,892', '+0.4'],
            ['Delivery Speed', '3.9/5', '2,156', '+0.1'],
            ['Value for Money', '4.0/5', '2,398', '+0.3'],
            ['Technical Support', '3.8/5', '987', '+0.5']
          ]
        }
      },
      {
        id: 't2',
        type: 'text',
        title: 'Recommendations',
        content: 'Based on the survey results, we recommend focusing on:\n\n1. Technical Support Enhancement: Despite showing the highest improvement, this area still scores lowest overall\n2. Delivery Speed Optimization: Consider partnerships with additional logistics providers\n3. Continue Excellence in Product Quality: Maintain current standards while exploring premium offerings\n\nThe overall trend is positive, with satisfaction scores improving across all categories compared to 2023.'
      }
    ]
  },
  {
    id: '3',
    title: 'Internal Financial Dashboard - Q4 Review',
    topic: 'Financial Performance',
    description: 'Confidential financial analysis including sensitive revenue projections and internal cost breakdowns.',
    isPrivate: true,
    publishedAt: '2024-01-12T09:15:00Z',
    status: 'published',
    content: [
      {
        id: 'h1',
        type: 'heading',
        title: 'Confidential Financial Analysis',
        content: ''
      },
      {
        id: 't1',
        type: 'text',
        title: 'Access Restricted',
        content: 'This report contains sensitive financial information including revenue projections, cost analysis, and strategic planning data. Access is restricted to authorized personnel only.\n\nFor access to this content, please contact your administrator or use the admin login feature.'
      },
      {
        id: 'c1',
        type: 'chart',
        title: 'Revenue vs Costs Analysis',
        content: {
          data: [
            {
              x: ['Q1', 'Q2', 'Q3', 'Q4'],
              y: [485000, 512000, 548000, 612000],
              type: 'scatter',
              mode: 'lines+markers',
              name: 'Revenue',
              line: { color: '#10b981', width: 3 },
              marker: { size: 8 }
            },
            {
              x: ['Q1', 'Q2', 'Q3', 'Q4'],
              y: [320000, 335000, 365000, 390000],
              type: 'scatter',
              mode: 'lines+markers',
              name: 'Operating Costs',
              line: { color: '#ef4444', width: 3 },
              marker: { size: 8 }
            }
          ],
          layout: {
            title: '',
            xaxis: { title: 'Quarter' },
            yaxis: { title: 'Amount (USD)', tickformat: '$,.0f' },
            margin: { l: 60, r: 40, t: 40, b: 60 },
            plot_bgcolor: 'rgba(0,0,0,0)',
            paper_bgcolor: 'rgba(0,0,0,0)',
            legend: { x: 0, y: 1.1, orientation: 'h' }
          }
        }
      },
      {
        id: 'table1',
        type: 'table',
        title: 'Cost Breakdown by Category',
        content: {
          headers: ['Category', 'Q4 Expense', '% of Revenue', 'Budget Variance'],
          rows: [
            ['Personnel', '$185,000', '30.2%', '-2.1%'],
            ['Technology', '$89,000', '14.5%', '+1.3%'],
            ['Marketing', '$67,000', '10.9%', '-0.8%'],
            ['Operations', '$49,000', '8.0%', '+0.5%']
          ]
        }
      }
    ]
  }
];