import React, { useState } from 'react';
import { LEARNING_RESOURCES } from '../data/mockData';
import { ExternalLink, Star, Clock, BookOpen, Play, Filter, X, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { useNavigate } from 'react-router-dom';

const TOPICS = ['All', 'Python', 'NumPy', 'Statistics', 'Machine Learning', 'Deep Learning', 'SQL', 'Git', 'NLP', 'React', 'Cloud', 'Security', 'HTML/CSS', 'JavaScript'];
const typeIcon = { Video: '▶️', Course: '📚', Interactive: '🎮' };

const RESOURCES_BY_CAREER = {
  'AI Engineer': ['Machine Learning', 'Deep Learning', 'Python', 'NLP', 'Statistics'],
  'Data Scientist': ['Python', 'Statistics', 'Machine Learning', 'NLP', 'SQL'],
  'Data Analyst': ['Python', 'Statistics', 'SQL', 'Excel'],
  'ML Engineer': ['Machine Learning', 'Deep Learning', 'Python', 'NLP'],
  'Full Stack Developer': ['React', 'JavaScript', 'HTML/CSS', 'Git'],
  'Web Developer': ['JavaScript', 'HTML/CSS', 'React'],
  'Backend Developer': ['SQL', 'Python', 'Cloud', 'Git'],
  'Cybersecurity Analyst': ['Security', 'Cloud', 'Python'],
  'Cloud Engineer': ['Cloud', 'Python', 'Docker', 'Security'],
};

// Resource quiz bank
const RESOURCE_QUIZZES = {
  1: {
    title: 'Python for Everybody',
    questions: [
      { q: 'Which keyword starts a function in Python?', options: ['start', 'def', 'func', 'begin'], correct: 1 },
      { q: 'What type is the value True in Python?', options: ['String', 'Integer', 'Boolean', 'Float'], correct: 2 },
      { q: 'Which method adds an item to a list?', options: ['.push()', '.add()', '.append()', '.insert()'], correct: 2 },
      { q: 'What does len([1,2,3]) return?', options: ['2', '3', '4', '1'], correct: 1 },
      { q: 'How do you start a for loop in Python?', options: ['foreach item in list:', 'for item in list:', 'loop item in list:', 'repeat item in list:'], correct: 1 },
    ],
  },
  2: {
    title: 'NumPy Complete Tutorial',
    questions: [
      { q: 'What does np.zeros((2,3)) create?', options: ['3x2 matrix of ones', '2x3 matrix of zeros', '2x3 matrix of ones', '3x2 matrix of zeros'], correct: 1 },
      { q: 'What is the result of np.mean([10,20,30])?', options: ['10', '30', '20', '15'], correct: 2 },
      { q: 'How do you get the shape of an array?', options: ['array.size', 'array.shape', 'array.dim', 'array.length'], correct: 1 },
      { q: 'What does np.arange(5) produce?', options: ['[1,2,3,4,5]', '[0,1,2,3,4,5]', '[0,1,2,3,4]', '[1,2,3,4]'], correct: 2 },
      { q: 'Which is element-wise multiplication?', options: ['np.cross(a,b)', 'np.dot(a,b)', 'a @ b', 'a * b'], correct: 3 },
    ],
  },
  3: {
    title: 'Machine Learning Specialization',
    questions: [
      { q: 'Supervised learning requires:', options: ['Unlabeled data', 'Labeled training data', 'No data', 'Only test data'], correct: 1 },
      { q: 'Which is NOT a supervised learning algorithm?', options: ['Linear Regression', 'K-Means', 'Random Forest', 'SVM'], correct: 1 },
      { q: 'Overfitting means the model:', options: ['Performs well on new data', 'Fails to learn', 'Memorizes training data too well', 'Has too few parameters'], correct: 2 },
      { q: 'What does cross-validation help with?', options: ['Model deployment', 'Estimating generalization performance', 'Data collection', 'Feature engineering'], correct: 1 },
      { q: 'R² score of 0.9 means:', options: ['Model explains 10% variance', 'Model has 90% accuracy', 'Model explains 90% of variance', 'Model has 90% precision'], correct: 2 },
    ],
  },
};

function getDefaultQuiz(resourceId) {
  return {
    title: 'Knowledge Check',
    questions: [
      { q: 'The best way to learn is:', options: ['Watch only', 'Read only', 'Practice with projects', 'Skip practice'], correct: 2 },
      { q: 'Consistent learning leads to:', options: ['No improvement', 'Skill mastery', 'Confusion', 'Wasted time'], correct: 1 },
      { q: 'When you encounter a bug you should:', options: ['Give up', 'Copy paste without understanding', 'Debug systematically', 'Start over every time'], correct: 2 },
      { q: 'The best project approach is:', options: ['Build perfect code first try', 'Start small and iterate', 'Never test your code', 'Avoid documentation'], correct: 1 },
      { q: 'Learning from mistakes means:', options: ['Avoiding all errors', 'Understanding why errors happen', 'Always asking others', 'Never trying again'], correct: 1 },
    ],
  };
}

function ResourceModal({ resource, onClose, onComplete }) {
  const [phase, setPhase] = useState('content'); // 'content' | 'quiz' | 'result'
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const quiz = RESOURCE_QUIZZES[resource.id] || getDefaultQuiz(resource.id);

  const score = Object.keys(answers).filter(i => answers[i] === quiz.questions[i]?.correct).length;
  const pct = Math.round((score / quiz.questions.length) * 100);
  const passed = pct >= 60;

  const handleAnswer = (qIdx, optIdx) => {
    if (answers[qIdx] !== undefined) return;
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleNext = () => {
    if (currentQ < quiz.questions.length - 1) setCurrentQ(c => c + 1);
    else setPhase('result');
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
      zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
    }}>
      <div style={{
        background: 'white', borderRadius: '1.25rem', width: '100%', maxWidth: '580px',
        maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 25px 80px rgba(0,0,0,0.25)',
      }}>
        {/* Modal header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem', borderBottom: '1px solid #f1f5f9' }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: '#6366f1', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{resource.topic} · {resource.source}</div>
            <h3 style={{ fontWeight: 800, fontSize: '1rem', margin: 0 }}>{resource.title}</h3>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(241,245,249,1)', border: 'none', borderRadius: '8px', padding: '6px', cursor: 'pointer' }}>
            <X size={18} style={{ color: '#94a3b8' }} />
          </button>
        </div>

        <div style={{ padding: '1.5rem' }}>
          {phase === 'content' && (
            <>
              <div style={{ background: 'rgba(99,102,241,0.05)', borderRadius: '0.875rem', padding: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '0.9rem' }}>📋 What you'll learn:</div>
                <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.85rem', color: '#475569', lineHeight: 1.7 }}>
                  <li>Core concepts and fundamentals</li>
                  <li>Hands-on examples and code demos</li>
                  <li>Real-world applications</li>
                  <li>Best practices from industry</li>
                </ul>
              </div>

              <a
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', borderRadius: '0.875rem', background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)', textDecoration: 'none', color: '#1e293b', marginBottom: '1rem' }}
              >
                <div style={{ fontSize: '2rem' }}>{resource.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{typeIcon[resource.type]} Watch / Study Now</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b', display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '2px' }}>
                    <Clock size={11} /> {resource.duration} <span>·</span> {resource.source} <ExternalLink size={11} />
                  </div>
                </div>
              </a>

              <div style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '0.75rem', padding: '0.875rem', marginBottom: '1.25rem', fontSize: '0.82rem', color: '#92400e' }}>
                💡 After watching/reading, take the quiz below to mark this resource as complete!
              </div>

              <button
                onClick={() => setPhase('quiz')}
                className="btn-primary"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                🎯 I've studied this — Take Quiz
              </button>
            </>
          )}

          {phase === 'quiz' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                <span>Quiz: {quiz.title}</span>
                <span>Q {currentQ + 1}/{quiz.questions.length}</span>
              </div>
              <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '999px', marginBottom: '1.25rem' }}>
                <div style={{ width: `${((currentQ + 1) / quiz.questions.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg,#6366f1,#8b5cf6)', borderRadius: '999px', transition: 'width 0.3s' }} />
              </div>

              <p style={{ fontWeight: 700, color: '#0f172a', marginBottom: '1rem', fontSize: '0.95rem', lineHeight: 1.5 }}>
                {quiz.questions[currentQ].q}
              </p>

              <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1.25rem' }}>
                {quiz.questions[currentQ].options.map((opt, idx) => {
                  const answered = answers[currentQ] !== undefined;
                  const isSelected = answers[currentQ] === idx;
                  const isCorrect = idx === quiz.questions[currentQ].correct;
                  let bg = 'rgba(248,250,252,1)';
                  let border = '1px solid #e2e8f0';
                  if (answered) {
                    if (isCorrect) { bg = 'rgba(16,185,129,0.1)'; border = '1px solid #10b981'; }
                    else if (isSelected) { bg = 'rgba(239,68,68,0.08)'; border = '1px solid #ef4444'; }
                  }
                  return (
                    <button key={idx} onClick={() => handleAnswer(currentQ, idx)} style={{
                      padding: '0.75rem 1rem', borderRadius: '0.65rem', background: bg, border,
                      cursor: answered ? 'default' : 'pointer', textAlign: 'left', fontWeight: 500, fontSize: '0.875rem',
                      display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'all 0.2s',
                    }}>
                      <span style={{ width: '20px', height: '20px', borderRadius: '50%', border: `2px solid ${answered && isCorrect ? '#10b981' : answered && isSelected ? '#ef4444' : '#cbd5e1'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.7rem' }}>
                        {answered && isCorrect && '✓'}
                        {answered && isSelected && !isCorrect && '✗'}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              <button onClick={handleNext} disabled={answers[currentQ] === undefined} className="btn-primary" style={{ width: '100%', opacity: answers[currentQ] === undefined ? 0.4 : 1 }}>
                {currentQ < quiz.questions.length - 1 ? 'Next →' : 'Submit Quiz'}
              </button>
            </>
          )}

          {phase === 'result' && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>{pct >= 80 ? '🏆' : pct >= 60 ? '✅' : '😔'}</div>
              <h3 style={{ fontWeight: 800, marginBottom: '0.25rem' }}>{pct >= 60 ? 'Quiz Passed!' : 'Not Quite...'}</h3>
              <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1rem' }}>Score: {score}/{quiz.questions.length} ({pct}%)</p>

              {passed ? (
                <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle size={20} style={{ color: '#10b981', flexShrink: 0 }} />
                  <div style={{ textAlign: 'left', fontSize: '0.85rem' }}>
                    <div style={{ fontWeight: 700, color: '#065f46' }}>Resource marked as complete!</div>
                    <div style={{ color: '#047857' }}>Great job finishing this module.</div>
                  </div>
                </div>
              ) : (
                <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <AlertCircle size={20} style={{ color: '#f59e0b', flexShrink: 0 }} />
                  <div style={{ textAlign: 'left', fontSize: '0.85rem' }}>
                    <div style={{ fontWeight: 700, color: '#92400e' }}>Need 60% to pass. Study and retry!</div>
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                {!passed && (
                  <button onClick={() => { setPhase('content'); setCurrentQ(0); setAnswers({}); }}
                    style={{ background: 'rgba(99,102,241,0.08)', color: '#6366f1', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '0.75rem', padding: '0.65rem 1.25rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }}>
                    📖 Study Again
                  </button>
                )}
                <button onClick={() => { if (passed) onComplete(resource); onClose(); }} className="btn-primary">
                  {passed ? '✅ Complete' : 'Close'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LearningResources() {
  const { state, dispatch } = useStudent();
  const [topic, setTopic] = useState('All');
  const [freeOnly, setFreeOnly] = useState(false);
  const [activeResource, setActiveResource] = useState(null);

  const career = state.profile?.careerMatch || 'AI Engineer';
  const careerTopics = RESOURCES_BY_CAREER[career] || ['Python', 'Machine Learning', 'Cloud'];
  const careerFiltered = LEARNING_RESOURCES.filter(r =>
    careerTopics.includes(r.topic) || r.title.toLowerCase().includes(career.toLowerCase())
  );
  const baseResources = careerFiltered.length ? careerFiltered : LEARNING_RESOURCES;

  const filtered = baseResources.filter(r =>
    (topic === 'All' || r.topic === topic) &&
    (!freeOnly || r.free)
  );

  const handleComplete = (resource) => {
    dispatch({ type: 'COMPLETE_RESOURCE', payload: resource.title });
  };

  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      {/* NumPy Banner */}
      <div className="glass-card" style={{ padding: '1.25rem', background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.06))', borderColor: 'rgba(99,102,241,0.2)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '2rem' }}>🤖</div>
          <div>
            <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>Struggling with NumPy?</div>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>AI detected you need help here. Here are personalized resources for your level.</div>
          </div>
          <button
            className="btn-primary"
            onClick={() => setTopic('NumPy')}
            style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', whiteSpace: 'nowrap', marginLeft: 'auto' }}
          >
            Show NumPy Resources
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Filter size={16} color="#64748b" />
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {TOPICS.map(t => (
              <button key={t} onClick={() => setTopic(t)} style={{
                padding: '0.35rem 0.875rem', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                background: topic === t ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(255,255,255,0.7)',
                color: topic === t ? 'white' : '#64748b',
                border: topic === t ? 'none' : '1.5px solid #e2e8f0',
                transition: 'all 0.2s',
              }}>{t}</button>
            ))}
          </div>
          <label style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 600, color: '#374151', cursor: 'pointer' }}>
            <input type="checkbox" checked={freeOnly} onChange={e => setFreeOnly(e.target.checked)} style={{ width: '14px', height: '14px', accentColor: '#6366f1' }} />
            Free only
          </label>
        </div>
      </div>

      {/* Resources */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {filtered.map(r => {
          const isCompleted = state.completedResources.includes(r.title);
          return (
            <div key={r.id} className="glass-card" style={{
              padding: '1.25rem', transition: 'all 0.2s', cursor: 'default',
              border: isCompleted ? '1px solid rgba(16,185,129,0.3)' : undefined,
              background: isCompleted ? 'rgba(16,185,129,0.03)' : undefined,
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(99,102,241,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.875rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '1.5rem' }}>{r.icon}</span>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>{r.topic} · {r.level}</div>
                </div>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  {isCompleted && <CheckCircle size={16} style={{ color: '#10b981' }} />}
                  <span className={`badge ${r.free ? 'badge-green' : 'badge-amber'}`} style={{ fontSize: '0.68rem' }}>
                    {r.free ? 'FREE' : r.price}
                  </span>
                </div>
              </div>

              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                {typeIcon[r.type] || '📄'} {r.title}
                {isCompleted && <span style={{ marginLeft: '0.5rem', fontSize: '0.7rem', color: '#10b981', fontWeight: 700 }}>✓ Completed</span>}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.75rem', padding: '3px 8px', borderRadius: '999px', background: '#f8fafc', border: '1px solid #e2e8f0', color: '#64748b', fontWeight: 600 }}>{r.source}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.75rem', color: '#f59e0b', fontWeight: 600 }}>
                  <Star size={12} fill="#f59e0b" /> {r.rating}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.75rem', color: '#94a3b8' }}>
                  <Clock size={12} /> {r.duration}
                </div>
              </div>

              <button
                onClick={() => setActiveResource(r)}
                className="btn-primary"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.82rem', padding: '0.6rem', background: isCompleted ? 'linear-gradient(135deg, #10b981, #059669)' : undefined }}
              >
                <Play size={14} /> {isCompleted ? '✓ Review & Retake Quiz' : 'Start Learning'}
              </button>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
          <BookOpen size={40} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
          <div style={{ fontWeight: 600 }}>No resources found for this filter</div>
          <div style={{ fontSize: '0.8rem', marginTop: '4px' }}>Try a different topic</div>
        </div>
      )}

      {activeResource && (
        <ResourceModal
          resource={activeResource}
          onClose={() => setActiveResource(null)}
          onComplete={handleComplete}
        />
      )}
    </div>
  );
}
