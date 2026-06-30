import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import { ArrowRight, Zap, Target, Map, TrendingUp, CheckCircle, Clock, Trophy, BookOpen, Mic, Star, ChevronRight } from 'lucide-react';

// Today's missions — each links to a course page
const DAILY_MISSIONS = {
  'AI Engineer': [
    { id: 1, title: 'Functions & OOP', subject: 'Python', duration: '45 min', courseId: 'python-functions', icon: '🐍', color: '#6366f1' },
    { id: 2, title: 'Supervised Learning Practice', subject: 'ML', duration: '55 min', courseId: 'ml-linear-regression', icon: '🧠', color: '#06b6d4' },
    { id: 3, title: 'Model Evaluation Quiz', subject: 'ML Theory', duration: '50 min', courseId: 'ml-linear-regression', icon: '📊', color: '#8b5cf6' },
  ],
  'Data Scientist': [
    { id: 1, title: 'Pandas Data Cleanup', subject: 'Python', duration: '50 min', courseId: 'numpy-basics', icon: '🐍', color: '#6366f1' },
    { id: 2, title: 'SQL Analytics Drill', subject: 'SQL', duration: '45 min', courseId: 'sql-analytics', icon: '🧮', color: '#06b6d4' },
    { id: 3, title: 'Visual Storytelling', subject: 'Stats', duration: '55 min', courseId: 'statistics-basics', icon: '📈', color: '#8b5cf6' },
  ],
  'Data Analyst': [
    { id: 1, title: 'Excel Dashboards', subject: 'Analytics', duration: '40 min', courseId: 'excel-dashboards', icon: '📊', color: '#6366f1' },
    { id: 2, title: 'SQL Joins Practice', subject: 'SQL', duration: '50 min', courseId: 'sql-analytics', icon: '🧮', color: '#06b6d4' },
    { id: 3, title: 'Storytelling with Data', subject: 'Reports', duration: '45 min', courseId: 'statistics-basics', icon: '📝', color: '#8b5cf6' },
  ],
  'Full Stack Developer': [
    { id: 1, title: 'React Components', subject: 'Frontend', duration: '45 min', courseId: 'react-components', icon: '⚛️', color: '#6366f1' },
    { id: 2, title: 'Node API Basics', subject: 'Backend', duration: '50 min', courseId: 'node-api', icon: '🧩', color: '#06b6d4' },
    { id: 3, title: 'Deploy a Web App', subject: 'DevOps', duration: '60 min', courseId: 'deploy-web-app', icon: '☁️', color: '#8b5cf6' },
  ],
  'Web Developer': [
    { id: 1, title: 'Responsive Website', subject: 'HTML/CSS', duration: '45 min', courseId: 'html-css-responsive', icon: '🌐', color: '#6366f1' },
    { id: 2, title: 'JavaScript DOM', subject: 'JS', duration: '50 min', courseId: 'javascript-dom', icon: '✨', color: '#06b6d4' },
    { id: 3, title: 'React Basics', subject: 'React', duration: '55 min', courseId: 'react-components', icon: '⚛️', color: '#8b5cf6' },
  ],
  'Backend Developer': [
    { id: 1, title: 'API Design', subject: 'Backend', duration: '50 min', courseId: 'node-api', icon: '🛠️', color: '#6366f1' },
    { id: 2, title: 'Database Modeling', subject: 'SQL', duration: '55 min', courseId: 'sql-analytics', icon: '🗄️', color: '#06b6d4' },
    { id: 3, title: 'Auth & Security', subject: 'Security', duration: '60 min', courseId: 'auth-security', icon: '🔒', color: '#8b5cf6' },
  ],
  'Cybersecurity Analyst': [
    { id: 1, title: 'Network Security Basics', subject: 'Security', duration: '45 min', courseId: 'network-security', icon: '🛡️', color: '#6366f1' },
    { id: 2, title: 'Threat Hunting Drill', subject: 'Cybersecurity', duration: '50 min', courseId: 'threat-hunting', icon: '🔍', color: '#06b6d4' },
    { id: 3, title: 'Security Controls', subject: 'InfoSec', duration: '55 min', courseId: 'security-controls', icon: '🧠', color: '#8b5cf6' },
  ],
  'Cloud Engineer': [
    { id: 1, title: 'Cloud Architecture', subject: 'Cloud', duration: '50 min', courseId: 'cloud-architecture', icon: '☁️', color: '#6366f1' },
    { id: 2, title: 'Docker & Containers', subject: 'DevOps', duration: '55 min', courseId: 'docker-basics', icon: '🐳', color: '#06b6d4' },
    { id: 3, title: 'CI/CD Pipeline', subject: 'Cloud', duration: '60 min', courseId: 'ci-cd-pipeline', icon: '⚙️', color: '#8b5cf6' },
  ],
};

