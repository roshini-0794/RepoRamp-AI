# Knowledge Risk Analyzer - Quick Setup Guide

## Prerequisites

- Existing MERN stack AI onboarding platform running
- MongoDB connection configured
- Google Gemini API key set in environment
- Node.js and npm installed

## Installation Steps

### 1. Verify Environment Variables

Ensure your `.env` file contains:
```env
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_jwt_secret
GITHUB_TOKEN=your_github_token (optional)
```

### 2. Install Dependencies (if needed)

The feature uses existing dependencies. If you need to reinstall:
```bash
npm install
```

### 3. Start the Server

```bash
npm run dev
```

The server will automatically:
- Load the new MongoDB model
- Register the knowledge risk API routes
- Make the feature available at `/api/knowledge-risk`

## Usage

### For Managers

1. **Login** to your manager account
2. **Analyze a repository** or select an existing report
3. **View the Knowledge Risk Analysis** card at the top of your dashboard
4. The analysis will automatically generate on first view (takes 10-30 seconds)

### For CTOs/CEOs

1. **Login** to your CTO account
2. **Select a repository report**
3. **View the comprehensive Knowledge Risk Analysis** with executive summary
4. Review action items and strategic recommendations

## API Endpoints

### Generate Analysis
```bash
curl -X POST http://localhost:3000/api/knowledge-risk/analyze/:reportId \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Get Existing Analysis
```bash
curl http://localhost:3000/api/knowledge-risk/report/:reportId \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Refresh Analysis
```bash
curl -X PUT http://localhost:3000/api/knowledge-risk/refresh/:reportId \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Features Available

### ✅ Automatic Analysis
- First time viewing a report triggers automatic analysis
- Results are cached for instant subsequent views

### ✅ Risk Metrics
- **Bus Factor**: Number of critical contributors
- **Risk Score**: 0-100 overall risk assessment
- **Onboarding Days**: Estimated time to productivity
- **Knowledge Concentration**: Percentage of knowledge silos

### ✅ Detailed Insights
- **Risky Modules**: High-risk code areas with reasons
- **High Maintenance Areas**: Code requiring frequent updates
- **Dependency Analysis**: Files with heavy dependencies
- **Management Summary**: Executive-level insights (CTO view)

### ✅ Visual Dashboard
- Color-coded risk indicators (Low/Medium/High/Critical)
- Progress bars for metrics
- Interactive cards with hover effects
- Responsive design for all screen sizes

## Troubleshooting

### Analysis Not Appearing

**Problem**: Component shows loading indefinitely

**Solutions**:
1. Check browser console for errors
2. Verify API endpoint is accessible: `http://localhost:3000/api/knowledge-risk/report/:reportId`
3. Ensure MongoDB is connected (check server logs)
4. Verify GEMINI_API_KEY is set correctly

### 404 Error on API Call

**Problem**: API returns 404 Not Found

**Solutions**:
1. Restart the server to load new routes
2. Check `server.ts` includes: `app.use("/api/knowledge-risk", knowledgeRiskRoutes);`
3. Verify the route file exists at `server/routes/knowledgeRisk.ts`

### AI Analysis Fails

**Problem**: Error generating analysis

**Solutions**:
1. Check GEMINI_API_KEY is valid
2. Verify internet connection
3. Check API rate limits
4. Review server logs for specific error messages

### Slow Performance

**Problem**: Analysis takes too long

**Expected Behavior**: 
- First analysis: 10-30 seconds (AI processing)
- Subsequent views: Instant (cached results)

**If slower**:
1. Check internet connection speed
2. Verify Gemini API is responding
3. Consider implementing background job processing

## Testing the Feature

### 1. Test with Existing Report

```javascript
// In browser console after logging in
const reportId = 'your_report_id_here';
const token = localStorage.getItem('token');

fetch(`/api/knowledge-risk/analyze/${reportId}`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(r => r.json())
.then(data => console.log('Analysis:', data));
```

### 2. Verify Dashboard Integration

1. Login as Manager or CTO
2. Navigate to Dashboards page
3. Select a repository report
4. Scroll to top - Knowledge Risk Analysis should appear
5. Wait for analysis to complete (first time only)

### 3. Check Data Persistence

1. Generate analysis for a report
2. Refresh the page
3. Analysis should load instantly from database
4. No new AI call should be made

## File Structure

```
server/
├── models/
│   └── KnowledgeRisk.ts          # MongoDB schema
├── routes/
│   └── knowledgeRisk.ts          # API endpoints
├── services/
│   └── knowledgeRiskService.ts   # AI analysis logic
└── server.ts                      # Route registration

src/
├── components/
│   └── KnowledgeRiskAnalysis.tsx # Main React component
├── pages/
│   ├── ManagerDashboard.tsx      # Manager integration
│   └── CTODashboard.tsx          # CTO integration
└── types/
    └── knowledgeRisk.ts          # TypeScript types
```

## Configuration Options

### Customize Risk Thresholds

Edit `server/services/knowledgeRiskService.ts`:
```typescript
// Adjust risk level calculations
// Low: < 30, Medium: 30-60, High: 60-80, Critical: > 80
```

### Modify Display Limits

Edit `src/components/KnowledgeRiskAnalysis.tsx`:
```typescript
// Change number of items displayed
analysis.riskyModules.slice(0, 6)  // Show 6 risky modules
analysis.highMaintenanceAreas.slice(0, 5)  // Show 5 maintenance areas
```

### Adjust Analysis Prompt

Edit `server/services/knowledgeRiskService.ts`:
```typescript
// Customize the AI prompt for different analysis focus
const prompt = `...your custom prompt...`;
```

## Performance Tips

1. **Cache Results**: Analysis results are automatically cached in MongoDB
2. **Background Processing**: For large repos, consider implementing job queues
3. **Rate Limiting**: Implement rate limiting on analysis endpoints
4. **Pagination**: For large result sets, implement pagination

## Security Considerations

- ✅ All endpoints require authentication
- ✅ User can only access their own analyses
- ✅ MongoDB queries use proper indexing
- ✅ Input validation on all API endpoints

## Next Steps

1. **Monitor Usage**: Track how often analyses are generated
2. **Gather Feedback**: Ask managers/CTOs for feature requests
3. **Optimize Performance**: Profile slow queries and optimize
4. **Add Features**: Implement historical tracking, alerts, etc.

## Support

For issues or questions:
- Check `BUS_FACTOR_FEATURE.md` for detailed documentation
- Review server logs: `npm run dev` output
- Check browser console for frontend errors
- Verify all environment variables are set

## Success Indicators

✅ Analysis generates successfully for test repository
✅ Dashboard displays all risk metrics
✅ Color-coded indicators show correctly
✅ Management summary appears for CTO users
✅ Subsequent views load instantly from cache
✅ No console errors in browser or server

---

**Feature Status**: ✅ Production Ready

**Last Updated**: 2026-05-16