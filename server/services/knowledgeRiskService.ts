import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

export async function analyzeBusFactor(repoInfo: any, existingReport: any) {
  const prompt = `
    You are an expert software engineering consultant analyzing knowledge risk and bus factor for a development team.
    
    Analyze the following repository data and generate a comprehensive Knowledge Risk Analysis:
    
    Repository: ${repoInfo.fullName}
    Description: ${repoInfo.description}
    Languages: ${repoInfo.languages.join(", ")}
    File Structure: ${JSON.stringify(repoInfo.tree.slice(0, 50))}
    Tech Stack: ${existingReport.techStack.join(", ")}
    Complexity Score: ${existingReport.complexityScore}/10
    Important Files: ${JSON.stringify(existingReport.importantFiles)}
    Known Risks: ${JSON.stringify(existingReport.risks)}
    
    Perform a deep Bus Factor Analysis and generate:
    
    1. **Bus Factor**: Estimate how many developers would need to leave before the project is in serious trouble (typically 1-5)
    
    2. **Overall Risk Score** (0-100): Based on:
       - Code concentration (single points of failure)
       - Documentation quality
       - Complexity distribution
       - Knowledge silos
       - Dependency management
    
    3. **Risk Level**: Low (<30), Medium (30-60), High (60-80), Critical (>80)
    
    4. **Risky Modules** (identify 5-8 critical modules):
       - Module name and path
       - Risk score (0-100)
       - Risk level (Low/Medium/High)
       - Specific reasons (lack of docs, high complexity, single contributor, etc.)
       - Estimated contributors (1-5)
       - Complexity rating (1-10)
       - Number of dependencies
    
    5. **Onboarding Complexity Analysis**:
       - Score (0-100)
       - Level (Low/Medium/High)
       - Estimated days for full productivity (3-30 days)
       - Critical learning paths
       - Learning curve description
    
    6. **Dependency-Heavy Files** (top 6-8 files):
       - File path
       - Total dependency count
       - Internal dependencies
       - External dependencies
       - Risk level
       - Impact description
    
    7. **High Maintenance Areas** (5-7 areas):
       - Area name
       - Path/location
       - Maintenance score (0-100)
       - Specific issues
       - Actionable recommendation
       - Priority (Low/Medium/High/Critical)
    
    8. **Management Summary**:
       - Executive summary (2-3 sentences for C-level)
       - Key findings (3-5 bullet points)
       - Strategic recommendations (3-5 items)
       - Action items with priority, effort, and impact
       - Risk mitigation strategies
    
    9. **Metrics for Visualization**:
       - Code ownership distribution (% breakdown by area)
       - Knowledge concentration score (0-100, higher = more risky)
       - Documentation coverage estimate (0-100)
       - Test coverage estimate (0-100)
       - Technical debt score (0-100)
    
    Be specific, actionable, and enterprise-focused. Use real file paths and module names from the repository.
    
    Format as JSON matching the schema below.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          busFactor: { type: Type.NUMBER },
          overallRiskScore: { type: Type.NUMBER },
          riskLevel: { type: Type.STRING },
          riskyModules: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                module: { type: Type.STRING },
                path: { type: Type.STRING },
                riskScore: { type: Type.NUMBER },
                riskLevel: { type: Type.STRING },
                reasons: { type: Type.ARRAY, items: { type: Type.STRING } },
                contributors: { type: Type.NUMBER },
                complexity: { type: Type.NUMBER },
                dependencies: { type: Type.NUMBER }
              }
            }
          },
          onboardingComplexity: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              level: { type: Type.STRING },
              estimatedDays: { type: Type.NUMBER },
              criticalPaths: { type: Type.ARRAY, items: { type: Type.STRING } },
              learningCurve: { type: Type.STRING }
            }
          },
          dependencyHeavyFiles: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                file: { type: Type.STRING },
                dependencyCount: { type: Type.NUMBER },
                internalDeps: { type: Type.NUMBER },
                externalDeps: { type: Type.NUMBER },
                riskLevel: { type: Type.STRING },
                impact: { type: Type.STRING }
              }
            }
          },
          highMaintenanceAreas: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                area: { type: Type.STRING },
                path: { type: Type.STRING },
                maintenanceScore: { type: Type.NUMBER },
                issues: { type: Type.ARRAY, items: { type: Type.STRING } },
                recommendation: { type: Type.STRING },
                priority: { type: Type.STRING }
              }
            }
          },
          managementSummary: {
            type: Type.OBJECT,
            properties: {
              executiveSummary: { type: Type.STRING },
              keyFindings: { type: Type.ARRAY, items: { type: Type.STRING } },
              recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
              actionItems: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    action: { type: Type.STRING },
                    priority: { type: Type.STRING },
                    estimatedEffort: { type: Type.STRING },
                    impact: { type: Type.STRING }
                  }
                }
              },
              riskMitigation: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          },
          metrics: {
            type: Type.OBJECT,
            properties: {
              codeOwnershipDistribution: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    area: { type: Type.STRING },
                    percentage: { type: Type.NUMBER }
                  }
                }
              },
              knowledgeConcentration: { type: Type.NUMBER },
              documentationCoverage: { type: Type.NUMBER },
              testCoverage: { type: Type.NUMBER },
              technicalDebt: { type: Type.NUMBER }
            }
          }
        }
      }
    }
  });

  return JSON.parse(response.text);
}

// Made with Bob
