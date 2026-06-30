import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import { ArrowLeft, Github, ExternalLink, CheckCircle, Clock, Zap, BookOpen, Trophy, Send } from 'lucide-react';

const PROJECTS_DB = {
  'house-price-predictor': {
    id: 'house-price-predictor',
    title: 'House Price Predictor',
    level: 'Intermediate',
    duration: '2 weeks',
    tech: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib'],
    emoji: '🏠',
    color: '#06b6d4',
    description: 'Build a machine learning model that predicts house prices based on features like location, size, number of rooms, and age of the property. This project covers the complete ML pipeline from data cleaning to model deployment.',
    objectives: [
      'Perform Exploratory Data Analysis (EDA) on the Boston Housing dataset',
      'Clean and preprocess data (handle missing values, encoding)',
      'Build and compare Linear Regression, Ridge, and Lasso models',
      'Evaluate models using MSE, RMSE, and R² Score',
      'Visualize predictions vs. actual prices',
      'Deploy model as a simple Streamlit app (optional bonus)',
    ],
    steps: [
      { step: 1, title: 'Setup & Data Loading', desc: 'Install dependencies, load the Boston Housing dataset from sklearn or Kaggle, and explore its structure (shape, dtypes, describe).' },
      { step: 2, title: 'Exploratory Data Analysis', desc: 'Create correlation heatmaps, distribution plots, and scatter plots to understand relationships between features and the target variable (price).' },
      { step: 3, title: 'Data Preprocessing', desc: 'Handle missing values, normalize numerical features using StandardScaler, and split data into train/test sets (80/20 split).' },
      { step: 4, title: 'Model Building', desc: 'Train LinearRegression, Ridge, and Lasso models using Scikit-learn. Compare performance metrics across all three.' },
      { step: 5, title: 'Evaluation & Visualization', desc: 'Plot actual vs. predicted prices. Compute R² and RMSE. Analyze residuals to check model assumptions.' },
      { step: 6, title: 'Documentation & Submission', desc: 'Write a clean README with methodology, results, and screenshots. Push to GitHub and submit your repo link below.' },
    ],
    resources: [
      { label: 'Boston Housing Dataset', url: 'https://www.kaggle.com/c/boston-housing', icon: '📊' },
      { label: 'Scikit-learn LinearRegression docs', url: 'https://scikit-learn.org/stable/modules/generated/sklearn.linear_model.LinearRegression.html', icon: '📚' },
      { label: 'Streamlit for deployment', url: 'https://streamlit.io/gallery', icon: '🚀' },
    ],
  },
  'spam-email-classifier': {
    id: 'spam-email-classifier',
    title: 'Spam Email Classifier',
    level: 'Intermediate',
    duration: '10 days',
    tech: ['Python', 'NLP', 'Naive Bayes', 'Scikit-learn', 'NLTK'],
    emoji: '📧',
    color: '#8b5cf6',
    description: 'Build an NLP-based text classification model to distinguish spam emails from legitimate ones using the famous Enron email dataset. Learn the complete text preprocessing pipeline and Naive Bayes classification.',
    objectives: [
      'Understand the fundamentals of Natural Language Processing',
      'Preprocess text (tokenize, remove stopwords, stemming)',
      'Convert text to numerical features using TF-IDF',
      'Train a Multinomial Naive Bayes classifier',
      'Evaluate using precision, recall, F1-score, and confusion matrix',
      'Deploy as a web interface using Streamlit',
    ],
    steps: [
      { step: 1, title: 'Environment Setup', desc: 'Install nltk, scikit-learn, and pandas. Download the SMS Spam Collection or Enron Email dataset from Kaggle.' },
      { step: 2, title: 'Text Preprocessing', desc: 'Clean emails: remove HTML, special characters, numbers. Apply tokenization, stopword removal, and stemming using NLTK.' },
      { step: 3, title: 'Feature Extraction', desc: 'Convert processed text to TF-IDF vectors using sklearn\'s TfidfVectorizer. Explore bag-of-words as alternative.' },
      { step: 4, title: 'Model Training', desc: 'Train MultinomialNB classifier. Split dataset 80/20. Tune the alpha hyperparameter.' },
      { step: 5, title: 'Evaluation', desc: 'Generate confusion matrix, compute precision/recall/F1. Target: >95% accuracy. Examine misclassified examples.' },
      { step: 6, title: 'Streamlit App', desc: 'Build a simple web UI where you can paste email text and get instant spam/ham prediction with confidence score.' },
    ],
    resources: [
      { label: 'SMS Spam Dataset on Kaggle', url: 'https://www.kaggle.com/uciml/sms-spam-collection-dataset', icon: '📊' },
      { label: 'NLTK Documentation', url: 'https://www.nltk.org/', icon: '📚' },
      { label: 'Naive Bayes in Sklearn', url: 'https://scikit-learn.org/stable/modules/naive_bayes.html', icon: '🤖' },
    ],
  },
};

