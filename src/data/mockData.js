// Mock data for all AI agents

export const CAREER_ROADMAPS = {
  'AI Engineer': {
    months: [
      {
        month: 1, title: 'Python Mastery', color: '#6366f1',
        weeks: [
          { week: 1, tasks: ['Functions & OOP', 'List Comprehensions', 'Error Handling'] },
          { week: 2, tasks: ['NumPy Basics', 'Pandas DataFrames', 'Data Visualization'] },
          { week: 3, tasks: ['File I/O', 'APIs & Requests', 'Virtual Environments'] },
          { week: 4, tasks: ['Mini Project: Data Analyzer', 'Git & GitHub Setup'] },
        ]
      },
      {
        month: 2, title: 'Statistics & Math', color: '#8b5cf6',
        weeks: [
          { week: 5, tasks: ['Descriptive Statistics', 'Probability Theory', 'Distributions'] },
          { week: 6, tasks: ['Hypothesis Testing', 'Correlation & Regression', 'EDA'] },
          { week: 7, tasks: ['Linear Algebra Basics', 'Matrix Operations', 'PCA'] },
          { week: 8, tasks: ['Project: Statistical Analysis Report'] },
        ]
      },
      {
        month: 3, title: 'Machine Learning', color: '#06b6d4',
        weeks: [
          { week: 9, tasks: ['Supervised Learning', 'Linear & Logistic Regression', 'Decision Trees'] },
          { week: 10, tasks: ['SVM, KNN, Random Forest', 'Model Evaluation', 'Cross Validation'] },
          { week: 11, tasks: ['Unsupervised Learning', 'Clustering', 'Dimensionality Reduction'] },
          { week: 12, tasks: ['Project: House Price Predictor (Kaggle)'] },
        ]
      },
      {
        month: 4, title: 'Deep Learning', color: '#10b981',
        weeks: [
          { week: 13, tasks: ['Neural Networks Basics', 'Backpropagation', 'TensorFlow/Keras'] },
          { week: 14, tasks: ['CNNs & Image Classification', 'Transfer Learning', 'Data Augmentation'] },
          { week: 15, tasks: ['RNNs & LSTMs', 'NLP Basics', 'Transformers Introduction'] },
          { week: 16, tasks: ['Project: Image Classifier + Sentiment Analysis'] },
        ]
      },
      {
        month: 5, title: 'Projects & Portfolio', color: '#f59e0b',
        weeks: [
          { week: 17, tasks: ['Resume Screening AI', 'Fake News Detector'] },
          { week: 18, tasks: ['Chatbot with OpenAI API', 'Deploy on Hugging Face'] },
          { week: 19, tasks: ['GitHub Portfolio Setup', 'LinkedIn Optimization'] },
          { week: 20, tasks: ['Capstone: End-to-End ML Pipeline'] },
        ]
      },
      {
        month: 6, title: 'Interview Prep', color: '#ef4444',
        weeks: [
          { week: 21, tasks: ['DSA Revision: Arrays, Strings', 'SQL Advanced Queries'] },
          { week: 22, tasks: ['System Design Basics', 'ML Theory Questions'] },
          { week: 23, tasks: ['Mock Interviews x5', 'Behavioral Questions STAR Method'] },
          { week: 24, tasks: ['Final Mock Interview', 'Job Applications: 10+ companies'] },
        ]
      },
    ]
  },
  'Data Scientist': {
    months: [
      { month: 1, title: 'Python & Data Wrangling', color: '#6366f1', weeks: [
          { week: 1, tasks: ['Python Refresher', 'Pandas DataFrames', 'Data Cleaning'] },
          { week: 2, tasks: ['NumPy Arrays', 'Data Visualization', 'Matplotlib/Seaborn'] },
          { week: 3, tasks: ['Exploratory Data Analysis', 'Feature Engineering', 'Missing Value Handling'] },
          { week: 4, tasks: ['Project: Customer Churn Analysis'] },
        ] },
      { month: 2, title: 'Statistics & Modeling', color: '#8b5cf6', weeks: [
          { week: 5, tasks: ['Descriptive Statistics', 'Probability Distributions', 'Hypothesis Testing'] },
          { week: 6, tasks: ['Correlation & Regression', 'EDA Best Practices', 'Data Storytelling'] },
          { week: 7, tasks: ['Linear Regression', 'Logistic Regression', 'Model Validation'] },
          { week: 8, tasks: ['Project: Sales Forecasting Dashboard'] },
        ] },
      { month: 3, title: 'Machine Learning', color: '#06b6d4', weeks: [
          { week: 9, tasks: ['Supervised Learning', 'Tree-based Models', 'Ensemble Methods'] },
          { week: 10, tasks: ['Clustering & Segmentation', 'Dimensionality Reduction', 'PCA'] },
          { week: 11, tasks: ['Model Deployment Basics', 'API Integration', 'Flask Intro'] },
          { week: 12, tasks: ['Project: Predictive Analytics App'] },
        ] },
      { month: 4, title: 'NLP & Big Data', color: '#10b981', weeks: [
          { week: 13, tasks: ['Text Preprocessing', 'Sentiment Analysis', 'NLTK Basics'] },
          { week: 14, tasks: ['Bag of Words', 'TF-IDF', 'Word Embeddings'] },
          { week: 15, tasks: ['Kaggle Case Study', 'Data Pipelines', 'SQL for Data Science'] },
          { week: 16, tasks: ['Project: Customer Feedback Classifier'] },
        ] },
      { month: 5, title: 'Portfolio & Storytelling', color: '#f59e0b', weeks: [
          { week: 17, tasks: ['Build Data Dashboard', 'Create Case Study Reports'] },
          { week: 18, tasks: ['GitHub Portfolio Setup', 'Storytelling with Data'] },
          { week: 19, tasks: ['LinkedIn Profile for Data Roles', 'Resume Tailoring'] },
          { week: 20, tasks: ['Project: End-to-End Data Product'] },
        ] },
      { month: 6, title: 'Interview Prep', color: '#ef4444', weeks: [
          { week: 21, tasks: ['Data Science Case Questions', 'SQL Practice'] },
          { week: 22, tasks: ['Statistics Interview Questions', 'Machine Learning Theory'] },
          { week: 23, tasks: ['Mock Interviews', 'Behavioral STAR Prep'] },
          { week: 24, tasks: ['Final Project Presentation', 'Job Applications'] },
        ] },
    ]
  },
  'Data Analyst': {
    months: [
      { month: 1, title: 'Excel & SQL Basics', color: '#6366f1', weeks: [
          { week: 1, tasks: ['Excel Formulas', 'Pivot Tables', 'Data Cleaning'] },
          { week: 2, tasks: ['SQL SELECT Queries', 'Filtering & Sorting', 'Joins'] },
          { week: 3, tasks: ['Data Visualization with Excel', 'Charts & Dashboards'] },
          { week: 4, tasks: ['Project: Sales Dashboard'] },
        ] },
      { month: 2, title: 'Analytics & Reporting', color: '#8b5cf6', weeks: [
          { week: 5, tasks: ['Descriptive Statistics', 'Summary Reports', 'Storytelling'] },
          { week: 6, tasks: ['Power BI Basics', 'Dashboard Design', 'KPIs'] },
          { week: 7, tasks: ['SQL Aggregations', 'CTEs', 'Window Functions'] },
          { week: 8, tasks: ['Project: Market Analysis Report'] },
        ] },
      { month: 3, title: 'Tools & Automation', color: '#06b6d4', weeks: [
          { week: 9, tasks: ['Python for Analysts', 'Pandas Dataframes', 'Data Cleaning'] },
          { week: 10, tasks: ['Automating Reports', 'Excel Macros', 'Scheduled Dashboards'] },
          { week: 11, tasks: ['Business Questions', 'Data Storytelling', 'Presentations'] },
          { week: 12, tasks: ['Project: KPI Tracker'] },
        ] },
      { month: 4, title: 'Advanced Analysis', color: '#10b981', weeks: [
          { week: 13, tasks: ['A/B Testing', 'Regression Basics', 'Forecasting'] },
          { week: 14, tasks: ['SQL Optimization', 'Data Warehouse Concepts'] },
          { week: 15, tasks: ['Dashboard Automation', 'Power BI Publishing'] },
          { week: 16, tasks: ['Project: Customer Segmentation'] },
        ] },
      { month: 5, title: 'Portfolio & Case Studies', color: '#f59e0b', weeks: [
          { week: 17, tasks: ['Build Case Study Documents', 'Present Insights Clearly'] },
          { week: 18, tasks: ['LinkedIn for Analysts', 'Resume Keywords'] },
          { week: 19, tasks: ['Mock Business Presentations', 'Communication Prep'] },
          { week: 20, tasks: ['Project: End-to-End Analysis Story'] },
        ] },
      { month: 6, title: 'Interview Prep', color: '#ef4444', weeks: [
          { week: 21, tasks: ['SQL Interview Questions', 'Dashboard Review'] },
          { week: 22, tasks: ['Behavioral Questions', 'Stakeholder Communication'] },
          { week: 23, tasks: ['Case Study Practice', 'Study Data Tools'] },
          { week: 24, tasks: ['Final Presentation', 'Job Applications'] },
        ] },
    ]
  },
  'ML Engineer': {
    months: [
      { month: 1, title: 'Machine Learning Foundations', color: '#6366f1', weeks: [
          { week: 1, tasks: ['Python for ML', 'NumPy & Pandas', 'Data Preprocessing'] },
          { week: 2, tasks: ['Supervised Learning', 'Regression Models', 'Evaluation Metrics'] },
          { week: 3, tasks: ['Classification Models', 'Cross Validation', 'Feature Selection'] },
          { week: 4, tasks: ['Project: Binary Classifier'] },
        ] },
      { month: 2, title: 'Deep Learning', color: '#8b5cf6', weeks: [
          { week: 5, tasks: ['Neural Networks Basics', 'Keras Models', 'Activation Functions'] },
          { week: 6, tasks: ['CNNs', 'Image Classification', 'Transfer Learning'] },
          { week: 7, tasks: ['RNNs', 'Sequence Data', 'NLP Basics'] },
          { week: 8, tasks: ['Project: Image Classifier'] },
        ] },
      { month: 3, title: 'Deployment & APIs', color: '#06b6d4', weeks: [
          { week: 9, tasks: ['Flask API', 'Model Serialization', 'Docker Basics'] },
          { week: 10, tasks: ['Serving Models', 'REST Endpoints', 'Logging'] },
          { week: 11, tasks: ['Model Monitoring', 'Performance Tuning'] },
          { week: 12, tasks: ['Project: ML Model Service'] },
        ] },
      { month: 4, title: 'MLOps & Pipelines', color: '#10b981', weeks: [
          { week: 13, tasks: ['Data Pipelines', 'Version Control', 'CI/CD for ML'] },
          { week: 14, tasks: ['Experiment Tracking', 'Docker Compose', 'Kubernetes Basics'] },
          { week: 15, tasks: ['Model Retraining Strategy', 'A/B Testing'] },
          { week: 16, tasks: ['Project: MLOps Pipeline'] },
        ] },
      { month: 5, title: 'Advanced Production', color: '#f59e0b', weeks: [
          { week: 17, tasks: ['Scaling Models', 'Distributed Training', 'Batch Inference'] },
          { week: 18, tasks: ['Cloud Deployment', 'Serverless ML', 'Monitoring Alerts'] },
          { week: 19, tasks: ['Secure ML Services', 'API Gateways', 'Authentication'] },
          { week: 20, tasks: ['Capstone: Production ML Pipeline'] },
        ] },
      { month: 6, title: 'Interview Prep', color: '#ef4444', weeks: [
          { week: 21, tasks: ['ML System Design', 'Coding Interview Practice'] },
          { week: 22, tasks: ['MLOps Questions', 'Model Explainability'] },
          { week: 23, tasks: ['Mock Interviews', 'Behavioral Prep'] },
          { week: 24, tasks: ['Final Career Package', 'Job Applications'] },
        ] },
    ]
  },
  'Full Stack Developer': {
    months: [
      { month: 1, title: 'Frontend Fundamentals', color: '#6366f1', weeks: [
          { week: 1, tasks: ['HTML Structure', 'CSS Styling', 'Responsive Layouts'] },
          { week: 2, tasks: ['JavaScript Basics', 'DOM Manipulation', 'Events'] },
          { week: 3, tasks: ['CSS Grid & Flexbox', 'Design Systems', 'Accessibility'] },
          { week: 4, tasks: ['Project: Landing Page'] },
        ] },
      { month: 2, title: 'Modern Frontend', color: '#8b5cf6', weeks: [
          { week: 5, tasks: ['React Basics', 'Components', 'Props'] },
          { week: 6, tasks: ['State & Effects', 'Routing', 'Form Handling'] },
          { week: 7, tasks: ['API Fetching', 'Authentication', 'UI Libraries'] },
          { week: 8, tasks: ['Project: React Portfolio'] },
        ] },
      { month: 3, title: 'Backend Essentials', color: '#06b6d4', weeks: [
          { week: 9, tasks: ['Node.js / Express', 'REST API Design', 'CRUD Operations'] },
          { week: 10, tasks: ['Databases', 'SQL & NoSQL', 'Data Modeling'] },
          { week: 11, tasks: ['Auth & Security', 'Sessions', 'JWT'] },
          { week: 12, tasks: ['Project: To-do API'] },
        ] },
      { month: 4, title: 'Deployment & DevOps', color: '#10b981', weeks: [
          { week: 13, tasks: ['Docker Basics', 'CI/CD', 'Cloud Deployment'] },
          { week: 14, tasks: ['Serverless', 'Static Hosting', 'Domain Setup'] },
          { week: 15, tasks: ['Monitoring', 'Logging', 'Performance'] },
          { week: 16, tasks: ['Project: Full Stack App Deployment'] },
        ] },
      { month: 5, title: 'Portfolio & Product', color: '#f59e0b', weeks: [
          { week: 17, tasks: ['Build Portfolio Website', 'Write Case Studies'] },
          { week: 18, tasks: ['GitHub Profile Polish', 'LinkedIn Headlines'] },
          { week: 19, tasks: ['Technical Blog', 'Project Documentation'] },
          { week: 20, tasks: ['Project: Product Landing Page'] },
        ] },
      { month: 6, title: 'Interview Prep', color: '#ef4444', weeks: [
          { week: 21, tasks: ['Frontend Interview Qs', 'Backend Interview Qs'] },
          { week: 22, tasks: ['System Design Basics', 'SQL Practice'] },
          { week: 23, tasks: ['Mock Interviews', 'Behavioral STAR Prep'] },
          { week: 24, tasks: ['Final Portfolio Review', 'Job Applications'] },
        ] },
    ]
  },
  'Web Developer': {
    months: [
      { month: 1, title: 'Web Foundations', color: '#6366f1', weeks: [
          { week: 1, tasks: ['HTML Semantics', 'CSS Styling', 'Responsive Design'] },
          { week: 2, tasks: ['JavaScript DOM', 'Events', 'Browser APIs'] },
          { week: 3, tasks: ['CSS Flexbox', 'Grid Layout', 'Accessibility'] },
          { week: 4, tasks: ['Project: Personal Website'] },
        ] },
      { month: 2, title: 'Modern JavaScript', color: '#8b5cf6', weeks: [
          { week: 5, tasks: ['ES6+', 'Async/Await', 'Fetch API'] },
          { week: 6, tasks: ['React Intro', 'Components', 'JSX'] },
          { week: 7, tasks: ['State Management', 'Routing', 'Forms'] },
          { week: 8, tasks: ['Project: React Landing Page'] },
        ] },
      { month: 3, title: 'Full Stack Basics', color: '#06b6d4', weeks: [
          { week: 9, tasks: ['Node.js Basics', 'Express', 'REST APIs'] },
          { week: 10, tasks: ['Database CRUD', 'MongoDB/SQL', 'API Security'] },
          { week: 11, tasks: ['Authentication', 'Sessions', 'JWT'] },
          { week: 12, tasks: ['Project: Web App Backend'] },
        ] },
      { month: 4, title: 'Deployment', color: '#10b981', weeks: [
          { week: 13, tasks: ['GitHub Pages', 'Vercel Deployment', 'Netlify'] },
          { week: 14, tasks: ['Docker Setup', 'CI/CD Basics', 'Environment Variables'] },
          { week: 15, tasks: ['Web Performance', 'SEO', 'Security Headers'] },
          { week: 16, tasks: ['Project: Deploy Portfolio Site'] },
        ] },
      { month: 5, title: 'Project Portfolio', color: '#f59e0b', weeks: [
          { week: 17, tasks: ['Project Case Study', 'Readme Writing', 'Code Walkthrough'] },
          { week: 18, tasks: ['GitHub Project Presentation', 'LinkedIn Portfolio'] },
          { week: 19, tasks: ['Technical Blog Post', 'Interview Notes'] },
          { week: 20, tasks: ['Project: Web Developer Portfolio'] },
        ] },
      { month: 6, title: 'Interview Prep', color: '#ef4444', weeks: [
          { week: 21, tasks: ['HTML/CSS Questions', 'JavaScript Questions'] },
          { week: 22, tasks: ['React Interview Practice', 'API Design Qs'] },
          { week: 23, tasks: ['Mock Interviews', 'Behavioral Prep'] },
          { week: 24, tasks: ['Portfolio Review', 'Job Applications'] },
        ] },
    ]
  },
  'Backend Developer': {
    months: [
      { month: 1, title: 'Backend Basics', color: '#6366f1', weeks: [
          { week: 1, tasks: ['Python / JavaScript', 'API Concepts', 'REST Principles'] },
          { week: 2, tasks: ['Express / Flask', 'Routing', 'Middleware'] },
          { week: 3, tasks: ['Database CRUD', 'SQL Joins', 'NoSQL Basics'] },
          { week: 4, tasks: ['Project: API Server'] },
        ] },
      { month: 2, title: 'Data Storage', color: '#8b5cf6', weeks: [
          { week: 5, tasks: ['Authentication', 'Authorization', 'JWT'] },
          { week: 6, tasks: ['Database Indexing', 'Transactions', 'ORMs'] },
          { week: 7, tasks: ['Caching', 'Redis Basics', 'Performance'] },
          { week: 8, tasks: ['Project: Secure API'] },
        ] },
      { month: 3, title: 'Deployment & APIs', color: '#06b6d4', weeks: [
          { week: 9, tasks: ['Docker Containers', 'Logging', 'Error Handling'] },
          { week: 10, tasks: ['API Versioning', 'Rate Limiting', 'Testing'] },
          { week: 11, tasks: ['CI/CD Pipelines', 'Cloud Hosting'] },
          { week: 12, tasks: ['Project: Backend Service Deployment'] },
        ] },
      { month: 4, title: 'System Design', color: '#10b981', weeks: [
          { week: 13, tasks: ['Microservices', 'Load Balancing', 'Caching'] },
          { week: 14, tasks: ['Security Best Practices', 'HTTPS', 'Secrets Management'] },
          { week: 15, tasks: ['Monitoring', 'Alerting', 'Scaling'] },
          { week: 16, tasks: ['Project: Scalable Backend'] },
        ] },
      { month: 5, title: 'Portfolio & Projects', color: '#f59e0b', weeks: [
          { week: 17, tasks: ['Build API Case Study', 'Document Endpoints'] },
          { week: 18, tasks: ['GitHub API Project', 'Readme Writing'] },
          { week: 19, tasks: ['Interview Projects', 'System Design Notes'] },
          { week: 20, tasks: ['Project: Payment API'] },
        ] },
      { month: 6, title: 'Interview Prep', color: '#ef4444', weeks: [
          { week: 21, tasks: ['Backend Interview Questions', 'Database Design'] },
          { week: 22, tasks: ['API Security', 'Scaling Problems'] },
          { week: 23, tasks: ['Mock Interviews', 'Behavioral Prep'] },
          { week: 24, tasks: ['Final Backend Review', 'Job Applications'] },
        ] },
    ]
  },
  'Cybersecurity Analyst': {
    months: [
      { month: 1, title: 'Security Fundamentals', color: '#6366f1', weeks: [
          { week: 1, tasks: ['Linux Essentials', 'Command Line', 'Permissions'] },
          { week: 2, tasks: ['Networking Basics', 'TCP/IP', 'Firewalls'] },
          { week: 3, tasks: ['Threat Models', 'Security Policies', 'Encryption'] },
          { week: 4, tasks: ['Project: Secure System Audit'] },
        ] },
      { month: 2, title: 'Monitoring & Detection', color: '#8b5cf6', weeks: [
          { week: 5, tasks: ['Log Analysis', 'SIEM Concepts', 'Alerting'] },
          { week: 6, tasks: ['Vulnerability Scanning', 'Pen-testing Basics'] },
          { week: 7, tasks: ['Incident Response', 'Forensics', 'Threat Hunting'] },
          { week: 8, tasks: ['Project: Threat Report'] },
        ] },
      { month: 3, title: 'Defence Techniques', color: '#06b6d4', weeks: [
          { week: 9, tasks: ['Secure Configurations', 'Network Segmentation', 'IDS/IPS'] },
          { week: 10, tasks: ['Authentication Methods', 'MFA', 'IAM'] },
          { week: 11, tasks: ['Security Tools', 'Wireshark', 'Nmap'] },
          { week: 12, tasks: ['Project: Secure Infrastructure Plan'] },
        ] },
      { month: 4, title: 'Ethical Hacking', color: '#10b981', weeks: [
          { week: 13, tasks: ['Pen Testing Workflow', 'Reconnaissance', 'Scanning'] },
          { week: 14, tasks: ['Exploitation', 'Privilege Escalation', 'Post-Exploitation'] },
          { week: 15, tasks: ['Reporting', 'Vulnerability Fixes'] },
          { week: 16, tasks: ['Project: Vulnerability Assessment'] },
        ] },
      { month: 5, title: 'Certifications & Tools', color: '#f59e0b', weeks: [
          { week: 17, tasks: ['CompTIA Security+', 'CEH Overview', 'Learning Paths'] },
          { week: 18, tasks: ['SIEM Tools', 'Cloud Security Basics', 'Audit'] },
          { week: 19, tasks: ['Policy Documentation', 'Compliance'] },
          { week: 20, tasks: ['Project: Security Readiness Checklist'] },
        ] },
      { month: 6, title: 'Interview & Career', color: '#ef4444', weeks: [
          { week: 21, tasks: ['Security Interview Questions', 'Case Studies'] },
          { week: 22, tasks: ['Mock Incident Response', 'Behavioral Prep'] },
          { week: 23, tasks: ['Portfolio Review', 'Certifications'] },
          { week: 24, tasks: ['Final Career Plan', 'Job Applications'] },
        ] },
    ]
  },
  'Cloud Engineer': {
    months: [
      { month: 1, title: 'Cloud Basics', color: '#6366f1', weeks: [
          { week: 1, tasks: ['Cloud Concepts', 'AWS/GCP Overview', 'Shared Responsibility'] },
          { week: 2, tasks: ['Virtual Machines', 'Storage', 'Networking'] },
          { week: 3, tasks: ['IAM & Security', 'Cost Estimation', 'Monitoring'] },
          { week: 4, tasks: ['Project: Cloud Architecture Diagram'] },
        ] },
      { month: 2, title: 'Containers & Orchestration', color: '#8b5cf6', weeks: [
          { week: 5, tasks: ['Docker Basics', 'Images & Containers', 'Volumes'] },
          { week: 6, tasks: ['Kubernetes Intro', 'Pods & Services', 'Deployments'] },
          { week: 7, tasks: ['Helm Charts', 'ConfigMaps', 'Secrets'] },
          { week: 8, tasks: ['Project: Containerized App'] },
        ] },
      { month: 3, title: 'Infrastructure as Code', color: '#06b6d4', weeks: [
          { week: 9, tasks: ['Terraform Basics', 'Provisioning Resources', 'State Management'] },
          { week: 10, tasks: ['CI/CD Pipelines', 'GitOps', 'Automation'] },
          { week: 11, tasks: ['Serverless Functions', 'APIs', 'Event-driven Apps'] },
          { week: 12, tasks: ['Project: Cloud Deployment Pipeline'] },
        ] },
      { month: 4, title: 'Security & Reliability', color: '#10b981', weeks: [
          { week: 13, tasks: ['Cloud Security', 'IAM Policies', 'Encryption'] },
          { week: 14, tasks: ['Load Balancing', 'Auto Scaling', 'High Availability'] },
          { week: 15, tasks: ['Monitoring', 'Logging', 'Alerting'] },
          { week: 16, tasks: ['Project: Resilient System Design'] },
        ] },
      { month: 5, title: 'Optimization & Cost', color: '#f59e0b', weeks: [
          { week: 17, tasks: ['Cost Optimization', 'Resource Tagging', 'Right-sizing'] },
          { week: 18, tasks: ['Caching', 'CDNs', 'Performance Tuning'] },
          { week: 19, tasks: ['Hybrid Cloud', 'Multi-cloud Concepts'] },
          { week: 20, tasks: ['Project: Cloud Cost Review'] },
        ] },
      { month: 6, title: 'Interview & Career', color: '#ef4444', weeks: [
          { week: 21, tasks: ['Cloud Architecture Questions', 'Design Patterns'] },
          { week: 22, tasks: ['Deployment Scenarios', 'Troubleshooting'] },
          { week: 23, tasks: ['Mock Interviews', 'Behavioral Prep'] },
          { week: 24, tasks: ['Final Cloud Portfolio', 'Job Applications'] },
        ] },
    ]
  }
};

