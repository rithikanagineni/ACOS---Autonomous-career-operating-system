import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import { ChevronRight, ChevronLeft, Check, Rocket, User, Code2, Target, Clock, Globe } from 'lucide-react';

const ALL_SKILLS = ['Python', 'JavaScript', 'Java', 'C++', 'SQL', 'R', 'HTML/CSS', 'Excel', 'NumPy', 'Pandas', 'Git', 'Linux', 'Docker'];

const CAREER_OPTIONS = ['AI Engineer', 'Data Scientist', 'Data Analyst', 'ML Engineer', 'Full Stack Developer', 'Web Developer', 'Backend Developer', 'Cybersecurity Analyst', 'Cloud Engineer'];

const STEPS = [
  { id: 1, title: 'Basic Info', icon: User, desc: 'Tell us about yourself' },
  { id: 2, title: 'Your Skills', icon: Code2, desc: 'What can you do right now?' },
  { id: 3, title: 'Your Goals', icon: Target, desc: 'Where do you want to go?' },
  { id: 4, title: 'Schedule', icon: Clock, desc: 'How much time can you commit?' },
  { id: 5, title: 'Ready!', icon: Rocket, desc: 'Generating your roadmap...' },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const { dispatch } = useStudent();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '', degree: '', year: '', college: '', location: '',
    skills: [], codingLevel: '', englishLevel: '',
    careerGoal: '', interest: '', hours: '', preferredLang: 'English',
  });
  const [customSkill, setCustomSkill] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (field, val) => setForm(p => ({ ...p, [field]: val }));
  const toggleSkill = (skill) => {
    setForm(p => ({
      ...p,
      skills: p.skills.includes(skill) ? p.skills.filter(s => s !== skill) : [...p.skills, skill]
    }));
  };
  const addCustomSkill = () => {
    const skill = customSkill.trim();
    if (!skill) return;
    setForm(p => ({
      ...p,
      skills: p.skills.includes(skill) ? p.skills : [...p.skills, skill]
    }));
    setCustomSkill('');
  };
  const removeSkill = (skill) => {
    setForm(p => ({ ...p, skills: p.skills.filter(s => s !== skill) }));
  };
  const handleSkillInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addCustomSkill();
    }
  };

  const handleFinish = () => {
    setLoading(true);
    setTimeout(() => {
      const careerMatch = form.careerGoal || 'AI Engineer';
      const level = form.skills.length < 3 ? 'Beginner' : form.skills.length < 6 ? 'Intermediate' : 'Advanced';
      dispatch({
        type: 'SET_PROFILE',
        payload: { ...form, careerMatch, studentLevel: level }
      });
      navigate('/dashboard');
    }, 2500);
  };

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #eef2ff 0%, #faf5ff 40%, #ecfdf5 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '680px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
            <div style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '12px', padding: '10px', display: 'flex' }}>
              <Rocket size={24} color="white" />
            </div>
            <span style={{ fontWeight: 900, fontSize: '1.5rem', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ACOS</span>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Setting up your personalized career journey</p>
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            {STEPS.map((s, i) => (
              <div key={s.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: step > s.id ? 'linear-gradient(135deg, #10b981, #059669)' : step === s.id ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : '#e2e8f0',
                  color: step >= s.id ? 'white' : '#94a3b8', fontSize: '0.75rem', fontWeight: 700,
                  boxShadow: step === s.id ? '0 0 0 4px rgba(99,102,241,0.2)' : 'none', transition: 'all 0.3s'
                }}>
                  {step > s.id ? <Check size={14} /> : s.id}
                </div>
                <div style={{ fontSize: '0.65rem', color: step >= s.id ? '#6366f1' : '#94a3b8', marginTop: '4px', fontWeight: step === s.id ? 600 : 400, textAlign: 'center' }}>
                  {s.title}
                </div>
              </div>
            ))}
          </div>
          <div className="progress-bar-track" style={{ height: '6px' }}>
            <div className="progress-bar-fill" style={{ width: `${progress}%`, transition: 'width 0.5s ease' }} />
          </div>
        </div>

        {/* Card */}
        <div className="glass-card" style={{ padding: '2.5rem' }}>
          <div style={{ marginBottom: '1.75rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>{STEPS[step - 1].title}</h2>
            <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '4px' }}>{STEPS[step - 1].desc}</p>
          </div>

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '6px', display: 'block' }}>Full Name *</label>
                <input className="input-field" placeholder="e.g., Rahul Kumar" value={form.name} onChange={e => update('name', e.target.value)} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '6px', display: 'block' }}>Degree</label>
                  <select className="input-field" value={form.degree} onChange={e => update('degree', e.target.value)}>
                    <option value="">Select degree</option>
                    {['BSc', 'BCA', 'BTech', 'MCA', 'MSc', 'MBA', 'Diploma', '12th Pass'].map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '6px', display: 'block' }}>Year</label>
                  <select className="input-field" value={form.year} onChange={e => update('year', e.target.value)}>
                    <option value="">Select year</option>
                    {['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduated', 'Working'].map(y => <option key={y}>{y}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '6px', display: 'block' }}>City / State</label>
                <input className="input-field" placeholder="e.g., Jaipur, Rajasthan" value={form.location} onChange={e => update('location', e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '6px', display: 'block' }}>English Proficiency</label>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                    <button key={level} onClick={() => update('englishLevel', level)} style={{
                      flex: 1, padding: '0.6rem', borderRadius: '0.75rem', border: '1.5px solid',
                      borderColor: form.englishLevel === level ? '#6366f1' : '#e2e8f0',
                      background: form.englishLevel === level ? 'rgba(99,102,241,0.08)' : 'white',
                      color: form.englishLevel === level ? '#6366f1' : '#64748b',
                      fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer'
                    }}>{level}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Skills */}
          {step === 2 && (
            <div style={{ display: 'grid', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '10px', display: 'block' }}>
                  Select your current skills (click to toggle)
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {ALL_SKILLS.map(skill => (
                    <button key={skill} onClick={() => toggleSkill(skill)} className={`skill-tag ${form.skills.includes(skill) ? 'selected' : ''}`}>
                      {form.skills.includes(skill) && <Check size={12} />} {skill}
                    </button>
                  ))}
                </div>
                <div style={{ marginTop: '8px', fontSize: '0.75rem', color: '#94a3b8' }}>
                  {form.skills.length} skills selected
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '8px', display: 'block' }}>Coding Experience Level</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  {[
                    { val: 'No coding', emoji: '🌱', desc: 'Never coded before' },
                    { val: 'Beginner', emoji: '📘', desc: 'Basics only' },
                    { val: 'Intermediate', emoji: '⚡', desc: 'Projects done' },
                    { val: 'Advanced', emoji: '🚀', desc: 'Production ready' },
                  ].map(({ val, emoji, desc }) => (
                    <button key={val} onClick={() => update('codingLevel', val)} style={{
                      padding: '0.75rem', borderRadius: '0.75rem', border: '1.5px solid',
                      borderColor: form.codingLevel === val ? '#6366f1' : '#e2e8f0',
                      background: form.codingLevel === val ? 'rgba(99,102,241,0.08)' : 'white',
                      cursor: 'pointer', textAlign: 'left'
                    }}>
                      <div style={{ fontSize: '1.2rem' }}>{emoji}</div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>{val}</div>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Goals */}
          {step === 3 && (
            <div style={{ display: 'grid', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '8px', display: 'block' }}>Target Career Role</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                  {CAREER_OPTIONS.map(career => (
                    <button key={career} onClick={() => update('careerGoal', career)} style={{
                      padding: '0.75rem', borderRadius: '0.75rem', border: '1.5px solid',
                      borderColor: form.careerGoal === career ? '#6366f1' : '#e2e8f0',
                      background: form.careerGoal === career ? 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.08))' : 'white',
                      color: form.careerGoal === career ? '#6366f1' : '#374151',
                      fontWeight: form.careerGoal === career ? 700 : 500,
                      fontSize: '0.82rem', cursor: 'pointer', textAlign: 'left'
                    }}>
                      {form.careerGoal === career && '✓ '}{career}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '6px', display: 'block' }}>Primary Interest / Passion</label>
                <input className="input-field" placeholder="e.g., Computer Vision, NLP, Data Analysis..." value={form.interest} onChange={e => update('interest', e.target.value)} />
              </div>
            </div>
          )}

          {/* Step 4: Schedule */}
          {step === 4 && (
            <div style={{ display: 'grid', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '8px', display: 'block' }}>Daily Study Hours Available</label>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {['1-2 hrs', '2-4 hrs', '4-6 hrs', '6+ hrs'].map(h => (
                    <button key={h} onClick={() => update('hours', h)} style={{
                      flex: 1, padding: '0.75rem 0.5rem', borderRadius: '0.75rem', border: '1.5px solid',
                      borderColor: form.hours === h ? '#6366f1' : '#e2e8f0',
                      background: form.hours === h ? 'rgba(99,102,241,0.08)' : 'white',
                      color: form.hours === h ? '#6366f1' : '#64748b',
                      fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer'
                    }}>{h}</button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '8px', display: 'block' }}>Preferred Learning Language</label>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {['English', 'Hindi', 'Both'].map(lang => (
                    <button key={lang} onClick={() => update('preferredLang', lang)} style={{
                      flex: 1, padding: '0.75rem', borderRadius: '0.75rem', border: '1.5px solid',
                      borderColor: form.preferredLang === lang ? '#6366f1' : '#e2e8f0',
                      background: form.preferredLang === lang ? 'rgba(99,102,241,0.08)' : 'white',
                      color: form.preferredLang === lang ? '#6366f1' : '#64748b',
                      fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer'
                    }}>{lang}</button>
                  ))}
                </div>
              </div>
              <div className="glass-card-dark" style={{ padding: '1rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>📊 AI Analysis Preview</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.6 }}>
                  Based on your inputs:<br />
                  • <strong>Estimated Roadmap:</strong> {form.hours === '1-2 hrs' ? '9 months' : form.hours === '2-4 hrs' ? '6 months' : form.hours === '4-6 hrs' ? '4 months' : '3 months'}<br />
                  • <strong>Starting Point:</strong> {form.codingLevel || 'Beginner'} track<br />
                  • <strong>Career Match:</strong> {form.careerGoal || 'AI Engineer'}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Loading */}
          {step === 5 && (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              {loading ? (
                <>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'spin 2s linear infinite' }}>🚀</div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#0f172a', marginBottom: '0.5rem' }}>Building your personalized roadmap...</div>
                  <div style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Your profile is being analyzed for the best career path</div>
                  <div style={{ display: 'grid', gap: '0.5rem', textAlign: 'left', maxWidth: '300px', margin: '0 auto' }}>
                    {['✅ Profile analyzed', '✅ Skill gaps identified', '🔄 Roadmap generating...', '⏳ Resources curating...'].map((item, i) => (
                      <div key={i} style={{ fontSize: '0.8rem', color: i < 3 ? '#059669' : '#94a3b8', fontWeight: 500 }}>{item}</div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                  <div style={{ fontWeight: 800, fontSize: '1.3rem', color: '#0f172a', marginBottom: '0.5rem' }}>
                    Hello, {form.name || 'Future Career Achiever'}!
                  </div>
                  <p style={{ color: '#64748b', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    We've analyzed your profile. Your personalized roadmap to become a <strong>{form.careerGoal || 'career specialist'}</strong> is ready. Let's start!
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    {[
                      { label: 'Skill Gap', value: '68%', color: '#ef4444' },
                      { label: 'Timeline', value: '6 mo', color: '#6366f1' },
                      { label: 'Daily Goal', value: '90 min', color: '#10b981' },
                    ].map((stat, i) => (
                      <div key={i} style={{ padding: '0.75rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.9)', textAlign: 'center' }}>
                        <div style={{ fontSize: '1.3rem', fontWeight: 800, color: stat.color }}>{stat.value}</div>
                        <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{stat.label}</div>
                      </div>
                    ))}
                  </div>
                  <button onClick={handleFinish} className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '1rem', padding: '0.9rem 2rem' }}>
                    <Rocket size={18} /> Launch My Career Dashboard
                  </button>
                </>
              )}
            </div>
          )}

          {/* Navigation */}
          {step < 5 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', gap: '1rem' }}>
              <button
                onClick={() => step > 1 ? setStep(step - 1) : navigate('/')}
                className="btn-secondary"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <ChevronLeft size={16} /> {step > 1 ? 'Back' : 'Home'}
              </button>
              <button
                onClick={() => setStep(step + 1)}
                className="btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                {step === 4 ? 'Analyze My Profile' : 'Continue'} <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
