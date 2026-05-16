<<<<<<< HEAD
# RepoRamp AI

RepoRamp AI helps developers and engineering teams understand unfamiliar GitHub repositories faster using AI-generated onboarding intelligence.

## Features

- **AI Repository Analysis**: Deep analysis of repository structure, README, and logic.
- **Onboarding Guides**: comprehensive markdown-based onboarding reports.
- **Learning Roadmaps**: Day-by-day learning tasks for new developers.
- **Role-Based Insights**:
  - **Employee**: Roadmap, guide, and important files ranking.
  - **Manager**: Potential bottlenecks and confusing modules detection.
  - **CTO**: Complexity score and maintainability insights.
- **Modern UI**: Clean enterprise interface with glassmorphic cards and responsive design.

## Architecture

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion.
- **Backend**: Node.js, Express, MongoDB.
- **AI**: Google Gemini API via `@google/genai`.
- **Database**: Mongoose for modeling and persistent storage.

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```env
GEMINI_API_KEY=your_gemini_key
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
GITHUB_TOKEN=your_github_token
```

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```

## API Routes

### Authentication
- `POST /api/auth/signup`: Register a new user.
- `POST /api/auth/login`: Authenticate and receive JWT.

### Repository
- `POST /api/repo/analyze`: Analyze a GitHub URL.
- `GET /api/repo/reports`: Fetch all reports for the current user.
- `GET /api/repo/reports/:id`: Get a specific report detail.

## Deployment

### Frontend (SPA)
Deploy to Vercel or Netlify. Ensure API calls point to your backend.

### Backend (Express)
Deploy to Render, Heroku, or DigitalOcean.

### Database
Use MongoDB Atlas for a managed free-tier database.
=======
# RepoRamp-AI
AI-powered developer onboarding assistant that analyzes GitHub repositories and generates beginner-friendly onboarding guides using repository intelligence.
>>>>>>> 68827256c3143c2f1fdf9020c1635b955a0ca052
