import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStudent } from '../context/StudentContext';
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, Trophy, BookOpen, Clock, ChevronRight } from 'lucide-react';

// All courses database
const COURSES_DB = {
  'python-functions': {
    id: 'python-functions',
    title: 'Python Functions & OOP',
    topic: 'Python',
    duration: '45 min',
    icon: '🐍',
    color: '#6366f1',
    taskName: 'Functions & OOP',
    content: [
      {
        type: 'text',
        heading: 'Functions in Python',
        body: `Functions are reusable blocks of code that perform a specific task. They help you organize code, avoid repetition, and make it easier to debug and test.

**Defining a Function:**
\`\`\`python
def greet(name):
    return f"Hello, {name}!"

print(greet("Rahul"))  # Output: Hello, Rahul!
\`\`\`

**Default Arguments:**
\`\`\`python
def power(base, exponent=2):
    return base ** exponent

print(power(3))     # 9
print(power(3, 3))  # 27
\`\`\`

**Lambda Functions:**
\`\`\`python
square = lambda x: x * x
print(square(5))  # 25
\`\`\``
      },
      {
        type: 'text',
        heading: 'Object-Oriented Programming (OOP)',
        body: `OOP is a programming paradigm based on the concept of "objects". Python is a fully object-oriented language.

**4 Pillars of OOP:**
1. **Encapsulation** - Bundling data and methods
2. **Inheritance** - Deriving new classes from existing ones
3. **Polymorphism** - Multiple forms of a function
4. **Abstraction** - Hiding implementation details

**Example Class:**
\`\`\`python
class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade

    def get_info(self):
        return f"{self.name}: Grade {self.grade}"

s = Student("Rahul", "A")
print(s.get_info())  # Rahul: Grade A
\`\`\``
      },
      {
        type: 'text',
        heading: 'Inheritance Example',
        body: `\`\`\`python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"

dog = Dog("Bruno")
cat = Cat("Whiskers")
print(dog.speak())  # Bruno says Woof!
print(cat.speak())  # Whiskers says Meow!
\`\`\`

**Key Takeaways:**
- Use \`def\` to create functions
- Classes are blueprints for objects
- \`__init__\` is the constructor method
- \`self\` refers to the instance of the class
- Inheritance allows code reuse`
      }
    ],
    quiz: [
      {
        q: 'What keyword is used to define a function in Python?',
        options: ['func', 'def', 'function', 'define'],
        correct: 1,
      },
      {
        q: 'Which OOP concept allows a class to inherit from another class?',
        options: ['Polymorphism', 'Encapsulation', 'Inheritance', 'Abstraction'],
        correct: 2,
      },
      {
        q: 'What does `self` refer to in a Python class method?',
        options: ['The class itself', 'The current instance', 'The parent class', 'A global variable'],
        correct: 1,
      },
      {
        q: 'What is a lambda function?',
        options: ['A recursive function', 'A function with no return', 'An anonymous one-line function', 'A built-in function'],
        correct: 2,
      },
      {
        q: 'Which method is automatically called when an object is created?',
        options: ['__start__', '__create__', '__new__', '__init__'],
        correct: 3,
      },
      {
        q: 'What is Encapsulation in OOP?',
        options: ['Deriving new classes', 'Multiple function forms', 'Bundling data and methods together', 'Hiding all code'],
        correct: 2,
      },
    ],
  },
  'numpy-basics': {
    id: 'numpy-basics',
    title: 'NumPy Fundamentals',
    topic: 'NumPy',
    duration: '50 min',
    icon: '🔢',
    color: '#06b6d4',
    taskName: 'NumPy Basics',
    content: [
      {
        type: 'text',
        heading: 'Introduction to NumPy',
        body: `NumPy (Numerical Python) is the foundational package for scientific computing in Python. It provides support for large, multi-dimensional arrays and matrices, along with mathematical functions.

**Installing and Importing:**
\`\`\`python
# Install: pip install numpy
import numpy as np
\`\`\`

**Creating Arrays:**
\`\`\`python
# From list
arr = np.array([1, 2, 3, 4, 5])

# Array of zeros
zeros = np.zeros((3, 4))  # 3x4 matrix of zeros

# Array of ones
ones = np.ones((2, 3))

# Range
rng = np.arange(0, 10, 2)  # [0, 2, 4, 6, 8]

# Linspace
lin = np.linspace(0, 1, 5)  # [0.0, 0.25, 0.5, 0.75, 1.0]
\`\`\``
      },
      {
        type: 'text',
        heading: 'Array Operations',
        body: `\`\`\`python
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

# Element-wise operations
print(a + b)   # [5, 7, 9]
print(a * b)   # [4, 10, 18]
print(a ** 2)  # [1, 4, 9]

# Dot product
print(np.dot(a, b))  # 32

# Shape and reshape
matrix = np.array([[1,2,3],[4,5,6]])
print(matrix.shape)   # (2, 3)
flat = matrix.reshape(6)  # [1,2,3,4,5,6]
\`\`\``
      },
      {
        type: 'text',
        heading: 'Statistical Functions',
        body: `\`\`\`python
data = np.array([10, 20, 30, 40, 50])

print(np.mean(data))    # 30.0
print(np.median(data))  # 30.0
print(np.std(data))     # 14.14...
print(np.min(data))     # 10
print(np.max(data))     # 50
print(np.sum(data))     # 150

# Indexing & Slicing
arr = np.array([10, 20, 30, 40, 50])
print(arr[2])      # 30
print(arr[1:4])    # [20, 30, 40]
print(arr[arr > 25])  # Boolean indexing: [30, 40, 50]
\`\`\`

**Key Takeaways:**
- NumPy arrays are faster than Python lists for numerical computation
- Broadcasting enables operations on arrays of different shapes
- Vectorized operations avoid slow Python loops`
      }
    ],
    quiz: [
      {
        q: 'What does NumPy stand for?',
        options: ['Numeric Python', 'Numerical Python', 'Number Python', 'New Python'],
        correct: 1,
      },
      {
        q: 'Which function creates an array of zeros?',
        options: ['np.zeros()', 'np.empty()', 'np.null()', 'np.blank()'],
        correct: 0,
      },
      {
        q: 'What is the output of np.arange(0, 10, 2)?',
        options: ['[0,1,2,...,10]', '[0,2,4,6,8]', '[2,4,6,8,10]', '[0,2,4,6,8,10]'],
        correct: 1,
      },
      {
        q: 'How do you get the shape of an array?',
        options: ['array.size', 'array.length', 'array.shape', 'len(array)'],
        correct: 2,
      },
      {
        q: 'Which function computes the dot product?',
        options: ['np.multiply()', 'np.product()', 'np.dot()', 'np.cross()'],
        correct: 2,
      },
    ],
  },
  'ml-linear-regression': {
    id: 'ml-linear-regression',
    title: 'Linear Regression',
    topic: 'Machine Learning',
    duration: '60 min',
    icon: '📈',
    color: '#10b981',
    taskName: 'Supervised Learning',
    content: [
      {
        type: 'text',
        heading: 'What is Linear Regression?',
        body: `Linear Regression is a fundamental supervised machine learning algorithm used to predict a continuous output variable based on one or more input features.

**Core Idea:** Find the best-fit straight line through data points.

**Equation:** y = mx + b
- y = predicted output
- m = slope (weight/coefficient)
- x = input feature
- b = intercept (bias)

**Types:**
- **Simple Linear Regression**: One input feature
- **Multiple Linear Regression**: Multiple input features`
      },
      {
        type: 'text',
        heading: 'Implementation with Scikit-Learn',
        body: `\`\`\`python
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np

# Sample data
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2, 4, 5, 4, 5])

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Create and train model
model = LinearRegression()
model.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)

# Evaluate
print(f"R² Score: {r2_score(y_test, y_pred):.2f}")
print(f"MSE: {mean_squared_error(y_test, y_pred):.2f}")
\`\`\``
      },
      {
        type: 'text',
        heading: 'Key Metrics',
        body: `**Evaluation Metrics:**

1. **R² Score (R-squared)**: Measures how well the model fits
   - Range: 0 to 1 (higher is better)
   - 1 = perfect fit, 0 = no better than mean

2. **MSE (Mean Squared Error)**: Average of squared differences
   - Lower is better

3. **RMSE (Root MSE)**: Square root of MSE, same unit as output

**Assumptions of Linear Regression:**
- Linear relationship between X and y
- No multicollinearity (features not correlated with each other)
- Homoscedasticity (constant variance of errors)
- Normally distributed residuals`
      }
    ],
    quiz: [
      {
        q: 'What type of output does Linear Regression predict?',
        options: ['Categories', 'Continuous values', 'Binary labels', 'Probabilities'],
        correct: 1,
      },
      {
        q: 'In the equation y = mx + b, what does "b" represent?',
        options: ['Slope', 'Feature', 'Intercept', 'Output'],
        correct: 2,
      },
      {
        q: 'Which Scikit-learn class is used for linear regression?',
        options: ['LinearModel()', 'LinearRegression()', 'Regression()', 'SkLearnLinear()'],
        correct: 1,
      },
      {
        q: 'What does an R² score of 1 mean?',
        options: ['Model fails completely', 'Perfect fit', 'Average fit', '50% accurate'],
        correct: 1,
      },
      {
        q: 'Which method is called to train a sklearn model?',
        options: ['.train()', '.learn()', '.fit()', '.run()'],
        correct: 2,
      },
      {
        q: 'What does MSE stand for?',
        options: ['Model Score Error', 'Mean Squared Error', 'Maximum Standard Error', 'Multiple Slope Estimate'],
        correct: 1,
      },
    ],
  },
  'statistics-basics': {
    id: 'statistics-basics',
    title: 'Statistics Fundamentals',
    topic: 'Statistics',
    duration: '55 min',
    icon: '📊',
    color: '#8b5cf6',
    taskName: 'Descriptive Statistics',
    content: [
      {
        type: 'text',
        heading: 'Descriptive Statistics',
        body: `Statistics is the science of collecting, analyzing, and interpreting data. For data science and ML, statistics is the foundation.

**Measures of Central Tendency:**
- **Mean**: Average of all values → sum/count
- **Median**: Middle value when sorted
- **Mode**: Most frequently occurring value

\`\`\`python
import numpy as np
from scipy import stats

data = [5, 2, 8, 1, 9, 3, 7, 2, 6]

mean = np.mean(data)    # 4.78
median = np.median(data)  # 5.0
mode = stats.mode(data).mode  # 2
\`\`\``
      },
      {
        type: 'text',
        heading: 'Measures of Spread',
        body: `**Variance**: Average squared deviation from mean
**Standard Deviation**: Square root of variance (same unit)
**Range**: Max - Min
**IQR (Interquartile Range)**: Q3 - Q1

\`\`\`python
data = np.array([10, 20, 30, 40, 50])
print(np.var(data))   # 200.0  (Variance)
print(np.std(data))   # 14.14  (Std Dev)
print(np.ptp(data))   # 40     (Range)

# Quartiles
q1 = np.percentile(data, 25)  # 20
q3 = np.percentile(data, 75)  # 40
iqr = q3 - q1  # 20
\`\`\``
      },
      {
        type: 'text',
        heading: 'Probability Distributions',
        body: `**Normal Distribution (Bell Curve):**
- Symmetric around mean
- 68% data within 1 std dev
- 95% data within 2 std devs
- 99.7% data within 3 std devs

**Useful Distributions:**
- **Binomial**: Success/Failure (coin flip)
- **Poisson**: Events in a fixed time
- **Normal/Gaussian**: Most natural phenomena

**Key Concepts:**
- **P-value**: Probability of observing results by chance
- **Hypothesis Testing**: H₀ (null), H₁ (alternative)
- **Correlation**: Pearson's r (-1 to +1)`
      }
    ],
    quiz: [
      {
        q: 'What is the median of [3, 1, 4, 1, 5, 9, 2]?',
        options: ['1', '3', '4', '5'],
        correct: 1,
      },
      {
        q: 'Standard deviation is the _____ of variance.',
        options: ['square', 'cube', 'square root', 'logarithm'],
        correct: 2,
      },
      {
        q: 'In a normal distribution, what % of data falls within 2 standard deviations?',
        options: ['68%', '95%', '99.7%', '50%'],
        correct: 1,
      },
      {
        q: 'What does IQR stand for?',
        options: ['Internal Quartile Range', 'Interquartile Range', 'Inverse Quartile Range', 'Initial Quarter Result'],
        correct: 1,
      },
      {
        q: 'Pearson correlation ranges from:',
        options: ['0 to 1', '-1 to 0', '-1 to 1', '0 to 100'],
        correct: 2,
      },
    ],
  },
};

