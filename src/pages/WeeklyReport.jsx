import React from 'react';
import { useStudent } from '../context/StudentContext';
import { Calendar, CheckCircle2, ChevronRight, AlertTriangle } from 'lucide-react';

export default function WeeklyReport() {
  const { state } = useStudent();
  const career = state.profile?.careerMatch || 'AI Engineer';
  const careerGoals = {
    'AI Engineer': [
      'Complete a computer vision mini-project with OpenCV.',
      'Review neural network architectures and backpropagation.',
      'Practice mock interviews for AI engineering roles.'
    ],
    'Data Scientist': [
      'Build a sales forecasting model with time series data.',
      'Practice SQL queries for analytics interviews.',
      'Create a case study report from your latest data project.'
    ],
    'Data Analyst': [
      'Polish your SQL dashboard and visualizations.',
      'Prepare a business insights presentation for stakeholders.',
      'Review Excel pivot tables and Power BI best practices.'
    ],
    'Full Stack Developer': [
      'Deploy one full stack app with frontend and backend.',
      'Refine your React + API integration project.',
      'Prepare technical notes for coding interviews.'
    ],
    'Web Developer': [
      'Build and deploy a responsive portfolio website.',
      'Review JavaScript DOM and modern frontend patterns.',
      'Prepare a live demo of your best web project.'
    ],
    'Backend Developer': [
      'Build a secure REST API with authentication.',
      'Practice database schema design and SQL queries.',
      'Prepare API deployment notes for cloud hosting.'
    ],
    'Cybersecurity Analyst': [
      'Review network security fundamentals and tools.',
      'Practice writing a vulnerability assessment report.',
      'Prepare case study notes on incident response.'
    ],
    'Cloud Engineer': [
      'Design a cloud architecture diagram for an app.',
      'Practice Terraform or cloud deployment workflows.',
      'Review cloud security and cost optimization basics.'
    ],
  };
  const weeklyGoals = careerGoals[career] || [
    'Continue building your personal career portfolio.',
    'Review one technical topic deeply.',
    'Practice a mock interview question today.'
  ];

  return (
    <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '800px' }}>
      <div className="glass-card" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.06))' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <Calendar size={32} style={{ color: '#6366f1' }} />
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Weekly Review</h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Sunday, Jun 22, 2026</p>
          </div>
        </div>
        <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.6 }}>
          Excellent consistency this week! You completed <strong>5 tasks</strong> and increased your {career} readiness by <strong>5%</strong>.
          You focused on skills that matter for a {career} role and made steady progress toward your target career.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <h3 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981' }}>
            <CheckCircle2 size={18} /> What Went Well
          </h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: '#475569', paddingLeft: '1.25rem', listStyleType: 'disc' }}>
            <li>Maintained a perfect 7-day study streak</li>
            <li>Completed the "House Price Predictor" project</li>
            <li>Cleared the basic statistics module assessment</li>
          </ul>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <h3 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f59e0b' }}>
            <AlertTriangle size={18} /> Weak Areas
          </h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: '#475569', paddingLeft: '1.25rem', listStyleType: 'disc' }}>
            <li>Struggled with complex Pandas join operations</li>
            <li>Writing docstrings and testing could be better</li>
          </ul>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '1.25rem' }}>
        <h3 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.75rem' }}>Goals for Next Week</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {weeklyGoals.map((goal, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: '#334155' }}>
              <ChevronRight size={16} style={{ color: '#6366f1' }} />
              <span>{goal}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
