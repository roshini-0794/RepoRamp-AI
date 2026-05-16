import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import RepoAnalyzer from "./RepoAnalyzer";
import EmployeeDashboard from "./EmployeeDashboard";
import ManagerDashboard from "./ManagerDashboard";
import CTODashboard from "./CTODashboard";
import { Loader2, History, LayoutDashboard } from "lucide-react";

const Dashboards = () => {
  const { user, token } = useAuth();
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  const fetchReports = async () => {
    try {
      const res = await axios.get("/api/repo/reports", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(res.data);
      if (res.data.length > 0 && !selectedReport) {
        setSelectedReport(res.data[0]);
      }
    } catch (err) {
      console.error("Failed to fetch reports", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchReports();
  }, [token]);

  const handleAnalysisComplete = (newReport: any) => {
    setReports([newReport, ...reports]);
    setSelectedReport(newReport);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-indigo-500/10 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-xs">Gathering Intelligence...</p>
      </div>
    );
  }

  return (
    <div className="space-y-16 animate-in fade-in duration-1000">
      {/* Header section with Analysis Input */}
      <section>
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-white tracking-tight">Welcome, {user?.name}</h1>
          <p className="text-zinc-500 mt-2 font-medium">Select a repository to engage analysis or view existing briefings.</p>
        </div>
        <RepoAnalyzer onComplete={handleAnalysisComplete} />
      </section>

      {/* Reports List if any */}
      {reports.length > 0 && (
        <>
          <section className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#27272a] pb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight flex items-center">
                  <LayoutDashboard size={24} className="mr-3 text-indigo-400" />
                  Primary Repository Insight
                </h2>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">Active Tactical Briefing</p>
              </div>
              <div className="flex items-center space-x-4 bg-[#18181b] p-2 rounded-2xl border border-[#27272a]">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest pl-2">VECT:</span>
                <select 
                  className="bg-[#09090b] border border-[#27272a] rounded-xl px-4 py-2 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold min-w-[200px]"
                  value={selectedReport?._id || ""}
                  onChange={(e) => setSelectedReport(reports.find(r => r._id === e.target.value))}
                >
                  {reports.map(r => (
                    <option key={r._id} value={r._id}>{r.owner}/{r.repoName}</option>
                  ))}
                </select>
              </div>
            </div>

            {selectedReport && (
              <div key={selectedReport._id} className="transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
                {user?.role === "employee" && <EmployeeDashboard report={selectedReport} />}
                {user?.role === "manager" && <ManagerDashboard report={selectedReport} />}
                {user?.role === "cto" && <CTODashboard report={selectedReport} />}
              </div>
            )}
          </section>

          {/* Intelligence History Archive */}
          {reports.length > 1 && (
            <section className="space-y-8 pt-8 border-t border-[#27272a]">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-zinc-900 border border-[#27272a] rounded-xl flex items-center justify-center text-zinc-400">
                  <History size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">Intelligence Archive</h2>
                  <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mt-0.5">Historical Analysis Records</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {reports.map((r) => (
                  <button 
                    key={r._id}
                    onClick={() => {
                      setSelectedReport(r);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`p-6 rounded-[2rem] border text-left transition-all group relative overflow-hidden ${
                      selectedReport?._id === r._id 
                      ? 'bg-indigo-600/10 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.1)]' 
                      : 'bg-[#0c0c0e] border-[#27272a] hover:border-indigo-500/50 hover:bg-[#121214]'
                    }`}
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <LayoutDashboard size={40} />
                    </div>
                    <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${
                      selectedReport?._id === r._id ? 'text-indigo-400' : 'text-zinc-600'
                    }`}>
                      {selectedReport?._id === r._id ? 'Current View' : 'Archived Log'}
                    </p>
                    <h4 className="text-white font-bold truncate text-lg tracking-tight mb-1">{r.repoName}</h4>
                    <p className="text-xs text-zinc-500 font-medium truncate">{r.owner}</p>
                    <div className="mt-6 flex items-center justify-between">
                       <span className="text-[9px] font-black text-zinc-600 uppercase tracking-tighter">
                         {new Date(r.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                       </span>
                       <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                         <Loader2 size={12} className={selectedReport?._id === r._id ? 'animate-spin' : ''} />
                       </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {reports.length === 0 && !loading && (
        <div className="text-center py-24 px-6 border-2 border-dashed border-[#27272a] rounded-[3rem] bg-[#0c0c0e]/50 group">
          <div className="w-20 h-20 bg-[#09090b] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl border border-[#27272a] group-hover:border-indigo-500/50 transition-all duration-500">
            <Loader2 className="text-zinc-700 animate-pulse" size={32} />
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">No intelligence found</h3>
          <p className="text-zinc-500 max-w-sm mx-auto mt-3 font-medium leading-relaxed">Initiate a repository scan above to generate your first strategic roadmap and onboarding guides.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboards;
