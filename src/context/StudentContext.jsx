import React, { createContext, useContext, useReducer, useEffect } from 'react';

const StudentContext = createContext(null);

const INITIAL_NOTIFICATIONS = [
  { id: 1, text: 'Welcome to ACOS! Complete your onboarding to get started.', type: 'info', time: '2 min ago', read: false },
  { id: 2, text: 'Your career roadmap is ready. Analyze with AI to unlock it!', type: 'tip', time: '5 min ago', read: false },
  { id: 3, text: 'New scholarship added: AICTE NSP - Apply by July 31st', type: 'alert', time: '1 hour ago', read: true },
];

const initialState = {
  profile: null, // Stores logged in user details: { email, name, degree, year, college, location, skills, codingLevel, englishLevel, careerGoal, interest, hours, preferredLang, studentLevel, careerMatch }
  onboardingComplete: false,
  roadmapAnalyzed: false,
  resumeGenerated: false,
  progress: {
    roadmapCompletion: 0,
    streak: 0,
    totalHours: 0,
    projectsBuilt: 0,
    coursesFinished: 0,
    tasksCompleted: 0,
  },
  lastTaskCompletionDate: null,
  skills: {
    Python: 75,
    Statistics: 30,
    'Machine Learning': 25,
    'Deep Learning': 10,
    SQL: 50,
    Git: 45,
    Projects: 20,
    Communication: 60,
  },
  completedTasks: [],
  completedResources: [],
  completedProjects: [],
  interviewHistory: [],
  weeklyReport: null,
  notifications: INITIAL_NOTIFICATIONS,
  badges: ['First Step', 'Profile Complete'],
};

const ALL_TASKS_COUNT = 48; // total tasks in 6-month roadmap

