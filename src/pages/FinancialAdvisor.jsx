import React, { useState } from 'react';
import { SCHOLARSHIPS } from '../data/mockData';
import { ExternalLink, DollarSign, BookOpen, Award, Globe, Filter } from 'lucide-react';

const FREE_RESOURCES = [
  { name: 'freeCodeCamp', desc: '3000+ hours of free coding curriculum', url: 'https://freecodecamp.org', emoji: '🆓', category: 'Learning' },
  { name: 'Kaggle Learn', desc: 'Free hands-on ML/Data Science courses', url: 'https://kaggle.com/learn', emoji: '📊', category: 'Learning' },
  { name: 'CS50 Harvard', desc: 'World\'s most popular CS intro course, free', url: 'https://cs50.harvard.edu', emoji: '🎓', category: 'Learning' },
  { name: 'Google Colab', desc: 'Free GPU for ML training (no setup)', url: 'https://colab.research.google.com', emoji: '☁️', category: 'Tools' },
  { name: 'HuggingFace', desc: 'Free model hosting, datasets & notebooks', url: 'https://huggingface.co', emoji: '🤗', category: 'Tools' },
  { name: 'GitHub Student Pack', desc: '$200k+ in free developer tools for students', url: 'https://education.github.com', emoji: '🐙', category: 'Tools' },
  { name: 'AWS Free Tier', desc: '12 months of AWS services free', url: 'https://aws.amazon.com/free', emoji: '☁️', category: 'Cloud' },
  { name: 'NPTEL', desc: 'IIT/IISc courses in Hindi & English, free', url: 'https://nptel.ac.in', emoji: '🏛️', category: 'Learning' },
];

const GOVT_PROGRAMS = [
  { name: 'PMKVY 4.0', desc: 'Pradhan Mantri Kaushal Vikas Yojana — Free skill training + certification', deadline: 'Rolling', emoji: '🏛️' },
  { name: 'NSDC Digital Skills', desc: 'National Skill Development Corp — free digital courses', deadline: 'Rolling', emoji: '💻' },
  { name: 'Digital India', desc: 'Free cybersecurity and AI courses from Govt of India', deadline: 'Rolling', emoji: '🇮🇳' },
  { name: 'AICTE NEAT', desc: 'National Educational Alliance for Technology — discounted courses', deadline: 'Semester wise', emoji: '📚' },
];

export default function FinancialAdvisor() {
  const [tab, setTab] = useState('free');

  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      {/* Header */}
      <div className="glass-card" style={{ padding: '1.25rem', background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(6,182,212,0.06))' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '2.5rem' }}>💰</div>
          <div>
            <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '1rem' }}>AI Financial Advisor</div>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Scholarships, free resources & government programs curated for first-generation learners</div>
          </div>
          <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
            <div style={{ fontWeight: 800, fontSize: '1.5rem', color: '#10b981' }}>₹2.4L+</div>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Available scholarships</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.75rem', borderBottom: '1px solid rgba(99,102,241,0.1)', paddingBottom: '0' }}>
        {[
          { id: 'free', label: '🆓 Free Resources', count: FREE_RESOURCES.length },
          { id: 'scholarships', label: '🎓 Scholarships', count: SCHOLARSHIPS.length },
          { id: 'govt', label: '🏛️ Govt Programs', count: GOVT_PROGRAMS.length },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: '0.6rem 1.25rem', borderRadius: '0.75rem 0.75rem 0 0', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
            background: tab === t.id ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
            color: tab === t.id ? 'white' : '#64748b', border: 'none'
          }}>
            {t.label} <span style={{ fontSize: '0.72rem', opacity: 0.8 }}>({t.count})</span>
          </button>
        ))}
      </div>

      {/* Free Resources */}
      {tab === 'free' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {FREE_RESOURCES.map((r, i) => (
            <div key={i} className="glass-card" style={{ padding: '1.25rem', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '2rem' }}>{r.emoji}</div>
                <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>{r.category}</span>
              </div>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>{r.name}</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1rem', lineHeight: 1.5 }}>{r.desc}</div>
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="btn-primary"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', fontSize: '0.8rem', padding: '0.5rem', textDecoration: 'none', background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                Access Free <ExternalLink size={12} />
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Scholarships */}
      {tab === 'scholarships' && (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {SCHOLARSHIPS.map((s, i) => (
            <div key={i} className="glass-card" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ fontSize: '2rem', flexShrink: 0 }}>{s.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: '#0f172a' }}>{s.name}</div>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '6px' }}>{s.org}</div>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <span className="badge badge-green">{s.amount}</span>
                  <span className="badge badge-blue">{s.eligibility}</span>
                  <span className="badge badge-amber">Deadline: {s.deadline}</span>
                </div>
              </div>
              <a href={s.link} target="_blank" rel="noopener noreferrer" className="btn-primary"
                style={{ padding: '0.6rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
                Apply Now <ExternalLink size={12} />
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Govt Programs */}
      {tab === 'govt' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {GOVT_PROGRAMS.map((p, i) => (
            <div key={i} className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{p.emoji}</div>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>{p.name}</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5, marginBottom: '0.75rem' }}>{p.desc}</div>
              <div className="badge badge-purple">Enrollment: {p.deadline}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