export const LEARNING_RESOURCES = [
  {
    id: 1, topic: 'Python', level: 'Beginner', type: 'Video',
    title: 'Python for Everybody - Full Course', source: 'freeCodeCamp',
    url: 'https://www.youtube.com/watch?v=rfscVS0vtbw', duration: '4h 20min',
    rating: 4.9, free: true, icon: '🐍'
  },
  {
    id: 2, topic: 'NumPy', level: 'Beginner', type: 'Video',
    title: 'NumPy Complete Tutorial', source: 'YouTube',
    url: 'https://www.youtube.com/watch?v=QUT1VHiLmmI', duration: '1h 10min',
    rating: 4.8, free: true, icon: '🔢'
  },
  {
    id: 3, topic: 'Machine Learning', level: 'Intermediate', type: 'Course',
    title: 'Machine Learning Specialization', source: 'Coursera',
    url: 'https://www.coursera.org/specializations/machine-learning-introduction', duration: '3 months',
    rating: 4.9, free: false, price: '₹0 (Audit)', icon: '🤖'
  },
  {
    id: 4, topic: 'Statistics', level: 'Beginner', type: 'Video',
    title: 'Statistics for Data Science', source: 'YouTube',
    url: 'https://www.youtube.com/watch?v=xxpc-HPKN28', duration: '2h 15min',
    rating: 4.7, free: true, icon: '📊'
  },
  {
    id: 5, topic: 'Deep Learning', level: 'Advanced', type: 'Course',
    title: 'Deep Learning Specialization', source: 'Coursera',
    url: 'https://www.coursera.org/specializations/deep-learning', duration: '4 months',
    rating: 4.9, free: false, price: '₹0 (Audit)', icon: '🧠'
  },
  {
    id: 9, topic: 'HTML/CSS', level: 'Beginner', type: 'Video',
    title: 'Build Responsive Websites with HTML & CSS', source: 'freeCodeCamp',
    url: 'https://www.youtube.com/watch?v=UB1O30fR-EE', duration: '3h 30min',
    rating: 4.8, free: true, icon: '🌐'
  },
  {
    id: 10, topic: 'JavaScript', level: 'Beginner', type: 'Course',
    title: 'JavaScript Basics for Web Developers', source: 'Codecademy',
    url: 'https://www.codecademy.com/learn/introduction-to-javascript', duration: '4h',
    rating: 4.7, free: false, price: '₹0 (Audit)', icon: '✨'
  },
  {
    id: 11, topic: 'React', level: 'Intermediate', type: 'Video',
    title: 'React JS Crash Course', source: 'Traversy Media',
    url: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8', duration: '2h 30min',
    rating: 4.8, free: true, icon: '⚛️'
  },
  {
    id: 12, topic: 'Cloud', level: 'Beginner', type: 'Interactive',
    title: 'AWS Cloud Practitioner Essentials', source: 'AWS Training',
    url: 'https://www.aws.training/Details/Curriculum?id=20685', duration: '6h',
    rating: 4.6, free: true, icon: '☁️'
  },
  {
    id: 13, topic: 'Security', level: 'Beginner', type: 'Video',
    title: 'Cybersecurity for Beginners', source: 'Simplilearn',
    url: 'https://www.youtube.com/watch?v=inWWhr5tnEA', duration: '2h 45min',
    rating: 4.6, free: true, icon: '🛡️'
  },
  {
    id: 14, topic: 'React', level: 'Advanced', type: 'Course',
    title: 'Complete React Developer in 2025', source: 'Udemy',
    url: 'https://www.udemy.com/course/complete-react-developer/', duration: '18h',
    rating: 4.8, free: false, price: '₹0 (Audit)', icon: '⚛️'
  },
  {
    id: 15, topic: 'Cloud', level: 'Intermediate', type: 'Video',
    title: 'Docker & Kubernetes Basics', source: 'freeCodeCamp',
    url: 'https://www.youtube.com/watch?v=Gjnup-PuquQ', duration: '3h 30min',
    rating: 4.7, free: true, icon: '🐳'
  },
  {
    id: 16, topic: 'Git', level: 'Intermediate', type: 'Video',
    title: 'GitHub Actions for CI/CD', source: 'GitHub Learning Lab',
    url: 'https://lab.github.com/githubtraining/introduction-to-github-actions', duration: '2h',
    rating: 4.6, free: true, icon: '⚙️'
  },
  {
    id: 17, topic: 'Data Visualization', level: 'Intermediate', type: 'Course',
    title: 'Data Visualization with Tableau', source: 'Coursera',
    url: 'https://www.coursera.org/learn/visualization-with-tableau', duration: '4 weeks',
    rating: 4.7, free: false, price: '₹0 (Audit)', icon: '📈'
  },
  {
    id: 18, topic: 'Python', level: 'Beginner', type: 'Video',
    title: 'Python Data Structures and Algorithms', source: 'YouTube',
    url: 'https://www.youtube.com/watch?v=pkYVOmU3MgA', duration: '3h 15min',
    rating: 4.9, free: true, icon: '🧠'
  },
  {
    id: 6, topic: 'SQL', level: 'Beginner', type: 'Interactive',
    title: 'SQL Tutorial for Data Science', source: 'Kaggle',
    url: 'https://www.kaggle.com/learn/intro-to-sql', duration: '3h',
    rating: 4.8, free: true, icon: '🗄️'
  },
  {
    id: 7, topic: 'Git', level: 'Beginner', type: 'Video',
    title: 'Git and GitHub for Beginners', source: 'freeCodeCamp',
    url: 'https://www.youtube.com/watch?v=RGOj5yH7evk', duration: '1h',
    rating: 4.8, free: true, icon: '🌿'
  },
  {
    id: 8, topic: 'NLP', level: 'Advanced', type: 'Video',
    title: 'Natural Language Processing with Python', source: 'YouTube',
    url: 'https://www.youtube.com/watch?v=fNxaJsNG3-s', duration: '3h',
    rating: 4.7, free: true, icon: '💬'
  },
];

