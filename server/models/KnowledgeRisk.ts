import mongoose from "mongoose";

const knowledgeRiskSchema = new mongoose.Schema({
  reportId: { type: mongoose.Schema.Types.ObjectId, ref: "OnboardingReport", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  repoUrl: { type: String, required: true },
  
  // Bus Factor Analysis
  busFactor: { type: Number, default: 1 }, // Number of people who can maintain critical code
  overallRiskScore: { type: Number, default: 0 }, // 0-100
  riskLevel: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
  
  // Risky Modules
  riskyModules: [{
    module: String,
    path: String,
    riskScore: Number, // 0-100
    riskLevel: String, // Low/Medium/High
    reasons: [String],
    contributors: Number,
    complexity: Number,
    dependencies: Number
  }],
  
  // Onboarding Complexity
  onboardingComplexity: {
    score: { type: Number, default: 0 }, // 0-100
    level: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    estimatedDays: { type: Number, default: 5 },
    criticalPaths: [String],
    learningCurve: String
  },
  
  // Dependency Analysis
  dependencyHeavyFiles: [{
    file: String,
    dependencyCount: Number,
    internalDeps: Number,
    externalDeps: Number,
    riskLevel: String,
    impact: String
  }],
  
  // High Maintenance Areas
  highMaintenanceAreas: [{
    area: String,
    path: String,
    maintenanceScore: Number, // 0-100
    issues: [String],
    recommendation: String,
    priority: String // Low/Medium/High/Critical
  }],
  
  // Management Summary
  managementSummary: {
    executiveSummary: String,
    keyFindings: [String],
    recommendations: [String],
    actionItems: [{
      action: String,
      priority: String,
      estimatedEffort: String,
      impact: String
    }],
    riskMitigation: [String]
  },
  
  // Metrics for Charts
  metrics: {
    codeOwnershipDistribution: [{
      area: String,
      percentage: Number
    }],
    knowledgeConcentration: Number, // 0-100 (higher = more concentrated/risky)
    documentationCoverage: Number, // 0-100
    testCoverage: Number, // 0-100
    technicalDebt: Number // 0-100
  },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

knowledgeRiskSchema.index({ reportId: 1 });
knowledgeRiskSchema.index({ userId: 1 });

export const KnowledgeRisk = mongoose.model("KnowledgeRisk", knowledgeRiskSchema);

// Made with Bob
