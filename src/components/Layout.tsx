import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, LogOut, Github, Terminal } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-[#09090b]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0c0c0e] border-r border-[#27272a] flex flex-col hidden md:flex">
        <div className="p-8 pb-10">
          <div className="flex items-center space-x-3 text-white font-bold text-xl tracking-tight">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold italic shadow-lg shadow-indigo-900/20">R</div>
            <span>RepoRamp <span className="text-indigo-400">AI</span></span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <div className="text-[10px] uppercase tracking-widest text-[#52525b] font-bold px-4 mb-4">Main Intelligence</div>
          <Link to="/" className="flex items-center space-x-3 px-4 py-3 bg-[#18181b] text-white border border-[#27272a] rounded-xl font-medium shadow-sm transition-all">
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </Link>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center space-x-3 px-4 py-3 text-[#a1a1aa] hover:text-white transition-colors rounded-xl group">
            <Github size={18} className="group-hover:text-indigo-400" />
            <span>GitHub</span>
          </a>
        </nav>

        <div className="p-6 border-t border-[#27272a]">
          <div className="bg-indigo-600/10 border border-indigo-500/30 rounded-2xl p-4 mb-4">
             <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest leading-relaxed">Current Role</p>
             <p className="text-sm font-bold text-white mt-1 capitalize">{user?.role} Access</p>
          </div>
          
          <div className="flex items-center space-x-3 text-[#a1a1aa] mb-6 px-1">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px]">
               <div className="w-full h-full rounded-full bg-[#0c0c0e] flex items-center justify-center text-white font-bold text-xs uppercase">
                {user?.name.charAt(0)}
               </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="font-bold text-sm text-white truncate">{user?.name}</p>
              <p className="text-[10px] text-[#52525b] font-bold uppercase tracking-tighter truncate">{user?.email}</p>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 text-xs font-bold bg-zinc-800 text-zinc-400 hover:bg-red-950/30 hover:text-red-400 border border-zinc-700 hover:border-red-900/50 transition-all rounded-xl"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto flex flex-col">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-[#0c0c0e] border-b border-[#27272a]">
          <div className="flex items-center space-x-2 text-white font-bold text-lg">
             <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center font-bold italic text-xs">R</div>
             <span>RepoRamp <span className="text-indigo-400">AI</span></span>
          </div>
          <button onClick={handleLogout} className="text-[#a1a1aa]">
            <LogOut size={18} />
          </button>
        </header>

        <div className="p-6 md:p-10 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
