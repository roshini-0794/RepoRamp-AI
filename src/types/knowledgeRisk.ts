export interface RiskyModule {
  module: string;
  path: string;
  riskScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  reasons: string[];
  contributors: number;
  complexity: number;
  dependencies: number;
}

export interface OnboardingComplexity {
  score: number;
  level: 'Low' | 'Medium' | 'High';
  estimatedDays: number;
  criticalPaths: string[];
  learningCurve: string;
}

export interface DependencyHeavyFile {
  file: string;
  dependencyCount: number;
  internalDeps: number;
  externalDeps: number;
  riskLevel: string;
  impact: string;
}

export interface HighMaintenanceArea {
  area: string;
  path: string;
  maintenanceScore: number;
  issues: string[];
  recommendation: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface ActionItem {
  action: string;
  priority: string;
  estimatedEffort: string;
  impact: string;
}

export interface ManagementSummary {
  executiveSummary: string;
  keyFindings: string[];
  recommendations: string[];
  actionItems: ActionItem[];
  riskMitigation: string[];
}

export interface CodeOwnershipDistribution {
  area: string;
  percentage: number;
}

export interface KnowledgeRiskMetrics {
  codeOwnershipDistribution: CodeOwnershipDistribution[];
  knowledgeConcentration: number;
  documentationCoverage: number;
  testCoverage: number;
  technicalDebt: number;
}

export interface KnowledgeRiskAnalysis {
  _id: string;
  reportId: string;
  userId: string;
  repoUrl: string;
  busFactor: number;
  overallRiskScore: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  riskyModules: RiskyModule[];
  onboardingComplexity: OnboardingComplexity;
  dependencyHeavyFiles: DependencyHeavyFile[];
  highMaintenanceAreas: HighMaintenanceArea[];
  managementSummary: ManagementSummary;
  metrics: KnowledgeRiskMetrics;
  createdAt: string;
  updatedAt: string;
}

// Made with Bob
