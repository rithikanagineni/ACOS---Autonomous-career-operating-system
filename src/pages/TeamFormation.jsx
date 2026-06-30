import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { Users, Search, Mail, Code, MapPin, Zap, Check, X, ShieldAlert } from 'lucide-react';

const MOCK_LEARNERS = [
  { id: 1, name: 'Ananya Sharma', role: 'Data Analyst', skills: ['Python', 'SQL', 'Tableau'], location: 'Mumbai', availability: '10 hrs/week', match: '95%' },
  { id: 2, name: 'Vikram Singh', role: 'Backend Developer', skills: ['Django', 'PostgreSQL', 'Docker'], location: 'Delhi', availability: '15 hrs/week', match: '88%' },
  { id: 3, name: 'Priya Patel', role: 'UI/UX Designer', skills: ['Figma', 'CSS', 'React'], location: 'Bangalore', availability: '12 hrs/week', match: '85%' },
  { id: 4, name: 'Aditya Rao', role: 'ML Engineer', skills: ['Python', 'PyTorch', 'Scikit-Learn'], location: 'Hyderabad', availability: '20 hrs/week', match: '92%' }
];

export default function TeamFormation() {
  const { dispatch } = useStudent();
  const [searchTerm, setSearchTerm] = useState('');
  const [matchedTeams, setMatchedTeams] = useState(MOCK_LEARNERS);
  const [connectedLearners, setConnectedLearners] = useState(new Set());
  const [showModal, setShowModal] = useState(null); // stores learner name if active

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setMatchedTeams(
      MOCK_LEARNERS.filter(
        (l) =>
          l.name.toLowerCase().includes(term) ||
          l.role.toLowerCase().includes(term) ||
          l.skills.some((s) => s.toLowerCase().includes(term))
      )
    );
  };

  const handleConnect = (learner) => {
    if (connectedLearners.has(learner.id)) return;
    
    // update state
    setConnectedLearners(prev => {
      const next = new Set(prev);
      next.add(learner.id);
      return next;
    });

    // dispatch connection notification to context
    dispatch({ type: 'SEND_CONNECTION', payload: { name: learner.name } });
    
    // show success modal
    setShowModal(learner.name);
  };

  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Find Your Hackathon Team</h2>
        <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1rem' }}>
          Find study partners or hackathon teammates with complementary skills to build projects together.
        </p>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input
              type="text"
              placeholder="Search by name, role, or skill..."
              value={searchTerm}
              onChange={handleSearch}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.5rem',
                borderRadius: '0.75rem',
                border: '1px solid rgba(99, 102, 241, 0.15)',
                background: 'rgba(255, 255, 255, 0.5)',
                fontSize: '0.875rem'
              }}
            />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {matchedTeams.map((learner) => {
          const isPending = connectedLearners.has(learner.id);
          return (
            <div key={learner.id} className="glass-card" style={{
              padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem',
              border: isPending ? '1.5px solid rgba(16, 185, 129, 0.3)' : undefined,
              background: isPending ? 'rgba(16, 185, 129, 0.02)' : undefined,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontWeight: 700, color: '#0f172a' }}>{learner.name}</h3>
                  <p style={{ fontSize: '0.8rem', color: '#6366f1', fontWeight: 600 }}>{learner.role}</p>
                </div>
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '4px 10px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>
                  {learner.match} Match
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.8rem', color: '#64748b' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MapPin size={14} /> {learner.location}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Zap size={14} /> {learner.availability}
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                {learner.skills.map((s, idx) => (
                  <span key={idx} style={{ background: 'rgba(99, 102, 241, 0.08)', color: '#6366f1', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 500 }}>
                    {s}
                  </span>
                ))}
              </div>

              <button
                onClick={() => handleConnect(learner)}
                className="btn-primary"
                style={{
                  marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.5rem',
                  background: isPending ? 'linear-gradient(135deg, #10b981, #059669)' : undefined
                }}
              >
                {isPending ? <><Check size={16} /> Connection Sent</> : <><Mail size={16} /> Connect Now</>}
              </button>
            </div>
          );
        })}
      </div>

      {/* Success Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(3px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem'
        }}>
          <div className="glass-card" style={{
            background: 'white', maxWidth: '420px', width: '100%', padding: '2rem', textAlign: 'center',
            boxShadow: '0 20px 50px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column', gap: '1rem'
          }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(16,185,129,0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
              <Check size={28} />
            </div>
            <div>
              <h3 style={{ fontWeight: 800, fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.25rem' }}>Connection Request Sent!</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
                We've sent a hackathon group invitation to <strong>{showModal}</strong>. You'll receive a notification as soon as they accept.
              </p>
            </div>
            <button onClick={() => setShowModal(null)} className="btn-primary" style={{ padding: '0.6rem' }}>
              Awesome
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
