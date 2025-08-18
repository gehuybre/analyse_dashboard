import { Report } from './types';

export const sampleReports: Report[] = [
  {
    id: '1',
    title: 'Q4 2024 Sales Performance Analysis',
    topic: 'Market Analysis',
    description: 'Comprehensive analysis of quarterly sales performance across all regions with growth projections.',
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
    title: 'Technology Innovation Trends 2024',
    topic: 'Technology Research',
    description: 'Analysis of emerging technology trends and their potential impact on business operations and strategy.',
    publishedAt: '2024-01-12T09:15:00Z',
    status: 'published',
    content: [
      {
        id: 'h1',
        type: 'heading',
        title: 'Technology Innovation Overview',
        content: ''
      },
      {
        id: 't1',
        type: 'text',
        title: '',
        content: 'This report examines the key technology trends shaping business operations in 2024, including artificial intelligence adoption, cloud computing advancements, and emerging cybersecurity challenges.\n\nOur analysis covers market impact, implementation costs, and strategic recommendations for technology adoption across various business functions.'
      },
      {
        id: 'c1',
        type: 'chart',
        title: 'Technology Adoption Rates',
        content: {
          data: [
            {
              x: ['AI/ML', 'Cloud Computing', 'IoT', 'Blockchain', 'AR/VR'],
              y: [78, 92, 65, 34, 28],
              type: 'bar',
              marker: { 
                color: ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444']
              },
              text: ['78%', '92%', '65%', '34%', '28%'],
              textposition: 'auto'
            }
          ],
          layout: {
            title: '',
            xaxis: { title: 'Technology' },
            yaxis: { title: 'Adoption Rate (%)', range: [0, 100] },
            margin: { l: 60, r: 40, t: 40, b: 60 },
            plot_bgcolor: 'rgba(0,0,0,0)',
            paper_bgcolor: 'rgba(0,0,0,0)'
          }
        }
      },
      {
        id: 'table1',
        type: 'table',
        title: 'Implementation Cost Analysis',
        content: {
          headers: ['Technology', 'Initial Investment', 'Annual Maintenance', 'ROI Timeline'],
          rows: [
            ['AI/ML Solutions', '$150K - $500K', '$25K - $75K', '12-18 months'],
            ['Cloud Migration', '$75K - $200K', '$15K - $40K', '6-12 months'],
            ['IoT Infrastructure', '$100K - $300K', '$20K - $50K', '18-24 months'],
            ['Blockchain Platform', '$200K - $800K', '$50K - $150K', '24-36 months']
          ]
        }
      }
    ]
  }
];