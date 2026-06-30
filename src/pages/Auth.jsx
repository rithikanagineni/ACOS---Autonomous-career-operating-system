import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import { ChevronRight, ChevronLeft, Check, Rocket, User, Code2, Target, Clock, Mail, Lock, ShieldAlert } from 'lucide-react';

const ALL_SKILLS = ['Python', 'JavaScript', 'Java', 'C++', 'SQL', 'R', 'HTML/CSS', 'Excel', 'NumPy', 'Pandas', 'Git', 'Linux', 'Docker'];
const CAREER_OPTIONS = ['AI Engineer', 'Data Scientist', 'Data Analyst', 'ML Engineer', 'Full Stack Developer', 'Web Developer', 'Backend Developer', 'Cybersecurity Analyst', 'Cloud Engineer'];

const STEPS = [
  { id: 1, title: 'Credentials', icon: Mail, desc: 'Create your account login' },
  { id: 2, title: 'Basic Info', icon: User, desc: 'Tell us about yourself' },
  { id: 3, title: 'Your Skills', icon: Code2, desc: 'What can you do right now?' },
  { id: 4, title: 'Your Goals', icon: Target, desc: 'Where do you want to go?' },
  { id: 5, title: 'Schedule', icon: Clock, desc: 'How much time can you commit?' },
  { id: 6, title: 'Ready!', icon: Rocket, desc: 'Generating your roadmap...' },
];

