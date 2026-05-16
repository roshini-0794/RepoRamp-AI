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
    1. Project Overview (concise)
    2. Tech Stack (array of technologies)
    3. Folder Structure Explanation
    4. Important Entry Points (files and why they matter)
    5. Setup Instructions (summarized from README)
    6. Recommended Reading Order (which files to read first)
    7. Common Developer Workflow
    8. Beginner Tips
    9. 4-Day Learning Roadmap (Day 1-4 tasks)
    10. Important Files Ranking (top 5 files with reasons)
    11. Risky / Confusing Areas Detection (potential pitfalls for beginners)
    12. Complexity Score (1-10)

    Format your response as a JSON object matching this schema:
    {
      "overview": "string",
      "techStack": ["string"],
      "folderStructure": "string or object",
      "entryPoints": [{"file": "string", "description": "string"}],
      "onboardingGuide": "markdown string including sections 5-8",
      "roadmap": [{"day": number, "task": "string", "description": "string"}],
      "importantFiles": [{"file": "string", "reason": "string", "importance": "high|medium|low"}],
      "risks": [{"area": "string", "description": "string", "severity": "high|medium|low"}],
      "complexityScore": number
    }
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
                description: { type: Type.STRING }
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
