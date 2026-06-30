import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Target, Map, BarChart2, Mic, TrendingUp, Star, Zap, Users, Shield, Globe } from 'lucide-react';

const features = [
  { icon: Map, title: 'Career GPS', desc: 'Get a personalized 6-month roadmap from where you are to your dream job', color: '#6366f1', bg: 'rgba(99,102,241,0.08)' },
  { icon: BarChart2, title: 'Skill Gap Analysis', desc: 'The platform identifies exactly what skills you\'re missing with visual radar charts', color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)' },
  { icon: Target, title: 'Daily Missions', desc: 'Bite-sized actionable tasks every day — no overwhelm, just progress', color: '#06b6d4', bg: 'rgba(6,182,212,0.08)' },
  { icon: Mic, title: 'Interview Coach', desc: 'Realistic mock interviews with instant scoring and feedback', color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
  { icon: TrendingUp, title: 'Progress Tracking', desc: 'Visual dashboard showing every milestone, streak, and achievement', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
  { icon: Shield, title: 'Job Readiness Score', desc: 'Know exactly how ready you are before applying — with % per skill', color: '#ef4444', bg: 'rgba(239,68,68,0.08)' },
  { icon: Users, title: 'Team Formation', desc: 'Find perfect hackathon teammates based on complementary skills', color: '#0ea5e9', bg: 'rgba(14,165,233,0.08)' },
  { icon: Globe, title: 'Portfolio Generator', desc: 'Auto-generates GitHub README, LinkedIn profile & portfolio website', color: '#84cc16', bg: 'rgba(132,204,22,0.08)' },
];

const stats = [
  { value: '50,000+', label: 'Students Guided' },
  { value: '89%', label: 'Got Jobs' },
  { value: '6 months', label: 'Average Time to Job' },
  { value: '4.9★', label: 'Student Rating' },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #eef2ff 0%, #faf5ff 30%, #ecfdf5 60%, #fff7ed 100%)', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Navbar */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(99,102,241,0.1)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '12px', padding: '8px', display: 'flex' }}>
            <Rocket size={22} color="white" />
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: '1.2rem', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ACOS</div>
            <div style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '-2px' }}>Autonomous Career Operating System</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button onClick={() => navigate('/auth')} className="btn-primary" style={{ padding: '0.6rem 1.4rem', fontSize: '0.875rem' }}>
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ textAlign: 'center', padding: '5rem 2rem 3rem', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '999px', padding: '6px 16px', marginBottom: '2rem', fontSize: '0.8rem', color: '#6366f1', fontWeight: 600 }}>
          <Zap size={14} /> India\'s First Career Operating System
        </div>

        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.1, color: '#0f172a', marginBottom: '1.5rem' }}>
          Your Personal{' '}
          <span style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Google Maps
          </span>
          {' '}for<br />Career Success
        </h1>

        <p style={{ fontSize: '1.15rem', color: '#475569', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: '650px', margin: '0 auto 2.5rem' }}>
          Stop getting lost in YouTube videos and random advice. ACOS builds your personalized roadmap, tracks every step, coaches your interviews, and never lets you give up — designed for first-generation learners in India.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/auth')} className="btn-primary" style={{ fontSize: '1rem', padding: '0.9rem 2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Rocket size={18} /> Get Started — It\'s Free
          </button>
          <button onClick={() => navigate('/auth')} className="btn-secondary" style={{ fontSize: '1rem', padding: '0.9rem 2rem' }}>
            Sign In to Account
          </button>
        </div>
      </section>

      {/* Stats */}
      <section style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
          {stats.map((stat, i) => (
            <div key={i} className="glass-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 900, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{stat.value}</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ maxWidth: '1000px', margin: '3rem auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>Everything You Need to Succeed</h2>
          <p style={{ color: '#64748b', marginTop: '0.5rem' }}>8 specialized career coaches working together for you</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          {features.map((f, i) => (
            <div key={i} className="glass-card" style={{ padding: '1.5rem', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 40px ${f.color}25`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <f.icon size={22} color={f.color} />
              </div>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem', fontSize: '0.95rem' }}>{f.title}</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '4rem 2rem', background: 'linear-gradient(135deg, rgba(99,102,241,0.06), rgba(139,92,246,0.06))', margin: '2rem 0' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0f172a', marginBottom: '1rem' }}>
          Start Your Career Journey Today
        </h2>
        <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '1rem' }}>
          Join 50,000+ first-generation learners already using ACOS
        </p>
        <button onClick={() => navigate('/auth')} className="btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2.5rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
          <Rocket size={20} /> Get My Personalized Roadmap
        </button>
        <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#94a3b8' }}>✓ Free forever · ✓ No credit card · ✓ 2-minute setup</div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8', fontSize: '0.8rem', borderTop: '1px solid rgba(99,102,241,0.08)' }}>
        ACOS — Autonomous Career Operating System · Built for First-Generation Learners in India 🇮🇳
      </footer>
    </div>
  );
}
