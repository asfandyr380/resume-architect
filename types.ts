export interface SocialItem {
  id: string;
  platform: string;
  username: string;
  url: string;
  icon?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  logo?: string; // URL for company logo
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  year: string;
  description?: string;
  logo?: string;
}

export interface SkillItem {
  id: string;
  category: string;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  link?: string;
  image?: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  level: string;
  flag: string; // Two letter country code
}

export interface ResumeData {
  personal: {
    fullName: string;
    role: string;
    email: string;
    phone: string;
    website: string;
    location: string;
    avatar: string;
    quote: string;
    quoteAuthor: string;
  };
  socials: SocialItem[];
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  projects: ProjectItem[];
  languages: LanguageItem[];
}

export type Theme = 'light' | 'dark';

export type TemplateId = 'modern-sidebar' | 'classic' | 'minimal' | 'executive' | 'creative' | 'tech' | 'compact';

export interface TemplateProps {
  data: ResumeData;
  scale?: number;
  theme: Theme;
}
