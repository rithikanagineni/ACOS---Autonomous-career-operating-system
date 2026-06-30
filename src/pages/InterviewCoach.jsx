import React, { useState, useRef, useEffect } from 'react';
import { INTERVIEW_QUESTIONS } from '../data/mockData';
import { Send, Mic, MicOff, RotateCcw, Trophy, MessageSquare, Video, VideoOff, Volume2, VolumeX, Sparkles, User, Settings, CheckCircle } from 'lucide-react';
import { useStudent } from '../context/StudentContext';

const createInterviewIntro = (career) => `Hello! I am your HR Interviewer. Welcome to your live mock interview for the ${career} position. I will ask you a series of questions, evaluate your communication, technical, and confidence levels, and provide you with detailed tips for improvement. Let's begin. Question 1: Tell me about yourself and your journey into ${career}.`;

const CAREER_INTERVIEW_CATEGORIES = {
  'AI Engineer': ['Python', 'ML', 'HR', 'Projects'],
  'Data Scientist': ['Python', 'ML', 'HR', 'Projects'],
  'Data Analyst': ['Python', 'HR', 'Projects'],
  'ML Engineer': ['Python', 'ML', 'HR', 'Projects'],
  'Full Stack Developer': ['Python', 'HR', 'Projects'],
  'Web Developer': ['HR', 'Projects'],
  'Backend Developer': ['Python', 'HR', 'Projects'],
  'Cybersecurity Analyst': ['HR', 'Projects'],
  'Cloud Engineer': ['HR', 'Projects'],
};

function analyzeSpeech(text) {
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  
  // count filler words
  const fillers = ['like', 'um', 'uh', 'basically', 'actually', 'so', 'ahm', 'err'];
  let fillerCount = 0;
  words.forEach(w => {
    if (fillers.includes(w.toLowerCase().replace(/[^a-z]/g, ''))) {
      fillerCount++;
    }
  });

  // Calculate speed (simulated: words * 2.5 for speech rate)
  const speakingSpeed = wordCount > 0 ? Math.min(160, Math.max(90, Math.round(110 + Math.random() * 30 - fillerCount * 5))) : 0;
  
  return {
    wordCount,
    fillerCount,
    speakingSpeed
  };
}

function scoreAnswer(answer, question, speechStats) {
  const { wordCount, fillerCount } = speechStats;
  const hasKeywords = question.expectedKeywords?.some(k => answer.toLowerCase().includes(k.toLowerCase()));
  
  const techScore = Math.min(10, Math.round(
    (wordCount / 15) * 4 + 
    (hasKeywords ? 4 : 1) + 
    Math.random() * 2
  ));
  
  const commScore = Math.min(10, Math.round(
    wordCount > 25 ? 8 - Math.min(3, fillerCount) + Math.random() * 2 : 4 + Math.random() * 2
  ));
  
  const confScore = Math.min(10, Math.round(
    7 - Math.min(2, fillerCount) + (wordCount > 30 ? 2 : 0) + Math.random() * 2
  ));
  
  return { 
    technical: Math.max(1, techScore), 
    communication: Math.max(1, commScore), 
    confidence: Math.max(1, confScore) 
  };
}