function getProject(projectId) {
  if (PROJECTS_DB[projectId]) return PROJECTS_DB[projectId];
  return {
    id: projectId,
    title: projectId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    level: 'Intermediate',
    duration: '1-2 weeks',
    tech: ['Python'],
    emoji: '🚀',
    color: '#6366f1',
    description: 'This project will help you build practical skills and add a strong portfolio piece. Follow the steps below to complete it and submit for review.',
    objectives: [
      'Understand the core requirements',
      'Build the project from scratch',
      'Document your approach with a README',
      'Push to GitHub and share the link',
    ],
    steps: [
      { step: 1, title: 'Setup', desc: 'Create a new GitHub repository. Set up your development environment with all required libraries.' },
      { step: 2, title: 'Build', desc: 'Implement the core functionality following best practices: modular code, proper naming, and comments.' },
      { step: 3, title: 'Test', desc: 'Test your solution with different inputs. Fix any bugs you find.' },
      { step: 4, title: 'Document', desc: 'Write a README with setup instructions, screenshots, and description of your approach.' },
      { step: 5, title: 'Submit', desc: 'Push all changes to GitHub and submit your repository link below.' },
    ],
    resources: [
      { label: 'GitHub Docs', url: 'https://docs.github.com', icon: '📚' },
    ],
  };
}

const levelColor = { Beginner: '#10b981', Intermediate: '#f59e0b', Advanced: '#ef4444' };

