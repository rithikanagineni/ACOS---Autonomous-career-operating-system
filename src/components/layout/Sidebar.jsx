import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Map, BarChart2, BookOpen, Wrench, Mic,
  FileText, Globe, Github, DollarSign, Users, TrendingUp,
  Calendar, Heart, Zap, ChevronLeft, ChevronRight, Rocket, LogOut
} from 'lucide-react';
import { useStudent } from '../../context/StudentContext';

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/roadmap', icon: Map, label: 'Career Roadmap' },
  { path: '/skills', icon: BarChart2, label: 'Skill Assessment' },
  { path: '/resources', icon: BookOpen, label: 'Learning Resources' },
  { path: '/projects', icon: Wrench, label: 'Project Builder' },
  { path: '/interview', icon: Mic, label: 'Interview Coach' },
  { path: '/resume', icon: FileText, label: 'Resume Builder' },
  { path: '/portfolio', icon: Globe, label: 'Portfolio Generator' },
  { path: '/github', icon: Github, label: 'GitHub Reviewer' },
  { path: '/finance', icon: DollarSign, label: 'Financial Advisor' },
  { path: '/team', icon: Users, label: 'Team Formation' },
  { path: '/progress', icon: TrendingUp, label: 'Progress Tracker' },
  { path: '/weekly', icon: Calendar, label: 'Weekly Report' },
  { path: '/motivation', icon: Heart, label: 'Motivation Hub' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { state, dispatch } = useStudent();
  const navigate = useNavigate();

  const handleReset = () => {
    dispatch({ type: 'RESET' });
    navigate('/');
  };

  return (
    <aside
      className="fixed left-0 top-0 h-screen z-40 flex flex-col transition-all duration-300"
      style={{
        width: collapsed ? '70px' : '240px',
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(99,102,241,0.12)',
        boxShadow: '4px 0 20px rgba(99,102,241,0.06)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 p-4 pb-3 border-b border-indigo-50">
        <div style={{
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          borderRadius: '10px', padding: '8px', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Rocket size={18} color="white" />
        </div>
        {!collapsed && (
          <div>
            <div style={{ fontWeight: 800, fontSize: '0.9rem', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              ACOS
            </div>
            <div style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 500 }}>Career OS</div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
          style={{
            background: 'rgba(99,102,241,0.08)', border: 'none', borderRadius: '8px',
            padding: '4px', cursor: 'pointer', color: '#6366f1', display: 'flex'
          }}
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Profile mini */}
      {!collapsed && state.profile && (
        <div className="mx-3 mt-3 p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.06))' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>{state.profile.name || 'Student'}</div>
          <div className="badge badge-purple mt-1" style={{ fontSize: '0.7rem' }}>
            {state.profile.careerMatch || 'AI Engineer'}
          </div>
          <div style={{ marginTop: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748b', marginBottom: '3px' }}>
              <span>Journey</span>
              <span>{state.progress.roadmapCompletion}%</span>
            </div>
            <div className="progress-bar-track" style={{ height: '5px' }}>
              <div className="progress-bar-fill" style={{ width: `${state.progress.roadmapCompletion}%` }} />
            </div>
          </div>
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto no-scrollbar p-2 mt-2">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
            title={collapsed ? label : ''}
          >
            <Icon size={18} style={{ flexShrink: 0 }} />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="p-2 border-t border-indigo-50">
        <button
          onClick={handleReset}
          className="sidebar-item w-full"
          style={{ color: '#ef4444' }}
        >
          <LogOut size={18} style={{ flexShrink: 0 }} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
