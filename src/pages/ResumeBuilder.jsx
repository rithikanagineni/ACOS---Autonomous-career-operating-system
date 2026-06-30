import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { Download, Edit3, Star, CheckCircle, Sparkles, Brain, Check, FileText } from 'lucide-react';

export default function ResumeBuilder() {
  const { state, dispatch } = useStudent();
  const name = state.profile?.name || 'Rahul Kumar';
  const career = state.profile?.careerMatch || 'AI Engineer';
  const [atsScore] = useState(72);
  const [editing, setEditing] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const CAREER_RESUME_TEMPLATES = {
    'AI Engineer': {
      objective: `Aspiring AI Engineer with hands-on experience in Python and Machine Learning. Currently pursuing ${state.profile?.degree || 'BSc'} and actively building AI projects for real-world impact.`,
      projects: `• House Price Predictor — Linear Regression model (Scikit-learn), 89% accuracy\n• Spam Email Classifier — NLP + Naive Bayes, deployed on Streamlit`,
      experience: `• Open Source Contributor — GitHub (2023-Present)\n• Campus AI Club Lead — Organized ML workshops`,
      certifications: `• Python for Data Science — Coursera (2024)\n• Machine Learning Foundations — Coursera (2024)`,
    },
    'Data Scientist': {
      objective: `Aspiring Data Scientist with strong experience in statistical modeling, data visualization, and storytelling. Pursuing ${state.profile?.degree || 'BSc'} and focusing on data-driven business outcomes.`,
      projects: `• Sales Forecasting Model — Time series predictions with Python\n• Customer Segmentation Study — K-means clustering and dashboard reporting`,
      experience: `• Data Analytics Intern — Analyzed customer behavior to improve retention\n• Research Assistant — Prepared data insights for academic reports`,
      certifications: `• Data Science Professional Certificate — Coursera (2024)\n• SQL for Data Science — Coursera (2024)`,
    },
    'Data Analyst': {
      objective: `Aspiring Data Analyst skilled in SQL, Excel, and dashboard creation. Passionate about delivering clear business insights through data.`,
      projects: `• Executive Dashboard — Interactive business performance reporting\n• SQL Insights Report — Revenue and trend analysis for leadership`,
      experience: `• Student Data Analyst — Produced weekly reports for campus teams\n• Business Club Member — Presented metrics-driven recommendations`,
      certifications: `• Excel for Business — Coursera (2024)\n• SQL for Data Analysis — Kaggle (2024)`,
    },
    'Full Stack Developer': {
      objective: `Ambitious Full Stack Developer building responsive web applications with modern frontend and backend technologies. Focused on polished user experiences.`,
      projects: `• Task Manager App — React frontend with Node.js backend\n• E-commerce Platform — Product listing and checkout flow`,
      experience: `• Web Development Intern — Developed scalable app features\n• Hackathon Participant — Built a cloud-deployed MVP`,
      certifications: `• Full Stack Web Development — Coursera (2024)\n• React Fundamentals — Udemy (2024)`,
    },
    'Web Developer': {
      objective: `Creative Web Developer specializing in responsive and accessible websites using HTML, CSS, and JavaScript. Eager to build delightful user experiences.`,
      projects: `• Personal Portfolio — Responsive website with clean UI\n• Interactive Landing Page — Animated marketing experience`,
      experience: `• Freelance Web Developer — Built websites for local clients\n• UI/UX Club Member — Designed user-centered page layouts`,
      certifications: `• Front-End Web Developer — FreeCodeCamp (2024)\n• JavaScript Algorithms — Codecademy (2024)`,
    },
    'Backend Developer': {
      objective: `Backend Developer focused on building secure APIs, managing databases, and improving application performance. Experienced with server-side logic and scalable systems.`,
      projects: `• REST API Service — Node.js, Express, PostgreSQL\n• Authentication System — JWT-based login and role control`,
      experience: `• Backend Intern — Built microservices for internal tools\n• Coding Club Member — Led API design workshops`,
      certifications: `• Node.js Developer — Coursera (2024)\n• Database Design — Udemy (2024)`,
    },
    'Cybersecurity Analyst': {
      objective: `Cybersecurity Analyst trainee with experience in threat assessment, vulnerability review, and incident response. Committed to protecting systems and data.`,
      projects: `• Threat Assessment Report — Network vulnerability analysis\n• Incident Response Plan — Simulated security breach recovery`,
      experience: `• Security Club Lead — Ran workshops on safe computing\n• Research Assistant — Documented security posture improvements`,
      certifications: `• Cybersecurity Fundamentals — Coursera (2024)\n• Network Security Basics — Udemy (2024)`,
    },
    'Cloud Engineer': {
      objective: `Cloud Engineer building infrastructure automation and scalable deployments with cloud-native tools. Focused on reliability, cost efficiency, and DevOps practices.`,
      projects: `• Cloud Deployment Project — Dockerized app on AWS\n• CI/CD Pipeline — Automated builds and delivery`,
      experience: `• Cloud Lab Member — Implemented infrastructure-as-code labs\n• DevOps Intern — Supported release automation`,
      certifications: `• AWS Cloud Practitioner — AWS (2024)\n• Terraform Basics — Udemy (2024)`,
    },
  };

  const careerTemplate = CAREER_RESUME_TEMPLATES[career] || CAREER_RESUME_TEMPLATES['AI Engineer'];

  const KEYWORDS_BY_CAREER = {
    'AI Engineer': ['Python ✓', 'Machine Learning ✓', 'SQL ✓', 'NumPy ✓', 'Pandas ✓', 'Deep Learning ✗', 'TensorFlow ✗', 'Git ✓'],
    'Data Scientist': ['Python ✓', 'Statistics ✓', 'SQL ✓', 'Tableau ✓', 'Visualization ✓', 'R ✗', 'Big Data ✗'],
    'Data Analyst': ['SQL ✓', 'Excel ✓', 'Reporting ✓', 'Tableau ✓', 'Dashboard ✓', 'Power BI ✗', 'Automation ✗'],
    'Full Stack Developer': ['React ✓', 'Node.js ✓', 'APIs ✓', 'MongoDB ✓', 'JavaScript ✓', 'TypeScript ✗', 'Docker ✗'],
    'Web Developer': ['HTML ✓', 'CSS ✓', 'JavaScript ✓', 'Responsive ✓', 'Accessibility ✓', 'SEO ✗', 'Animations ✗'],
    'Backend Developer': ['APIs ✓', 'Node.js ✓', 'PostgreSQL ✓', 'Security ✓', 'Authentication ✓', 'Caching ✗', 'Performance ✗'],
    'Cybersecurity Analyst': ['Threat Analysis ✓', 'Incident Response ✓', 'Vulnerability ✓', 'SOC ✓', 'Python ✓', 'Forensics ✗', 'Penetration Testing ✗'],
    'Cloud Engineer': ['AWS ✓', 'Docker ✓', 'Terraform ✓', 'CI/CD ✓', 'Infrastructure ✓', 'Kubernetes ✗', 'Monitoring ✗'],
  };

  const completedProjectText = state.completedProjects.length > 0
    ? state.completedProjects.map((p) => `• ${p} — Completed project aligned to ${career} goals.`).join('\n')
    : `• No completed projects yet. Build one of the recommended career projects to strengthen your resume.`;

  const [sections, setSections] = useState({
    objective: careerTemplate.objective,
    education: `${state.profile?.degree || 'BSc Computer Science'} | ${state.profile?.college || 'ABC University'} | ${state.profile?.year || '2nd Year'} | GPA: 8.2/10`,
    skills: (state.profile?.skills || ['Python', 'SQL', 'Pandas', 'NumPy', 'Git']).join(', '),
    projects: completedProjectText,
    experience: careerTemplate.experience,
    certifications: careerTemplate.certifications,
  });

  React.useEffect(() => {
    setSections(prev => ({
      ...prev,
      projects: prev.projects === completedProjectText || prev.projects.startsWith('• No completed projects yet.')
        ? completedProjectText
        : prev.projects,
    }));
  }, [completedProjectText]);

  const careerIssues = {
    'AI Engineer': [
      { type: 'warning', text: 'Add quantified metrics to projects (e.g., "improved accuracy by X%")' },
      { type: 'warning', text: 'GitHub URL missing from contact info' },
      { type: 'success', text: 'Keywords match: Python, ML, SQL, NumPy' },
      { type: 'success', text: 'Education section is complete' },
      { type: 'error', text: 'Deep Learning experience not mentioned' },
    ],
    'Data Scientist': [
      { type: 'warning', text: 'Add insights from statistical tests or model validation' },
      { type: 'warning', text: 'Include data visualization tools used' },
      { type: 'success', text: 'Keywords match: Python, SQL, Statistics, Visualization' },
      { type: 'success', text: 'Education section is complete' },
      { type: 'error', text: 'Actionable business impact not highlighted' },
    ],
    'Data Analyst': [
      { type: 'warning', text: 'Include SQL query complexity and reporting impact' },
      { type: 'warning', text: 'Add visualization tools used for dashboards' },
      { type: 'success', text: 'Keywords match: SQL, Excel, Tableau, Reporting' },
      { type: 'success', text: 'Education section is complete' },
      { type: 'error', text: 'Business outcome or recommendation missing' },
    ],
    'Full Stack Developer': [
      { type: 'warning', text: 'Add deployment or DevOps details for your app' },
      { type: 'warning', text: 'Include frontend and backend frameworks used' },
      { type: 'success', text: 'Keywords match: React, Node.js, APIs, MongoDB' },
      { type: 'success', text: 'Education section is complete' },
      { type: 'error', text: 'Testing or performance improvements not mentioned' },
    ],
    'Web Developer': [
      { type: 'warning', text: 'Add accessibility or responsive design details' },
      { type: 'warning', text: 'Include JavaScript or framework usage explicitly' },
      { type: 'success', text: 'Keywords match: HTML, CSS, JavaScript, UI/UX' },
      { type: 'success', text: 'Education section is complete' },
      { type: 'error', text: 'Cross-browser optimization not highlighted' },
    ],
    'Backend Developer': [
      { type: 'warning', text: 'Add API security or performance improvements' },
      { type: 'warning', text: 'Include database technologies used' },
      { type: 'success', text: 'Keywords match: APIs, Node.js, PostgreSQL, JWT' },
      { type: 'success', text: 'Education section is complete' },
      { type: 'error', text: 'Scalability or reliability details missing' },
    ],
    'Cybersecurity Analyst': [
      { type: 'warning', text: 'Add vulnerability scanning or incident response details' },
      { type: 'warning', text: 'Include security frameworks or tools used' },
      { type: 'success', text: 'Keywords match: Threat analysis, Wireshark, SOC, Risk' },
      { type: 'success', text: 'Education section is complete' },
      { type: 'error', text: 'Risk mitigation results not described' },
    ],
    'Cloud Engineer': [
      { type: 'warning', text: 'Add deployment automation or infrastructure code details' },
      { type: 'warning', text: 'Include cloud provider services used' },
      { type: 'success', text: 'Keywords match: AWS, Docker, Terraform, CI/CD' },
      { type: 'success', text: 'Education section is complete' },
      { type: 'error', text: 'Cost optimization or reliability improvements missing' },
    ],
  };

  const issues = careerIssues[career] || careerIssues['AI Engineer'];

  const handleGenerate = () => {
    setAnalyzing(true);
    setTimeout(() => {
      dispatch({ type: 'GENERATE_RESUME' });
      setAnalyzing(false);
    }, 2500);
  };

  if (!state.resumeGenerated) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '65vh', padding: '1rem' }}>
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '540px', width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ width: '80px', height: '80px', background: 'rgba(99,102,241,0.1)', color: '#6366f1', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
            <FileText size={40} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.5rem' }}>{career} ATS Resume Builder</h2>
            <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.6 }}>
              This builder uses your profile, coursework, and project achievements to create a career-focused resume optimized for ATS matching.
            </p>
          </div>

          <div style={{ display: 'grid', gap: '0.5rem', textAlign: 'left', background: 'rgba(99,102,241,0.04)', padding: '1rem', borderRadius: '0.75rem' }}>
            {['Extracts skills & achievements from your profile', 'Auto-adds completed projects with full tech stacks', 'Analyzes keyword match density for ATS targets', 'Provides real-time improvement feedback'].map((txt, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#475569' }}>
                <Check size={14} style={{ color: '#10b981' }} />
                <span>{txt}</span>
              </div>
            ))}
          </div>

          {analyzing ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '48px', height: '48px', border: '4px solid rgba(99,102,241,0.2)', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              <div style={{ fontWeight: 600, color: '#6366f1' }}>Building your career-specific resume...</div>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Scanning profile & formatting layout</div>
            </div>
          ) : (
            <button onClick={handleGenerate} className="btn-primary" style={{ padding: '1rem', fontWeight: 700, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} /> Generate Career Resume
            </button>
          )}
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem' }}>
      {/* Resume Preview */}
      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(99,102,241,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 700, color: '#0f172a' }}>📄 Resume Preview</div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
              <Download size={14} style={{ marginRight: '4px', display: 'inline' }} /> Export PDF
            </button>
            <button onClick={handleGenerate} className="btn-secondary" style={{ padding: '0.4rem 1rem', fontSize: '0.8rem' }}>
              <Sparkles size={14} style={{ marginRight: '4px', display: 'inline' }} /> Regenerate Resume
            </button>
          </div>
        </div>
        <div style={{ padding: '2rem', fontFamily: 'Georgia, serif', fontSize: '0.85rem', background: 'white', minHeight: '600px' }}>
          {/* Resume Header */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem', borderBottom: '2px solid #6366f1', paddingBottom: '1rem' }}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', fontFamily: 'Inter, sans-serif' }}>{name}</h1>
            <div style={{ color: '#6366f1', fontWeight: 600, fontFamily: 'Inter', marginBottom: '4px' }}>{career}</div>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontFamily: 'Inter' }}>
              {state.profile?.location || 'Jaipur, Rajasthan'} · rahul@email.com · linkedin.com/in/rahul · github.com/rahul
            </div>
          </div>

          {Object.entries(sections).map(([key, value]) => (
            <div key={key} style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'Inter', marginBottom: '4px', borderBottom: '1px solid #e2e8f0', paddingBottom: '3px', flex: 1 }}>
                  {key === 'objective' ? 'Professional Summary' : key.charAt(0).toUpperCase() + key.slice(1)}
                </h2>
                <button onClick={() => setEditing(editing === key ? null : key)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', marginLeft: '8px' }}>
                  <Edit3 size={13} />
                </button>
              </div>
              {editing === key ? (
                <textarea
                  value={value}
                  onChange={e => setSections(p => ({ ...p, [key]: e.target.value }))}
                  onBlur={() => setEditing(null)}
                  autoFocus
                  style={{ width: '100%', padding: '6px', borderRadius: '6px', border: '1.5px solid #6366f1', fontSize: '0.82rem', fontFamily: 'Georgia, serif', lineHeight: 1.6, resize: 'vertical', minHeight: '60px', outline: 'none' }}
                />
              ) : (
                <div style={{ fontSize: '0.82rem', color: '#374151', lineHeight: 1.65, whiteSpace: 'pre-line' }}>{value}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* ATS Score */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>🎯 ATS Score</div>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <div style={{
              width: '90px', height: '90px', borderRadius: '50%', margin: '0 auto',
              background: `conic-gradient(#6366f1 ${atsScore * 3.6}deg, #e2e8f0 0deg)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative'
            }}>
              <div style={{ position: 'absolute', inset: '8px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <div style={{ fontWeight: 800, fontSize: '1.3rem', color: '#6366f1' }}>{atsScore}</div>
                <div style={{ fontSize: '0.65rem', color: '#94a3b8' }}>/ 100</div>
              </div>
            </div>
            <div style={{ marginTop: '8px', fontSize: '0.82rem', color: '#64748b' }}>
              {atsScore >= 80 ? '✅ ATS Ready' : atsScore >= 60 ? '⚠️ Needs Improvement' : '❌ Not ATS Ready'}
            </div>
          </div>

          <div style={{ display: 'grid', gap: '0.6rem' }}>
            {issues.map((issue, i) => (
              <div key={i} style={{ display: 'flex', gap: '6px', fontSize: '0.78rem', lineHeight: 1.4 }}>
                <span style={{ flexShrink: 0, marginTop: '1px' }}>
                  {issue.type === 'success' ? '✅' : issue.type === 'warning' ? '⚠️' : '❌'}
                </span>
                <span style={{ color: issue.type === 'error' ? '#ef4444' : issue.type === 'warning' ? '#92400e' : '#065f46' }}>
                  {issue.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Auto-update notice */}
        <div className="glass-card" style={{ padding: '1.25rem', background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(6,182,212,0.05))', borderColor: 'rgba(16,185,129,0.2)' }}>
          <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
            🤖 Auto-Update Active
          </div>
          <div style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.6 }}>
            Your resume automatically updates whenever you complete a project or certification. Last updated: <strong>Just now</strong>
          </div>
          <div style={{ marginTop: '0.75rem', display: 'grid', gap: '4px' }}>
            {['House Price Predictor added', 'Python certification added', 'Skills section refreshed'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.75rem', color: '#059669' }}>
                <CheckCircle size={12} /> {item}
              </div>
            ))}
          </div>
        </div>

        {/* Keyword matcher */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.875rem', fontSize: '0.9rem' }}>🔑 Top Keywords</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {(KEYWORDS_BY_CAREER[career] || KEYWORDS_BY_CAREER['AI Engineer']).map((kw, i) => (
              <span key={i} style={{
                padding: '3px 8px', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 600,
                background: kw.includes('✓') ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.08)',
                color: kw.includes('✓') ? '#059669' : '#ef4444',
                border: `1px solid ${kw.includes('✓') ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`
              }}>{kw}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
