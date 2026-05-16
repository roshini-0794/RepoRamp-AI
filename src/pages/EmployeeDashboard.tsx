import React from 'react';
import ReactMarkdown from 'react-markdown';
import { BookOpen, Map, FileCode, CheckCircle2, ChevronRight, Bookmark } from 'lucide-react';

const EmployeeDashboard = ({ report }: { report: any }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-1000">
      {/* Left Column - Onboarding Guide & Overview */}
      <div className="lg:col-span-2 space-y-8">
        {/* Overview Card */}
        <div className="glass-card rounded-3xl p-8">
           <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400">
                <BookOpen size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">System Overview</h2>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">Core Architecture & Tech Stack</p>
              </div>
           </div>
           <p className="text-zinc-400 leading-relaxed text-lg font-medium">{report.overview}</p>
           
           <div className="mt-8 flex flex-wrap gap-2">
             {Array.isArray(report.techStack) && report.techStack.map((tech: string) => (
               <span key={tech} className="px-4 py-1.5 bg-[#09090b] text-indigo-300 rounded-xl text-xs font-bold border border-[#27272a] shadow-sm">
                 {tech}
               </span>
             ))}
           </div>
        </div>

        {/* Learning Roadmap */}
        <div className="glass-card rounded-3xl p-8">
           <div className="flex items-center space-x-4 mb-10">
              <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400">
                <Map size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Onboarding Roadmap</h2>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">Daily Learning Objectives</p>
              </div>
           </div>

           <div className="space-y-8 relative ml-6">
              <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-indigo-500 via-[#27272a] to-transparent -ml-6"></div>
              {Array.isArray(report.roadmap) && report.roadmap.map((step: any, idx: number) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-6 top-1.5 w-3 h-3 -translate-x-1/2 bg-[#09090b] border-2 border-indigo-500 rounded-full z-10 shadow-[0_0_10px_#6366f1] group-hover:scale-125 transition-transform"></div>
                  <div className="bg-[#09090b]/50 group-hover:bg-indigo-500/5 transition-all p-6 rounded-2xl border border-[#27272a] ml-4 group-hover:border-indigo-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-white text-lg tracking-tight group-hover:text-indigo-400 transition-colors">{step.task}</h4>
                      <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">{step.day}</span>
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed font-medium">{step.description}</p>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Detailed Guide */}
        <div className="glass-card rounded-3xl p-10">
           <div className="flex items-center space-x-4 mb-10 border-b border-[#27272a] pb-8">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400">
                <Bookmark size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Technical Manuscript</h2>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">Deep Dive Integration Guide</p>
              </div>
           </div>
           <div className="markdown-body">
              <ReactMarkdown>{report.onboardingGuide}</ReactMarkdown>
           </div>
        </div>
      </div>

      {/* Right Column - Important Files & Tips */}
      <div className="space-y-8">
        {/* Important Files */}
        <div className="glass-card rounded-3xl p-8">
          <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-8 flex items-center">
            <FileCode size={16} className="text-indigo-400 mr-2" />
            Core Logic Vectors
          </h2>
          <div className="space-y-3">
            {Array.isArray(report.importantFiles) && report.importantFiles.map((item: any, idx: number) => (
              <div key={idx} className="p-4 bg-[#09090b] rounded-2xl border border-[#27272a] hover:border-indigo-500/50 transition-all transition-colors group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/5 px-2 py-1 rounded-lg border border-indigo-500/10 group-hover:border-indigo-500/30">{item.file}</span>
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${item.importance === 'high' ? 'bg-red-500/10 text-red-400' : 'bg-amber-500/10 text-amber-400'}`}>
                    {item.importance}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed font-medium">{item.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-2xl shadow-indigo-600/20 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-white/20 transition-all"></div>
           <h3 className="text-lg font-bold mb-6 flex items-center tracking-tight">
             <CheckCircle2 size={24} className="mr-3" />
             Tactical Advice
           </h3>
           <ul className="space-y-4">
             {[
               "Review system dependencies in package.json",
               "Execute npm run dev to verify environment",
               "Initialize local test runners",
               "Bridge knowledge gaps with AI scan"
             ].map((tip, i) => (
               <li key={i} className="flex items-start space-x-3 text-sm text-indigo-50 font-medium">
                 <ChevronRight size={18} className="shrink-0 opacity-50" />
                 <span>{tip}</span>
               </li>
             ))}
           </ul>
           <button className="w-full mt-10 py-4 bg-white text-indigo-600 font-bold rounded-2xl text-sm shadow-xl shadow-black/10 hover:bg-zinc-100 transition-all">
              Mark Phase Complete
           </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
