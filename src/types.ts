export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  url: string;
  category: 'ecommerce' | 'corporate' | 'legal' | 'tech';
  tags: string[];
  techUsed: string[];
  keyAchievement: string;
  performanceScore: number; // Google Pagespeed score
  mobileOptimized: boolean;
  imageSeed: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  achievements: string[];
  skillsGained: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  country: string;
  feedback: string;
  rating: number;
  avatarSeed: string;
  projectAssociated: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}
