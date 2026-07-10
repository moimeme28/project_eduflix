// EduFlix Subject Categories and Topics
export const SUBJECT_CATEGORIES = [
  {
    id: 'science',
    name: 'Science',
    icon: '🔬',
    color: '#10b981',
    topics: [
      { id: 'biology', name: 'Biology', subtopics: ['Cells', 'Genetics', 'Evolution', 'Human Body', 'Plants', 'Ecology', 'DNA', 'Microorganisms'] },
      { id: 'chemistry', name: 'Chemistry', subtopics: ['Periodic Table', 'Chemical Reactions', 'Organic Chemistry', 'Biochemistry', 'Acids and Bases'] },
      { id: 'physics', name: 'Physics', subtopics: ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Quantum Physics', 'Relativity', 'Optics'] },
      { id: 'environmental-science', name: 'Environmental Science', subtopics: ['Climate Change', 'Ecosystems', 'Conservation', 'Pollution', 'Sustainability'] },
      { id: 'astronomy', name: 'Astronomy', subtopics: ['Solar System', 'Stars', 'Galaxies', 'Black Holes', 'Cosmology', 'Space Exploration'] },
      { id: 'genetics', name: 'Genetics', subtopics: ['DNA Structure', 'Heredity', 'Mutations', 'Gene Therapy', 'CRISPR'] },
      { id: 'microbiology', name: 'Microbiology', subtopics: ['Bacteria', 'Viruses', 'Fungi', 'Immunology', 'Diseases'] },
      { id: 'anatomy', name: 'Anatomy', subtopics: ['Skeletal System', 'Muscular System', 'Nervous System', 'Circulatory System', 'Organs'] }
    ]
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: '📐',
    color: '#3b82f6',
    topics: [
      { id: 'algebra', name: 'Algebra', subtopics: ['Linear Equations', 'Quadratic Equations', 'Polynomials', 'Functions', 'Inequalities'] },
      { id: 'geometry', name: 'Geometry', subtopics: ['Shapes', 'Angles', 'Triangles', 'Circles', '3D Geometry', 'Proofs'] },
      { id: 'calculus', name: 'Calculus', subtopics: ['Limits', 'Derivatives', 'Integrals', 'Differential Equations', 'Applications'] },
      { id: 'statistics', name: 'Statistics', subtopics: ['Probability', 'Data Analysis', 'Hypothesis Testing', 'Regression', 'Distributions'] },
      { id: 'probability', name: 'Probability', subtopics: ['Combinatorics', 'Random Variables', 'Bayesian', 'Stochastic Processes'] }
    ]
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: '💻',
    color: '#8b5cf6',
    topics: [
      { id: 'computer-science', name: 'Computer Science', subtopics: ['Algorithms', 'Data Structures', 'Programming', 'Software Engineering', 'Operating Systems'] },
      { id: 'programming', name: 'Programming', subtopics: ['Python', 'JavaScript', 'Java', 'C++', 'Web Development', 'Mobile Apps'] },
      { id: 'artificial-intelligence', name: 'Artificial Intelligence', subtopics: ['Machine Learning', 'Neural Networks', 'Deep Learning', 'NLP', 'Computer Vision'] },
      { id: 'cybersecurity', name: 'Cybersecurity', subtopics: ['Network Security', 'Cryptography', 'Ethical Hacking', 'Malware', 'Privacy'] },
      { id: 'robotics', name: 'Robotics', subtopics: ['Automation', 'Sensors', 'Control Systems', 'AI Robotics', 'Industrial Robotics'] },
      { id: 'data-science', name: 'Data Science', subtopics: ['Big Data', 'Data Mining', 'Visualization', 'Machine Learning', 'Statistics'] }
    ]
  },
  {
    id: 'engineering',
    name: 'Engineering',
    icon: '⚙️',
    color: '#f59e0b',
    topics: [
      { id: 'mechanical', name: 'Mechanical', subtopics: ['Thermodynamics', 'Fluid Mechanics', 'Materials', 'Manufacturing', 'Robotics'] },
      { id: 'civil', name: 'Civil', subtopics: ['Structures', 'Construction', 'Transportation', 'Geotechnical', 'Hydraulics'] },
      { id: 'electrical', name: 'Electrical', subtopics: ['Circuits', 'Power Systems', 'Electronics', 'Signal Processing', 'Control Systems'] },
      { id: 'aerospace', name: 'Aerospace', subtopics: ['Aerodynamics', 'Propulsion', 'Flight Mechanics', 'Spacecraft', 'Avionics'] },
      { id: 'biomedical', name: 'Biomedical', subtopics: ['Bioinstrumentation', 'Biomaterials', 'Biomechanics', 'Medical Imaging', 'Rehabilitation'] }
    ]
  },
  {
    id: 'social-sciences',
    name: 'Social Sciences',
    icon: '🌍',
    color: '#ef4444',
    topics: [
      { id: 'history', name: 'History', subtopics: ['Ancient Egypt', 'Ancient Rome', 'World War I', 'World War II', 'Cold War', 'African History', 'American History', 'Renaissance'] },
      { id: 'geography', name: 'Geography', subtopics: ['Physical Geography', 'Human Geography', 'Maps', 'Climate', 'Population'] },
      { id: 'economics', name: 'Economics', subtopics: ['Microeconomics', 'Macroeconomics', 'International Trade', 'Finance', 'Market Theory'] },
      { id: 'sociology', name: 'Sociology', subtopics: ['Social Structures', 'Culture', 'Inequality', 'Social Change', 'Research Methods'] },
      { id: 'political-science', name: 'Political Science', subtopics: ['Government Systems', 'International Relations', 'Political Theory', 'Public Policy', 'Comparative Politics'] },
      { id: 'government', name: 'Government', subtopics: ['Democracy', 'Constitutions', 'Law', 'Citizenship', 'Civic Engagement'] }
    ]
  },
  {
    id: 'health',
    name: 'Health',
    icon: '🏥',
    color: '#ec4899',
    topics: [
      { id: 'medicine', name: 'Medicine', subtopics: ['Diagnosis', 'Treatment', 'Pharmacology', 'Pathology', 'Clinical Skills'] },
      { id: 'nursing', name: 'Nursing', subtopics: ['Patient Care', 'Medical Procedures', 'Health Assessment', 'Ethics', 'Specialties'] },
      { id: 'psychology', name: 'Psychology', subtopics: ['Cognitive Psychology', 'Behavioral Psychology', 'Developmental', 'Social Psychology', 'Mental Health'] },
      { id: 'public-health', name: 'Public Health', subtopics: ['Epidemiology', 'Health Policy', 'Disease Prevention', 'Global Health', 'Health Education'] },
      { id: 'nutrition', name: 'Nutrition', subtopics: ['Macronutrients', 'Micronutrients', 'Diet Planning', 'Metabolism', 'Food Science'] }
    ]
  },
  {
    id: 'business',
    name: 'Business',
    icon: '💼',
    color: '#6366f1',
    topics: [
      { id: 'entrepreneurship', name: 'Entrepreneurship', subtopics: ['Startups', 'Business Planning', 'Funding', 'Innovation', 'Growth Strategies'] },
      { id: 'marketing', name: 'Marketing', subtopics: ['Digital Marketing', 'Brand Management', 'Market Research', 'Advertising', 'Social Media'] },
      { id: 'accounting', name: 'Accounting', subtopics: ['Financial Accounting', 'Managerial Accounting', 'Auditing', 'Taxation', 'Financial Statements'] },
      { id: 'finance', name: 'Finance', subtopics: ['Corporate Finance', 'Investments', 'Banking', 'Risk Management', 'Financial Markets'] },
      { id: 'leadership', name: 'Leadership', subtopics: ['Management', 'Team Building', 'Decision Making', 'Communication', 'Strategic Thinking'] }
    ]
  },
  {
    id: 'arts',
    name: 'Arts',
    icon: '🎨',
    color: '#f97316',
    topics: [
      { id: 'literature', name: 'Literature', subtopics: ['Poetry', 'Novels', 'Drama', 'Literary Analysis', 'World Literature'] },
      { id: 'philosophy', name: 'Philosophy', subtopics: ['Ethics', 'Logic', 'Metaphysics', 'Epistemology', 'Political Philosophy'] },
      { id: 'languages', name: 'Languages', subtopics: ['Grammar', 'Vocabulary', 'Conversation', 'Writing', 'Cultural Context'] },
      { id: 'music', name: 'Music', subtopics: ['Music Theory', 'History', 'Composition', 'Performance', 'Music Technology'] },
      { id: 'art-history', name: 'Art History', subtopics: ['Renaissance', 'Modern Art', 'Contemporary', 'Architecture', 'Art Movements'] }
    ]
  },
  {
    id: 'environment',
    name: 'Environment',
    icon: '🌱',
    color: '#22c55e',
    topics: [
      { id: 'climate-change', name: 'Climate Change', subtopics: ['Global Warming', 'Carbon Footprint', 'Renewable Energy', 'Climate Policy', 'Adaptation'] },
      { id: 'conservation', name: 'Conservation', subtopics: ['Biodiversity', 'Wildlife Protection', 'Ecosystem Management', 'Sustainable Practices'] },
      { id: 'renewable-energy', name: 'Renewable Energy', subtopics: ['Solar', 'Wind', 'Hydro', 'Geothermal', 'Biomass'] }
    ]
  },
  {
    id: 'life-skills',
    name: 'Life Skills',
    icon: '🎯',
    color: '#14b8a6',
    topics: [
      { id: 'personal-finance', name: 'Personal Finance', subtopics: ['Budgeting', 'Saving', 'Investing', 'Taxes', 'Financial Planning'] },
      { id: 'public-speaking', name: 'Public Speaking', subtopics: ['Presentation Skills', 'Rhetoric', 'Body Language', 'Voice Control', 'Persuasion'] },
      { id: 'critical-thinking', name: 'Critical Thinking', subtopics: ['Logic', 'Argument Analysis', 'Problem Solving', 'Decision Making', 'Cognitive Biases'] },
      { id: 'communication', name: 'Communication', subtopics: ['Active Listening', 'Writing', 'Negotiation', 'Conflict Resolution', 'Teamwork'] },
      { id: 'productivity', name: 'Productivity', subtopics: ['Time Management', 'Goal Setting', 'Focus', 'Organization', 'Workflow'] }
    ]
  }
];

export const LEARNING_LEVELS = [
  { id: 'beginner', name: 'Beginner', description: 'New to the subject' },
  { id: 'intermediate', name: 'Intermediate', description: 'Some foundational knowledge' },
  { id: 'advanced', name: 'Advanced', description: 'Deep understanding expected' },
  { id: 'professional', name: 'Professional', description: 'Expert-level content' }
];

export const LEARNING_FORMATS = [
  { id: 'movie', name: 'Movie', icon: '🎬' },
  { id: 'tv-series', name: 'TV Series', icon: '📺' },
  { id: 'documentary', name: 'Documentary', icon: '📹' },
  { id: 'animated-film', name: 'Animated Film', icon: '🎨' },
  { id: 'historical-drama', name: 'Historical Drama', icon: '🎭' },
  { id: 'biography', name: 'Biography', icon: '📖' },
  { id: 'based-on-real-events', name: 'Based on Real Events', icon: '📰' },
  { id: 'short-film', name: 'Short Film', icon: '⏱️' },
  { id: 'mini-series', name: 'Mini Series', icon: '📼' }
];

export const EDUCATIONAL_TAGS = {
  biology: ['DNA', 'Evolution', 'Genetics', 'Human Anatomy', 'Cells', 'Ecology'],
  history: ['World War II', 'Renaissance', 'Ancient Civilizations', 'Cold War', 'Revolution'],
  technology: ['Artificial Intelligence', 'Programming', 'Robotics', 'Cybersecurity', 'Data Science'],
  business: ['Entrepreneurship', 'Leadership', 'Marketing', 'Finance', 'Innovation'],
  science: ['Scientific Method', 'Research', 'Experiments', 'Discovery', 'Innovation'],
  mathematics: ['Problem Solving', 'Logic', 'Calculation', 'Analysis', 'Proofs']
};
