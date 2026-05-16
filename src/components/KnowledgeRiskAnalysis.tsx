import React, { useEffect, useState } from 'react';
import { 
  AlertTriangle, 
  Shield, 
  TrendingUp, 
  FileCode, 
  GitBranch, 
  Users, 
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Zap,
  Target,
  Activity
} from 'lucide-react';
import { KnowledgeRiskAnalysis as KnowledgeRiskType } from '../types/knowledgeRisk';

interface KnowledgeRiskAnalysisProps {
  reportId: string;
  variant?: 'manager' | 'ceo';
}

const KnowledgeRiskAnalysis: React.FC<KnowledgeRiskAnalysisProps> = ({ reportId, variant = 'manager' }) => {
  const [analysis, setAnalysis] = useState<KnowledgeRiskType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalysis();
  }, [reportId]);

  const fetchAnalysis = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Try to get existing analysis
      let response = await fetch(`/api/knowledge-risk/report/${reportId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // If not found, generate new analysis
      if (response.status === 404) {
        response = await fetch(`/api/knowledge-risk/analyze/${reportId}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }

      if (!response.ok) {
        throw new Error('Failed to fetch knowledge risk analysis');
      }

      const data = await response.json();
      setAnalysis(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low': return 'emerald';
      case 'medium': return 'amber';
      case 'high': return 'orange';
      case 'critical': return 'red';
      default: return 'zinc';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low': return CheckCircle;
      case 'medium': return AlertCircle;
      case 'high': return AlertTriangle;
      case 'critical': return XCircle;
      default: return Shield;
    }
  };

  if (loading) {
    return (
      <div className="glass-card rounded-[2rem] p-12 text-center">
        <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-zinc-400 font-medium">Analyzing knowledge risk patterns...</p>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="glass-card rounded-[2rem] p-8 border border-red-500/20">
        <div className="flex items-center space-x-3 text-red-400">
          <AlertTriangle size={24} />
          <p className="font-medium">{error || 'Failed to load analysis'}</p>
        </div>
      </div>
    );
  }

  const riskColor = getRiskColor(analysis.riskLevel);
  const RiskIcon = getRiskIcon(analysis.riskLevel);

  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      {/* Header Card */}
      <div className="glass-card rounded-[2rem] overflow-hidden border border-[#27272a]">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2 tracking-tight flex items-center">
                <Shield size={28} className="mr-3" />
                Knowledge Risk Analysis
              </h2>
              <p className="text-indigo-100 text-sm font-medium">
                Bus Factor & Onboarding Complexity Assessment
              </p>
            </div>
            <div className={`px-6 py-3 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30`}>
              <p className="text-xs font-bold text-white uppercase tracking-widest mb-1">Risk Level</p>
              <p className="text-3xl font-bold text-white tracking-tighter">{analysis.riskLevel}</p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8">
          <div className="text-center p-6 bg-[#09090b] rounded-2xl border border-[#27272a]">
            <Users size={24} className="mx-auto mb-3 text-indigo-400" />
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Bus Factor</p>
            <p className="text-4xl font-bold text-white tracking-tighter">{analysis.busFactor}</p>
            <p className="text-[10px] text-zinc-600 mt-2 font-medium">Critical Contributors</p>
          </div>

          <div className="text-center p-6 bg-[#09090b] rounded-2xl border border-[#27272a]">
            <Activity size={24} className="mx-auto mb-3 text-amber-400" />
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Risk Score</p>
            <p className="text-4xl font-bold text-white tracking-tighter">{analysis.overallRiskScore}</p>
            <p className="text-[10px] text-zinc-600 mt-2 font-medium">Out of 100</p>
          </div>

          <div className="text-center p-6 bg-[#09090b] rounded-2xl border border-[#27272a]">
            <Clock size={24} className="mx-auto mb-3 text-emerald-400" />
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Onboarding</p>
            <p className="text-4xl font-bold text-white tracking-tighter">{analysis.onboardingComplexity.estimatedDays}d</p>
            <p className="text-[10px] text-zinc-600 mt-2 font-medium">Estimated Days</p>
          </div>

          <div className="text-center p-6 bg-[#09090b] rounded-2xl border border-[#27272a]">
            <TrendingUp size={24} className="mx-auto mb-3 text-purple-400" />
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Concentration</p>
            <p className="text-4xl font-bold text-white tracking-tighter">{analysis.metrics.knowledgeConcentration}%</p>
            <p className="text-[10px] text-zinc-600 mt-2 font-medium">Knowledge Silos</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Risky Modules */}
        <div className="glass-card rounded-[2rem] overflow-hidden border border-[#27272a]">
          <div className="bg-[#0c0c0e] p-6 border-b border-[#27272a]">
            <h3 className="text-lg font-bold text-white flex items-center tracking-tight">
              <AlertTriangle size={20} className="text-red-400 mr-3" />
              High-Risk Modules
            </h3>
          </div>
          <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
            {analysis.riskyModules.slice(0, 6).map((module, idx) => {
              const moduleColor = getRiskColor(module.riskLevel);
              return (
                <div key={idx} className={`p-5 rounded-2xl border border-${moduleColor}-500/20 bg-${moduleColor}-500/5 hover:border-${moduleColor}-500/40 transition-all group`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-sm mb-1 tracking-tight">{module.module}</h4>
                      <p className="text-xs text-zinc-500 font-mono truncate">{module.path}</p>
                    </div>
                    <span className={`text-xs font-black px-3 py-1 rounded-lg bg-${moduleColor}-500/10 text-${moduleColor}-400 border border-${moduleColor}-500/20 uppercase tracking-wider`}>
                      {module.riskLevel}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-zinc-600 mb-3">
                    <span className="flex items-center">
                      <Users size={12} className="mr-1" /> {module.contributors} dev{module.contributors !== 1 ? 's' : ''}
                    </span>
                    <span className="flex items-center">
                      <GitBranch size={12} className="mr-1" /> {module.dependencies} deps
                    </span>
                    <span className="flex items-center">
                      <Zap size={12} className="mr-1" /> {module.complexity}/10
                    </span>
                  </div>
                  <div className="space-y-1">
                    {module.reasons.slice(0, 2).map((reason, i) => (
                      <p key={i} className="text-xs text-zinc-400 leading-relaxed flex items-start">
                        <span className="text-zinc-600 mr-2">•</span>
                        {reason}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* High Maintenance Areas */}
        <div className="glass-card rounded-[2rem] overflow-hidden border border-[#27272a]">
          <div className="bg-[#0c0c0e] p-6 border-b border-[#27272a]">
            <h3 className="text-lg font-bold text-white flex items-center tracking-tight">
              <Target size={20} className="text-amber-400 mr-3" />
              High Maintenance Areas
            </h3>
          </div>
          <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
            {analysis.highMaintenanceAreas.map((area, idx) => {
              const priorityColor = getRiskColor(area.priority);
              return (
                <div key={idx} className="p-5 rounded-2xl border border-[#27272a] bg-[#09090b]/50 hover:border-amber-500/30 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-white text-sm tracking-tight flex-1">{area.area}</h4>
                    <span className={`text-[10px] font-black px-2 py-1 rounded bg-${priorityColor}-500/10 text-${priorityColor}-400 border border-${priorityColor}-500/20 uppercase tracking-wider`}>
                      {area.priority}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 font-mono mb-3 truncate">{area.path}</p>
                  <div className="mb-3">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
                      <span className="text-zinc-600">Maintenance Score</span>
                      <span className="text-white">{area.maintenanceScore}/100</span>
                    </div>
                    <div className="w-full bg-[#09090b] h-2 rounded-full overflow-hidden border border-[#27272a]">
                      <div 
                        className={`bg-amber-500 h-full rounded-full shadow-[0_0_10px_rgba(245,158,11,0.3)]`}
                        style={{ width: `${area.maintenanceScore}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-xs text-indigo-400 italic font-medium leading-relaxed">
                    💡 {area.recommendation}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dependency Analysis */}
      <div className="glass-card rounded-[2rem] overflow-hidden border border-[#27272a]">
        <div className="bg-[#0c0c0e] p-6 border-b border-[#27272a]">
          <h3 className="text-lg font-bold text-white flex items-center tracking-tight">
            <GitBranch size={20} className="text-purple-400 mr-3" />
            Dependency-Heavy Files
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analysis.dependencyHeavyFiles.slice(0, 6).map((file, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-[#27272a] bg-[#09090b]/50 hover:border-purple-500/30 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <FileCode size={18} className="text-purple-400" />
                  <span className="text-xs font-black px-2 py-1 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase tracking-wider">
                    {file.riskLevel}
                  </span>
                </div>
                <p className="text-xs text-white font-mono mb-3 truncate font-bold">{file.file.split('/').pop()}</p>
                <div className="space-y-2 text-[10px] text-zinc-500 font-medium">
                  <div className="flex justify-between">
                    <span>Total Dependencies:</span>
                    <span className="text-white font-bold">{file.dependencyCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Internal:</span>
                    <span className="text-indigo-400 font-bold">{file.internalDeps}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>External:</span>
                    <span className="text-emerald-400 font-bold">{file.externalDeps}</span>
                  </div>
                </div>
                <p className="text-[10px] text-zinc-600 mt-3 leading-relaxed">{file.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Management Summary - Only for CEO/Manager variant */}
      {variant === 'ceo' && analysis.managementSummary && (
        <div className="glass-card rounded-[2rem] overflow-hidden border border-[#27272a]">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
            <h3 className="text-xl font-bold text-white flex items-center tracking-tight">
              <Shield size={24} className="mr-3" />
              Executive Summary
            </h3>
          </div>
          <div className="p-8 space-y-6">
            <div className="p-6 bg-[#09090b] rounded-2xl border border-[#27272a]">
              <p className="text-sm text-zinc-300 leading-relaxed font-medium italic">
                "{analysis.managementSummary.executiveSummary}"
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-4">Key Findings</h4>
                <div className="space-y-2">
                  {analysis.managementSummary.keyFindings.map((finding, idx) => (
                    <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-[#09090b]/50 border border-[#27272a]">
                      <CheckCircle size={16} className="text-indigo-400 mt-0.5 shrink-0" />
                      <p className="text-xs text-zinc-400 leading-relaxed font-medium">{finding}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-black text-emerald-400 uppercase tracking-widest mb-4">Recommendations</h4>
                <div className="space-y-2">
                  {analysis.managementSummary.recommendations.map((rec, idx) => (
                    <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-[#09090b]/50 border border-[#27272a]">
                      <Target size={16} className="text-emerald-400 mt-0.5 shrink-0" />
                      <p className="text-xs text-zinc-400 leading-relaxed font-medium">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Items */}
            <div>
              <h4 className="text-xs font-black text-amber-400 uppercase tracking-widest mb-4">Priority Action Items</h4>
              <div className="space-y-3">
                {analysis.managementSummary.actionItems.map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl border border-[#27272a] bg-[#09090b]/50 hover:border-amber-500/30 transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm text-white font-bold flex-1">{item.action}</p>
                      <span className={`text-[10px] font-black px-2 py-1 rounded bg-${getRiskColor(item.priority)}-500/10 text-${getRiskColor(item.priority)}-400 border border-${getRiskColor(item.priority)}-500/20 uppercase tracking-wider ml-3`}>
                        {item.priority}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-[10px] text-zinc-500 font-medium">
                      <span>Effort: <span className="text-zinc-400 font-bold">{item.estimatedEffort}</span></span>
                      <span>•</span>
                      <span>Impact: <span className="text-indigo-400 font-bold">{item.impact}</span></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-[#27272a] text-center">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Documentation</p>
          <p className="text-4xl font-bold text-white tracking-tighter mb-2">{analysis.metrics.documentationCoverage}%</p>
          <div className="w-full bg-[#09090b] h-2 rounded-full overflow-hidden border border-[#27272a]">
            <div 
              className="bg-indigo-500 h-full rounded-full"
              style={{ width: `${analysis.metrics.documentationCoverage}%` }}
            ></div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-[#27272a] text-center">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Test Coverage</p>
          <p className="text-4xl font-bold text-white tracking-tighter mb-2">{analysis.metrics.testCoverage}%</p>
          <div className="w-full bg-[#09090b] h-2 rounded-full overflow-hidden border border-[#27272a]">
            <div 
              className="bg-emerald-500 h-full rounded-full"
              style={{ width: `${analysis.metrics.testCoverage}%` }}
            ></div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-[#27272a] text-center">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Technical Debt</p>
          <p className="text-4xl font-bold text-white tracking-tighter mb-2">{analysis.metrics.technicalDebt}%</p>
          <div className="w-full bg-[#09090b] h-2 rounded-full overflow-hidden border border-[#27272a]">
            <div 
              className="bg-amber-500 h-full rounded-full"
              style={{ width: `${analysis.metrics.technicalDebt}%` }}
            ></div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-[#27272a] text-center">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Knowledge Silos</p>
          <p className="text-4xl font-bold text-white tracking-tighter mb-2">{analysis.metrics.knowledgeConcentration}%</p>
          <div className="w-full bg-[#09090b] h-2 rounded-full overflow-hidden border border-[#27272a]">
            <div 
              className="bg-red-500 h-full rounded-full"
              style={{ width: `${analysis.metrics.knowledgeConcentration}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeRiskAnalysis;

// Made with Bob
