import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Terminal, Github, ArrowRight, Loader2, User, Briefcase, ShieldCheck } from 'lucide-react';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/auth/signup', { name, email, password, role });
      login(response.data.token, response.data.user);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Visual side */}
      <div className="hidden md:flex bg-[#0c0c0e] p-16 flex-col justify-between text-white relative overflow-hidden border-r border-zinc-800">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] -ml-20 -mt-20"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] -mr-20 -mb-20"></div>
        
        <div className="relative z-10">
          <Link to="/" className="flex items-center space-x-3 text-2xl font-bold tracking-tight">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold italic shadow-lg shadow-indigo-900/20">R</div>
            <span>RepoRamp <span className="text-indigo-400">AI</span></span>
          </Link>
        </div>

        <div className="relative z-10 space-y-6">
          <h1 className="text-6xl font-bold leading-tight tracking-tighter">Empower your <span className="text-indigo-400">engineers</span>.</h1>
          <p className="text-lg text-zinc-400 max-w-sm leading-relaxed">Join high-performance teams using AI to bridge the knowledge gap and boost deployment speed.</p>
        </div>

        <div className="relative z-10">
          <div className="flex -space-x-3">
            {[1,2,3,4].map(i => (
              <div key={i} className="w-12 h-12 rounded-full border-4 border-[#0c0c0e] bg-zinc-800 flex items-center justify-center shadow-lg">
                <User size={20} className="text-zinc-500" />
              </div>
            ))}
            <div className="w-12 h-12 rounded-full border-4 border-[#0c0c0e] bg-indigo-600 flex items-center justify-center text-xs text-white font-bold shadow-lg">+120</div>
          </div>
          <p className="mt-4 text-xs font-bold text-zinc-500 uppercase tracking-widest italic opacity-60">Scaling engineering intelligence</p>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center p-8 bg-[#09090b] overflow-y-auto">
        <div className="w-full max-w-md space-y-10 py-10">
          <div>
            <h2 className="text-4xl font-bold text-white tracking-tight">Register</h2>
            <p className="text-zinc-500 mt-3 font-medium">Get started with AI-driven repository analysis</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-950/20 border border-red-900/50 text-red-400 text-sm rounded-xl font-medium text-center">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">Full Name</label>
              <input 
                type="text" 
                required
                className="w-full px-5 py-4 bg-[#18181b] border border-[#27272a] rounded-2xl text-white placeholder-zinc-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-inner shadow-black/10"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">Email Address</label>
              <input 
                type="email" 
                required
                className="w-full px-5 py-4 bg-[#18181b] border border-[#27272a] rounded-2xl text-white placeholder-zinc-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-inner shadow-black/10"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">SecretKey</label>
              <input 
                type="password" 
                required
                className="w-full px-5 py-4 bg-[#18181b] border border-[#27272a] rounded-2xl text-white placeholder-zinc-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-inner shadow-black/10"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">Account Role</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('employee')}
                  className={`p-4 border rounded-2xl flex flex-col items-center justify-center space-y-2 transition-all ${role === 'employee' ? 'bg-indigo-600/10 border-indigo-500 text-white shadow-lg shadow-indigo-900/10' : 'bg-[#18181b] border-[#27272a] text-zinc-500 hover:border-zinc-700'}`}
                >
                  <User size={20} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Dev</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('manager')}
                  className={`p-4 border rounded-2xl flex flex-col items-center justify-center space-y-2 transition-all ${role === 'manager' ? 'bg-indigo-600/10 border-indigo-500 text-white shadow-lg shadow-indigo-900/10' : 'bg-[#18181b] border-[#27272a] text-zinc-500 hover:border-zinc-700'}`}
                >
                  <Briefcase size={20} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Lead</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('cto')}
                  className={`p-4 border rounded-2xl flex flex-col items-center justify-center space-y-2 transition-all ${role === 'cto' ? 'bg-indigo-600/10 border-indigo-500 text-white shadow-lg shadow-indigo-900/10' : 'bg-[#18181b] border-[#27272a] text-zinc-500 hover:border-zinc-700'}`}
                >
                  <ShieldCheck size={20} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">CTO</span>
                </button>
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all disabled:opacity-70 shadow-lg shadow-indigo-600/20 active:scale-95"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-zinc-500 text-sm font-medium">
            Already registered? <Link to="/login" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
