import React from 'react';
import { useStudent } from '../context/StudentContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Award, Calendar, BookOpen } from 'lucide-react';

const WEEKLY_HOURS = [
  { name: 'Week 1', hours: 8 },
  { name: 'Week 2', hours: 10 },
  { name: 'Week 3', hours: 12 },
  { name: 'Week 4', hours: 9 },
  { name: 'Week 5', hours: 15 },
  { name: 'Week 6', hours: 14 }
];

export default function ProgressDashboard() {
  const { state } = useStudent();

  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {[
          { label: 'Weekly Study Hours', value: `${state.progress.totalHours} hrs`, icon: Calendar, color: '#6366f1', bg: 'rgba(99,102,241,0.08)' },
          { label: 'Streak', value: `${state.progress.streak} Days`, icon: TrendingUp, color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)' },
          { label: 'Courses Completed', value: `${state.progress.coursesFinished}`, icon: BookOpen, color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
          { label: 'Projects Built', value: `${state.progress.projectsBuilt}`, icon: Award, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
        ].map((s, i) => (
          <div key={i} className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: s.bg, color: s.color, padding: '10px', borderRadius: '0.75rem' }}>
              <s.icon size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>{s.value}</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontWeight: 700, marginBottom: '1.5rem' }}>Study Activity (Last 6 Weeks)</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={WEEKLY_HOURS}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="hours" stroke="#6366f1" strokeWidth={3} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
