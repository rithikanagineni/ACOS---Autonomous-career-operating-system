import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { useStudent } from '../context/StudentContext';
import { AlertCircle, TrendingUp } from 'lucide-react';

const targetSkills = { Python: 95, Statistics: 85, 'Machine Learning': 90, 'Deep Learning': 80, SQL: 75, Git: 70, Projects: 90, Communication: 80 };

export default function SkillAssessment() {
  const { state } = useStudent();

  const radarData = Object.entries(state.skills).map(([skill, value]) => ({
    skill, current: value, target: targetSkills[skill] || 80
  }));

  const gaps = Object.entries(targetSkills).map(([skill, target]) => {
    const current = state.skills[skill] || 0;
    const gap = target - current;
    return { skill, current, target, gap, pct: Math.round((current / target) * 100) };
  }).sort((a, b) => b.gap - a.gap);

  const overallGap = Math.round(gaps.reduce((a, g) => a + g.gap, 0) / gaps.length);

  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
        {[
          { label: 'Skill Gap Score', value: `${overallGap}%`, desc: 'Average gap to target', color: '#ef4444' },
          { label: 'Skills Mastered', value: `${gaps.filter(g => g.pct >= 80).length}/${gaps.length}`, desc: 'At 80%+ proficiency', color: '#10b981' },
          { label: 'Weakest Area', value: gaps[0]?.skill || 'N/A', desc: 'Needs most attention', color: '#f59e0b' },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>{s.label}</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{s.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Radar Chart */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>📡 Skill Radar</div>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '1rem' }}>
            <span style={{ color: '#6366f1', fontWeight: 600 }}>● Blue</span> = Current &nbsp; <span style={{ color: '#10b981', fontWeight: 600 }}>● Green</span> = Target
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }} />
              <Radar name="Current" dataKey="current" stroke="#6366f1" fill="#6366f1" fillOpacity={0.25} strokeWidth={2} />
              <Radar name="Target" dataKey="target" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={2} strokeDasharray="5 5" />
              <Tooltip contentStyle={{ background: 'rgba(255,255,255,0.95)', border: '1px solid #e2e8f0', borderRadius: '0.75rem', fontSize: '0.8rem' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Skill bars */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '1.25rem' }}>📊 Skill Gap Breakdown</div>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {gaps.map((g, i) => {
              const color = g.pct >= 80 ? '#10b981' : g.pct >= 50 ? '#f59e0b' : '#ef4444';
              return (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151' }}>{g.skill}</span>
                      {g.gap > 30 && <AlertCircle size={13} color="#ef4444" />}
                    </div>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{g.current}%</span>
                      <span style={{ fontSize: '0.7rem', color: '#cbd5e1' }}>/</span>
                      <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>{g.target}%</span>
                    </div>
                  </div>
                  <div className="progress-bar-track" style={{ height: '8px', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${g.target}%`, background: '#e9fce9', borderRadius: '999px' }} />
                    <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${g.current}%`, background: `linear-gradient(90deg, ${color}, ${color}99)`, borderRadius: '999px' }} />
                  </div>
                  {g.gap > 0 && (
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px' }}>
                      Gap: <span style={{ color, fontWeight: 600 }}>-{g.gap}%</span> · Est. {Math.ceil(g.gap / 10)} weeks to close
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Missing skills alert */}
      <div className="glass-card" style={{ padding: '1.25rem', background: 'linear-gradient(135deg, rgba(239,68,68,0.05), rgba(245,158,11,0.05))' }}>
        <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertCircle size={18} color="#ef4444" /> Critical Skills to Learn Next
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {gaps.filter(g => g.pct < 50).map((g, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '0.6rem 1rem',
              borderRadius: '0.875rem', background: 'white', border: '1.5px solid rgba(239,68,68,0.2)'
            }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>{g.skill}</div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Only {g.current}% proficient</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
