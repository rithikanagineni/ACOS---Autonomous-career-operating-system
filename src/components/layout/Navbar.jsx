import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, Zap, X, CheckCheck } from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import { useLocation } from 'react-router-dom';

const pageTitles = {
  '/dashboard': { title: 'Mission Control', subtitle: 'Your career command center' },
  '/roadmap': { title: 'Career Roadmap', subtitle: 'Your 6-month journey to AI Engineer' },
  '/skills': { title: 'Skill Assessment', subtitle: 'Know your gaps, close them faster' },
  '/resources': { title: 'Learning Resources', subtitle: 'Curated content for your level' },
  '/projects': { title: 'Project Builder', subtitle: 'Build your portfolio step by step' },
  '/interview': { title: 'Interview Coach', subtitle: 'Practice with AI, ace the real thing' },
  '/resume': { title: 'Resume Builder', subtitle: 'ATS-optimized, auto-updated' },
  '/portfolio': { title: 'Portfolio Generator', subtitle: 'GitHub, LinkedIn, Portfolio — all in one' },
  '/github': { title: 'GitHub Reviewer', subtitle: 'Professional code review by AI' },
  '/finance': { title: 'Financial Advisor', subtitle: 'Free resources & scholarships for you' },
  '/team': { title: 'Team Formation', subtitle: 'Find your dream hackathon team' },
  '/progress': { title: 'Progress Tracker', subtitle: 'Every milestone counts' },
  '/weekly': { title: 'Weekly Report', subtitle: "This week's achievements & goals" },
  '/motivation': { title: 'Motivation Hub', subtitle: 'Stay consistent, stay ahead' },
  '/rewards': { title: 'All Rewards', subtitle: 'Unlock achievements to earn badges' },
};

const notifColor = { success: '#10b981', info: '#6366f1', tip: '#f59e0b', alert: '#ef4444' };
const notifBg = { success: 'rgba(16,185,129,0.1)', info: 'rgba(99,102,241,0.1)', tip: 'rgba(245,158,11,0.1)', alert: 'rgba(239,68,68,0.1)' };

export default function Navbar() {
  const { state, dispatch } = useStudent();
  const location = useLocation();
  const [showNotifs, setShowNotifs] = useState(false);
  const notifRef = useRef(null);

  const pathBase = '/' + location.pathname.split('/')[1];
  const pageInfo = pageTitles[pathBase] || { title: 'ACOS', subtitle: '' };
  const unreadCount = state.notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifs(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleBell = () => {
    setShowNotifs((prev) => !prev);
    if (!showNotifs) {
      // mark all read after 1.5s
      setTimeout(() => dispatch({ type: 'MARK_NOTIFICATIONS_READ' }), 1500);
    }
  };

  return (
    <header style={{
      background: 'rgba(255,255,255,0.8)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(99,102,241,0.1)',
      padding: '0.875rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 30,
    }}>
      <div>
        <h1 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>{pageInfo.title}</h1>
        <p style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 500 }}>{pageInfo.subtitle}</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Streak badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          background: 'rgba(245,158,11,0.1)', borderRadius: '999px',
          padding: '6px 12px', fontSize: '0.78rem', fontWeight: 700, color: '#b45309',
        }}>
          <span>🔥</span> {state.progress.streak} day streak
        </div>

        {/* Readiness badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          background: 'rgba(99,102,241,0.08)', borderRadius: '999px',
          padding: '6px 12px', fontSize: '0.78rem', fontWeight: 700, color: '#6366f1',
        }}>
          <Zap size={13} /> {state.progress.roadmapCompletion}% ready
        </div>

        {/* Bell */}
        <div ref={notifRef} style={{ position: 'relative' }}>
          <button
            onClick={handleBell}
            style={{
              position: 'relative', background: 'rgba(99,102,241,0.08)',
              border: 'none', borderRadius: '10px', padding: '8px',
              cursor: 'pointer', color: '#6366f1', display: 'flex',
              transition: 'background 0.2s',
            }}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute', top: '-4px', right: '-4px',
                background: '#ef4444', color: 'white',
                fontSize: '0.6rem', fontWeight: 800,
                borderRadius: '999px', minWidth: '16px', height: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '0 3px',
              }}>
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifs && (
            <div style={{
              position: 'absolute', top: '44px', right: 0,
              width: '340px', background: 'white',
              borderRadius: '1rem', boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
              border: '1px solid rgba(99,102,241,0.12)',
              zIndex: 100, overflow: 'hidden',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '1rem 1.25rem', borderBottom: '1px solid #f1f5f9',
              }}>
                <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Notifications</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => dispatch({ type: 'MARK_NOTIFICATIONS_READ' })}
                    style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: '#6366f1', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                  >
                    <CheckCheck size={13} /> Mark all read
                  </button>
                  <button
                    onClick={() => setShowNotifs(false)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div style={{ maxHeight: '380px', overflowY: 'auto' }}>
                {state.notifications.length === 0 ? (
                  <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>
                    No notifications yet
                  </div>
                ) : (
                  state.notifications.map((n) => (
                    <div
                      key={n.id}
                      style={{
                        display: 'flex', gap: '0.75rem',
                        padding: '0.875rem 1.25rem',
                        background: n.read ? 'white' : 'rgba(99,102,241,0.03)',
                        borderBottom: '1px solid #f8fafc',
                        transition: 'background 0.2s',
                      }}
                    >
                      <div style={{
                        width: '8px', height: '8px', borderRadius: '50%',
                        background: n.read ? 'transparent' : notifColor[n.type] || '#6366f1',
                        marginTop: '5px', flexShrink: 0,
                      }} />
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '0.8rem', color: '#1e293b', lineHeight: 1.5, marginBottom: '2px' }}>
                          {n.text}
                        </p>
                        <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{n.time}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Avatar */}
        <div style={{
          width: '34px', height: '34px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 800, fontSize: '0.85rem',
        }}>
          {(state.profile?.name?.[0] || 'S').toUpperCase()}
        </div>
      </div>
    </header>
  );
}
