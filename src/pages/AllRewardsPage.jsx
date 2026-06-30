import React from 'react';
import { useStudent } from '../context/StudentContext';
import { Trophy, ArrowLeft, Lock, Award, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ALL_REWARDS = [
  { id: 'First Step', name: 'First Step', desc: 'Completed the onboarding setup.', detail: 'Automatically unlocked when you create your account and complete profiling.', icon: '👣', category: 'onboarding' },
  { id: '7-Day Streak', name: '7-Day Streak', desc: 'Maintain study habit for 7 consecutive days.', detail: 'Unlocked by logging in and completing daily tasks 7 days in a row.', icon: '🔥', category: 'streaks' },
  { id: 'Profile Complete', name: 'Profile Complete', desc: 'Verify all profile criteria is active.', detail: 'Fill out your degree, target career, skills, and timing options.', icon: '✅', category: 'onboarding' },
  { id: 'First Task', name: 'First Task', desc: 'Successfully finish 1 study task quiz.', detail: 'Read any study course or topic module and pass the final evaluation quiz.', icon: '📖', category: 'roadmap' },
  { id: '5 Tasks Done', name: '5 Tasks Done', desc: 'Successfully finish 5 study task quizzes.', detail: 'Pass 5 different course modules with a score of 60% or higher.', icon: '📚', category: 'roadmap' },
  { id: '10 Tasks Done', name: '10 Tasks Done', desc: 'Successfully finish 10 study task quizzes.', detail: 'Pass 10 course modules across the target months of your roadmap.', icon: '⚡', category: 'roadmap' },
  { id: 'First Project', name: 'First Project', desc: 'Complete and submit one ML/AI project.', detail: 'Finish all steps of a template project in Project Builder and submit the GitHub repository.', icon: '🏗️', category: 'projects' },
  { id: 'Interview Ready', name: 'Interview Ready', desc: 'Clear the AI Mock Interview evaluation.', detail: 'Achieve an average fit score of 70% or higher during a live HR Coach simulation.', icon: '🎙️', category: 'interviews' },
];

export default function AllRewardsPage() {
  const { state } = useStudent();
  const navigate = useNavigate();

  const earnedBadges = state.badges;
  const progressPct = Math.round((earnedBadges.length / ALL_REWARDS.length) * 100);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gap: '1.5rem' }}>
      <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', fontWeight: 600, fontSize: '0.9rem', width: 'fit-content' }}>
        <ArrowLeft size={18} /> Back
      </button>

      {/* Progress header */}
      <div className="glass-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.04))' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: '#f59e0b', color: 'white', padding: '8px', borderRadius: '12px' }}>
              <Trophy size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>All Achievements & Badges</h2>
              <p style={{ fontSize: '0.8rem', color: '#64748b' }}>Unlocked {earnedBadges.length} out of {ALL_REWARDS.length} rewards</p>
            </div>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#f59e0b' }}>{progressPct}%</div>
        </div>
        <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '999px', overflow: 'hidden' }}>
          <div style={{ width: `${progressPct}%`, height: '100%', background: 'linear-gradient(90deg, #f59e0b, #d97706)', borderRadius: '999px', transition: 'width 0.4s' }} />
        </div>
      </div>

      {/* Grid listing all achievements */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {ALL_REWARDS.map((reward) => {
          const isEarned = earnedBadges.includes(reward.id);
          return (
            <div
              key={reward.id}
              className="glass-card"
              style={{
                padding: '1.25rem', display: 'flex', gap: '1rem',
                opacity: isEarned ? 1 : 0.7,
                border: isEarned ? '1px solid rgba(16,185,129,0.25)' : '1px solid rgba(99,102,241,0.1)',
                background: isEarned ? 'rgba(16,185,129,0.02)' : 'rgba(255,255,255,0.5)',
                position: 'relative'
              }}
            >
              <div style={{
                width: '48px', height: '48px', borderRadius: '14px', flexShrink: 0,
                background: isEarned ? 'linear-gradient(135deg, #10b981, #059669)' : '#e2e8f0',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem',
                color: 'white', boxShadow: isEarned ? '0 8px 20px rgba(16,185,129,0.2)' : 'none'
              }}>
                {isEarned ? reward.icon : <Lock size={20} style={{ color: '#94a3b8' }} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                  <span style={{ fontWeight: 800, fontSize: '0.9rem', color: isEarned ? '#0f172a' : '#64748b' }}>{reward.name}</span>
                  {isEarned ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.7rem', color: '#10b981', fontWeight: 700 }}>
                      <CheckCircle2 size={12} /> Unlocked
                    </span>
                  ) : (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.7rem', color: '#94a3b8', fontWeight: 700 }}>
                      Locked
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '0.78rem', color: '#475569', marginBottom: '4px', lineHeight: 1.4 }}>{reward.desc}</p>
                <div style={{ borderTop: '1px dashed #cbd5e1', paddingTop: '4px', marginTop: '6px', fontSize: '0.7rem', color: '#64748b' }}>
                  <strong>How to earn:</strong> {reward.detail}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