// Generate a generic course if not found in DB
function getCourse(courseId) {
  if (COURSES_DB[courseId]) return COURSES_DB[courseId];
  // Fallback: generate from ID
  const title = courseId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    id: courseId,
    title,
    topic: 'General',
    duration: '30 min',
    icon: '📚',
    color: '#6366f1',
    taskName: title,
    content: [
      {
        type: 'text',
        heading: `Introduction to ${title}`,
        body: `This module covers the fundamentals of ${title}. Study the key concepts, practice with examples, and complete the quiz to mark this topic as done.\n\n**Key Learning Objectives:**\n- Understand the core principles\n- Apply concepts to real problems\n- Build practical skills for your career goal\n\n**Why This Matters:**\nEvery skill in your roadmap is carefully chosen by our AI to maximize your chances of getting your dream job. Focus and stay consistent!`,
      }
    ],
    quiz: [
      {
        q: `What is the primary purpose of studying ${title}?`,
        options: ['Career advancement', 'Personal interest only', 'No real purpose', 'Just for fun'],
        correct: 0,
      },
      {
        q: 'Consistent daily practice leads to:',
        options: ['No improvement', 'Slower learning', 'Mastery and skill development', 'Increased confusion'],
        correct: 2,
      },
      {
        q: 'The best approach to learning new concepts is:',
        options: ['Memorize without practice', 'Theory only', 'Theory + practical projects', 'Skip theory, just code'],
        correct: 2,
      },
      {
        q: 'How should you handle difficult topics?',
        options: ['Skip them entirely', 'Break them into smaller parts', 'Give up', 'Copy solutions without understanding'],
        correct: 1,
      },
      {
        q: 'What is the benefit of completing this module?',
        options: ['Waste of time', 'Unlocks the next topic in your roadmap', 'No benefit', 'Just a badge'],
        correct: 1,
      },
    ],
  };
}

