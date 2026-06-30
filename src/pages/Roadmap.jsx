import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { CAREER_ROADMAPS } from '../data/mockData';
import { CheckCircle, Circle, ChevronDown, ChevronUp, RefreshCw, Zap, Lock, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TASK_TO_COURSE = {
  'Functions & OOP': 'python-functions',
  'List Comprehensions': 'python-functions',
  'Error Handling': 'python-functions',
  'NumPy Basics': 'numpy-basics',
  'Pandas DataFrames': 'numpy-basics',
  'Data Visualization': 'numpy-basics',
  'Descriptive Statistics': 'statistics-basics',
  'Probability Theory': 'statistics-basics',
  'Distributions': 'statistics-basics',
  'Supervised Learning': 'ml-linear-regression',
  'Linear & Logistic Regression': 'ml-linear-regression',
  'Decision Trees': 'ml-linear-regression',
};

function getCourseId(taskName) {
  return TASK_TO_COURSE[taskName] || taskName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function isMonthUnlocked(monthIdx, completedTasks, tasksPerMonth) {
  if (monthIdx === 0) return true;
  const prevMonthTasks = tasksPerMonth[monthIdx - 1];
  const doneCount = prevMonthTasks.filter(t => completedTasks.includes(t)).length;
  return doneCount >= Math.ceil(prevMonthTasks.length * 0.8);
}

export default function Roadmap() {
  const { state, dispatch } = useStudent();
  const navigate = useNavigate();
  const [openMonths, setOpenMonths] = useState({ 0: true });
  const [rerouting, setRerouting] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const career = state.profile?.careerMatch || 'AI Engineer';
  const roadmap = CAREER_ROADMAPS[career] || CAREER_ROADMAPS['AI Engineer'];
  const TASKS_PER_MONTH = roadmap.months.map(m => m.weeks.flatMap(w => w.tasks));

  const completedTasks = state.completedTasks;
  const totalTasks = TASKS_PER_MONTH.flat().length;
  const doneTasks = completedTasks.length;
  const overallPct = Math.round((doneTasks / totalTasks) * 100);

  const toggleMonth = (i) => {
    if (!isMonthUnlocked(i, completedTasks, TASKS_PER_MONTH)) return;
    setOpenMonths(p => ({ ...p, [i]: !p[i] }));
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      dispatch({ type: 'ANALYZE_ROADMAP' });
      setAnalyzing(false);
    }, 2800);
  };

  const handleReroute = () => {
    setRerouting(true);
    dispatch({ type: 'ADD_NOTIFICATION', payload: { text: '🔄 Re-routing your career path based on current progress...', type: 'info' } });
    setTimeout(() => setRerouting(false), 2500);
  };

  if (!state.roadmapAnalyzed) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '1.5rem' }}>
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '500px', width: '100%' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🤖</div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, marginBottom: '0.5rem', color: '#0f172a' }}>
            Analyze Your Profile with AI
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.75rem', lineHeight: 1.6 }}>
            Our AI will analyze your skills, goals, and interests to generate a fully personalized 6-month career roadmap. This only takes a few seconds!
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.75rem', textAlign: 'left' }}>
            {['Profile analyzed: Skills, degree, and target career', 'Roadmap generated: Month-by-month tasks', 'Resources curated: Best courses per topic', 'Progress tracking: Automatic completion detection'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: '#334155' }}>
                <CheckCircle size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
          {analyzing ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '48px', height: '48px', border: '4px solid rgba(99,102,241,0.2)', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              <div style={{ fontWeight: 600, color: '#6366f1' }}>AI is analyzing your profile...</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Generating personalized roadmap</div>
            </div>
          ) : (
            <button onClick={handleAnalyze} className="btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '1rem', padding: '1rem' }}>
              <Brain size={20} /> Analyze with AI
            </button>
          )}
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
        {[
          { label: 'Overall Progress', value: `${overallPct}%`, color: '#6366f1', bg: 'rgba(99,102,241,0.08)' },
          { label: 'Tasks Completed', value: `${doneTasks}/${totalTasks}`, color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
          { label: 'Current Month', value: `Month ${Math.min(6, Math.floor(doneTasks / 8) + 1)}`, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
          { label: 'ETA to Goal', value: `~${6 - Math.floor(doneTasks / 8)} months`, color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)' },
        ].map((s, i) => (
          <div key={i} className="glass-card" style={{ padding: '1rem', background: s.bg, border: `1px solid ${s.color}22`, textAlign: 'center' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 900, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Re-route button */}
      <div className="glass-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0f172a' }}>Struggling or falling behind?</div>
          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>AI will re-route your plan to accommodate your current pace</div>
        </div>
        <button
          onClick={handleReroute}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: rerouting ? 'rgba(245,158,11,0.1)' : 'linear-gradient(135deg, #f59e0b, #d97706)',
            color: rerouting ? '#b45309' : 'white',
            border: 'none', borderRadius: '0.75rem', padding: '0.65rem 1.25rem',
            fontWeight: 700, cursor: 'pointer', fontSize: '0.875rem', transition: 'all 0.3s',
          }}
        >
          <RefreshCw size={16} style={{ animation: rerouting ? 'spin 0.8s linear infinite' : 'none' }} />
          {rerouting ? 'Re-routing...' : 'Re-route My Plan'}
        </button>
      </div>

      {/* Roadmap timeline */}
      <div style={{ display: 'grid', gap: '0.75rem' }}>
        {roadmap.months.map((month, mIdx) => {
          const unlocked = isMonthUnlocked(mIdx, completedTasks, TASKS_PER_MONTH);
          const monthTasks = TASKS_PER_MONTH[mIdx];
          const monthDone = monthTasks.filter(t => completedTasks.includes(t)).length;
          const monthPct = Math.round((monthDone / monthTasks.length) * 100);
          const isOpen = !!openMonths[mIdx];

          return (
            <div key={mIdx} className="glass-card" style={{
              overflow: 'hidden', opacity: unlocked ? 1 : 0.65,
              border: `1px solid ${unlocked ? month.color + '30' : '#e2e8f0'}`,
            }}>
              {/* Month header */}
              <div
                onClick={() => toggleMonth(mIdx)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '1.1rem 1.25rem', cursor: unlocked ? 'pointer' : 'not-allowed',
                  background: isOpen ? `${month.color}08` : 'transparent',
                }}
              >
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                  background: unlocked ? month.color : '#94a3b8',
                  color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 900, fontSize: '0.85rem',
                }}>
                  {unlocked ? month.month : <Lock size={16} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, color: unlocked ? '#0f172a' : '#94a3b8', fontSize: '0.95rem' }}>
                    Month {month.month}: {month.title}
                    {!unlocked && <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', background: '#f1f5f9', color: '#64748b', padding: '2px 8px', borderRadius: '999px' }}>Complete Month {month.month - 1} first</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '4px' }}>
                    <div style={{ flex: 1, height: '4px', borderRadius: '999px', background: '#e2e8f0' }}>
                      <div style={{ width: `${monthPct}%`, height: '100%', background: month.color, borderRadius: '999px', transition: 'width 0.5s' }} />
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', flexShrink: 0, fontWeight: 600 }}>{monthDone}/{monthTasks.length} tasks</span>
                  </div>
                </div>
                {unlocked && (isOpen ? <ChevronUp size={18} style={{ color: '#94a3b8' }} /> : <ChevronDown size={18} style={{ color: '#94a3b8' }} />)}
                {!unlocked && <Lock size={16} style={{ color: '#94a3b8' }} />}
              </div>

              {/* Weeks */}
              {isOpen && unlocked && (
                <div style={{ padding: '0 1.25rem 1.25rem' }}>
                  {month.weeks.map((week, wIdx) => (
                    <div key={wIdx} style={{ marginBottom: '0.875rem' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                        Week {week.week}
                      </div>
                      <div style={{ display: 'grid', gap: '0.4rem' }}>
                        {week.tasks.map((task, tIdx) => {
                          const done = completedTasks.includes(task);
                          const courseId = getCourseId(task);
                          return (
                            <div
                              key={tIdx}
                              onClick={() => navigate(`/course/${courseId}`)}
                              style={{
                                display: 'flex', alignItems: 'center', gap: '0.75rem',
                                padding: '0.65rem 0.875rem', borderRadius: '0.65rem', cursor: 'pointer',
                                background: done ? 'rgba(16,185,129,0.08)' : 'rgba(255,255,255,0.5)',
                                border: `1px solid ${done ? 'rgba(16,185,129,0.25)' : 'rgba(99,102,241,0.1)'}`,
                                transition: 'all 0.2s',
                              }}
                            >
                              {done
                                ? <CheckCircle size={16} style={{ color: '#10b981', flexShrink: 0 }} />
                                : <Circle size={16} style={{ color: '#cbd5e1', flexShrink: 0 }} />
                              }
                              <span style={{ fontSize: '0.85rem', color: done ? '#065f46' : '#334155', fontWeight: done ? 600 : 500, textDecoration: done ? 'line-through' : 'none', flex: 1 }}>
                                {task}
                              </span>
                              <ChevronDown size={14} style={{ color: '#cbd5e1', transform: 'rotate(-90deg)' }} />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