const readinessSkills = [
  { skill: 'Python', value: 75, color: '#6366f1' },
  { skill: 'Machine Learning', value: 30, color: '#8b5cf6' },
  { skill: 'Statistics', value: 35, color: '#06b6d4' },
  { skill: 'SQL', value: 55, color: '#10b981' },
  { skill: 'Deep Learning', value: 15, color: '#f59e0b' },
  { skill: 'Projects', value: 25, color: '#ef4444' },
];

export default function Dashboard() {
  const { state } = useStudent();
  const navigate = useNavigate();
  const [tipIdx, setTipIdx] = useState(0);

  const name = state.profile?.name || 'Future Engineer';
  const career = state.profile?.careerMatch || 'AI Engineer';
  const completion = state.progress.roadmapCompletion;

  const careerTips = {
    'AI Engineer': "💡 Focus on model explainability and system design for AI roles.",
    'Data Scientist': "💡 Tell strong data stories with metrics and insights.",
    'Data Analyst': "💡 Use clear dashboards and SQL skills to show business impact.",
    'Full Stack Developer': "💡 Build one more end-to-end app with auth and deployment.",
    'Web Developer': "💡 Polish your responsive UI and JavaScript fundamentals.",
    'Backend Developer': "💡 Strengthen your APIs, databases, and security patterns.",
    'Cybersecurity Analyst': "💡 Practice incident response and threat analysis case studies.",
    'Cloud Engineer': "💡 Focus on infrastructure automation and cloud cost optimization.",
  };
  const tips = [
    careerTips[career] || "🔥 Start your roadmap analysis to unlock your personalized 6-month plan!",
    "💡 Consistency beats intensity. 90 mins/day compounds massively.",
    "🚀 You're ahead of 72% of learners at your level!",
    "⚡ Complete today's missions to maintain your streak.",
  ];

  const overallReadiness = Math.round(readinessSkills.reduce((a, s) => a + s.value, 0) / readinessSkills.length);

  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      {/* Welcome banner */}
      <div style={{
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)',
        borderRadius: '1.25rem', padding: '1.75rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        boxShadow: '0 8px 32px rgba(99,102,241,0.3)', color: 'white', flexWrap: 'wrap', gap: '1rem'
      }}>
        <div>
          <div style={{ fontSize: '0.85rem', opacity: 0.85, marginBottom: '4px' }}>Welcome back 👋</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900, margin: 0 }}>{name}</h2>
          <div style={{ fontSize: '0.875rem', opacity: 0.85, marginTop: '4px' }}>
            Target: <strong>{career}</strong> • Streak: 🔥 {state.progress.streak} days
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 900 }}>{completion}%</div>
          <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Journey Complete</div>
          <div style={{ marginTop: '0.5rem', background: 'rgba(255,255,255,0.2)', borderRadius: '999px', height: '6px', width: '140px' }}>
            <div style={{ width: `${completion}%`, height: '100%', background: 'white', borderRadius: '999px', transition: 'width 0.5s' }} />
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
        {[
          { label: 'Tasks Completed', value: state.progress.tasksCompleted, icon: '✅', color: '#10b981' },
          { label: 'Courses Finished', value: state.progress.coursesFinished, icon: '📚', color: '#6366f1' },
          { label: 'Projects Built', value: state.progress.projectsBuilt, icon: '🚀', color: '#8b5cf6' },
          { label: 'Study Hours', value: state.progress.totalHours, icon: '⏰', color: '#f59e0b' },
        ].map((s, i) => (
          <div key={i} className="glass-card" style={{ padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem' }}>{s.icon}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 900, color: s.color, marginTop: '4px' }}>{s.value}</div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Today's Mission */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 800, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Target size={18} style={{ color: '#6366f1' }} /> {career} Missions
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{state.completedTasks.filter(t => (DAILY_MISSIONS[career] || DAILY_MISSIONS['AI Engineer']).some(m => m.title === t)).length}/{(DAILY_MISSIONS[career] || DAILY_MISSIONS['AI Engineer']).length} done</span>
          </div>
          <div style={{ display: 'grid', gap: '0.65rem' }}>
            {(DAILY_MISSIONS[career] || DAILY_MISSIONS['AI Engineer']).map((mission) => {
              const isDone = state.completedTasks.includes(mission.title);
              return (
                <div
                  key={mission.id}
                  onClick={() => navigate(`/course/${mission.courseId}`)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.875rem',
                    padding: '0.875rem', borderRadius: '0.875rem', cursor: 'pointer',
                    background: isDone ? 'rgba(16,185,129,0.07)' : 'rgba(255,255,255,0.6)',
                    border: `1px solid ${isDone ? 'rgba(16,185,129,0.25)' : 'rgba(99,102,241,0.12)'}`,
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ fontSize: '1.5rem' }}>{mission.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: isDone ? '#065f46' : '#0f172a', textDecoration: isDone ? 'line-through' : 'none', opacity: isDone ? 0.8 : 1 }}>
                      {mission.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '2px' }}>
                      <span>{mission.subject}</span>
                      <span>•</span>
                      <Clock size={11} />
                      <span>{mission.duration}</span>
                    </div>
                  </div>
                  {isDone
                    ? <CheckCircle size={18} style={{ color: '#10b981', flexShrink: 0 }} />
                    : <ChevronRight size={16} style={{ color: '#94a3b8', flexShrink: 0 }} />
                  }
                </div>
              );
            })}
          </div>
          <button onClick={() => navigate('/roadmap')} style={{ marginTop: '1rem', width: '100%', background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '0.75rem', padding: '0.6rem', color: '#6366f1', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem' }}>
            View Full Roadmap →
          </button>
        </div>

        {/* Job Readiness */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: 800, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Zap size={18} style={{ color: '#f59e0b' }} /> Job Readiness Score
            </h3>
            <div style={{ fontWeight: 900, fontSize: '1.3rem', color: '#6366f1' }}>{overallReadiness}%</div>
          </div>
          <div style={{ display: 'grid', gap: '0.6rem' }}>
            {readinessSkills.map((s, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#475569', marginBottom: '3px', fontWeight: 600 }}>
                  <span>{s.skill}</span>
                  <span>{s.value}%</span>
                </div>
                <div style={{ height: '6px', borderRadius: '999px', background: '#e2e8f0' }}>
                  <div style={{ width: `${s.value}%`, height: '100%', background: s.color, borderRadius: '999px', transition: 'width 0.6s ease' }} />
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => navigate('/skills')} style={{ marginTop: '1rem', width: '100%', background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '0.75rem', padding: '0.6rem', color: '#6366f1', fontWeight: 600, cursor: 'pointer', fontSize: '0.8rem' }}>
            Full Skill Analysis →
          </button>
        </div>
      </div>

      {/* AI Tip */}
      <div className="glass-card" style={{ padding: '1.25rem', background: 'linear-gradient(135deg, rgba(99,102,241,0.06), rgba(139,92,246,0.04))', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ fontSize: '2rem', flexShrink: 0 }}>🤖</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.875rem', marginBottom: '2px' }}>AI Career Coach Tip</div>
          <div style={{ fontSize: '0.82rem', color: '#475569' }}>{tips[tipIdx]}</div>
        </div>
        <button onClick={() => setTipIdx(t => (t + 1) % tips.length)} style={{ background: 'rgba(99,102,241,0.1)', border: 'none', borderRadius: '0.65rem', padding: '8px 12px', color: '#6366f1', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600, flexShrink: 0 }}>
          Next tip
        </button>
      </div>

      {/* Quick Links */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
        {[
          { label: 'Interview Prep', icon: '🎤', path: '/interview', color: '#6366f1' },
          { label: 'Resume Builder', icon: '📄', path: '/resume', color: '#8b5cf6' },
          { label: 'GitHub Review', icon: '💻', path: '/github', color: '#0f172a' },
          { label: 'Find Team', icon: '👥', path: '/team', color: '#06b6d4' },
        ].map((l, i) => (
          <button key={i} onClick={() => navigate(l.path)} style={{
            padding: '1rem', borderRadius: '1rem', border: '1px solid rgba(99,102,241,0.12)',
            background: 'rgba(255,255,255,0.6)', cursor: 'pointer', textAlign: 'center',
            transition: 'all 0.2s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem'
          }}>
            <span style={{ fontSize: '1.5rem' }}>{l.icon}</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155' }}>{l.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
