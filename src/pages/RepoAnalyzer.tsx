import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Search, Github, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const RepoAnalyzer = ({ onComplete }: { onComplete: (report: any) => void }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { token } = useAuth();

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setLoading(true);
    setError('');
    
    try {
      const res = await axios.post('/api/repo/analyze', { repoUrl: url }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onComplete(res.data);
      setUrl('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to analyze repository. Make sure the URL is correct and public.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card rounded-[2.5rem] p-10 relative overflow-hidden border border-[#27272a] group">
      <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
        <Github size={160} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center space-x-3 mb-8">
           <div className="w-10 h-10 bg-indigo-600/10 border border-indigo-500/30 rounded-xl flex items-center justify-center text-indigo-400">
             <Sparkles size={20} />
           </div>
           <div>
             <h3 className="text-xl font-bold text-white tracking-tight">Initiate Intelligence Scan</h3>
             <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-1">Global Repository Access</p>
           </div>
        </div>

        <form onSubmit={handleAnalyze} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={20} />
            <input 
              type="text"
              placeholder="e.g. facebook/react"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-[#09090b] border border-[#27272a] rounded-[1.25rem] text-white placeholder-zinc-700 focus:ring-2 focus:ring-indigo-500 font-medium transition-all outline-none"
            />
          </div>
          <button 
            disabled={loading || !url}
            className="bg-white hover:bg-zinc-100 text-black font-black uppercase text-xs tracking-widest px-10 py-4 rounded-[1.25rem] flex items-center justify-center space-x-2 transition-all disabled:opacity-30 min-w-[200px] shadow-xl shadow-white/5 active:scale-95"
          >
            {loading ? (
              <>
                 <Loader2 className="animate-spin" size={18} />
                 <span>Analyzing Unit...</span>
              </>
            ) : (
              <>
                <span>Engage Analysis</span>
              </>
            )}
          </button>
        </form>

        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mt-6 p-4 bg-red-950/20 border border-red-900/50 text-red-400 text-xs rounded-2xl flex items-center space-x-3 font-bold"
            >
              <AlertCircle size={18} className="shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex flex-wrap items-center gap-8 border-t border-[#27272a] pt-8">
           <div className="flex items-center space-x-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
             <Sparkles size={14} className="text-indigo-400" /> 
             <span>AI Synthesis</span>
           </div>
           <div className="flex items-center space-x-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
             <Github size={14} className="text-zinc-600" /> 
             <span>Public Access</span>
           </div>
           <div className="flex items-center space-x-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
             <div className="w-3.5 h-3.5 bg-indigo-500/10 border border-indigo-500/30 rounded flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
             </div>
             <span>Verified Vectors</span>
           </div>
        </div>
      </div>
    </div>
  );
};

const Terminal = ({ size, className }: { size: number, className: string }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>;

export default RepoAnalyzer;