export default function Auth() {
  const navigate = useNavigate();
  const { dispatch } = useStudent();
  
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('error'); // 'error' | 'success'

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

  const getAccounts = () => {
    return JSON.parse(localStorage.getItem('acos_accounts') || '{}');
  };

  const saveAccount = (email, accountData) => {
    const accounts = getAccounts();
    const normalizedEmail = email.toLowerCase().trim();
    accounts[normalizedEmail] = accountData;
    localStorage.setItem('acos_accounts', JSON.stringify(accounts));
  };

  // Sign In submit
  const handleSignIn = (e) => {
    e.preventDefault();
    setMessage('');
    
    if (!email.trim() || !password.trim()) {
      setMessageType('error');
      setMessage('Please enter both email and password.');
      return;
    }

    const accounts = getAccounts();
    const normalizedEmail = email.toLowerCase().trim();

    if (!accounts[normalizedEmail]) {
      setMessageType('error');
      setMessage('No account found. Sign up first');
      return;
    }

    if (accounts[normalizedEmail].password !== password) {
      setMessageType('error');
      setMessage('Incorrect password. Please try again.');
      return;
    }

    // Success login
    dispatch({ type: 'SIGN_IN', payload: accounts[normalizedEmail] });
    navigate('/dashboard');
  };

  // Sign Up Next / Step validation
  const handleSignUpNext = () => {
    setMessage('');
    if (step === 1) {
      if (!email.trim() || !password.trim()) {
        setMessageType('error');
        setMessage('Please fill in email and password.');
        return;
      }
      if (password.length < 6) {
        setMessageType('error');
        setMessage('Password must be at least 6 characters long.');
        return;
      }

      const accounts = getAccounts();
      const normalizedEmail = email.toLowerCase().trim();

      if (accounts[normalizedEmail]) {
        setMessageType('error');
        setMessage('Account found. Please sign in');
        return;
      }
    }

    if (step === 2) {
      if (!form.name.trim()) {
        setMessageType('error');
        setMessage('Please enter your full name.');
        return;
      }
    }

    setStep(step + 1);
  };

  const handleFinishSignUp = () => {
    setLoading(true);
    setTimeout(() => {
      const careerMatch = form.careerGoal || 'AI Engineer';
      const level = form.skills.length < 3 ? 'Beginner' : form.skills.length < 6 ? 'Intermediate' : 'Advanced';
      
      const newAccount = {
        email: email.toLowerCase().trim(),
        password,
        name: form.name,
        degree: form.degree,
        year: form.year,
        college: form.college,
        location: form.location,
        skills: form.skills,
        codingLevel: form.codingLevel,
        englishLevel: form.englishLevel,
        careerGoal: form.careerGoal,
        interest: form.interest,
        hours: form.hours,
        preferredLang: form.preferredLang,
        studentLevel: level,
        careerMatch,
        // session states
        completedTasks: [],
        completedResources: [],
        completedProjects: [],
        interviewHistory: [],
        roadmapAnalyzed: false,
        resumeGenerated: false,
        lastTaskCompletionDate: null,
        badges: ['First Step', 'Profile Complete'],
        progress: {
          roadmapCompletion: 0,
          streak: 0,
          totalHours: 0,
          projectsBuilt: 0,
          coursesFinished: 0,
          tasksCompleted: 0,
        }
      };

      saveAccount(email, newAccount);
      dispatch({ type: 'SIGN_UP', payload: newAccount });
      setLoading(false);
      navigate('/dashboard');
    }, 2500);
  };

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #eef2ff 0%, #faf5ff 40%, #ecfdf5 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: mode === 'signin' ? '440px' : '680px', transition: 'max-width 0.3s' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <div style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', borderRadius: '12px', padding: '10px', display: 'flex' }}>
              <Rocket size={24} color="white" />
            </div>
            <span style={{ fontWeight: 900, fontSize: '1.5rem', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ACOS</span>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
            {mode === 'signin' ? 'Sign in to access your Career Operating System' : 'Create your account & build your personalized career roadmap'}
          </p>
        </div>

        {/* Alerts */}
        {message && (
          <div style={{
            background: messageType === 'error' ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
            border: `1px solid ${messageType === 'error' ? '#ef4444' : '#10b981'}`,
            color: messageType === 'error' ? '#b91c1c' : '#065f46',
            borderRadius: '0.75rem', padding: '10px 14px', marginBottom: '1rem',
            fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            <ShieldAlert size={16} />
            <span>{message}</span>
          </div>
        )}

        {/* Sign In Mode */}
        {mode === 'signin' && (
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem' }}>Sign In</h2>
            <form onSubmit={handleSignIn} style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '6px', display: 'block' }}>Email Address</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', background: 'white' }}>
                  <Mail size={16} color="#94a3b8" />
                  <input
                    type="email"
                    placeholder="name@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ border: 'none', outline: 'none', flex: 1, fontSize: '0.875rem' }}
                  />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '6px', display: 'block' }}>Password</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', background: 'white' }}>
                  <Lock size={16} color="#94a3b8" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ border: 'none', outline: 'none', flex: 1, fontSize: '0.875rem' }}
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary" style={{ padding: '0.75rem', fontWeight: 700, fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Sign In
              </button>
            </form>
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: '#64748b' }}>
              <button onClick={() => navigate('/')} style={{ background: 'transparent', border: '1px solid #cbd5e1', borderRadius: '999px', padding: '0.65rem 1rem', color: '#475569', cursor: 'pointer', fontWeight: 600 }}>
                ← Back to Home
              </button>
              <div>
                Don't have an account?{' '}
                <button onClick={() => { setMode('signup'); setStep(1); setMessage(''); }} style={{ background: 'none', border: 'none', color: '#6366f1', fontWeight: 700, cursor: 'pointer', outline: 'none' }}>
                  Sign Up First
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sign Up Mode with Multi-Step */}
        {mode === 'signup' && (
          <>
            {/* Steps indicator */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                {STEPS.map((s) => (
                  <div key={s.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: step > s.id ? 'linear-gradient(135deg, #10b981, #059669)' : step === s.id ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : '#e2e8f0',
                      color: step >= s.id ? 'white' : '#94a3b8', fontSize: '0.7rem', fontWeight: 700,
                      boxShadow: step === s.id ? '0 0 0 3px rgba(99,102,241,0.2)' : 'none', transition: 'all 0.3s'
                    }}>
                      {step > s.id ? <Check size={12} /> : s.id}
                    </div>
                  </div>
                ))}
              </div>
              <div className="progress-bar-track" style={{ height: '4px' }}>
                <div className="progress-bar-fill" style={{ width: `${progress}%`, transition: 'width 0.5s ease' }} />
              </div>
            </div>

            {/* Form card */}
            <div className="glass-card" style={{ padding: '2.25rem' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '2px' }}>
                  Step {step} of 6
                </div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>{STEPS[step - 1].title}</h2>
                <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '2px' }}>{STEPS[step - 1].desc}</p>
              </div>

              {/* Step 1: Credentials */}
              {step === 1 && (
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '6px', display: 'block' }}>Email Address *</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', background: 'white' }}>
                      <Mail size={16} color="#94a3b8" />
                      <input
                        type="email"
                        placeholder="name@email.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        style={{ border: 'none', outline: 'none', flex: 1, fontSize: '0.875rem' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '6px', display: 'block' }}>Create Password *</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', background: 'white' }}>
                      <Lock size={16} color="#94a3b8" />
                      <input
                        type="password"
                        placeholder="Min 6 characters"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        style={{ border: 'none', outline: 'none', flex: 1, fontSize: '0.875rem' }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Basic Info */}
              {step === 2 && (
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '6px', display: 'block' }}>Full Name *</label>
                    <input className="input-field" placeholder="Rahul Kumar" value={form.name} onChange={e => update('name', e.target.value)} />
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
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '6px', display: 'block' }}>English Level</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {['Beginner', 'Intermediate', 'Advanced'].map(l => (
                        <button key={l} onClick={() => update('englishLevel', l)} style={{
                          flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid',
                          borderColor: form.englishLevel === l ? '#6366f1' : '#cbd5e1',
                          background: form.englishLevel === l ? 'rgba(99,102,241,0.08)' : 'white',
                          color: form.englishLevel === l ? '#6366f1' : '#475569',
                          fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer'
                        }}>{l}</button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Skills */}
              {step === 3 && (
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '8px', display: 'block' }}>Current Skills</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      {ALL_SKILLS.map(s => {
                        const has = form.skills.includes(s);
                        return (
                          <button key={s} onClick={() => toggleSkill(s)} style={{
                            padding: '6px 12px', borderRadius: '8px', border: '1px solid',
                            borderColor: has ? '#6366f1' : '#e2e8f0',
                            background: has ? 'rgba(99,102,241,0.08)' : 'white',
                            color: has ? '#6366f1' : '#475569',
                            fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'
                          }}>
                            {has && '✓ '} {s}
                          </button>
                        );
                      })}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      <input
                        className="input-field"
                        placeholder="Add a skill manually"
                        value={customSkill}
                        onChange={e => setCustomSkill(e.target.value)}
                        onKeyDown={handleSkillInputKeyDown}
                      />
                      <button
                        type="button"
                        onClick={addCustomSkill}
                        className="btn-primary"
                        style={{ padding: '0.8rem 1rem', whiteSpace: 'nowrap' }}
                      >
                        Add
                      </button>
                    </div>
                    {form.skills.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {form.skills.map(skill => (
                          <button
                            key={skill}
                            type="button"
                            onClick={() => removeSkill(skill)}
                            style={{
                              padding: '6px 10px', borderRadius: '999px', border: '1px solid #e2e8f0',
                              background: 'white', color: '#475569', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '6px'
                            }}
                          >
                            {skill} ✕
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '6px', display: 'block' }}>Coding Level</label>
                    <select className="input-field" value={form.codingLevel} onChange={e => update('codingLevel', e.target.value)}>
                      <option value="">Select level</option>
                      {['No coding experience', 'Beginner', 'Intermediate', 'Advanced'].map(l => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {/* Step 4: Goals */}
              {step === 4 && (
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '8px', display: 'block' }}>Target Career Role</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
                      {CAREER_OPTIONS.map(c => (
                        <button key={c} onClick={() => update('careerGoal', c)} style={{
                          padding: '10px', borderRadius: '8px', border: '1px solid',
                          borderColor: form.careerGoal === c ? '#6366f1' : '#cbd5e1',
                          background: form.careerGoal === c ? 'rgba(99,102,241,0.08)' : 'white',
                          color: form.careerGoal === c ? '#6366f1' : '#475569',
                          fontWeight: form.careerGoal === c ? 700 : 500,
                          fontSize: '0.8rem', cursor: 'pointer', textAlign: 'left'
                        }}>
                          {c}
                        </button>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input
                        className="input-field"
                        placeholder="Type a career goal manually"
                        value={form.careerGoal}
                        onChange={e => update('careerGoal', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '6px', display: 'block' }}>Primary Interest / Specialization</label>
                    <input className="input-field" placeholder="e.g. Computer Vision, NLP" value={form.interest} onChange={e => update('interest', e.target.value)} />
                  </div>
                </div>
              )}

              {/* Step 5: Schedule */}
              {step === 5 && (
                <div style={{ display: 'grid', gap: '1.25rem' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '8px', display: 'block' }}>Daily Available Study Hours</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {['1-2 hrs', '2-4 hrs', '4-6 hrs', '6+ hrs'].map(h => (
                        <button key={h} onClick={() => update('hours', h)} style={{
                          flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid',
                          borderColor: form.hours === h ? '#6366f1' : '#cbd5e1',
                          background: form.hours === h ? 'rgba(99,102,241,0.08)' : 'white',
                          color: form.hours === h ? '#6366f1' : '#475569',
                          fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer'
                        }}>{h}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '8px', display: 'block' }}>Preferred Learning Language</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {['English', 'Hindi', 'Both'].map(l => (
                        <button key={l} onClick={() => update('preferredLang', l)} style={{
                          flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid',
                          borderColor: form.preferredLang === l ? '#6366f1' : '#cbd5e1',
                          background: form.preferredLang === l ? 'rgba(99,102,241,0.08)' : 'white',
                          color: form.preferredLang === l ? '#6366f1' : '#475569',
                          fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer'
                        }}>{l}</button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: AI Loader */}
              {step === 6 && (
                <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                  {loading ? (
                    <>
                      <div style={{ fontSize: '2.5rem', marginBottom: '1rem', animation: 'spin 2s linear infinite' }}>🚀</div>
                      <div style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a', marginBottom: '0.5rem' }}>Building your career operating path...</div>
                      <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Your profile is being linked to your career roadmap</div>
                    </>
                  ) : (
                    <>
                      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎉</div>
                      <h3 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Ready to launch!</h3>
                      <p style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                        Everything is set up. We've matched your profile with the best track for <strong>{form.careerGoal || 'AI Engineer'}</strong>.
                      </p>
                      <button onClick={handleFinishSignUp} className="btn-primary" style={{ width: '100%', padding: '0.75rem', fontWeight: 700, fontSize: '0.9rem' }}>
                        Create Account & Start Journey
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Navigation buttons */}
              {step < 6 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', gap: '0.75rem' }}>
                  <button
                    onClick={() => step > 1 ? setStep(step - 1) : setMode('signin')}
                    className="btn-secondary"
                    style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', padding: '8px 16px' }}
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                  <button
                    onClick={handleSignUpNext}
                    className="btn-primary"
                    style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', padding: '8px 16px' }}
                  >
                    Continue <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>

            <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.8rem', color: '#64748b' }}>
              Already have an account?{' '}
              <button onClick={() => { setMode('signin'); setMessage(''); }} style={{ background: 'none', border: 'none', color: '#6366f1', fontWeight: 700, cursor: 'pointer', outline: 'none' }}>
                Sign In Instead
              </button>
            </div>
          </>
        )}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
