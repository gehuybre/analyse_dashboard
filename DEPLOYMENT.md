# Data Analytics Platform - Production Deployment Guide

## Overview
This guide provides instructions for deploying the Data Analytics Platform to production with real authentication, file upload, and enhanced security features.

## Current Implementation Status

### ✅ Completed Features
- **Report Management**: Full CRUD operations for reports
- **Authentication UI**: Google OAuth simulation + password login
- **CSV Upload**: File parsing and table generation
- **PDF Export**: Markdown export functionality
- **Embedding**: iframe generation for external sites
- **Responsive Design**: Mobile-optimized interface

### 🔧 Production Requirements

## 1. Real Google Authentication Setup

### Prerequisites
- Google Cloud Console account
- Domain name for your application

### Steps
1. **Create Google Cloud Project**
   ```
   - Go to Google Cloud Console
   - Create new project or select existing
   - Enable Google Identity Services API
   ```

2. **Configure OAuth Consent Screen**
   ```
   - Set application type to "Web application"
   - Add authorized domains
   - Configure scopes: email, profile, openid
   ```

3. **Create OAuth 2.0 Client ID**
   ```
   - Add authorized JavaScript origins
   - Add authorized redirect URIs
   - Note the Client ID for configuration
   ```

4. **Update Application Code**
   ```typescript
   // In GoogleAuth.tsx, replace simulation with real implementation:
   
   import { GoogleAuth } from 'google-auth-library';
   
   const handleGoogleLogin = async () => {
     try {
       const response = await google.accounts.id.prompt();
       const credential = response.credential;
       // Verify JWT token and extract user info
     } catch (error) {
       setError('Google login failed');
     }
   };
   ```

## 2. File Upload Implementation

### Option A: Netlify Functions + Cloud Storage

1. **Create Netlify Function**
   ```javascript
   // netlify/functions/upload.js
   exports.handler = async (event, context) => {
     // Verify authentication
     // Parse multipart form data
     // Upload to cloud storage (S3, Google Cloud Storage)
     // Return file URL
   };
   ```

2. **Update Frontend**
   ```typescript
   const uploadFile = async (file: File) => {
     const formData = new FormData();
     formData.append('file', file);
     
     const response = await fetch('/.netlify/functions/upload', {
       method: 'POST',
       body: formData,
       headers: {
         'Authorization': `Bearer ${userToken}`
       }
     });
     
     return response.json();
   };
   ```

### Option B: Third-party Services

1. **Cloudinary Integration**
   ```typescript
   import { Cloudinary } from '@cloudinary/url-gen';
   
   const uploadToCloudinary = async (file: File) => {
     const formData = new FormData();
     formData.append('file', file);
     formData.append('upload_preset', 'your_preset');
     
     const response = await fetch(
       `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
       { method: 'POST', body: formData }
     );
     
     return response.json();
   };
   ```

## 3. Enhanced PDF Export

### Current: Markdown Export
- ✅ Preserves text content
- ✅ Maintains table structure
- ❌ No chart visualization

### Production Enhancement Options

1. **HTML to PDF Conversion**
   ```typescript
   // Using Puppeteer in Netlify Function
   const puppeteer = require('puppeteer');
   
   const generatePDF = async (reportId) => {
     const browser = await puppeteer.launch();
     const page = await browser.newPage();
     await page.goto(`${baseUrl}/report/${reportId}?print=true`);
     const pdf = await page.pdf({ format: 'A4' });
     await browser.close();
     return pdf;
   };
   ```

2. **Chart Image Generation**
   ```typescript
   // Convert Plotly charts to images before PDF generation
   import Plotly from 'plotly.js';
   
   const chartToImage = async (chartData) => {
     const imgData = await Plotly.toImage(chartData, {
       format: 'png',
       width: 800,
       height: 600
     });
     return imgData;
   };
   ```

## 4. Database Implementation

### Current: Local Storage via Spark KV
- ✅ Simple development setup
- ❌ Data lost on deployment updates
- ❌ No multi-user support

### Production Database Options

1. **Supabase (Recommended)**
   ```typescript
   import { createClient } from '@supabase/supabase-js';
   
   const supabase = createClient(
     process.env.REACT_APP_SUPABASE_URL,
     process.env.REACT_APP_SUPABASE_ANON_KEY
   );
   
   // Replace useKV calls with Supabase queries
   const saveReport = async (report) => {
     const { data, error } = await supabase
       .from('reports')
       .insert([report]);
     return data;
   };
   ```

2. **Firebase Firestore**
   ```typescript
   import { initializeApp } from 'firebase/app';
   import { getFirestore } from 'firebase/firestore';
   
   const app = initializeApp(firebaseConfig);
   const db = getFirestore(app);
   ```

## 5. Security Enhancements

### Authentication Security
```typescript
// Implement JWT token validation
const validateToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