export default function InterviewCoach() {
  const { state, dispatch } = useStudent();
  const career = state.profile?.careerMatch || 'AI Engineer';
  const introText = createInterviewIntro(career);
  const categories = CAREER_INTERVIEW_CATEGORIES[career] || ['Python', 'ML', 'HR', 'Projects'];
  const questions = INTERVIEW_QUESTIONS.filter(q => categories.includes(q.category) || q.category === 'HR');

  const [inCall, setInCall] = useState(false);
  const [messages, setMessages] = useState([{ id: 0, role: 'ai', text: introText }]);
  const [input, setInput] = useState('');
  const [qIdx, setQIdx] = useState(0);
  const [scores, setScores] = useState([]);
  const [done, setDone] = useState(false);
  
  // Device states
  const [cameraActive, setCameraActive] = useState(true);
  const [micActive, setMicActive] = useState(false);
  const [voiceActive, setVoiceActive] = useState(true);
  const [isHrSpeaking, setIsHrSpeaking] = useState(false);
  const [speechStats, setSpeechStats] = useState({ wordCount: 0, fillerCount: 0, speakingSpeed: 0 });

  // Refs for media
  const localVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Speak out HR text using browser Web Speech API
  const speakText = (text) => {
    if (!voiceActive) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/\*\*.*?\*\*/g, '').replace(/#.*?\n/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Find a good female HR English voice if possible
    const voices = window.speechSynthesis.getVoices();
    const engVoice = voices.find(v => v.lang.includes('EN') || v.lang.includes('en'));
    if (engVoice) utterance.voice = engVoice;
    
    utterance.rate = 1.0;
    utterance.onstart = () => setIsHrSpeaking(true);
    utterance.onend = () => setIsHrSpeaking(false);
    utterance.onerror = () => setIsHrSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  // Start webcam feed
  const startCamera = async () => {
    try {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(t => t.stop());
      }
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      setCameraActive(true);
    } catch (err) {
      console.warn("Could not start camera:", err);
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(t => t.stop());
      localStreamRef.current = null;
    }
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  // Start Speech Recognition
  const startSpeechRecognition = () => {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      console.warn("Speech recognition not supported in this browser.");
      return;
    }
    const rec = new SpeechRec();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = 'en-US';

    rec.onresult = (e) => {
      let finalTranscript = '';
      for (let i = e.resultIndex; i < e.results.length; ++i) {
        if (e.results[i].isFinal) {
          finalTranscript += e.results[i][0].transcript;
        }
      }
      if (finalTranscript) {
        setInput(prev => prev + (prev ? ' ' : '') + finalTranscript);
      }
    };

    rec.onerror = (e) => {
      console.error("Speech recognition error:", e);
    };

    rec.onend = () => {
      if (micActive) rec.start(); // Auto-restart if still active
    };

    recognitionRef.current = rec;
    rec.start();
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.onend = null;
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
  };

  // Handle toggles
  useEffect(() => {
    if (inCall && cameraActive) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [inCall, cameraActive]);

  useEffect(() => {
    if (inCall && micActive) {
      startSpeechRecognition();
    } else {
      stopSpeechRecognition();
    }
    return () => stopSpeechRecognition();
  }, [inCall, micActive]);

  // Read aloud first prompt on joining
  useEffect(() => {
    if (inCall) {
      speakText(introText);
    }
    return () => window.speechSynthesis.cancel();
  }, [inCall, introText]);

  // Scroll to bottom on messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Live text typing statistics
  useEffect(() => {
    if (input.trim()) {
      const stats = analyzeSpeech(input);
      setSpeechStats(stats);
    }
  }, [input]);

  const handleJoinCall = () => {
    setInCall(true);
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const currentQ = questions[qIdx];
    if (!currentQ) return;

    const stats = analyzeSpeech(input);
    const hasKeywords = currentQ.expectedKeywords?.some(k => input.toLowerCase().includes(k.toLowerCase()));
    const wordCount = input.trim().split(/\s+/).filter(Boolean).length;
    const needsMoreDetail = wordCount < 10 || (!hasKeywords && currentQ.category !== 'HR');

    const userMsg = { id: Date.now(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setSpeechStats({ wordCount: 0, fillerCount: 0, speakingSpeed: 0 });

    if (needsMoreDetail) {
      const followUp = wordCount < 10
        ? `I need a bit more detail on Question ${qIdx + 1}. Please explain your answer again with some examples and specifics.`
        : `That answer was a bit off-topic. Please try again for Question ${qIdx + 1}, focusing on ${currentQ.expectedKeywords?.slice(0, 3).join(', ')}.`;
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', text: followUp }]);
      speakText(followUp);
      return;
    }

    const sc = scoreAnswer(input, currentQ, stats);
    setScores(prev => [...prev, { question: currentQ.question, ...sc }]);

    const nextIdx = qIdx + 1;
    setTimeout(() => {
      if (nextIdx >= questions.length) {
        setDone(true);
        const finalStats = {
          technical: Math.round(sc.technical),
          communication: Math.round(sc.communication),
          confidence: Math.round(sc.confidence)
        };
        const avgPct = Math.round((finalStats.technical + finalStats.communication + finalStats.confidence) / 3 * 10);
        
        const feedbackText = `✅ **Interview Completed Successfully!**\n\nExcellent effort! Here is your feedback overview:\n\n📊 **Technical Depth:** ${finalStats.technical}/10\n💬 **Communication Clarity:** ${finalStats.communication}/10\n💪 **Confidence Level:** ${finalStats.confidence}/10\n\n**Overall Rating: ${avgPct}%**\n\n🎯 **HR Coach Tips:**\n${finalStats.technical >= 7 ? '• Great command of technical terms.' : '• Work on details like memory structures, ML overfitting preventions.'}\n${finalStats.communication >= 7 ? '• Good articulation and structured flow.' : '• Reduce filler words (like, um) to project stronger command.'}`;
        
        setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', text: feedbackText }]);
        speakText("Interview complete. Thank you for your time. Review your final report on the scorecard.");
        
        // Add mock interview to context history
        dispatch({
          type: 'ADD_INTERVIEW',
          payload: { date: new Date().toLocaleDateString(), avgScore: Math.round((finalStats.technical + finalStats.communication + finalStats.confidence) / 3) }
        });
        
        // Mark badge
        if (avgPct >= 70) {
          dispatch({ type: 'ADD_BADGE', payload: 'Interview Ready' });
        }
      } else {
        setQIdx(nextIdx);
        const hrResponse = `Great. Let's move on to the next question. Question ${nextIdx + 1}: ${questions[nextIdx].question}`;
        setMessages(prev => [...prev, { id: Date.now() + 1, role: 'ai', text: hrResponse }]);
        speakText(hrResponse);
      }
    }, 1500);
  };

  const reset = () => {
    setMessages([{ id: 0, role: 'ai', text: introText }]);
    setInput('');
    setQIdx(0);
    setScores([]);
    setDone(false);
    setSpeechStats({ wordCount: 0, fillerCount: 0, speakingSpeed: 0 });
    speakText(introText);
  };

  const avgScore = scores.length > 0 ? {
    technical: Math.round(scores.reduce((a, s) => a + s.technical, 0) / scores.length),
    communication: Math.round(scores.reduce((a, s) => a + s.communication, 0) / scores.length),
    confidence: Math.round(scores.reduce((a, s) => a + s.confidence, 0) / scores.length),
  } : null;

  if (!inCall) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', padding: '1rem' }}>
        <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center', maxWidth: '580px', width: '100%', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ width: '80px', height: '80px', background: 'rgba(99,102,241,0.1)', color: '#6366f1', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContext: 'center', justifyContent: 'center', margin: '0 auto' }}>
            <Video size={40} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.5rem' }}>Live AI Mock Interview Room</h2>
            <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.6 }}>
              Step into a real-time face-to-face video and voice call simulation with our AI Senior HR Recruiter. 
              The recruiter will speak to you and analyze your verbal answers, camera confidence, speed, and word choices.
            </p>
          </div>

          <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: '1rem', padding: '1rem', textAlign: 'left', fontSize: '0.82rem', color: '#b45309' }}>
            <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>⚙️ Quick Requirements Check:</div>
            <ul style={{ paddingLeft: '1.25rem', display: 'grid', gap: '4px' }}>
              <li>Grant camera and microphone permissions when prompted.</li>
              <li>Toggle Speech-to-Text mic inside the room to speak your answers aloud.</li>
              <li>Enable audio to hear the recruiter speak.</li>
            </ul>
          </div>

          <button onClick={handleJoinCall} className="btn-primary" style={{ padding: '1rem', fontWeight: 700, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Sparkles size={18} /> Join Live Call Room
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', height: 'calc(100vh - 120px)', minHeight: '580px' }}>
      
      {/* Main Call Console */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
        
        {/* Videos Container */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', flex: 1, minHeight: '260px' }}>
          
          {/* Recruiter Video Panel */}
          <div className="glass-card" style={{ background: '#0f172a', color: 'white', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0,0,0,0.5)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '6px', zIndex: 10 }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
              Senior AI Recruiter (Active)
            </div>
            
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', background: 'radial-gradient(circle, #1e293b 0%, #0f172a 100%)' }}>
              {isHrSpeaking ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', height: '60px' }}>
                  {[0.4, 0.9, 0.5, 0.8, 0.3, 0.7, 0.5, 0.9, 0.4].map((v, i) => (
                    <div key={i} style={{
                      width: '6px',
                      background: 'linear-gradient(to top, #6366f1, #8b5cf6)',
                      borderRadius: '3px',
                      height: '100%',
                      animation: 'sound-wave 1.2s ease-in-out infinite alternate',
                      animationDelay: `${i * 0.1}s`
                    }} />
                  ))}
                </div>
              ) : (
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>
                  👩‍💼
                </div>
              )}
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 500 }}>
                {isHrSpeaking ? 'Recruiter is speaking...' : 'Recruiter is listening...'}
              </div>
            </div>
          </div>

          {/* Student Live Camera Feed Panel */}
          <div className="glass-card" style={{ background: '#0f172a', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0,0,0,0.5)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '6px', zIndex: 10, color: 'white' }}>
              <User size={12} /> Student (You)
            </div>
            
            {cameraActive ? (
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }}
              />
            ) : (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '0.5rem', background: '#1e293b' }}>
                <VideoOff size={36} style={{ color: '#64748b' }} />
                <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Camera is turned off</span>
              </div>
            )}

            {/* Video Controls overlay */}
            <div style={{ position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.5rem', zIndex: 10 }}>
              <button
                onClick={() => setCameraActive(!cameraActive)}
                style={{
                  background: cameraActive ? 'rgba(255,255,255,0.2)' : '#ef4444',
                  border: 'none', borderRadius: '50%', width: '36px', height: '36px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'white'
                }}
              >
                {cameraActive ? <Video size={16} /> : <VideoOff size={16} />}
              </button>
              <button
                onClick={() => setMicActive(!micActive)}
                style={{
                  background: micActive ? '#10b981' : 'rgba(255,255,255,0.2)',
                  border: 'none', borderRadius: '50%', width: '36px', height: '36px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'white'
                }}
              >
                {micActive ? <Mic size={16} /> : <MicOff size={16} />}
              </button>
              <button
                onClick={() => setVoiceActive(!voiceActive)}
                style={{
                  background: voiceActive ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.5)',
                  border: 'none', borderRadius: '50%', width: '36px', height: '36px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'white'
                }}
              >
                {voiceActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Live Conversation Transcript Panel */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '240px', overflow: 'hidden', padding: 0 }}>
          <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155' }}>💬 Live Translation / Chat Transcript</span>
            {done && (
              <button onClick={reset} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: '#6366f1', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 600 }}>
                <RotateCcw size={12} /> Restart Call
              </button>
            )}
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {messages.map(m => (
              <div key={m.id} style={{ display: 'flex', gap: '0.5rem', flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
                <div style={{
                  fontSize: '0.8rem', padding: '0.6rem 0.85rem', borderRadius: '0.75rem', maxWidth: '85%', lineHeight: 1.5,
                  background: m.role === 'ai' ? '#f1f5f9' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  color: m.role === 'ai' ? '#334155' : 'white',
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start'
                }}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Typing / Input bar */}
          {!done && (
            <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '0.5rem', background: '#f8fafc' }}>
              <input
                type="text"
                placeholder={micActive ? "🎙️ Speaking... Voice recognition input active..." : "Type your answer or speak using microphone..."}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                style={{ flex: 1, border: '1px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.85rem', outline: 'none' }}
              />
              <button onClick={() => setMicActive(!micActive)} style={{ background: micActive ? '#ef4444' : 'rgba(99,102,241,0.08)', color: micActive ? 'white' : '#6366f1', border: 'none', borderRadius: '8px', padding: '0 10px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                {micActive ? <MicOff size={16} /> : <Mic size={16} />}
              </button>
              <button onClick={sendMessage} className="btn-primary" style={{ padding: '0 12px', fontSize: '0.8rem' }}>
                Answer
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Side Stats & Report Console */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%', overflowY: 'auto' }}>
        
        {/* Live score statistics */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontWeight: 800, fontSize: '0.875rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Trophy size={16} style={{ color: '#f59e0b' }} /> AI Recruiter Scores
          </div>
          {avgScore ? (
            <div style={{ display: 'grid', gap: '0.85rem' }}>
              {[
                { label: '⚙️ Technical Depth', value: avgScore.technical, color: '#6366f1' },
                { label: '💬 Communication Skill', value: avgScore.communication, color: '#10b981' },
                { label: '💪 Camera/Voice Confidence', value: avgScore.confidence, color: '#f59e0b' },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600 }}>{s.label}</span>
                    <span style={{ fontWeight: 700, color: s.color }}>{s.value}/10</span>
                  </div>
                  <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '999px' }}>
                    <div style={{ width: `${s.value * 10}%`, height: '100%', background: s.color, borderRadius: '999px' }} />
                  </div>
                </div>
              ))}
              <div style={{ padding: '0.75rem', background: 'rgba(99,102,241,0.06)', borderRadius: '0.75rem', textAlign: 'center', marginTop: '0.5rem' }}>
                <div style={{ fontWeight: 900, color: '#6366f1', fontSize: '1.4rem' }}>
                  {Math.round((avgScore.technical + avgScore.communication + avgScore.confidence) / 3 * 10)}%
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Avg Interview Fit Score</div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.8rem', padding: '1rem 0' }}>
              <MessageSquare size={24} style={{ margin: '0 auto 0.5rem', opacity: 0.3 }} />
              Answer the first question to begin live calculations
            </div>
          )}
        </div>

        {/* Real-time speech metrics */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontWeight: 800, fontSize: '0.875rem', marginBottom: '0.75rem' }}>🎙️ Live Speech Metrics</div>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
              <span style={{ color: '#64748b' }}>Speech Rate</span>
              <span style={{ fontWeight: 700, color: '#334155' }}>
                {speechStats.speakingSpeed > 0 ? `${speechStats.speakingSpeed} WPM` : '0 WPM'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
              <span style={{ color: '#64748b' }}>Filler Words ("um", "like")</span>
              <span style={{ fontWeight: 700, color: speechStats.fillerCount > 2 ? '#ef4444' : '#10b981' }}>
                {speechStats.fillerCount} used
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
              <span style={{ color: '#64748b' }}>Word Count</span>
              <span style={{ fontWeight: 700, color: '#334155' }}>{speechStats.wordCount} words</span>
            </div>
          </div>
        </div>

        {/* Performance tips */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ fontWeight: 800, fontSize: '0.875rem', marginBottom: '0.75rem' }}>💡 Improvement Tips</div>
          <div style={{ display: 'grid', gap: '0.5rem', fontSize: '0.78rem', color: '#475569', lineHeight: 1.5 }}>
            <div>🎯 Use the STAR structure (Situation, Task, Action, Result) for HR answers.</div>
            <div>💡 Be concise. Try to avoid repeating phrases or saying "like" too often.</div>
            <div>🤖 Highlight your knowledge of Python, NumPy, and ML algorithms specifically.</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes sound-wave {
          0% { transform: scaleY(0.15); }
          100% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}