export const PROJECTS = [
  {
    id: 1, level: 'Beginner', difficulty: 1,
    title: 'House Price Predictor',
    description: 'Build a linear regression model to predict house prices using the Boston Housing dataset. Great first ML project.',
    tech: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib'],
    time: '2-3 days', category: 'Machine Learning',
    skills: ['Regression', 'EDA', 'Model Evaluation'],
    careers: ['Data Scientist', 'ML Engineer', 'AI Engineer'],
    github: 'https://github.com/topics/house-price-prediction',
    emoji: '🏠'
  },
  {
    id: 2, level: 'Beginner', difficulty: 1,
    title: 'Spam Email Classifier',
    description: 'Train a Naive Bayes classifier to detect spam emails. Covers text preprocessing and NLP basics.',
    tech: ['Python', 'NLTK', 'Scikit-learn'],
    time: '2 days', category: 'NLP',
    skills: ['Text Classification', 'NLP', 'Feature Engineering'],
    careers: ['Data Scientist', 'ML Engineer', 'AI Engineer'],
    github: 'https://github.com/topics/spam-detection',
    emoji: '📧'
  },
  {
    id: 3, level: 'Intermediate', difficulty: 2,
    title: 'Resume Screening AI',
    description: 'Build an AI that automatically screens resumes and ranks candidates based on job description matching.',
    tech: ['Python', 'NLP', 'TF-IDF', 'Cosine Similarity'],
    time: '4-5 days', category: 'NLP',
    skills: ['NLP', 'Text Similarity', 'Automation'],
    careers: ['Data Scientist', 'ML Engineer', 'AI Engineer'],
    github: 'https://github.com/topics/resume-screening',
    emoji: '📄'
  },
  {
    id: 4, level: 'Intermediate', difficulty: 2,
    title: 'Fake News Detector',
    description: 'Use NLP and machine learning to classify news articles as real or fake. Deploy with Streamlit.',
    tech: ['Python', 'Transformers', 'Streamlit', 'HuggingFace'],
    time: '5 days', category: 'NLP',
    skills: ['Text Classification', 'Transformers', 'Deployment'],
    careers: ['Data Scientist', 'AI Engineer', 'ML Engineer'],
    github: 'https://github.com/topics/fake-news-detection',
    emoji: '📰'
  },
  {
    id: 5, level: 'Advanced', difficulty: 3,
    title: 'AI Chatbot with Memory',
    description: 'Build a conversational AI chatbot using LangChain and OpenAI with persistent conversation memory.',
    tech: ['Python', 'LangChain', 'OpenAI', 'Streamlit', 'Redis'],
    time: '1 week', category: 'GenAI',
    skills: ['LangChain', 'API Integration', 'Memory Systems'],
    careers: ['AI Engineer', 'ML Engineer', 'Full Stack Developer'],
    github: 'https://github.com/topics/langchain-chatbot',
    emoji: '🤖'
  },
  {
    id: 6, level: 'Advanced', difficulty: 3,
    title: 'End-to-End ML Pipeline',
    description: 'Production-ready ML pipeline with data ingestion, training, evaluation, monitoring, and CI/CD.',
    tech: ['Python', 'MLflow', 'Docker', 'GitHub Actions', 'FastAPI'],
    time: '2 weeks', category: 'MLOps',
    skills: ['MLOps', 'Docker', 'CI/CD', 'API Development'],
    careers: ['ML Engineer', 'Cloud Engineer', 'AI Engineer'],
    github: 'https://github.com/topics/mlops-pipeline',
    emoji: '⚙️'
  },
  {
    id: 7, level: 'Beginner', difficulty: 1,
    title: 'Responsive Portfolio Website',
    description: 'Create a responsive portfolio website using HTML, CSS, and JavaScript to showcase your projects and skills.',
    tech: ['HTML/CSS', 'JavaScript', 'Responsive Design'],
    time: '3 days', category: 'Web Development',
    skills: ['HTML/CSS', 'JavaScript', 'UI Design'],
    careers: ['Web Developer', 'Full Stack Developer'],
    github: 'https://github.com/topics/portfolio-website',
    emoji: '💻'
  },
  {
    id: 8, level: 'Intermediate', difficulty: 2,
    title: 'E-commerce Backend API',
    description: 'Build a secure shopping cart API with product routes, authentication, and payment placeholders.',
    tech: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    time: '5 days', category: 'Backend',
    skills: ['APIs', 'Database', 'Auth'],
    careers: ['Backend Developer', 'Full Stack Developer'],
    github: 'https://github.com/topics/ecommerce-api',
    emoji: '🛒'
  },
];

