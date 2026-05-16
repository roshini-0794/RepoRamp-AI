import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
        'User-Agent': 'aistudio-build',
    }
  }
});

export async function analyzeRepo(repoInfo: any) {
  const prompt = `
    Analyze the following GitHub repository and generate a comprehensive onboarding report for new developers.
    
    Repository Name: ${repoInfo.fullName}
    Description: ${repoInfo.description}
    Main Files/Folders: ${JSON.stringify(repoInfo.tree.slice(0, 30))}
    Technologies/Languages: ${repoInfo.languages.join(", ")}
    README Content (snippet): ${repoInfo.readme.substring(0, 2000)}

    Generate the following sections:
    1. Project Overview (concise, 2-3 sentences)
    2. Tech Stack (array of technologies used)
    3. Folder Structure Explanation
    4. Important Entry Points (files and why they matter)
    5. Setup Instructions (summarized from README)
    6. Recommended Reading Order (which files to read first)
    7. Common Developer Workflow
    8. Beginner Tips
    9. **7-Day Learning Roadmap** - This is CRITICAL. Create a detailed day-by-day plan:
       - Day 1: Environment Setup & First Look (clone repo, install dependencies, run dev server, explore file structure)
       - Day 2: Core Architecture Deep Dive (study entry points, understand data flow, review main components)
       - Day 3: Database & API Layer (schema analysis, API routes, data models)
       - Day 4: Frontend Components & UI (component structure, state management, styling)
       - Day 5: Business Logic & Services (core algorithms, service layer, utilities)
       - Day 6: Testing & Quality (test files, debugging, code quality tools)
       - Day 7: Advanced Features & Deployment (advanced patterns, optimization, deployment process)
       
       For EACH day, provide:
       - A clear task title (e.g., "Environment Setup & Repository Exploration")
       - Detailed description (2-3 sentences explaining what to focus on)
       - Specific files to study (actual file paths from the repository)
       - Commands to run (if applicable)
       - Learning objectives (what they should understand by end of day)
       
    10. Important Files Ranking (top 8-10 files with reasons and importance level)
    11. Risky / Confusing Areas Detection (potential pitfalls for beginners)
    12. Complexity Score (1-10, where 10 is most complex)

    Format your response as a JSON object matching this schema:
    {
      "overview": "string",
      "techStack": ["string"],
      "folderStructure": "string or object",
      "entryPoints": [{"file": "string", "description": "string"}],
      "onboardingGuide": "markdown string including sections 5-8",
      "roadmap": [
        {
          "day": number (1-7),
          "task": "string (clear title)",
          "description": "string (detailed 2-3 sentences)",
          "files": ["array of specific file paths to study"],
          "commands": ["array of commands to run"],
          "learningObjectives": ["array of learning goals"]
        }
      ],
      "importantFiles": [{"file": "string", "reason": "string", "importance": "high|medium|low"}],
      "risks": [{"area": "string", "description": "string", "severity": "high|medium|low"}],
      "complexityScore": number
    }
    
    IMPORTANT: The roadmap MUST have exactly 7 days with detailed, actionable tasks for each day.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          overview: { type: Type.STRING },
          techStack: { type: Type.ARRAY, items: { type: Type.STRING } },
          folderStructure: { type: Type.STRING },
          entryPoints: { 
            type: Type.ARRAY, 
            items: { 
              type: Type.OBJECT,
              properties: {
                file: { type: Type.STRING },
                description: { type: Type.STRING }
              }
            } 
          },
          onboardingGuide: { type: Type.STRING },
          roadmap: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.NUMBER },
                task: { type: Type.STRING },
                description: { type: Type.STRING },
                files: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                commands: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                learningObjectives: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              }
            }
          },
          importantFiles: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                file: { type: Type.STRING },
                reason: { type: Type.STRING },
                importance: { type: Type.STRING }
              }
            }
          },
          risks: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                area: { type: Type.STRING },
                description: { type: Type.STRING },
                severity: { type: Type.STRING }
              }
            }
          },
          complexityScore: { type: Type.NUMBER }
        }
      }
    }
  });

  return JSON.parse(response.text);
}
