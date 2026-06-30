import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Roadmap from './pages/Roadmap';
import SkillAssessment from './pages/SkillAssessment';
import LearningResources from './pages/LearningResources';
import ProjectBuilder from './pages/ProjectBuilder';
import InterviewCoach from './pages/InterviewCoach';
import ResumeBuilder from './pages/ResumeBuilder';
import PortfolioGenerator from './pages/PortfolioGenerator';
import GitHubReviewer from './pages/GitHubReviewer';
import FinancialAdvisor from './pages/FinancialAdvisor';
import TeamFormation from './pages/TeamFormation';
import ProgressDashboard from './pages/ProgressDashboard';
import WeeklyReport from './pages/WeeklyReport';
import Motivation from './pages/Motivation';
import CoursePage from './pages/CoursePage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AllRewardsPage from './pages/AllRewardsPage';
import { useStudent } from './context/StudentContext';

function AppLayout({ children }) {
  const { state } = useStudent();

  if (!state.profile) {
    return <Navigate to="/auth" replace />;
  }

  return <Layout>{children}</Layout>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/onboarding" element={<Navigate to="/auth" replace />} />

        <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
        <Route path="/roadmap" element={<AppLayout><Roadmap /></AppLayout>} />
        <Route path="/skills" element={<AppLayout><SkillAssessment /></AppLayout>} />
        <Route path="/resources" element={<AppLayout><LearningResources /></AppLayout>} />
        <Route path="/projects" element={<AppLayout><ProjectBuilder /></AppLayout>} />
        <Route path="/interview" element={<AppLayout><InterviewCoach /></AppLayout>} />
        <Route path="/resume" element={<AppLayout><ResumeBuilder /></AppLayout>} />
        <Route path="/portfolio" element={<AppLayout><PortfolioGenerator /></AppLayout>} />
        <Route path="/github" element={<AppLayout><GitHubReviewer /></AppLayout>} />
        <Route path="/finance" element={<AppLayout><FinancialAdvisor /></AppLayout>} />
        <Route path="/team" element={<AppLayout><TeamFormation /></AppLayout>} />
        <Route path="/progress" element={<AppLayout><ProgressDashboard /></AppLayout>} />
        <Route path="/weekly" element={<AppLayout><WeeklyReport /></AppLayout>} />
        <Route path="/motivation" element={<AppLayout><Motivation /></AppLayout>} />
        <Route path="/rewards" element={<AppLayout><AllRewardsPage /></AppLayout>} />

        {/* Dynamic routes */}
        <Route path="/course/:courseId" element={<AppLayout><CoursePage /></AppLayout>} />
        <Route path="/project/:projectId" element={<AppLayout><ProjectDetailPage /></AppLayout>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