export const INTERVIEW_QUESTIONS = [
  { id: 1, category: 'Python', question: 'Explain the difference between a list and a tuple in Python.', expectedKeywords: ['immutable', 'mutable', 'memory', 'performance'] },
  { id: 2, category: 'Python', question: 'What are decorators in Python? Give an example.', expectedKeywords: ['wrapper', 'function', '@', 'higher-order'] },
  { id: 3, category: 'ML', question: 'What is overfitting and how do you prevent it?', expectedKeywords: ['regularization', 'dropout', 'cross-validation', 'data augmentation'] },
  { id: 4, category: 'ML', question: 'Explain the difference between supervised and unsupervised learning.', expectedKeywords: ['labeled', 'unlabeled', 'clustering', 'classification'] },
  { id: 5, category: 'ML', question: 'What is the bias-variance tradeoff?', expectedKeywords: ['underfitting', 'overfitting', 'complexity', 'generalization'] },
  { id: 6, category: 'HR', question: 'Tell me about yourself and your journey into AI.', expectedKeywords: ['passion', 'project', 'learn', 'goal'] },
  { id: 7, category: 'HR', question: 'Where do you see yourself in 5 years?', expectedKeywords: ['growth', 'engineer', 'company', 'contribute'] },
  { id: 8, category: 'Projects', question: 'Walk me through your most impressive project.', expectedKeywords: ['problem', 'solution', 'result', 'impact'] },
];

