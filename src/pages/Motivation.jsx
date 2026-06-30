import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { Sparkles, Trophy, Flame, Lock, Unlock, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOTIVATIONS = [
  "Consistency beats intensity. 90 minutes of study every day compounds into massive gains over 6 months! 🚀",
  "Every great developer started exactly where you are now. Trust the process and keep building. 💻",
  "Don't worry about being perfect. Worry about being better than you were yesterday. 📈",
  "First-generation learners bring unique grit and perspectives. You are fully capable of achieving your dreams. 🌟"
];

const ALL_REWARDS_LIST = [
  { id: 'First Step', name: 'First Step', desc: 'Completed onboarding profiling', icon: '👣' },
  { id: '7-Day Streak', name: '7-Day Streak', desc: 'Maintain study habit for a week', icon: '🔥' },
  { id: 'Profile Complete', name: 'Profile Complete', desc: 'All student parameters filled', icon: '✅' },
  { id: 'First Task', name: 'First Task', desc: 'Complete 1 roadmap task quiz', icon: '📖' },
  { id: '5 Tasks Done', name: '5 Tasks Done', desc: 'Complete 5 roadmap task quizzes', icon: '📚' },
  { id: '10 Tasks Done', name: '10 Tasks Done', desc: 'Complete 10 roadmap task quizzes', icon: '⚡' },
  { id: 'First Project', name: 'First Project', desc: 'Submit a project in Project Builder', icon: '🏗️' },
  { id: 'Interview Ready', name: 'Interview Ready', desc: 'Score 70%+ in Live HR Interview', icon: '🎙️' },
];

export default function Motivation() {
  const { state } = useStudent();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const getNewQuote = () => {
    setIndex((index + 1) % MOTIVATIONS.length);
  };

  return (
    <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '800px' }}>
      
      {/* Motivation quotes card */}
      <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(6,182,212,0.06))' }}>
        <Sparkles size={48} style={{ color: '#6366f1', margin: '0 auto 1rem' }} />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Daily Motivation</h2>
        <p style={{ fontSize: '1.1rem', color: '#1e293b', lineHeight: 1.6, fontStyle: 'italic', marginBottom: '1.5rem' }}>
          "{MOTIVATIONS[index]}"
        </p>
        <button onClick={getNewQuote} className="btn-primary">
          Another Quote
        </button>
      </div>

      {/* Streak and Badges summary */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <Flame size={36} style={{ color: '#ef4444' }} />
          <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{state.progress.streak} Days</div>
          <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>Current Study Streak</div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <Trophy size={36} style={{ color: '#f59e0b' }} />
          <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{state.badges.length} Badges</div>
          <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>Earned Achievements</div>
        </div>
      </div>

      {/* Dynamic Badges grid */}
      <div className="glass-card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontWeight: 700, fontSize: '0.95rem' }}>Earned Badges</h3>
          <button
            onClick={() => navigate('/rewards')}
            style={{
              background: 'rgba(99,102,241,0.06)', color: '#6366f1', border: '1px solid rgba(99,102,241,0.15)',
              borderRadius: '8px', padding: '6px 12px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: '4px'
            }}
          >
            <Eye size={14} /> View All Rewards
          </button>
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {ALL_REWARDS_LIST.map((reward) => {
            const isEarned = state.badges.includes(reward.id);
            return (
              <div
                key={reward.id}
                style={{
                  background: isEarned ? 'rgba(99, 102, 241, 0.08)' : 'rgba(241, 245, 249, 0.6)',
                  border: `1px solid ${isEarned ? 'rgba(99, 102, 241, 0.2)' : '#e2e8f0'}`,
                  padding: '10px 16px', borderRadius: '0.75rem', fontSize: '0.82rem', fontWeight: 600,
                  color: isEarned ? '#6366f1' : '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.5rem',
                  opacity: isEarned ? 1 : 0.6, cursor: 'default'
                }}
                title={reward.desc}
              >
                <span style={{ fontSize: '1.1rem' }}>{isEarned ? reward.icon : '🔒'}</span>
                <span>{reward.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
