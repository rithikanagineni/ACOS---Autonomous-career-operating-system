import React, { useState } from 'react';
import { PROJECTS } from '../data/mockData';
import { Github, Clock, Tag, ChevronRight, Star, Zap, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';

const levelColors = { Beginner: '#10b981', Intermediate: '#f59e0b', Advanced: '#ef4444' };
const levelBgs = { Beginner: 'rgba(16,185,129,0.08)', Intermediate: 'rgba(245,158,11,0.08)', Advanced: 'rgba(239,68,68,0.08)' };

export default function ProjectBuilder() {
  const { state } = useStudent();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);

  const career = state.profile?.careerMatch || 'AI Engineer';
  const careerProjects = PROJECTS.filter(p => p.careers.includes(career));
  const availableProjects = careerProjects.length ? careerProjects : PROJECTS;
  const filtered = availableProjects.filter(p => filter === 'All' || p.level === filter);
  const recommendedProject = availableProjects[0] || PROJECTS[0];

  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      {/* AI Recommendation banner */}
      <div className="glass-card" style={{ padding: '1.25rem', background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(6,182,212,0.06))', borderColor: 'rgba(16,185,129,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '2rem' }}>🤖</div>
          <div>
            <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>AI Recommends: {recommendedProject.title}</div>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>This project is a strong next step toward your {career} career.</div>
          </div>
          <button onClick={() => navigate(`/project/${recommendedProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`)} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap', marginLeft: 'auto', background: 'linear-gradient(135deg, #10b981, #059669)' }}>
            Start This Project →
          </button>
        </div>
      </div>

      {/* Level filter */}
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        {['All', 'Beginner', 'Intermediate', 'Advanced'].map(l => (
          <button key={l} onClick={() => setFilter(l)} style={{
            padding: '0.5rem 1.25rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
            background: filter === l ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(255,255,255,0.7)',
            color: filter === l ? 'white' : '#64748b',
            border: filter === l ? 'none' : '1.5px solid #e2e8f0'
          }}>{l}</button>
        ))}
        <div style={{ marginLeft: 'auto', fontSize: '0.82rem', color: '#94a3b8', display: 'flex', alignItems: 'center' }}>
          {filtered.length} projects found
        </div>
      </div>

      {/* Projects grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {filtered.map(p => {
          const projectId = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
          const isSubmitted = state.completedProjects.includes(p.title);
          return (
          <div key={p.id} className="glass-card" style={{ padding: '1.5rem', transition: 'all 0.2s', cursor: 'pointer', border: isSubmitted ? '1px solid rgba(16,185,129,0.3)' : selected === p.id ? '2px solid #6366f1' : undefined, background: isSubmitted ? 'rgba(16,185,129,0.03)' : undefined }}
            onClick={() => setSelected(selected === p.id ? null : p.id)}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(99,102,241,0.12)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ fontSize: '2.5rem' }}>{p.emoji}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
                <span style={{
                  padding: '3px 10px', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700,
                  background: levelBgs[p.level], color: levelColors[p.level]
                }}>{p.level}</span>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Star key={i} size={12} color={i < p.difficulty ? '#f59e0b' : '#e2e8f0'} fill={i < p.difficulty ? '#f59e0b' : '#e2e8f0'} />
                  ))}
                </div>
              </div>
            </div>

            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>{p.title}</h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5, marginBottom: '1rem' }}>{p.description}</p>

            {/* Tech stack */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
              {p.tech.map(t => (
                <span key={t} style={{ padding: '2px 8px', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 600, background: 'rgba(99,102,241,0.08)', color: '#6366f1', border: '1px solid rgba(99,102,241,0.15)' }}>
                  {t}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.78rem', color: '#94a3b8', marginBottom: '1rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={13} /> {p.time}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Tag size={13} /> {p.category}</span>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => navigate(`/project/${projectId}`)} className="btn-primary" style={{ flex: 2, padding: '0.6rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', background: isSubmitted ? 'linear-gradient(135deg, #10b981, #059669)' : undefined }}>
                {isSubmitted ? <><CheckCircle size={14} /> View Submitted</> : <><Zap size={14} /> Start Project</>}
              </button>
              <a href={p.github} target="_blank" rel="noopener noreferrer"
                className="btn-secondary" style={{ flex: 1, padding: '0.6rem', fontSize: '0.8rem', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                <Github size={14} /> Template
              </a>
            </div>
          </div>
        );
        })}
      </div>
    </div>
  );
}
