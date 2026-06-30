import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { Copy, Check, Globe, Github, Linkedin, FileText, Zap } from 'lucide-react';

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 12px', borderRadius: '8px', border: '1px solid rgba(99,102,241,0.2)', background: 'rgba(99,102,241,0.06)', color: '#6366f1', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600 }}>
      {copied ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy</>}
    </button>
  );
}

export default function PortfolioGenerator() {
  const { state } = useStudent();
  const name = state.profile?.name || 'Rahul Kumar';
  const career = state.profile?.careerMatch || 'AI Engineer';
  const skills = (state.profile?.skills || ['Python', 'SQL', 'ML']).join(', ');
  const [activeTab, setActiveTab] = useState('github');
  const [generating, setGenerating] = useState(false);

  const CAREER_PORTFOLIO_TEMPLATES = {
    'AI Engineer': {
      headline: 'Python | Machine Learning | AI',
      currentProject: 'AI-powered Resume Screener',
      learning: 'Deep Learning & Transformers',
      interests: 'Computer Vision & NLP',
      lookingFor: 'AI engineering internships',
      projects: [
        { title: 'House Price Predictor', desc: 'ML model with 89% accuracy', tech: 'Python, Scikit-learn' },
        { title: 'Spam Classifier', desc: 'NLP-based email filter', tech: 'NLTK, Scikit-learn' },
        { title: 'AI Chatbot', desc: 'Conversational AI assistant', tech: 'LangChain, OpenAI' },
      ],
      projectDescription: `**House Price Predictor** | Python, Scikit-learn, Pandas\n\nBuilt a machine learning model to predict house prices using the Boston Housing dataset. Applied Linear Regression with feature engineering and cross-validation, achieving 89% R² score. Deployed on Streamlit for interactive predictions.\n\n🔗 Live Demo: [streamlit.io/...]()\n🐙 GitHub: [github.com/yourusername/...]()\n📊 Dataset: Boston Housing (Kaggle)`,
    },
    'Data Scientist': {
      headline: 'Python | Statistics | Data Visualization',
      currentProject: 'Sales Forecasting Dashboard',
      learning: 'Statistical Modeling & Data Storytelling',
      interests: 'Feature Engineering & Business Insights',
      lookingFor: 'data science internships',
      projects: [
        { title: 'Sales Forecasting Model', desc: 'Time series prediction system', tech: 'Python, Pandas, Prophet' },
        { title: 'Customer Segmentation', desc: 'Clustered customer analysis', tech: 'Scikit-learn, Tableau' },
        { title: 'A/B Test Report', desc: 'Experiment analysis for conversion lift', tech: 'SQL, Python' },
      ],
      projectDescription: `**Sales Forecasting Model** | Python, Pandas, Prophet\n\nBuilt a forecasting tool to predict monthly sales using historical transaction data and feature engineering. Validated performance using cross-validation and visualized trends for business stakeholders.\n\n🔗 Live Demo: [streamlit.io/...]()\n🐙 GitHub: [github.com/yourusername/...]()`,
    },
    'Data Analyst': {
      headline: 'SQL | Excel | Business Insights',
      currentProject: 'Executive Dashboard',
      learning: 'Data Visualization & Reporting',
      interests: 'Dashboards & Stakeholder Storytelling',
      lookingFor: 'data analyst internships',
      projects: [
        { title: 'Sales Dashboard', desc: 'Interactive business reporting', tech: 'Excel, Power BI' },
        { title: 'SQL Insights Report', desc: 'Revenue and trend analysis', tech: 'SQL, Tableau' },
        { title: 'Customer Segmentation', desc: 'Behavior-driven segments', tech: 'Python, Pandas' },
      ],
      projectDescription: `**Sales Dashboard** | Excel, Power BI, SQL\n\nDesigned an executive dashboard that visualizes revenue, customer segments, and performance trends. Delivered actionable insights to inform business strategy.\n\n🔗 Live Demo: [powerbi.com/...]()\n🐙 GitHub: [github.com/yourusername/...]()`,
    },
    'Full Stack Developer': {
      headline: 'React | Node.js | Cloud Deployment',
      currentProject: 'End-to-End Web App',
      learning: 'Web Architecture & APIs',
      interests: 'Frontend UX and Backend Systems',
      lookingFor: 'full stack development internships',
      projects: [
        { title: 'Task Manager App', desc: 'Full stack productivity application', tech: 'React, Node.js, MongoDB' },
        { title: 'E-commerce Platform', desc: 'Checkout flow and product catalog', tech: 'Express, Stripe, React' },
        { title: 'Portfolio Site', desc: 'Responsive personal website', tech: 'Next.js, CSS' },
      ],
      projectDescription: `**Task Manager App** | React, Node.js, MongoDB\n\nBuilt a full stack productivity tool with user authentication, real-time updates, and deployment to the cloud. Designed REST APIs and a polished frontend experience.\n\n🔗 Live Demo: [yourapp.com/...]()\n🐙 GitHub: [github.com/yourusername/...]()`,
    },
    'Web Developer': {
      headline: 'JavaScript | HTML/CSS | Responsive Design',
      currentProject: 'Portfolio Website',
      learning: 'Front-End Design & Performance',
      interests: 'UX, Accessibility, Web Animations',
      lookingFor: 'web development internships',
      projects: [
        { title: 'Portfolio Website', desc: 'Responsive developer portfolio', tech: 'HTML, CSS, JavaScript' },
        { title: 'Landing Page', desc: 'Modern marketing interface', tech: 'CSS, JavaScript' },
        { title: 'Blog Platform', desc: 'Static site with dynamic content', tech: 'React' },
      ],
      projectDescription: `**Portfolio Website** | HTML, CSS, JavaScript\n\nCreated a responsive portfolio site to showcase projects, skills, and contact details. Focused on accessibility and fast performance.\n\n🔗 Live Demo: [yourwebsite.com/...]()\n🐙 GitHub: [github.com/yourusername/...]()`,
    },
    'Backend Developer': {
      headline: 'APIs | Databases | Security',
      currentProject: 'Secure REST API',
      learning: 'Backend Systems & Databases',
      interests: 'Microservices & Authentication',
      lookingFor: 'backend development internships',
      projects: [
        { title: 'REST API Service', desc: 'Secure backend service', tech: 'Node.js, Express, PostgreSQL' },
        { title: 'Auth System', desc: 'JWT login and role control', tech: 'JWT, OAuth' },
        { title: 'Database Design', desc: 'Scalable schema planning', tech: 'SQL' },
      ],
      projectDescription: `**REST API Service** | Node.js, Express, PostgreSQL\n\nBuilt a secure backend service with authentication, data modeling, and production-ready APIs. Documented scalable endpoints and developer workflows.\n\n🔗 GitHub: [github.com/yourusername/...]()`,
    },
    'Cybersecurity Analyst': {
      headline: 'Security | Threat Analysis | Compliance',
      currentProject: 'Incident Response Report',
      learning: 'Threat Detection & Risk Assessment',
      interests: 'Vulnerability Scanning and SOC Operations',
      lookingFor: 'cybersecurity analyst internships',
      projects: [
        { title: 'Threat Assessment', desc: 'Security analysis report', tech: 'Python, Wireshark' },
        { title: 'Risk Dashboard', desc: 'Vulnerability tracking tool', tech: 'Python, Splunk' },
        { title: 'Incident Report', desc: 'Breach recovery documentation', tech: 'Security frameworks' },
      ],
      projectDescription: `**Threat Assessment Report** | Python, Wireshark, Kali Linux\n\nDelivered a detailed threat assessment for a simulated network environment. Identified vulnerabilities, prioritized risks, and recommended remediation actions.\n\n🔗 GitHub: [github.com/yourusername/...]()`,
    },
    'Cloud Engineer': {
      headline: 'Cloud | DevOps | Automation',
      currentProject: 'Infrastructure Automation',
      learning: 'Cloud Deployment & Orchestration',
      interests: 'Kubernetes, Terraform, Cost Optimization',
      lookingFor: 'cloud engineering internships',
      projects: [
        { title: 'Cloud Deployment', desc: 'Containerized app deployment', tech: 'Docker, AWS' },
        { title: 'CI/CD Pipeline', desc: 'Automated release workflow', tech: 'GitHub Actions' },
        { title: 'Infrastructure as Code', desc: 'Terraform provisioning', tech: 'Terraform' },
      ],
      projectDescription: `**Cloud Deployment Project** | Docker, AWS, Terraform\n\nDeployed a containerized application to the cloud with automated infrastructure provisioning. Focused on reliability, scalability, and cost optimization.\n\n🔗 GitHub: [github.com/yourusername/...]()`,
    },
  };

  const careerTemplate = CAREER_PORTFOLIO_TEMPLATES[career] || CAREER_PORTFOLIO_TEMPLATES['AI Engineer'];
  const careerHashtag = career.replace(/\W+/g, '');

  const githubReadme = `# Hi there! I'm ${name} 👋

## 🚀 Aspiring ${career} | ${careerTemplate.headline}

![Profile Views](https://komarev.com/ghpvc/?username=rahul&color=6366f1)

### 🎯 About Me
- 🔭 Currently building: **${careerTemplate.currentProject}**
- 🌱 Learning: **${careerTemplate.learning}**
- 💡 Interested in: **${careerTemplate.interests}**
- 📍 Based in: ${state.profile?.location || 'India'}
- 🎓 ${state.profile?.degree || 'BSc'} Student, ${state.profile?.year || '2nd Year'}

### 🛠️ Tech Stack
` + "`" + `
Languages:   ${skills}
Highlights:  ${careerTemplate.headline}
Tools:       Git | VS Code | GitHub
` + "`" + `

### 📊 GitHub Stats
![GitHub Stats](https://github-readme-stats.vercel.app/api?username=rahul&theme=tokyonight)

### 🏆 Featured Projects
| Project | Description | Tech | Stars |
|---------|-------------|------|-------|
${careerTemplate.projects.map(p => `| ${p.title} | ${p.desc} | ${p.tech} | ⭐ |`).join('\n')}

### 📫 Connect With Me
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin)](https://linkedin.com/in/yourusername)
[![Email](https://img.shields.io/badge/Email-D14836?style=flat&logo=gmail)](mailto:example@email.com)`;

  const linkedinAbout = `🚀 Aspiring ${career} | Building a stronger career in ${career}

I'm a ${state.profile?.degree || 'BSc'} student passionate about using technology to solve real-world problems. I believe that practical experience and clear storytelling are key for success in ${career}.

💡 What I'm working on:
• ${careerTemplate.currentProject}
• Learning ${careerTemplate.learning}
• Developing skills in ${careerTemplate.interests}

🛠️ Technical Skills: ${skills}

🎯 Looking for: ${careerTemplate.lookingFor}

Let's connect if you're building interesting things in ${career}! 🤝

#${careerHashtag} #OpenToWork`;

  const portfolioHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${name} — Portfolio</title>
  <style>
    body { font-family: Inter, sans-serif; background: linear-gradient(135deg, #eef2ff, #faf5ff); margin: 0; padding: 2rem; color: #0f172a; }
    .card { background: rgba(255,255,255,0.8); border-radius: 1rem; padding: 2rem; box-shadow: 0 4px 20px rgba(99,102,241,0.1); margin-bottom: 1.5rem; }
    h1 { font-size: 2.5rem; background: linear-gradient(135deg, #6366f1, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .badge { background: rgba(99,102,241,0.1); color: #6366f1; padding: 4px 12px; border-radius: 999px; font-size: 0.8rem; font-weight: 600; margin: 4px; display: inline-block; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${name}</h1>
    <p>Aspiring ${career} · ${state.profile?.degree || 'BSc'} Student · ${state.profile?.location || 'India'}</p>
    ${(state.profile?.skills || ['Python', 'SQL']).map(s => `<span class="badge">${s}</span>`).join('')}
  </div>
  <div class="card">
    <h2>🏆 Projects</h2>
    ${careerTemplate.projects.map(p => `<p><strong>${p.title}</strong> — ${p.desc}</p>`).join('')}
  </div>
</body>
</html>`;

  const tabs = [
    { id: 'github', label: 'GitHub README', icon: Github, content: githubReadme },
    { id: 'linkedin', label: 'LinkedIn About', icon: Linkedin, content: linkedinAbout },
    { id: 'portfolio', label: 'Portfolio HTML', icon: Globe, content: portfolioHtml },
    { id: 'project', label: 'Project Description', icon: FileText, content: careerTemplate.projectDescription },
  ];

  const activeContent = tabs.find(t => t.id === activeTab)?.content || '';

  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      {/* Header */}
      <div className="glass-card" style={{ padding: '1.25rem', background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.05))' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '2rem' }}>🌐</div>
          <div>
            <div style={{ fontWeight: 700, color: '#0f172a' }}>{career} Portfolio Generator</div>
            <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Generate your GitHub README, LinkedIn About, and portfolio copy based on your career goals.</div>
          </div>
          <button
            onClick={() => { setGenerating(true); setTimeout(() => { setGenerating(false); setGenerated(true); }, 1500); }}
            className="btn-primary" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}
          >
            <Zap size={15} /> {generating ? 'Generating...' : 'Regenerate All'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '0.6rem 1.25rem', borderRadius: '0.75rem', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
            background: activeTab === tab.id ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(255,255,255,0.7)',
            color: activeTab === tab.id ? 'white' : '#64748b',
            border: activeTab === tab.id ? 'none' : '1.5px solid #e2e8f0'
          }}>
            <tab.icon size={15} /> {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(99,102,241,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#0f172a' }}>
            {tabs.find(t => t.id === activeTab)?.label} — Generated for {name}
          </div>
          <CopyButton text={activeContent} />
        </div>
        <div style={{ padding: '1.5rem', background: '#0f172a', minHeight: '400px', overflow: 'auto' }}>
          <pre style={{ margin: 0, fontFamily: 'Fira Code, monospace', fontSize: '0.82rem', color: '#e2e8f0', lineHeight: 1.7, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {activeContent}
          </pre>
        </div>
      </div>
    </div>
  );
}
