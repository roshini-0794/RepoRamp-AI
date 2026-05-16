import React from 'react';
import { AlertTriangle, Activity, Zap, Users, ShieldAlert, BarChart3 } from 'lucide-react';
import KnowledgeRiskAnalysis from '../components/KnowledgeRiskAnalysis';

const ManagerDashboard = ({ report }: { report: any }) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      {/* Knowledge Risk Analysis Card */}
      <KnowledgeRiskAnalysis reportId={report._id} variant="manager" />

      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-8 rounded-3xl flex items-center space-x-5">
          <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-400 border border-red-500/20">
            <ShieldAlert size={28} />
          </div>
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-bold mb-1">Risks Detected</p>
            <p className="text-3xl font-bold text-white tracking-tighter">{report.risks.length}</p>
          </div>
        </div>
        <div className="glass-card p-8 rounded-3xl flex items-center space-x-5">
          <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/20">
            <Activity size={28} />
          </div>
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-bold mb-1">Complexity Level</p>
            <p className="text-3xl font-bold text-white tracking-tighter">{report.complexityScore}/10</p>
          </div>
        </div>
        <div className="glass-card p-8 rounded-3xl flex items-center space-x-5">
          <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
            <Users size={28} />
          </div>
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-bold mb-1">Onboarding Time</p>
            <p className="text-3xl font-bold text-white tracking-tighter">{report.complexityScore > 7 ? '7-10 Days' : '3-5 Days'}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Risks/Bottlenecks Card */}
        <div className="glass-card rounded-[2rem] overflow-hidden">
           <div className="bg-[#0c0c0e] p-8 border-b border-[#27272a] flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center tracking-tight">
                <AlertTriangle size={20} className="text-amber-400 mr-3" />
                Onboarding Bottlenecks
              </h2>
              <span className="text-[10px] font-black bg-amber-500/10 text-amber-400 px-3 py-1 rounded-lg tracking-widest uppercase border border-amber-500/20">High Attention</span>
           </div>
           <div className="p-8 space-y-4">
              {Array.isArray(report.risks) && report.risks.map((risk: any, idx: number) => (
                <div key={idx} className="flex items-start space-x-5 p-5 rounded-2xl border border-[#27272a] bg-[#09090b]/50 group hover:border-amber-500/30 transition-all">
                  <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 shadow-[0_0_10px] ${risk.severity === 'high' ? 'bg-red-500 shadow-red-500/50' : 'bg-amber-500 shadow-amber-500/50'}`}></div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-base mb-1 tracking-tight">{risk.area}</h4>
                    <p className="text-sm text-zinc-500 leading-relaxed font-medium">{risk.description}</p>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Productivity Insights */}
        <div className="glass-card rounded-[2rem] overflow-hidden flex flex-col">
           <div className="bg-[#0c0c0e] p-8 border-b border-[#27272a]">
              <h2 className="text-xl font-bold text-white flex items-center tracking-tight">
                <BarChart3 size={20} className="text-indigo-400 mr-3" />
                Team Productivity Impact
              </h2>
           </div>
           <div className="p-8 space-y-8 flex-1">
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                  <span className="text-zinc-500">Knowledge Transfer Threshold</span>
                  <span className="text-white">{(10 - report.complexityScore) * 10}%</span>
                </div>
                <div className="w-full bg-[#09090b] h-3 rounded-full overflow-hidden border border-[#27272a]">
                   <div className="bg-indigo-500 h-full rounded-full shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all duration-1000" style={{ width: `${(10 - report.complexityScore) * 10}%` }}></div>
                </div>
              </div>

              <div className="p-6 bg-indigo-500/5 rounded-2xl border border-indigo-500/20 shadow-inner">
                 <h4 className="text-sm font-bold text-indigo-400 mb-3 flex items-center uppercase tracking-widest">
                   <Zap size={16} className="mr-2" />
                   AI Intelligence Report
                 </h4>
                 <p className="text-sm text-zinc-400 leading-relaxed font-medium italic">
                   {report.complexityScore > 6 
                     ? "CRITICAL: This repository exhibits high cognitive architectural patterns. We recommend a staggered onboarding phase with mandatory code-pair sessions for the first 72 hours of integration."
                     : "STABLE: System modularity is high. Integration overhead is minimal. New developers can focus on feature implementation within Day 4."}
                 </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 mt-auto">
                <div className="bg-[#09090b] p-5 border border-[#27272a] rounded-2xl text-center">
                  <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2">Est. Ramp-up</p>
                  <p className="text-2xl font-bold text-white tracking-tighter">{report.complexityScore * 1.5}h</p>
                </div>
                <div className="bg-[#09090b] p-5 border border-[#27272a] rounded-2xl text-center">
                  <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2">Review Load</p>
                  <p className="text-lg font-bold text-white tracking-tighter">{report.complexityScore > 7 ? 'MAXIMUM' : 'NORMAL'}</p>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