function studentReducer(state, action) {
  switch (action.type) {
    case 'SIGN_IN':
      // load profile, sync context
      return {
        ...state,
        profile: action.payload,
        onboardingComplete: true,
        roadmapAnalyzed: action.payload.roadmapAnalyzed || false,
        resumeGenerated: action.payload.resumeGenerated || false,
        completedTasks: action.payload.completedTasks || [],
        completedResources: action.payload.completedResources || [],
        completedProjects: action.payload.completedProjects || [],
        progress: action.payload.progress || state.progress,
        lastTaskCompletionDate: action.payload.lastTaskCompletionDate || null,
        badges: action.payload.badges || state.badges,
        notifications: [
          { id: Date.now(), text: `👋 Welcome back, ${action.payload.name}! Let's continue your career prep.`, type: 'success', time: 'Just now', read: false },
          ...state.notifications,
        ],
      };

    case 'SIGN_UP':
      // setup active profile, register
      return {
        ...state,
        profile: action.payload,
        onboardingComplete: true,
        roadmapAnalyzed: false,
        resumeGenerated: false,
        completedTasks: [],
        completedResources: [],
        completedProjects: [],
        lastTaskCompletionDate: null,
        progress: {
          roadmapCompletion: 0,
          streak: 0,
          totalHours: 0,
          projectsBuilt: 0,
          coursesFinished: 0,
          tasksCompleted: 0,
        },
        badges: ['First Step', 'Profile Complete'],
        notifications: [
          { id: Date.now(), text: `🎉 Account created! Welcome, ${action.payload.name}. Your personalized GPS roadmap is ready.`, type: 'success', time: 'Just now', read: false },
          ...state.notifications,
        ],
      };

    case 'SET_PROFILE':
      return {
        ...state,
        profile: action.payload,
        onboardingComplete: true,
      };

    case 'ANALYZE_ROADMAP': {
      const updatedProfile = { ...state.profile, roadmapAnalyzed: true };
      // Save to localStorage if logged in
      if (state.profile?.email) {
        const accounts = JSON.parse(localStorage.getItem('acos_accounts') || '{}');
        if (accounts[state.profile.email]) {
          accounts[state.profile.email] = {
            ...accounts[state.profile.email],
            roadmapAnalyzed: true,
          };
          localStorage.setItem('acos_accounts', JSON.stringify(accounts));
        }
      }
      return {
        ...state,
        roadmapAnalyzed: true,
        profile: updatedProfile,
        notifications: [
          { id: Date.now(), text: '🗺️ Your AI Career Roadmap has been generated! Start with Month 1.', type: 'success', time: 'Just now', read: false },
          ...state.notifications,
        ],
      };
    }

    case 'COMPLETE_TASK': {
      if (state.completedTasks.includes(action.payload)) return state;
      const newCompleted = [...state.completedTasks, action.payload];
      const pct = Math.round((newCompleted.length / ALL_TASKS_COUNT) * 100);
      const today = new Date().toLocaleDateString();
      const streakGain = state.lastTaskCompletionDate !== today ? 1 : 0;
      const newBadges = [...state.badges];
      const newNotifs = [
        { id: Date.now(), text: `✅ Task completed: "${action.payload}". Keep it up!`, type: 'success', time: 'Just now', read: false },
        ...state.notifications,
      ];
      if (newCompleted.length === 1 && !state.badges.includes('First Task'))
        newBadges.push('First Task');
      if (newCompleted.length === 5 && !state.badges.includes('5 Tasks Done'))
        newBadges.push('5 Tasks Done');
      if (newCompleted.length === 10 && !state.badges.includes('10 Tasks Done'))
        newBadges.push('10 Tasks Done');

      const nextProgress = {
        ...state.progress,
        roadmapCompletion: pct,
        tasksCompleted: newCompleted.length,
        coursesFinished: state.progress.coursesFinished + 1,
        totalHours: state.progress.totalHours + 1,
        streak: state.progress.streak + streakGain,
      };

      // save to localStorage
      if (state.profile?.email) {
        const accounts = JSON.parse(localStorage.getItem('acos_accounts') || '{}');
        if (accounts[state.profile.email]) {
          accounts[state.profile.email] = {
            ...accounts[state.profile.email],
            completedTasks: newCompleted,
            progress: nextProgress,
            badges: newBadges,
            lastTaskCompletionDate: today,
          };
          localStorage.setItem('acos_accounts', JSON.stringify(accounts));
        }
      }

      return {
        ...state,
        completedTasks: newCompleted,
        badges: newBadges,
        notifications: newNotifs,
        progress: nextProgress,
        lastTaskCompletionDate: today,
      };
    }

    case 'COMPLETE_RESOURCE': {
      if (state.completedResources.includes(action.payload)) return state;
      const nextResources = [...state.completedResources, action.payload];
      const today = new Date().toLocaleDateString();
      const streakGain = state.lastTaskCompletionDate !== today ? 1 : 0;
      const nextProgress = {
        ...state.progress,
        totalHours: state.progress.totalHours + 1,
        coursesFinished: state.progress.coursesFinished + 1,
        streak: state.progress.streak + streakGain,
      };
      const newBadges = [...state.badges];
      if (nextResources.length === 1 && !newBadges.includes('Learning Momentum')) newBadges.push('Learning Momentum');

      // save to localStorage
      if (state.profile?.email) {
        const accounts = JSON.parse(localStorage.getItem('acos_accounts') || '{}');
        if (accounts[state.profile.email]) {
          accounts[state.profile.email] = {
            ...accounts[state.profile.email],
            completedResources: nextResources,
            progress: nextProgress,
            badges: newBadges,
            lastTaskCompletionDate: today,
          };
          localStorage.setItem('acos_accounts', JSON.stringify(accounts));
        }
      }

      return {
        ...state,
        completedResources: nextResources,
        progress: nextProgress,
        badges: newBadges,
        lastTaskCompletionDate: today,
        notifications: [
          { id: Date.now(), text: `📚 Resource completed: "${action.payload}". Quiz passed!`, type: 'success', time: 'Just now', read: false },
          ...state.notifications,
        ],
      };
    }

    case 'ADD_PROJECT': {
      const newBadges = [...state.badges];
      const newProjects = [...state.completedProjects, action.payload];
      if (!state.badges.includes('First Project')) newBadges.push('First Project');
      if (newProjects.length >= 3 && !state.badges.includes('3 Projects')) newBadges.push('3 Projects');
      
      const nextProgress = { ...state.progress, projectsBuilt: newProjects.length };

      // save to localStorage
      if (state.profile?.email) {
        const accounts = JSON.parse(localStorage.getItem('acos_accounts') || '{}');
        if (accounts[state.profile.email]) {
          accounts[state.profile.email] = {
            ...accounts[state.profile.email],
            completedProjects: newProjects,
            badges: newBadges,
            progress: nextProgress,
          };
          localStorage.setItem('acos_accounts', JSON.stringify(accounts));
        }
      }

      return {
        ...state,
        completedProjects: newProjects,
        badges: newBadges,
        progress: nextProgress,
        notifications: [
          { id: Date.now(), text: `🚀 Project submitted: "${action.payload}"! Great work!`, type: 'success', time: 'Just now', read: false },
          ...state.notifications,
        ],
      };
    }

    case 'ADD_INTERVIEW': {
      const nextInterviewHistory = [...state.interviewHistory, action.payload];
      
      // save to localStorage
      if (state.profile?.email) {
        const accounts = JSON.parse(localStorage.getItem('acos_accounts') || '{}');
        if (accounts[state.profile.email]) {
          accounts[state.profile.email] = {
            ...accounts[state.profile.email],
            interviewHistory: nextInterviewHistory,
          };
          localStorage.setItem('acos_accounts', JSON.stringify(accounts));
        }
      }

      return {
        ...state,
        interviewHistory: nextInterviewHistory,
        notifications: [
          { id: Date.now(), text: `🎤 Mock interview completed! Score: ${action.payload.avgScore}/10`, type: 'info', time: 'Just now', read: false },
          ...state.notifications,
        ],
      };
    }

    case 'GENERATE_RESUME': {
      const updatedProfile = { ...state.profile, resumeGenerated: true };
      // save to localStorage
      if (state.profile?.email) {
        const accounts = JSON.parse(localStorage.getItem('acos_accounts') || '{}');
        if (accounts[state.profile.email]) {
          accounts[state.profile.email] = {
            ...accounts[state.profile.email],
            resumeGenerated: true,
          };
          localStorage.setItem('acos_accounts', JSON.stringify(accounts));
        }
      }
      return {
        ...state,
        resumeGenerated: true,
        profile: updatedProfile,
        notifications: [
          { id: Date.now(), text: '📄 Your AI-powered resume has been generated with ATS optimization!', type: 'success', time: 'Just now', read: false },
          ...state.notifications,
        ],
      };
    }

    case 'UPDATE_PROGRESS':
      return { ...state, progress: { ...state.progress, ...action.payload } };

    case 'UPDATE_SKILLS':
      return { ...state, skills: { ...state.skills, ...action.payload } };

    case 'ADD_BADGE':
      if (state.badges.includes(action.payload)) return state;
      return { ...state, badges: [...state.badges, action.payload] };

    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [
          { id: Date.now(), ...action.payload, read: false, time: 'Just now' },
          ...state.notifications,
        ],
      };

    case 'MARK_NOTIFICATIONS_READ':
      return {
        ...state,
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
      };

    case 'SEND_CONNECTION': {
      const { name } = action.payload;
      return {
        ...state,
        notifications: [
          { id: Date.now(), text: `🤝 Connection request sent to ${name}! They'll respond soon.`, type: 'info', time: 'Just now', read: false },
          ...state.notifications,
        ],
      };
    }

    case 'RESET':
      return { ...initialState };

    default:
      return state;
  }
}

export function StudentProvider({ children }) {
  const [state, dispatch] = useReducer(studentReducer, initialState);
  return (
    <StudentContext.Provider value={{ state, dispatch }}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  const ctx = useContext(StudentContext);
  if (!ctx) throw new Error('useStudent must be used within StudentProvider');
  return ctx;
}
