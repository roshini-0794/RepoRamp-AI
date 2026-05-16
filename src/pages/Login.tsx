import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Terminal, Github, ArrowRight, Loader2 } from 'lucide-react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      login(response.data.token, response.data.user);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Visual side */}
      <div className="hidden md:flex bg-[#0c0c0e] p-16 flex-col justify-between text-white relative overflow-hidden border-r border-zinc-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -mr-40 -mt-40"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] -ml-40 -mb-40"></div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-3 text-2xl font-bold tracking-tight">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold italic shadow-lg shadow-indigo-900/20">R</div>
            <span>RepoRamp <span className="text-indigo-400">AI</span></span>
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          <h1 className="text-6xl font-bold leading-tight tracking-tighter">Master any repository <span className="text-indigo-400">in minutes</span>.</h1>
          <p className="text-lg text-zinc-400 max-w-sm leading-relaxed">AI-generated onboarding intelligence, personalized for your specific role in the engineering team.</p>
        </div>

        <div className="relative z-10 flex items-center space-x-4 text-zinc-500">
           <Github size={20} />
           <span className="text-xs font-bold uppercase tracking-widest italic opacity-60 font-mono">INTELLIGENCE V1.0</span>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center p-8 bg-[#09090b]">
        <div className="w-full max-w-md space-y-10">
          <div className="md:hidden flex items-center space-x-2 text-2xl font-bold text-white mb-10">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold italic">R</div>
            <span>RepoRamp <span className="text-indigo-400">AI</span></span>
          </div>
          
          <div>
            <h2 className="text-4xl font-bold text-white tracking-tight">Welcome back</h2>
            <p className="text-zinc-500 mt-3 font-medium">Log in to your workspace to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-950/20 border border-red-900/50 text-red-400 text-sm rounded-xl font-medium">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest pl-1">Identifier</label>
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
              <div className="flex items-center justify-between pl-1">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">SecretKey</label>
              </div>
              <input 
                type="password" 
                required
                className="w-full px-5 py-4 bg-[#18181b] border border-[#27272a] rounded-2xl text-white placeholder-zinc-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-inner shadow-black/10"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              disabled={loading}
              className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 transition-all disabled:opacity-70 shadow-lg shadow-indigo-600/20 mt-4 active:scale-95"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <span>Authenticate</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-zinc-500 text-sm font-medium">
            New to RepoRamp? <Link to="/signup" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors">Apply for access</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
