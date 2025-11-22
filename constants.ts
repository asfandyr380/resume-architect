import { ResumeData } from './types';

export const INITIAL_RESUME_DATA: ResumeData = {
  personal: {
    fullName: "Angelo Libero",
    role: "Full-Stack Designer",
    email: "angelo.libero@gmail.com",
    phone: "(+39) 333 0123 765",
    website: "https://aldesign.it",
    location: "Bologna, Italy",
    avatar: "https://picsum.photos/200/200?grayscale",
    quote: "People ignore design that ignore people.",
    quoteAuthor: "Frank Kimero"
  },
  socials: [
    { id: '1', platform: 'Instagram', username: '@angelolibero.designs', url: '#', icon: 'instagram' },
    { id: '2', platform: 'Dribbble', username: '@angelolibero-designs', url: '#', icon: 'dribbble' },
    { id: '3', platform: 'Twitter', username: '@angeloldesigns', url: '#', icon: 'twitter' },
    { id: '4', platform: 'LinkedIn', username: 'angelo-libero-a42a0438', url: '#', icon: 'linkedin' },
  ],
  experience: [
    {
      id: '1',
      role: "VR designer",
      company: "Meta",
      location: "Menlo Park, California",
      startDate: "2022",
      endDate: "Present",
      current: true,
      description: "Leading VR interface design patterns for the next generation of spatial computing headsets.",
      logo: "https://picsum.photos/40/40?random=1"
    },
    {
      id: '2',
      role: "Product designer",
      company: "Apple",
      location: "Cupertino, California",
      startDate: "Jul 20",
      endDate: "Jan 2022",
      current: false,
      description: "Omnis minima inventore minus. Aut et incidunt. Aut fugiat culpa illum optio dolorum aut maxime ipsa.",
      logo: "https://picsum.photos/40/40?random=2"
    },
    {
      id: '3',
      role: "UX Designer",
      company: "Tesla",
      location: "Austin, Texas",
      startDate: "Oct 2015",
      endDate: "Mar 2020",
      current: false,
      description: "Commodi atque sit ut qui assumenda earum aperiam occaecati voluptates.",
      logo: "https://picsum.photos/40/40?random=3"
    },
    {
      id: '4',
      role: "Design system architect",
      company: "Google",
      location: "Mountain View",
      startDate: "Sep 2014",
      endDate: "Aug 2015",
      current: false,
      description: "Ut molestias animi. Neque voluptate velit corporis adipisci voluptate et qui sed neque.",
      logo: "https://picsum.photos/40/40?random=4"
    }
  ],
  education: [
    {
      id: '1',
      degree: "Build a design system",
      institution: "Memorisely",
      year: "Oct 2021",
      description: "Advanced component architecture.",
      logo: "https://picsum.photos/40/40?random=6"
    },
    {
      id: '2',
      degree: "UX Design certificate",
      institution: "UX academy",
      year: "Feb 2020",
      description: "User research and personas.",
      logo: "https://picsum.photos/40/40?random=7"
    },
    {
      id: '3',
      degree: "User research course",
      institution: "Coursera",
      year: "Dec 2019",
      description: "Qualitative data analysis.",
      logo: "https://picsum.photos/40/40?random=8"
    }
  ],
  skills: [
    {
      id: '1',
      category: "Design",
      skills: ["Web Design", "Mobile Design", "User Experience", "Wireframing", "Prototyping", "Testing", "Design System"]
    },
    {
      id: '2',
      category: "Development",
      skills: ["React JS", "Chakra UI", "Emotion", "Framer", "TypeScript", "Next JS", "HTML", "CSS", "JS"]
    }
  ],
  projects: [
    {
      id: '1',
      title: "Powerful Design System",
      description: "Figma UI Kit and Design System targeting a wide variety of use cases.",
      link: "https://figma.com",
      image: "https://picsum.photos/400/300?random=10"
    },
    {
      id: '2',
      title: "Modern Website",
      description: "Powerful website + dashboard template for your next Chakra UI project.",
      link: "https://ui-8.net",
      image: "https://picsum.photos/400/300?random=11"
    }
  ],
  languages: [
    { id: '1', language: 'Italian', level: 'Native', flag: 'IT' },
    { id: '2', language: 'Greek', level: 'Native', flag: 'GR' },
    { id: '3', language: 'English', level: 'Professional working', flag: 'GB' },
    { id: '4', language: 'Spanish', level: 'Elementary', flag: 'ES' },
  ]
};

export const LANGUAGE_LEVELS = [
  "Native",
  "Fluent",
  "Proficient",
  "Advanced",
  "Intermediate",
  "Conversational",
  "Elementary",
  "Beginner"
];