export default function ProjectDetailPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useStudent();
  const project = getProject(projectId);
  const isSubmitted = state.completedProjects.includes(project.title);

  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(isSubmitted);
  const [error, setError] = useState('');
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const toggleStep = (s) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      next.has(s) ? next.delete(s) : next.add(s);
      return next;
    });
  };

  const handleSubmit = () => {
    if (!githubUrl.includes('github.com')) {
      setError('Please enter a valid GitHub repository URL.');
      return;
    }
    setError('');
    setSubmitting(true);
    setTimeout(() => {
      dispatch({ type: 'ADD_PROJECT', payload: project.title });
      setSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gap: '1.5rem' }}>
      <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', fontWeight: 600, fontSize: '0.9rem', width: 'fit-content' }}>
        <ArrowLeft size={18} /> Back to Projects
      </button>

      {/* Header */}
      <div className="glass-card" style={{ padding: '1.75rem', background: `linear-gradient(135deg, ${project.color}12, ${project.color}05)`, borderColor: `${project.color}25` }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <div style={{ fontSize: '3rem' }}>{project.emoji}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
              <span style={{ background: levelColor[project.level] + '18', color: levelColor[project.level], padding: '3px 10px', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700 }}>
                {project.level}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: '#64748b' }}>
                <Clock size={13} /> {project.duration}
              </span>
              {submitted && <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(16,185,129,0.1)', color: '#10b981', padding: '3px 10px', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 700 }}>
                <CheckCircle size={12} /> Submitted
              </span>}
            </div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.5rem' }}>{project.title}</h1>
            <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6 }}>{project.description}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.75rem' }}>
              {project.tech.map(t => (
                <span key={t} style={{ background: 'rgba(99,102,241,0.08)', color: '#6366f1', padding: '3px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600 }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Objectives */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <h2 style={{ fontWeight: 800, marginBottom: '1rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Zap size={18} style={{ color: '#6366f1' }} /> Learning Objectives
        </h2>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          {project.objectives.map((obj, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.875rem', color: '#334155' }}>
              <CheckCircle size={16} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
              <span>{obj}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <h2 style={{ fontWeight: 800, marginBottom: '1rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BookOpen size={18} style={{ color: '#8b5cf6' }} /> Project Steps
        </h2>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {project.steps.map((s) => {
            const done = completedSteps.has(s.step);
            return (
              <div
                key={s.step}
                onClick={() => toggleStep(s.step)}
                style={{
                  display: 'flex', gap: '1rem', padding: '0.875rem 1rem',
                  borderRadius: '0.75rem', cursor: 'pointer',
                  background: done ? 'rgba(16,185,129,0.06)' : 'rgba(255,255,255,0.5)',
                  border: `1px solid ${done ? 'rgba(16,185,129,0.25)' : 'rgba(99,102,241,0.12)'}`,
                  transition: 'all 0.2s',
                }}
              >
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                  background: done ? '#10b981' : 'rgba(99,102,241,0.1)',
                  color: done ? 'white' : '#6366f1',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: '0.8rem',
                }}>
                  {done ? '✓' : s.step}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: done ? '#065f46' : '#0f172a', marginBottom: '0.2rem' }}>{s.title}</div>
                  <div style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5 }}>{s.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Resources */}
      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <h2 style={{ fontWeight: 800, marginBottom: '1rem', fontSize: '1rem' }}>📎 Helpful Resources</h2>
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          {project.resources.map((r, i) => (
            <a key={i} href={r.url} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderRadius: '0.75rem', background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(99,102,241,0.15)', textDecoration: 'none', color: '#1e293b', transition: 'all 0.2s' }}>
              <span style={{ fontSize: '1.2rem' }}>{r.icon}</span>
              <span style={{ fontWeight: 600, fontSize: '0.875rem', flex: 1 }}>{r.label}</span>
              <ExternalLink size={14} style={{ color: '#94a3b8' }} />
            </a>
          ))}
        </div>
      </div>

      {/* Submission */}
      {!submitted ? (
        <div className="glass-card" style={{ padding: '1.75rem' }}>
          <h2 style={{ fontWeight: 800, marginBottom: '0.5rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Github size={18} style={{ color: '#0f172a' }} /> Submit Your Project
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.25rem' }}>
            Once you've completed all steps, push your code to GitHub and submit below to unlock the badge!
          </p>

          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '6px', display: 'block' }}>
                GitHub Repository URL *
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid rgba(99,102,241,0.25)', background: 'rgba(255,255,255,0.6)' }}>
                <Github size={16} style={{ color: '#94a3b8', flexShrink: 0 }} />
                <input
                  type="url"
                  placeholder="https://github.com/username/project-name"
                  value={githubUrl}
                  onChange={e => setGithubUrl(e.target.value)}
                  style={{ border: 'none', background: 'transparent', flex: 1, fontSize: '0.875rem', outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '6px', display: 'block' }}>
                Live Demo URL (optional)
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', borderRadius: '0.75rem', border: '1px solid rgba(99,102,241,0.25)', background: 'rgba(255,255,255,0.6)' }}>
                <ExternalLink size={16} style={{ color: '#94a3b8', flexShrink: 0 }} />
                <input
                  type="url"
                  placeholder="https://your-streamlit-app.streamlit.app"
                  value={liveUrl}
                  onChange={e => setLiveUrl(e.target.value)}
                  style={{ border: 'none', background: 'transparent', flex: 1, fontSize: '0.875rem', outline: 'none' }}
                />
              </div>
            </div>

            {error && <p style={{ color: '#ef4444', fontSize: '0.8rem' }}>{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="btn-primary"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.25rem' }}
            >
              {submitting ? (
                <>
                  <span style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  Submitting...
                </>
              ) : (
                <><Send size={16} /> Submit Project</>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', background: 'rgba(16,185,129,0.05)', borderColor: 'rgba(16,185,129,0.3)' }}>
          <Trophy size={48} style={{ color: '#f59e0b', margin: '0 auto 0.75rem' }} />
          <h2 style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.35rem' }}>Project Submitted! 🎉</h2>
          <p style={{ color: '#64748b', marginBottom: '1.25rem', fontSize: '0.9rem' }}>
            Your project has been recorded. A new badge has been unlocked in your Motivation Hub!
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={() => navigate('/projects')} className="btn-primary">← Back to Projects</button>
            <button onClick={() => navigate('/motivation')} style={{ background: 'rgba(245,158,11,0.1)', color: '#b45309', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '0.75rem', padding: '0.75rem 1.5rem', fontWeight: 600, cursor: 'pointer' }}>
              🏆 View Badges
            </button>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
