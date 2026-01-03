
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import PracticePage from './pages/PracticePage';
import LibraryPage from './pages/LibraryPage';
import BuilderPage from './pages/BuilderPage';
import ProgressPage from './pages/ProgressPage';
import PatternsPage from './pages/PatternsPage';
import { Guitar, Book, Hammer, BarChart2, Settings, Menu, Dumbbell } from 'lucide-react';

const SidebarItem = ({ to, icon: Icon, label, active }: { to: string, icon: any, label: string, active: boolean }) => (
  <Link to={to} className={`flex items-center px-4 py-3 mb-1 mx-2 rounded-lg transition-all ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'}`}>
    <Icon size={20} className={active ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'} />
    <span className="ml-3 font-medium text-sm">{label}</span>
  </Link>
);

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} flex-none bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300`}>
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
           <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
             <Guitar size={18} className="text-white" />
           </div>
           {sidebarOpen && <span className="font-bold text-lg tracking-tight text-slate-100">FretMaster</span>}
        </div>

        <nav className="flex-1 py-6">
          <SidebarItem to="/" icon={Guitar} label="Practice" active={location.pathname === '/'} />
          <SidebarItem to="/patterns" icon={Dumbbell} label="Patterns Gym" active={location.pathname === '/patterns'} />
          <SidebarItem to="/library" icon={Book} label="Library" active={location.pathname === '/library'} />
          <SidebarItem to="/builder" icon={Hammer} label="Builder" active={location.pathname === '/builder'} />
          <SidebarItem to="/progress" icon={BarChart2} label="Progress" active={location.pathname === '/progress'} />
        </nav>

        <div className="p-4 border-t border-slate-800">
           <SidebarItem to="/settings" icon={Settings} label="Settings" active={location.pathname === '/settings'} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {children}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<PracticePage />} />
          <Route path="/patterns" element={<PatternsPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/builder" element={<BuilderPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/settings" element={<div className="p-8 text-center text-slate-500">Settings Placeholder</div>} />
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default App;