export default function CoursePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useStudent();

  const course = getCourse(courseId);
  const isAlreadyCompleted = state.completedTasks.includes(course.taskName);

  const [section, setSection] = useState(0); // current content section
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizDone, setQuizDone] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);

  // timer
  useEffect(() => {
    const interval = setInterval(() => setTimeSpent(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  // reading progress
  useEffect(() => {
    const pct = Math.round(((section + 1) / course.content.length) * 100);
    setReadProgress(pct);
  }, [section, course.content.length]);

  const handleSelectAnswer = (qIdx, optIdx) => {
    if (selectedAnswers[qIdx] !== undefined) return;
    setSelectedAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleNext = () => {
    if (currentQ < course.quiz.length - 1) setCurrentQ(c => c + 1);
    else setQuizDone(true);
  };

  const score = quizDone
    ? course.quiz.filter((q, i) => selectedAnswers[i] === q.correct).length
    : 0;
  const pct = quizDone ? Math.round((score / course.quiz.length) * 100) : 0;
  const passed = pct >= 60;

  useEffect(() => {
    if (quizDone && passed && !isAlreadyCompleted) {
      dispatch({ type: 'COMPLETE_TASK', payload: course.taskName });
    }
  }, [quizDone, passed]);

  const formatTime = (s) => `${Math.floor(s / 60)}m ${s % 60}s`;

  if (isAlreadyCompleted && !quizStarted && !quizDone) {
    return (
      <div style={{ maxWidth: '700px', margin: '0 auto', display: 'grid', gap: '1.5rem' }}>
        <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', fontWeight: 600, fontSize: '0.9rem' }}>
          <ArrowLeft size={18} /> Back
        </button>
        <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
          <CheckCircle size={64} style={{ color: '#10b981', margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Already Completed!</h2>
          <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>You've already passed the quiz for <strong>{course.title}</strong>. Well done!</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={() => navigate(-1)} className="btn-primary">Back to Previous Page</button>
            <button onClick={() => { setQuizStarted(false); setSection(0); }} className="btn-secondary" style={{ background: 'rgba(99,102,241,0.08)', color: '#6366f1', border: 'none', borderRadius: '0.75rem', padding: '0.75rem 1.5rem', fontWeight: 600, cursor: 'pointer' }}>
              Review Content
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', display: 'grid', gap: '1.5rem' }}>
      {/* Back button */}
      <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#6366f1', fontWeight: 600, fontSize: '0.9rem', width: 'fit-content' }}>
        <ArrowLeft size={18} /> Back
      </button>

      {/* Header */}
      <div className="glass-card" style={{ padding: '1.5rem', background: `linear-gradient(135deg, ${course.color}15, ${course.color}05)`, borderColor: `${course.color}30` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ fontSize: '2.5rem' }}>{course.icon}</div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: course.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>{course.topic}</div>
              <h1 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a' }}>{course.title}</h1>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.35rem', fontSize: '0.8rem', color: '#64748b' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={13} /> {course.duration}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><BookOpen size={13} /> {course.content.length} sections</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>⏱️ Time: {formatTime(timeSpent)}</span>
              </div>
            </div>
          </div>
          {isAlreadyCompleted && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16,185,129,0.1)', color: '#10b981', padding: '6px 12px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700 }}>
              <CheckCircle size={14} /> Completed
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', marginBottom: '4px' }}>
            <span>Reading progress</span>
            <span>{readProgress}%</span>
          </div>
          <div style={{ height: '6px', borderRadius: '999px', background: '#e2e8f0', overflow: 'hidden' }}>
            <div style={{ width: `${readProgress}%`, height: '100%', background: `linear-gradient(90deg, ${course.color}, ${course.color}aa)`, borderRadius: '999px', transition: 'width 0.4s ease' }} />
          </div>
        </div>
      </div>

      {/* Content or Quiz */}
      {!quizStarted && !quizDone && (
        <>
          {/* Section tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
            {course.content.map((sec, idx) => (
              <button key={idx} onClick={() => setSection(idx)} style={{
                padding: '0.5rem 1rem', borderRadius: '0.65rem', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
                background: section === idx ? course.color : 'rgba(255,255,255,0.7)',
                color: section === idx ? 'white' : '#64748b',
                border: `1px solid ${section === idx ? course.color : 'rgba(99,102,241,0.15)'}`,
                transition: 'all 0.2s',
              }}>
                {idx + 1}. {sec.heading}
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', borderBottom: `3px solid ${course.color}`, paddingBottom: '0.5rem', display: 'inline-block' }}>
              {course.content[section].heading}
            </h2>
            <div style={{ lineHeight: 1.8, color: '#334155', fontSize: '0.92rem', whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
              {course.content[section].body.split('\n').map((line, li) => {
                if (line.startsWith('```')) return null;
                if (line.startsWith('**') && line.endsWith('**')) {
                  const text = line.replace(/\*\*/g, '');
                  return <p key={li} style={{ fontWeight: 700, color: '#0f172a', marginTop: '0.75rem', marginBottom: '0.25rem' }}>{text}</p>;
                }
                if (line.startsWith('- ') || line.startsWith('* ')) {
                  return <div key={li} style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem', marginBottom: '0.25rem' }}>
                    <span style={{ color: course.color, flexShrink: 0 }}>•</span>
                    <span>{line.slice(2).replace(/\*\*/g, '')}</span>
                  </div>;
                }
                if (line.match(/^\d+\./)) {
                  return <div key={li} style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem', marginBottom: '0.25rem' }}>
                    <span style={{ color: course.color, flexShrink: 0 }}>{line.split('.')[0]}.</span>
                    <span dangerouslySetInnerHTML={{ __html: line.slice(line.indexOf('.') + 1).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  </div>;
                }
                if (!line.trim()) return <br key={li} />;
                return <p key={li} style={{ marginBottom: '0.4rem' }}
                  dangerouslySetInnerHTML={{ __html: line.replace(/`([^`]+)`/g, '<code style="background:rgba(99,102,241,0.08);padding:2px 6px;border-radius:4px;font-family:monospace;font-size:0.85em;color:#6366f1">$1</code>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                />;
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem' }}>
              <button
                onClick={() => setSection(s => Math.max(0, s - 1))}
                disabled={section === 0}
                style={{ padding: '0.6rem 1.2rem', borderRadius: '0.65rem', border: '1px solid rgba(99,102,241,0.2)', background: 'transparent', cursor: section === 0 ? 'not-allowed' : 'pointer', color: '#6366f1', fontWeight: 600, opacity: section === 0 ? 0.4 : 1 }}
              >
                ← Previous
              </button>
              {section < course.content.length - 1 ? (
                <button onClick={() => setSection(s => s + 1)} className="btn-primary">
                  Next Section →
                </button>
              ) : (
                <button onClick={() => setQuizStarted(true)} style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', border: 'none', borderRadius: '0.75rem', padding: '0.75rem 1.5rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                  🎯 Take Quiz to Complete
                </button>
              )}
            </div>
          </div>
        </>
      )}

      {/* Quiz */}
      {quizStarted && !quizDone && (
        <div className="glass-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontWeight: 800, fontSize: '1.1rem' }}>Quiz — {course.title}</h2>
            <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
              Question {currentQ + 1} of {course.quiz.length}
            </div>
          </div>

          {/* Progress */}
          <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '999px', marginBottom: '1.5rem' }}>
            <div style={{ height: '100%', width: `${((currentQ + 1) / course.quiz.length) * 100}%`, background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', borderRadius: '999px', transition: 'width 0.3s' }} />
          </div>

          <p style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.25rem', lineHeight: 1.5 }}>
            {course.quiz[currentQ].q}
          </p>

          <div style={{ display: 'grid', gap: '0.65rem', marginBottom: '1.5rem' }}>
            {course.quiz[currentQ].options.map((opt, idx) => {
              const answered = selectedAnswers[currentQ] !== undefined;
              const isSelected = selectedAnswers[currentQ] === idx;
              const isCorrect = idx === course.quiz[currentQ].correct;
              let bg = 'rgba(255,255,255,0.6)';
              let border = '1px solid rgba(99,102,241,0.15)';
              let color = '#334155';
              if (answered) {
                if (isCorrect) { bg = 'rgba(16,185,129,0.1)'; border = '1px solid #10b981'; color = '#065f46'; }
                else if (isSelected) { bg = 'rgba(239,68,68,0.1)'; border = '1px solid #ef4444'; color = '#991b1b'; }
              } else if (isSelected) {
                bg = 'rgba(99,102,241,0.1)'; border = '1px solid #6366f1';
              }
              return (
                <button key={idx} onClick={() => handleSelectAnswer(currentQ, idx)} style={{
                  padding: '0.875rem 1rem', borderRadius: '0.75rem', background: bg, border, color,
                  cursor: answered ? 'default' : 'pointer', textAlign: 'left', fontWeight: 500, fontSize: '0.9rem',
                  display: 'flex', alignItems: 'center', gap: '0.75rem', transition: 'all 0.2s',
                }}>
                  <span style={{ width: '22px', height: '22px', borderRadius: '50%', border: `2px solid ${answered && isCorrect ? '#10b981' : answered && isSelected ? '#ef4444' : '#cbd5e1'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {answered && isCorrect && <CheckCircle size={14} color="#10b981" />}
                    {answered && isSelected && !isCorrect && <XCircle size={14} color="#ef4444" />}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>

          <button
            onClick={handleNext}
            disabled={selectedAnswers[currentQ] === undefined}
            className="btn-primary"
            style={{ width: '100%', opacity: selectedAnswers[currentQ] === undefined ? 0.4 : 1, cursor: selectedAnswers[currentQ] === undefined ? 'not-allowed' : 'pointer' }}
          >
            {currentQ < course.quiz.length - 1 ? 'Next Question →' : 'Submit Quiz'}
          </button>
        </div>
      )}

      {/* Results */}
      {quizDone && (
        <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>{pct >= 80 ? '🏆' : pct >= 60 ? '✅' : '😔'}</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.25rem' }}>
            {pct >= 80 ? 'Excellent!' : pct >= 60 ? 'Good Job! Passed!' : 'Keep Practicing'}
          </h2>
          <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
            You scored <strong>{score}/{course.quiz.length}</strong> ({pct}%)
          </p>

          {/* Score ring */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: passed ? '#10b981' : '#ef4444' }}>{pct}%</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Score</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#6366f1' }}>{score}</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Correct</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#f59e0b' }}>{formatTime(timeSpent)}</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Time spent</div>
            </div>
          </div>

          {passed ? (
            <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <CheckCircle size={24} style={{ color: '#10b981', flexShrink: 0 }} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, color: '#065f46' }}>Topic marked as complete!</div>
                <div style={{ fontSize: '0.8rem', color: '#047857' }}>Your progress has been updated automatically.</div>
              </div>
            </div>
          ) : (
            <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <AlertCircle size={24} style={{ color: '#f59e0b', flexShrink: 0 }} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 700, color: '#92400e' }}>Need 60% to pass. Review the content and try again!</div>
                <div style={{ fontSize: '0.8rem', color: '#b45309' }}>Focus on the sections where you made mistakes.</div>
              </div>
            </div>
          )}

          {/* Weak areas */}
          {course.quiz.some((q, i) => selectedAnswers[i] !== q.correct) && (
            <div style={{ textAlign: 'left', background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ fontWeight: 700, color: '#991b1b', marginBottom: '0.5rem', fontSize: '0.9rem' }}>🔴 Weak Areas — Review These:</div>
              {course.quiz.map((q, i) => selectedAnswers[i] !== q.correct && (
                <div key={i} style={{ fontSize: '0.8rem', color: '#7f1d1d', marginBottom: '0.25rem', display: 'flex', gap: '0.5rem' }}>
                  <span style={{ color: '#ef4444', flexShrink: 0 }}>✗</span>
                  <span>{q.q}</span>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {!passed && (
              <button onClick={() => { setQuizStarted(false); setCurrentQ(0); setSelectedAnswers({}); setQuizDone(false); setSection(0); }}
                style={{ background: 'rgba(99,102,241,0.08)', color: '#6366f1', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '0.75rem', padding: '0.75rem 1.5rem', fontWeight: 600, cursor: 'pointer' }}>
                📖 Review Content
              </button>
            )}
            <button onClick={() => navigate(-1)} className="btn-primary">
              ← Back to Roadmap
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