export const SCHOLARSHIPS = [
  { name: 'National Scholarship Portal (NSP)', org: 'Government of India', amount: '₹10,000 - ₹50,000/year', link: 'https://scholarships.gov.in', eligibility: 'Merit + Income based', deadline: 'October 31, 2024', emoji: '🏛️' },
  { name: 'AICTE Pragati Scholarship', org: 'AICTE', amount: '₹50,000/year', link: 'https://www.aicte-india.org', eligibility: 'Girl students in technical education', deadline: 'September 30, 2024', emoji: '📚' },
  { name: 'Google Generation Scholarship', org: 'Google', amount: '$10,000', link: 'https://buildyourfuture.withgoogle.com', eligibility: 'CS students, 3rd year+', deadline: 'December 2024', emoji: '🔍' },
  { name: 'Wipro Earthian Scholarship', org: 'Wipro', amount: '₹75,000', link: 'https://wipro.com/sustainability', eligibility: 'STEM students', deadline: 'November 2024', emoji: '💻' },
  { name: 'PMKVY Free Training', org: 'Government of India', amount: 'Free + ₹8,000 stipend', link: 'https://pmkvyofficial.org', eligibility: 'All Indian youth', deadline: 'Rolling', emoji: '🎯' },
  { name: 'AWS Educate', org: 'Amazon', amount: 'Free credits + courses', link: 'https://aws.amazon.com/education/awseducate', eligibility: 'Students with .edu email', deadline: 'Rolling', emoji: '☁️' },
];

