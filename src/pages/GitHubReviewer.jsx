import React, { useState } from 'react';
import { Github, Search, AlertCircle, CheckCircle, Lightbulb, Folder, FileText, Code2, Star } from 'lucide-react';

const MOCK_REVIEW = {
  username: 'rahulkumar',
  repos: 5,
  overallScore: 68,
  categories: [
    { name: 'Folder Structure', score: 80, status: 'good', feedback: 'Good separation of modules. Consider adding a tests/ directory.' },
    { name: 'README Quality', score: 55, status: 'warn', feedback: 'README exists but missing: Usage section, Screenshots, Installation steps.' },
    { name: 'Code Quality', score: 70, status: 'good', feedback: 'Good variable naming. Add more inline comments for complex logic.' },
    { name: 'Documentation', score: 45, status: 'bad', feedback: 'Docstrings missing in 60% of functions. Add type hints for better readability.' },
    { name: 'Git Practices', score: 75, status: 'good', feedback: 'Consistent commits. Consider using conventional commits format.' },
  ],
  suggestions: [
    'Add requirements.txt or environment.yml to every project',
    'Write unit tests using pytest — even basic ones impress reviewers',
    'Add GitHub Actions CI/CD pipeline for auto-testing',
    'Include a CONTRIBUTING.md for collaborative projects',
    'Pin all dependency versions for reproducibility',
    'Add .gitignore to exclude __pycache__, .env, and notebook checkpoints',
  ],
  topRepo: 'house-price-predictor',
};

export default function GitHubReviewer() {
  const [url, setUrl] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const analyze = () => {
    if (!url?.trim()) return;
    setAnalyzing(true);
    setTimeout(() => { setAnalyzing(false); setResult(MOCK_REVIEW); }, 2000);
  };

  const statusColor = { good: '#10b981', warn: '#f59e0b', bad: '#ef4444' };
  const statusBg = { good: 'rgba(16,185,129,0.08)', warn: 'rgba(245,158,11,0.08)', bad: 'rgba(239,68,68,0.08)' };

  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      {/* Input */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Github size={18} /> AI GitHub Profile Reviewer
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <input className="input-field" placeholder="Paste your GitHub URL or username (e.g., github.com/username)" value={url} onChange={e => setUrl(e.target.value)} style={{ flex: 1 }} />
          <button onClick={analyze} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0.75rem 1.25rem', whiteSpace: 'nowrap' }}>
            <Search size={16} /> {analyzing ? 'Analyzing...' : 'Analyze GitHub'}
          </button>
        </div>
      </div>

      {result && (
        <>
          {/* Overall Score */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
            <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', fontWeight: 900, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {result.overallScore}
              </div>
              <div style={{ fontSize: '1rem', color: '#64748b', fontWeight: 600 }}>GitHub Score / 100</div>
              <div style={{ marginTop: '1rem', color: '#94a3b8', fontSize: '0.82rem' }}>
                @{result.username} · {result.repos} repos · Top: <strong style={{ color: '#6366f1' }}>{result.topRepo}</strong>
              </div>
              <div style={{ marginTop: '1rem' }}>
                <div className="progress-bar-track" style={{ height: '10px' }}>
                  <div className="progress-bar-fill" style={{ width: `${result.overallScore}%` }} />
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
                  {result.overallScore >= 80 ? '🌟 Excellent!' : result.overallScore >= 60 ? '⚡ Good, keep improving' : '🔧 Needs work'}
                </div>
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>📊 Category Scores</div>
              <div style={{ display: 'grid', gap: '0.875rem' }}>
                {result.categories.map((cat, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151' }}>{cat.name}</span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: statusColor[cat.status] }}>{cat.score}/100</span>
                    </div>
                    <div className="progress-bar-track" style={{ height: '7px' }}>
                      <div style={{ width: `${cat.score}%`, height: '100%', background: `linear-gradient(90deg, ${statusColor[cat.status]}, ${statusColor[cat.status]}88)`, borderRadius: '999px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Feedback */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>🔍 Detailed Feedback</div>
              <div style={{ display: 'grid', gap: '0.875rem' }}>
                {result.categories.map((cat, i) => (
                  <div key={i} style={{ padding: '0.875rem', borderRadius: '0.75rem', background: statusBg[cat.status], border: `1.5px solid ${statusColor[cat.status]}22` }}>
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: statusColor[cat.status], marginBottom: '4px' }}>
                      {cat.status === 'good' ? '✅' : cat.status === 'warn' ? '⚠️' : '❌'} {cat.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#374151' }}>{cat.feedback}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lightbulb size={16} color="#f59e0b" /> Action Suggestions
              </div>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                {result.suggestions.map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: '8px', fontSize: '0.82rem', color: '#374151', lineHeight: 1.5 }}>
                    <span style={{ color: '#6366f1', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
