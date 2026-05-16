# Learning Roadmap Feature - Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies
All required dependencies are already in `package.json`. No new packages needed!

```bash
npm install
```

### 2. Environment Variables
Ensure your `.env` file has:
```env
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_jwt_secret
```

### 3. Start Development Server
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## 📋 What's New

### New Files Created
1. **Frontend**
   - `src/types/roadmap.ts` - TypeScript interfaces
   - `src/components/LearningRoadmap.tsx` - Main roadmap component

2. **Backend**
   - `server/models/RoadmapProgress.ts` - Progress tracking model
   - `server/routes/roadmap.ts` - API endpoints for progress

3. **Documentation**
   - `ROADMAP_FEATURE.md` - Complete feature documentation
   - `SETUP_GUIDE.md` - This file

### Modified Files
1. **Frontend**
   - `src/pages/EmployeeDashboard.tsx` - Added tab navigation and roadmap integration

2. **Backend**
   - `server.ts` - Registered roadmap routes
   - `server/models/Report.ts` - Enhanced roadmap schema
   - `server/services/aiService.ts` - Enhanced AI prompts for 7-day generation

## 🎯 How to Use

### For Employees

1. **Login** to your account
2. **Analyze a Repository** using the repository URL input
3. **Navigate to Learning Roadmap** tab (default view)
4. **Explore the 7-Day Plan**:
   - Click on any day to expand details
   - Check off tasks as you complete them
   - Add personal notes for each task
   - View recommended files and commands
5. **Track Your Progress** with the progress bar at the top

### For Managers

The manager dashboard shows:
- Team member progress overview
- Completion rates
- Bottleneck identification
- Risk assessment

### For CTOs

The CTO dashboard provides:
- High-level analytics
- System health metrics
- Architectural insights
- Strategic recommendations

## 🔧 API Endpoints

### Get Progress
```bash
GET /api/roadmap/progress/:reportId
Authorization: Bearer <token>
```

### Mark Task Complete
```bash
PATCH /api/roadmap/progress/:reportId/task/:taskId
Authorization: Bearer <token>
Content-Type: application/json

{
  "completed": true
}
```

### Add Note
```bash
POST /api/roadmap/progress/:reportId/notes
Authorization: Bearer <token>
Content-Type: application/json

{
  "taskId": "day-1-task-1",
  "note": "Remember to check the config..."
}
```

## 🎨 UI Features

### Interactive Timeline
- **Day Cards**: Expandable cards for each day
- **Progress Indicators**: Visual progress tracking
- **Task Checkboxes**: Mark tasks as complete
- **Notes Section**: Add personal notes per task
- **File Badges**: Clickable file recommendations
- **Command Blocks**: Copy-paste ready commands

### Design Elements
- Glass morphism cards
- Gradient progress bars
- Smooth animations
- Responsive layout
- Dark theme

## 🧪 Testing the Feature

### Test Scenario 1: New Repository Analysis
1. Login as an employee
2. Enter a GitHub repository URL
3. Wait for analysis to complete
4. Verify 7-day roadmap is generated
5. Check that each day has detailed tasks

### Test Scenario 2: Progress Tracking
1. Open the Learning Roadmap
2. Expand Day 1
3. Check off a task
4. Refresh the page
5. Verify the task remains checked

### Test Scenario 3: Notes Functionality
1. Expand a day's tasks
2. Add a note in the textarea
3. Click outside the textarea (blur event)
4. Refresh the page
5. Verify the note is saved

### Test Scenario 4: Role-Based Views
1. Login as different roles (employee, manager, cto)
2. Verify appropriate dashboard content
3. Check that roadmap integrates properly

## 🐛 Troubleshooting

### Issue: Roadmap not loading
**Solution**: 
- Check browser console for errors
- Verify MongoDB connection
- Ensure report exists and belongs to user

### Issue: Progress not saving
**Solution**:
- Check network tab for API errors
- Verify JWT token is valid
- Check MongoDB connection

### Issue: AI not generating 7 days
**Solution**:
- Verify Gemini API key is valid
- Check API rate limits
- Review server logs for errors

### Issue: TypeScript errors in IDE
**Solution**:
- These are expected in development
- Run `npm run lint` to check actual errors
- The app will still run correctly

## 📊 Database Collections

### onboardingreports
Enhanced with new roadmap structure:
```javascript
{
  roadmap: [
    {
      day: 1,
      task: "Environment Setup",
      description: "...",
      files: ["package.json", "README.md"],
      commands: ["npm install"],
      learningObjectives: ["Understand project structure"]
    }
  ]
}
```

### roadmapprogresses (New)
Tracks user progress:
```javascript
{
  userId: ObjectId,
  reportId: ObjectId,
  completedTasks: ["day-1-task-1"],
  currentDay: 1,
  notes: {
    "day-1-task-1": "This was helpful..."
  }
}
```

## 🚀 Production Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Environment Check
Ensure all environment variables are set in production:
- `MONGODB_URI`
- `GEMINI_API_KEY`
- `JWT_SECRET`
- `NODE_ENV=production`

## 📈 Monitoring

### Key Metrics to Track
1. **Roadmap Generation Success Rate**
2. **Average Completion Time**
3. **Task Completion Rates**
4. **User Engagement**
5. **API Response Times**

### Logs to Monitor
- Repository analysis errors
- AI generation failures
- Database connection issues
- Authentication failures

## 🎓 Best Practices

### For Developers
1. Always test with real repositories
2. Verify progress saves correctly
3. Check responsive design on mobile
4. Test with different user roles

### For Users
1. Complete tasks in order
2. Add notes for future reference
3. Review recommended files
4. Ask for help when stuck

## 📞 Support

If you encounter issues:
1. Check the console for errors
2. Review the ROADMAP_FEATURE.md documentation
3. Verify all environment variables
4. Check MongoDB connection
5. Ensure Gemini API key is valid

## ✅ Success Criteria

The feature is working correctly when:
- [ ] Repository analysis generates 7-day roadmap
- [ ] Each day has 3-5 detailed tasks
- [ ] Tasks can be marked complete
- [ ] Progress persists across sessions
- [ ] Notes can be added and saved
- [ ] Progress bar updates correctly
- [ ] UI is responsive on all devices
- [ ] Role-based views work properly

## 🎉 You're All Set!

The Learning Roadmap feature is now fully integrated into your onboarding platform. Start analyzing repositories and watch as AI generates personalized 7-day onboarding plans for your team!

---

**Need Help?** Check ROADMAP_FEATURE.md for detailed documentation.