// Add rate limiting
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
```

### File Upload Security
```typescript
// Validate file types and sizes
const validateFile = (file: File) => {
  const allowedTypes = ['text/csv', 'application/vnd.ms-excel'];
  const maxSize = 5 * 1024 * 1024; // 5MB
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type');
  }
  
  if (file.size > maxSize) {
    throw new Error('File too large');
  }
};

// Sanitize CSV content
const sanitizeCSV = (content: string) => {
  // Remove potential script injections
  return content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};
```

## 6. Performance Optimizations

### Code Splitting
```typescript
import { lazy, Suspense } from 'react';

const ReportEditor = lazy(() => import('./components/ReportEditor'));
const ChartComponent = lazy(() => import('./components/ChartComponent'));

// Wrap in Suspense
<Suspense fallback={<LoadingSpinner />}>
  <ReportEditor />
</Suspense>
```

### Image Optimization
```typescript
// Optimize chart rendering
const optimizeChart = (chartData) => {
  return {
    ...chartData,
    config: {
      ...chartData.config,
      responsive: true,
      displayModeBar: false, // Hide toolbar for better embedding
    }
  };
};
```

## 7. Monitoring & Analytics

### Error Tracking
```typescript
// Integrate Sentry for error monitoring
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
});

// Wrap components with error boundaries
export default Sentry.withErrorBoundary(App, {
  fallback: ErrorFallback,
});
```

### Usage Analytics
```typescript
// Track key user actions
const trackEvent = (eventName: string, properties: object) => {
  // Integrate with Google Analytics, Mixpanel, etc.
  gtag('event', eventName, properties);
};

// Usage examples
trackEvent('report_created', { topic, isPrivate });
trackEvent('csv_uploaded', { fileSize, rowCount });
trackEvent('report_exported', { format: 'markdown' });
```

## 8. Environment Configuration

### Environment Variables
```bash
# .env.production
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_key
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
REACT_APP_SENTRY_DSN=your_sentry_dsn
```

### Build Configuration
```json
{
  "scripts": {
    "build:prod": "NODE_ENV=production npm run build",
    "deploy": "npm run build:prod && netlify deploy --prod"
  }
}
```

## 9. Testing Strategy

### Unit Tests
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { CsvUpload } from './CsvUpload';

test('handles CSV upload correctly', async () => {
  const mockOnDataLoaded = jest.fn();
  render(<CsvUpload onDataLoaded={mockOnDataLoaded} />);
  
  const file = new File(['name,age\nJohn,30'], 'test.csv', { type: 'text/csv' });
  const input = screen.getByRole('button');
  
  fireEvent.change(input, { target: { files: [file] } });
  
  await waitFor(() => {
    expect(mockOnDataLoaded).toHaveBeenCalledWith(
      { headers: ['name', 'age'], rows: [['John', 30]] },
      'test.csv'
    );
  });
});
```

### Integration Tests
```typescript
// Test end-to-end workflows
test('complete report creation workflow', async () => {
  // Login
  // Create report
  // Add content sections
  // Save
  // Verify persistence
});
```

## 10. Deployment Checklist

### Pre-deployment
- [ ] Configure Google OAuth credentials
- [ ] Set up cloud storage for file uploads
- [ ] Configure production database
- [ ] Set environment variables
- [ ] Test authentication flow
- [ ] Verify file upload functionality
- [ ] Test export features
- [ ] Run security audit
- [ ] Performance testing

### Post-deployment
- [ ] Monitor error rates
- [ ] Check authentication success rates
- [ ] Verify file upload performance
- [ ] Test embed functionality on external sites
- [ ] Monitor user adoption metrics
- [ ] Set up automated backups

## Support & Maintenance

### Regular Maintenance Tasks
1. **Weekly**: Monitor error logs and user feedback
2. **Monthly**: Review security updates and dependency patches
3. **Quarterly**: Performance optimization and feature usage analysis
4. **Annually**: Security audit and infrastructure review

### Backup Strategy
- Database backups (daily automated)
- File storage backups (real-time replication)
- Configuration backups (version controlled)

This production deployment guide ensures your Data Analytics Platform can scale securely and efficiently for real-world usage.