export const LANGUAGES_LIST = [
  { name: "English", code: "GB" },
  { name: "Spanish", code: "ES" },
  { name: "French", code: "FR" },
  { name: "German", code: "DE" },
  { name: "Italian", code: "IT" },
  { name: "Portuguese", code: "PT" },
  { name: "Chinese", code: "CN" },
  { name: "Japanese", code: "JP" },
  { name: "Korean", code: "KR" },
  { name: "Russian", code: "RU" },
  { name: "Arabic", code: "SA" },
  { name: "Hindi", code: "IN" },
  { name: "Bengali", code: "BD" },
  { name: "Urdu", code: "PK" },
  { name: "Indonesian", code: "ID" },
  { name: "Turkish", code: "TR" },
  { name: "Vietnamese", code: "VN" },
  { name: "Thai", code: "TH" },
  { name: "Greek", code: "GR" },
  { name: "Dutch", code: "NL" },
  { name: "Polish", code: "PL" },
  { name: "Swedish", code: "SE" },
  { name: "Norwegian", code: "NO" },
  { name: "Danish", code: "DK" },
  { name: "Finnish", code: "FI" },
  { name: "Czech", code: "CZ" },
  { name: "Hungarian", code: "HU" },
  { name: "Romanian", code: "RO" },
  { name: "Ukrainian", code: "UA" }
];

export const SKILL_CATEGORIES = [
  {
    name: "Design",
    color: "text-purple-400",
    borderColor: "border-purple-500/50",
    shadowColor: "rgba(168,85,247,0.15)",
    icon: "palette",
    suggestedSkills: ["Web Design", "Mobile Design", "User Experience", "User Interface", "Wireframing", "Prototyping", "Interaction Design", "Design System", "Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator", "After Effects", "Blender", "3D Modeling", "Typography", "Color Theory", "Branding", "Logo Design"]
  },
  {
    name: "Development",
    color: "text-blue-400",
    borderColor: "border-blue-500/50",
    shadowColor: "rgba(59,130,246,0.15)",
    icon: "code",
    suggestedSkills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Vue", "Angular", "Svelte", "Next.js", "Nuxt", "Node.js", "Express", "NestJS", "Python", "Django", "Flask", "Ruby", "Rails", "Java", "Spring", "C#", ".NET", "Go", "Rust", "PHP", "Laravel", "SQL", "PostgreSQL", "MongoDB", "Redis", "GraphQL", "REST API", "Git", "Docker", "Kubernetes", "AWS", "Azure", "GCP", "CI/CD", "Testing", "Jest", "Cypress"]
  },
  {
    name: "Marketing",
    color: "text-pink-400",
    borderColor: "border-pink-500/50",
    shadowColor: "rgba(236,72,153,0.15)",
    icon: "instagram",
    suggestedSkills: ["SEO", "SEM", "Content Marketing", "Social Media Marketing", "Email Marketing", "Google Analytics", "Google Ads", "Facebook Ads", "Copywriting", "Brand Strategy", "Market Research", "Public Relations", "Affiliate Marketing", "Influencer Marketing", "Growth Hacking", "CRM", "HubSpot", "Salesforce", "Mailchimp"]
  },
  {
    name: "Business",
    color: "text-emerald-400",
    borderColor: "border-emerald-500/50",
    shadowColor: "rgba(52,211,153,0.15)",
    icon: "briefcase",
    suggestedSkills: ["Project Management", "Product Management", "Agile", "Scrum", "Kanban", "Business Analysis", "Strategic Planning", "Financial Analysis", "Budgeting", "Risk Management", "Leadership", "Team Building", "Communication", "Negotiation", "Public Speaking", "Presentation", "Microsoft Office", "Excel", "PowerPoint", "Jira", "Asana", "Trello"]
  },
  {
    name: "Data Science",
    color: "text-yellow-400",
    borderColor: "border-yellow-500/50",
    shadowColor: "rgba(250,204,21,0.15)",
    icon: "globe",
    suggestedSkills: ["Data Analysis", "Data Visualization", "Machine Learning", "Deep Learning", "Artificial Intelligence", "NLP", "Computer Vision", "Statistics", "Probability", "Linear Algebra", "Calculus", "Python", "R", "SQL", "Pandas", "NumPy", "Scikit-learn", "TensorFlow", "PyTorch", "Keras", "Matplotlib", "Seaborn", "Tableau", "Power BI", "Big Data", "Hadoop", "Spark"]
  },
  {
    name: "DevOps",
    color: "text-orange-400",
    borderColor: "border-orange-500/50",
    shadowColor: "rgba(251,146,60,0.15)",
    icon: "github",
    suggestedSkills: ["Linux", "Bash", "Shell Scripting", "Networking", "Security", "Cloud Computing", "Infrastructure as Code", "Terraform", "Ansible", "Chef", "Puppet", "Monitoring", "Logging", "Prometheus", "Grafana", "ELK Stack", "Nginx", "Apache", "Load Balancing", "Microservices", "Serverless"]
  }
];
