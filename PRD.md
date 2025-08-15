# Data Analysis Reporting Platform

A professional web platform for publishing data analysis reports with uniform layout, access control, and embeddable content for external integration.

**Experience Qualities**:
1. **Professional** - Clean, authoritative design that builds trust in data insights
2. **Accessible** - Clear information hierarchy that guides readers through complex data
3. **Integrated** - Seamless embedding capabilities for external websites

**Complexity Level**: Light Application (multiple features with basic state)
- Manages report creation, organization, and access control with embeddable content generation

## Essential Features

### Report Management
- **Functionality**: Create, edit, organize reports by topic with rich content (text, tables, Plotly graphs)
- **Purpose**: Centralized platform for publishing data analysis in uniform format
- **Trigger**: User clicks "New Report" or edits existing report
- **Progression**: Dashboard → Report Editor → Add Content Blocks → Preview → Publish → Share
- **Success criteria**: Reports save automatically, display consistently, support all content types

### Access Control System
- **Functionality**: Password-protected private section and public report viewing
- **Purpose**: Control access to sensitive reports while allowing public sharing
- **Trigger**: User attempts to access private reports or admin functions
- **Progression**: Access Attempt → Password Prompt → Validation → Grant/Deny Access
- **Success criteria**: Private reports require authentication, public reports accessible to all

### Embeddable Content Generation
- **Functionality**: Generate iframe codes and direct links for individual charts/tables
- **Purpose**: Allow external websites to integrate specific data visualizations
- **Trigger**: User clicks "Embed" on any chart or table
- **Progression**: Select Content → Generate Embed Code → Copy Link/Iframe → External Integration
- **Success criteria**: Generated embeds work across different websites, maintain styling

### Long-form Report Display
- **Functionality**: Present reports in article-style layout with navigation
- **Purpose**: Create engaging, readable format for complex data analysis
- **Trigger**: User or visitor clicks on report title
- **Progression**: Report List → Report View → Section Navigation → Content Consumption
- **Success criteria**: Reports load quickly, content flows naturally, navigation aids comprehension

## Edge Case Handling
- **Empty Reports**: Show placeholder content with creation prompts
- **Failed Chart Rendering**: Display error message with data table fallback
- **Invalid Passwords**: Clear error messaging with retry options
- **Broken Embeds**: Graceful degradation with alternative content
- **Large Datasets**: Pagination and loading states for performance

## Design Direction
The design should feel authoritative and data-driven like Bloomberg Terminal or academic journals, with clean typography and generous whitespace that lets complex information breathe and guides attention naturally.

## Color Selection
Complementary (opposite colors) - Professional blue primary with warm orange accents to create trust while highlighting key insights and calls-to-action.

- **Primary Color**: Deep Professional Blue oklch(0.4 0.15 240) - Communicates trust, authority, and analytical rigor
- **Secondary Colors**: Light Blue oklch(0.95 0.02 240) for backgrounds, Medium Blue oklch(0.7 0.1 240) for subtle elements
- **Accent Color**: Warm Orange oklch(0.65 0.15 45) - Attention-grabbing highlight for CTAs, charts, and important metrics
- **Foreground/Background Pairings**: 
  - Background (White oklch(1 0 0)): Dark Text oklch(0.2 0 0) - Ratio 16:1 ✓
  - Card (Light Blue oklch(0.98 0.01 240)): Dark Text oklch(0.2 0 0) - Ratio 15:1 ✓
  - Primary (Deep Blue oklch(0.4 0.15 240)): White Text oklch(1 0 0) - Ratio 10:1 ✓
  - Accent (Orange oklch(0.65 0.15 45)): White Text oklch(1 0 0) - Ratio 6.2:1 ✓

## Font Selection
Typography should convey analytical precision and readability for long-form content, using Inter for its excellent legibility at all sizes and Fira Code for data/code elements.

- **Typographic Hierarchy**: 
  - H1 (Report Title): Inter Bold/32px/tight letter spacing
  - H2 (Section Headers): Inter Semibold/24px/normal spacing
  - H3 (Subsections): Inter Medium/20px/normal spacing
  - Body Text: Inter Regular/16px/1.6 line height
  - Data/Code: Fira Code Regular/14px/1.4 line height
  - Captions: Inter Regular/14px/muted color

## Animations
Subtle, purposeful animations that reinforce the analytical nature - smooth transitions between report sections and gentle fade-ins for charts that suggest data loading and revelation.

- **Purposeful Meaning**: Motion communicates data loading, section transitions, and progressive disclosure of insights
- **Hierarchy of Movement**: Charts and key metrics deserve subtle entrance animations, navigation should be immediate

## Component Selection
- **Components**: Card (report previews), Dialog (password entry), Tabs (report sections), Table (data display), Button (actions), Input (search/filter), Badge (report status), Separator (content sections)
- **Customizations**: Chart container component for Plotly integration, Embed code generator modal, Report editor with block-based content
- **States**: Reports have draft/published states, embed buttons show copy confirmation, password inputs show validation feedback
- **Icon Selection**: BarChart3, FileText, Lock, Share, Eye, Edit3, Plus, ExternalLink for representing data, security, and sharing actions
- **Spacing**: Consistent 4-unit (16px) spacing between major sections, 2-unit (8px) for related elements, generous padding in report content areas
- **Mobile**: Responsive navigation that collapses to hamburger menu, stacked chart layouts, touch-friendly embed sharing options