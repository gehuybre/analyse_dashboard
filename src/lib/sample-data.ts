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
  },
  {
    id: '4',
    title: 'Advanced Data Visualization Showcase',
    topic: 'Product Analytics',
    description: 'Comprehensive dashboard showcasing advanced chart types and visualization techniques for complex data analysis.',
    publishedAt: '2024-01-20T14:30:00Z',
    status: 'published',
    content: [
      {
        id: 'h4-1',
        type: 'heading',
        title: 'Product Performance Overview',
        content: ''
      },
      {
        id: 't4-1',
        type: 'text',
        title: '',
        content: 'This showcase demonstrates the platform\'s advanced visualization capabilities using real-world data patterns. Each chart type serves specific analytical purposes and provides unique insights into different aspects of business performance.'
      },
      {
        id: 'c4-1',
        type: 'chart',
        title: 'Customer Satisfaction Radar Chart',
        content: {
          data: [{
            type: 'scatterpolar',
            r: [85, 78, 92, 88, 75, 90],
            theta: ['Product Quality', 'Customer Service', 'Value for Money', 'User Experience', 'Delivery Speed', 'Brand Trust'],
            fill: 'toself',
            fillcolor: 'rgba(99, 102, 241, 0.3)',
            line: { color: '#6366f1', width: 2 },
            marker: { color: '#6366f1', size: 8 },
            name: 'Current Performance'
          }],
          layout: {
            polar: {
              radialaxis: { 
                visible: true,
                range: [0, 100],
                tickmode: 'linear',
                tick0: 0,
                dtick: 20
              }
            },
            showlegend: false,
            margin: { l: 60, r: 60, t: 60, b: 60 }
          }
        }
      },
      {
        id: 'c4-2',
        type: 'chart',
        title: 'Sales Distribution by Region',
        content: {
          data: [{
            values: [32, 28, 24, 16],
            labels: ['North America', 'Europe', 'Asia Pacific', 'Other'],
            type: 'pie',
            marker: { 
              colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
              line: { color: '#ffffff', width: 2 }
            },
            textinfo: 'label+percent',
            textposition: 'auto',
            hovertemplate: '<b>%{label}</b><br>%{percent}<br>%{value}%<extra></extra>'
          }],
          layout: {
            showlegend: false,
            margin: { l: 40, r: 40, t: 60, b: 40 }
          }
        }
      },
      {
        id: 'c4-3',
        type: 'chart',
        title: 'Revenue vs Marketing Spend Correlation',
        content: {
          data: [{
            x: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55],
            y: [45, 55, 68, 78, 85, 92, 98, 105, 115, 125],
            type: 'scatter',
            mode: 'markers+lines',
            marker: { 
              color: '#8b5cf6',
              size: 10,
              opacity: 0.8
            },
            line: { color: '#8b5cf6', width: 2 },
            name: 'Revenue vs Marketing'
          }],
          layout: {
            xaxis: { title: 'Marketing Spend ($000)' },
            yaxis: { title: 'Revenue ($000)' },
            showlegend: false,
            margin: { l: 60, r: 40, t: 60, b: 60 }
          }
        }
      },
      {
        id: 'c4-4',
        type: 'chart',
        title: 'Monthly Active Users Growth',
        content: {
          data: [{
            x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            y: [12500, 14200, 16800, 18500, 21200, 24600, 28300, 31200, 34800, 38500, 42300, 47100],
            type: 'scatter',
            mode: 'lines',
            fill: 'tonexty',
            fillcolor: 'rgba(16, 185, 129, 0.3)',
            line: { color: '#10b981', width: 3 },
            name: 'Active Users'
          }],
          layout: {
            xaxis: { title: 'Month' },
            yaxis: { title: 'Active Users', tickformat: ',.0f' },
            showlegend: false,
            margin: { l: 60, r: 40, t: 60, b: 60 }
          }
        }
      },
      {
        id: 'c4-5',
        type: 'chart',
        title: 'Response Time Distribution',
        content: {
          data: [{
            x: [120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400, 420, 440, 460, 480, 500],
            type: 'histogram',
            marker: { 
              color: '#f59e0b',
              opacity: 0.8
            },
            name: 'Response Times'
          }],
          layout: {
            xaxis: { title: 'Response Time (ms)' },
            yaxis: { title: 'Frequency' },
            showlegend: false,
            margin: { l: 60, r: 40, t: 60, b: 60 }
          }
        }
      },
      {
        id: 'c4-6',
        type: 'chart',
        title: 'Performance Metrics Box Plot',
        content: {
          data: [{
            y: [85, 90, 88, 92, 87, 89, 91, 86, 93, 88, 90, 89, 94, 87, 91, 88, 90, 92, 89, 87],
            type: 'box',
            name: 'Performance Score',
            marker: { color: '#ec4899' },
            boxpoints: 'outliers'
          }],
          layout: {
            yaxis: { title: 'Performance Score (%)' },
            showlegend: false,
            margin: { l: 60, r: 40, t: 60, b: 60 }
          }
        }
      },
      {
        id: 't4-2',
        type: 'text',
        title: 'Key Insights',
        content: 'The advanced visualizations reveal several important patterns:\n\n• Customer satisfaction is strongest in product quality and brand trust\n• North America remains our largest market but Asia Pacific shows rapid growth\n• Strong positive correlation between marketing spend and revenue\n• User growth shows consistent acceleration throughout the year\n• Response times cluster around 200-400ms with few outliers\n• Performance metrics show stable distribution with occasional peaks'
      }
    ]
  }
];