# Bus Factor Analyzer Feature Documentation

## Overview

The Bus Factor Analyzer is a comprehensive knowledge risk assessment tool integrated into the AI onboarding platform. It analyzes repository structure, identifies critical dependencies, and provides actionable insights for management to mitigate knowledge concentration risks.

## Features Implemented

### 1. **Knowledge Risk Analysis Dashboard**
- **Bus Factor Calculation**: Estimates the number of critical contributors
- **Overall Risk Score**: 0-100 scale with Low/Medium/High/Critical indicators
- **Onboarding Complexity**: Estimated days for new developer productivity
- **Knowledge Concentration**: Percentage indicating knowledge silos

### 2. **Risk Assessment Components**

#### Risky Modules
- Identifies high-risk code modules
- Risk scoring (0-100) with visual indicators
- Contributor count and complexity metrics
- Dependency analysis
- Specific risk reasons and recommendations

#### High Maintenance Areas
- Areas requiring frequent updates
- Maintenance score visualization
- Priority levels (Low/Medium/High/Critical)
- Actionable recommendations

#### Dependency-Heavy Files
- Files with high internal/external dependencies
- Impact assessment
- Risk level categorization
- Visual dependency breakdown

### 3. **Management Summaries**

#### For Managers
- Tactical risk overview
- Team productivity impact
- Onboarding bottlenecks
- Knowledge transfer metrics

#### For CTOs/CEOs
- Executive summary
- Key findings and strategic recommendations
- Priority action items with effort/impact estimates
- Risk mitigation strategies

### 4. **Metrics Dashboard**
- Documentation coverage percentage
- Test coverage percentage
- Technical debt score
- Knowledge concentration visualization

## Technical Implementation

### Backend Components

#### 1. MongoDB Model (`server/models/KnowledgeRisk.ts`)
```typescript
- busFactor: Number of critical contributors
- overallRiskScore: 0-100 risk assessment
- riskLevel: Low/Medium/High/Critical
- riskyModules: Array of high-risk modules
- onboardingComplexity: Complexity analysis
- dependencyHeavyFiles: Dependency analysis
- highMaintenanceAreas: Maintenance hotspots
- managementSummary: Executive insights
- metrics: Visualization data
```

#### 2. AI Service (`server/services/knowledgeRiskService.ts`)
- Uses Google Gemini AI for intelligent analysis
- Analyzes repository structure and patterns
- Generates risk scores and recommendations
- Provides management-friendly summaries

#### 3. API Routes (`server/routes/knowledgeRisk.ts`)
```
POST   /api/knowledge-risk/analyze/:reportId    - Generate new analysis
GET    /api/knowledge-risk/report/:reportId     - Get existing analysis
GET    /api/knowledge-risk/user                 - Get user's analyses
PUT    /api/knowledge-risk/refresh/:reportId    - Refresh analysis
DELETE /api/knowledge-risk/:id                  - Delete analysis
```

### Frontend Components

#### 1. TypeScript Types (`src/types/knowledgeRisk.ts`)
- Complete type definitions for all data structures
- Type-safe interfaces for risk analysis data

#### 2. React Component (`src/components/KnowledgeRiskAnalysis.tsx`)
- Responsive enterprise dashboard design
- Real-time data fetching
- Loading and error states
- Variant support (manager/ceo views)
- Interactive visualizations

#### 3. Dashboard Integration
- **Manager Dashboard**: Tactical risk view with team focus
- **CTO Dashboard**: Strategic view with executive summary

## API Usage

### Generate Knowledge Risk Analysis
```javascript
POST /api/knowledge-risk/analyze/:reportId
Headers: Authorization: Bearer <token>

Response: KnowledgeRiskAnalysis object
```

### Fetch Existing Analysis
```javascript
GET /api/knowledge-risk/report/:reportId
Headers: Authorization: Bearer <token>

Response: KnowledgeRiskAnalysis object
```

### Refresh Analysis
```javascript
PUT /api/knowledge-risk/refresh/:reportId
Headers: Authorization: Bearer <token>

Response: Updated KnowledgeRiskAnalysis object
```

## UI Components

### Risk Level Indicators
- **Low**: Green (emerald) - Score < 30
- **Medium**: Yellow (amber) - Score 30-60
- **High**: Orange - Score 60-80
- **Critical**: Red - Score > 80

### Visual Elements
- Glass-morphism cards with gradient accents
- Progress bars for metrics
- Color-coded risk indicators
- Responsive grid layouts
- Hover effects and transitions

## Data Flow

1. **User selects a repository** → Existing onboarding report loaded
2. **Component mounts** → Checks for existing knowledge risk analysis
3. **If not found** → Triggers AI analysis via API
4. **AI analyzes** → Repository structure, dependencies, complexity
5. **Results stored** → MongoDB for future retrieval
6. **Dashboard renders** → Interactive visualizations and insights

## Key Metrics Explained

### Bus Factor
The number of team members who could leave before the project is in serious trouble. Lower numbers indicate higher risk.

### Knowledge Concentration
Percentage indicating how concentrated knowledge is among few individuals. Higher percentages mean higher risk.

### Onboarding Complexity
Estimated days for a new developer to become productive. Based on code complexity, documentation, and architecture.

### Risk Score
Composite score (0-100) considering:
- Code concentration
- Documentation quality
- Complexity distribution
- Dependency management
- Knowledge silos

## Best Practices

### For Managers
1. Review risky modules regularly
2. Implement pair programming for high-risk areas
3. Document critical systems
4. Cross-train team members
5. Monitor onboarding metrics

### For CTOs
1. Use executive summary for strategic planning
2. Prioritize action items by impact
3. Allocate resources to high-maintenance areas
4. Track metrics over time
5. Implement risk mitigation strategies

## Future Enhancements

- [ ] Historical trend analysis
- [ ] Team member contribution mapping
- [ ] Automated alerts for critical risks
- [ ] Integration with GitHub contributors API
- [ ] Custom risk thresholds
- [ ] Export reports to PDF
- [ ] Comparison between repositories
- [ ] Real-time collaboration features

## Troubleshooting

### Analysis Not Generating
- Ensure GEMINI_API_KEY is set in environment
- Check MongoDB connection
- Verify report exists before analysis
- Check API logs for errors

### Slow Performance
- Analysis is AI-powered and may take 10-30 seconds
- Consider caching results
- Implement background job processing for large repos

### Missing Data
- Ensure repository has sufficient structure
- Check GitHub API rate limits
- Verify token permissions

## Integration Checklist

- [x] MongoDB model created
- [x] AI service implemented
- [x] API routes configured
- [x] Server routes registered
- [x] TypeScript types defined
- [x] React component built
- [x] Manager dashboard integrated
- [x] CTO dashboard integrated
- [x] Error handling implemented
- [x] Loading states added
- [x] Responsive design applied

## Support

For issues or questions:
1. Check server logs for API errors
2. Verify environment variables
3. Ensure MongoDB connection is active
4. Check browser console for frontend errors

## License

Part of the RepoRamp AI Onboarding Platform