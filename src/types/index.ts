export interface Project {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  tagline: string;
  overview: string;
  objective: string;
  role: string;
  strategy: string[];
  deliverables: string[];
  outcome: string;
  badge?: string;
  assetType: 'carousel' | 'campaign' | 'seo' | 'leads' | 'instagram' | 'pdf' | string;
  imageUrl?: string;
  externalLink?: {
    url: string;
    label: string;
  };
  mockupDetails: {
    accentColor: string;
    metricsLabel?: string;
    metricsValue?: string;
    sublabel?: string;
    highlights: string[];
  };
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  isCurrent: boolean;
  responsibilities: string[];
  tags: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  status: 'Completed' | 'Ongoing Learning';
  details?: string;
  certification?: string;
  certificateImage?: string;
  certificateTitle?: string;
  certificateSubtitle?: string;
  focusAreas?: string[];
}

export interface SkillCategory {
  title: string;
  description: string;
  iconName: string;
  skills: string[];
}

export interface PersonalStrength {
  title: string;
  description: string;
  iconName: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  iconName: string;
}