export const TEAM_MEMBERS = [
  { id: 1, name: 'Priya Sharma', location: 'Jaipur, Rajasthan', skills: ['Python', 'ML', 'Deep Learning'], interests: 'Computer Vision', availability: '3h/day', match: 94, avatar: 'PS', color: '#6366f1' },
  { id: 2, name: 'Arjun Nair', location: 'Thiruvananthapuram, Kerala', skills: ['Python', 'NLP', 'SQL'], interests: 'Natural Language Processing', availability: '4h/day', match: 88, avatar: 'AN', color: '#10b981' },
  { id: 3, name: 'Sneha Patil', location: 'Pune, Maharashtra', skills: ['Python', 'Statistics', 'Tableau'], interests: 'Data Analytics', availability: '2h/day', match: 82, avatar: 'SP', color: '#f59e0b' },
  { id: 4, name: 'Rohan Gupta', location: 'Lucknow, UP', skills: ['Python', 'ML', 'Flask'], interests: 'MLOps', availability: '5h/day', match: 79, avatar: 'RG', color: '#ef4444' },
  { id: 5, name: 'Kavya Reddy', location: 'Hyderabad, Telangana', skills: ['React', 'Python', 'FastAPI'], interests: 'AI Products', availability: '3h/day', match: 76, avatar: 'KR', color: '#8b5cf6' },
];

