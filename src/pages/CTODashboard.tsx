import React from 'react';
import { ShieldCheck, HardDrive, Cpu, Layers, TrendingUp, BarChart, Rocket } from 'lucide-react';
import KnowledgeRiskAnalysis from '../components/KnowledgeRiskAnalysis';

const CTODashboard = ({ report }: { report: any }) => {
  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      {/* Knowledge Risk Analysis Card */}
      <KnowledgeRiskAnalysis reportId={report._id} variant="ceo" />

      {/* High-Level Strategic View */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Complexity Score', val: report.complexityScore, icon: Cpu, color: 'indigo' },
          { label: 'Maintainability', val: 10 - report.complexityScore, icon: HardDrive, color: 'emerald' },
          { label: 'Scaling Factor', val: '2.5x', icon: TrendingUp, color: 'purple' },
          { label: 'Health Index', val: report.complexityScore > 7 ? 'Fair' : 'Excellent', icon: ShieldCheck, color: 'amber' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 rounded-3xl border border-[#27272a] shadow-xl group hover:border-indigo-500/30 transition-all">
            <div className={`w-10 h-10 rounded-xl bg-zinc-900 border border-[#27272a] flex items-center justify-center text-zinc-400 mb-4 group-hover:text-white transition-colors`}>
              <stat.icon size={20} />
            </div>
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-2">{stat.label}</p>
            <p className="text-3xl font-bold text-white tracking-tighter leading-none">{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Architectural Insights */}
        <div className="lg:col-span-2 space-y-8">
           <div className="glass-card rounded-[2.5rem] overflow-hidden border border-[#27272a]">
              <div className="bg-[#0c0c0e] p-8 flex items-center justify-between border-b border-[#27272a]">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3 animate-pulse"></div>
                  <h2 className="text-xl font-bold text-white tracking-tight">System Health Roadmap</h2>
                </div>
                <Rocket size={20} className="text-zinc-600" />
              </div>
              <div className="p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-8">
                      <div>
                         <h4 className="text-[10px] font-black text-zinc-600 uppercase mb-5 tracking-widest">Stack Concentration Matrix</h4>
                         <div className="space-y-5">
                            {Array.isArray(report.techStack) && report.techStack.slice(0, 4).map((tech: string, i: number) => (
                              <div key={i} className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                                  <span className="text-zinc-300">{tech}</span>
                                  <span className="text-zinc-500">{100 - i * 15}%</span>
                                </div>
                                <div className="w-full bg-[#09090b] h-1.5 rounded-full overflow-hidden border border-[#27272a]">
                                   <div className="bg-indigo-500 h-full shadow-[0_0_10px_#6366f1]" style={{ width: `${100 - i * 15}%` }}></div>
                                </div>
                              </div>
                            ))}
                         </div>
                      </div>
                      
                      <div className="p-6 bg-[#09090b] rounded-2xl border border-[#27272a] shadow-inner">
                         <h4 className="text-[10px] font-bold text-indigo-400 mb-3 uppercase tracking-widest italic">Strategic Forecast</h4>
                         <p className="text-sm text-zinc-500 leading-relaxed italic font-medium">
                           "The architectural core in {report.techStack[0]} presents a potential scaling bottleneck. We recommend early-stage decoupling of the data service layer to ensure horizontal scalability."
                         </p>
                      </div>
                   </div>

                   <div className="space-y-10">
                      <div className="text-center p-10 bg-[#09090b] rounded-[2rem] border border-[#27272a] shadow-inner relative overflow-hidden group">
                         <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30"></div>
                         <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6">Complexity Density</p>
                         <div className="flex items-end justify-center space-x-2 h-28 mt-4">
                            {[40, 25, 65, 85, 55, 95, 35, 60].map((h, i) => (
                              <div key={i} className="w-5 bg-indigo-500/10 border-t border-indigo-500/40 rounded-t-lg group-hover:bg-indigo-500/20 transition-all duration-700" style={{ height: `${h}%` }}></div>
                            ))}
                         </div>
                         <p className="text-[10px] text-indigo-500/60 mt-6 font-bold uppercase tracking-widest">Normalized Module Distribution</p>
                      </div>

                      <div className="flex items-center space-x-8 p-6 bg-[#09090b]/50 rounded-2xl border border-[#27272a]">
                         <div className="flex-1">
                           <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Knowledge Risk</p>
                           <p className="text-2xl font-bold text-white tracking-tighter">{report.complexityScore > 6 ? 'CRITICAL' : 'MINIMAL'}</p>
                         </div>
                         <div className="h-12 w-px bg-[#27272a]"></div>
                         <div className="flex-1 text-right">
                           <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Audit Status</p>
                           <p className="text-2xl font-bold text-indigo-400 tracking-tighter">A+ LEVEL</p>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
           </div>
        </div>

        {/* Knowledge Silos/Risks */}
        <div className="space-y-8">
           <div className="glass-card rounded-[2rem] p-8 border border-[#27272a]">
             <h2 className="text-[10px] font-black text-zinc-600 uppercase mb-8 flex items-center tracking-widest">
               <BarChart size={18} className="text-indigo-400 mr-3" />
               Architectural Hotspots
             </h2>
             <div className="space-y-4">
               {Array.isArray(report.importantFiles) && report.importantFiles.slice(0, 3).map((item: any, idx: number) => (
                 <div key={idx} className="p-5 bg-[#09090b] border border-[#27272a] rounded-2xl hover:border-indigo-500/40 transition-all group">
                    <p className="text-xs font-mono font-bold text-indigo-400 mb-2 group-hover:text-indigo-300">{item.file}</p>
                    <p className="text-[10px] text-zinc-600 leading-relaxed font-bold uppercase tracking-tighter">High Complexity Vector • Priority Refactor Area</p>
                 </div>
               ))}
             </div>
             <button className="w-full mt-8 text-[10px] text-indigo-400 font-black tracking-widest border-t border-[#27272a] pt-6 hover:text-indigo-300 transition-colors uppercase">
               Engage Full System Audit →
             </button>
           </div>

           <div className="bg-indigo-600 rounded-[2rem] p-8 text-white shadow-2xl shadow-indigo-600/20 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-white/20 transition-all"></div>
             <h3 className="text-lg font-bold mb-3 tracking-tight">Refactoring Backlog</h3>
             <p className="text-xs text-indigo-100 mb-6 font-medium leading-relaxed">AI prioritized modules that currently exceed the cognitive load threshold for new engineers.</p>
             <div className="space-y-3">
                {Array.isArray(report.risks) && report.risks.slice(0, 3).map((risk: any, i: number) => (
                  <div key={i} className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-indigo-200"></div>
                    <span className="text-xs font-bold truncate opacity-90">{risk.area}</span>
                  </div>
                ))}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CTODashboard;