export const DAILY_MISSIONS = [
  { id: 1, task: 'Watch NumPy Tutorial (Chapter 3)', type: 'video', time: 30, done: false, icon: '▶️' },
  { id: 2, task: 'Solve 5 LeetCode Array Problems', type: 'practice', time: 45, done: true, icon: '💻' },
  { id: 3, task: 'Build Mini Array Calculator', type: 'project', time: 60, done: false, icon: '🛠️' },
];

export const BADGES_ALL = [
  { id: 'first-step', name: 'First Step', emoji: '👣', desc: 'Completed profile setup', earned: true },
  { id: '7-day', name: '7-Day Streak', emoji: '🔥', desc: '7 consecutive study days', earned: true },
  { id: 'profile-complete', name: 'Profile Complete', emoji: '✅', desc: 'Filled all profile details', earned: true },
  { id: 'python-basics', name: 'Python Ninja', emoji: '🐍', desc: 'Completed Python basics module', earned: false },
  { id: 'first-project', name: 'Builder', emoji: '🏗️', desc: 'Submitted first project', earned: false },
  { id: 'interview-ready', name: 'Interview Ready', emoji: '🎤', desc: 'Passed mock interview with 70%+', earned: false },
  { id: '30-day', name: '30-Day Legend', emoji: '⚡', desc: '30 consecutive study days', earned: false },
  { id: 'job-ready', name: 'Job Ready', emoji: '💼', desc: 'Achieved 80% job readiness', earned: false },
];
