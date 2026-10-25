import type { LucideIcon } from 'lucide-react';
import {
  Share2,
  Palette,
  CalendarDays,
  BarChart2,
  Search,
  Compass,
  Film,
  Sparkles,
  FileText,
  Users,
  Briefcase,
  Cloud,
} from 'lucide-react';

export interface DetailedSkill {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  iconName: string;
  icon: LucideIcon;
  iconAnimType: 'bounce' | 'tilt' | 'pulse' | 'spin' | 'float';
  accentColor: string;
  glowColor: string;
  meaning: string;
  practicalActivities: string[];
  realWorldImpact: string;
  tags: string[];
}

export const ALL_PERSONAL_SKILLS: DetailedSkill[] = [
  {
    id: 'social-media-marketing',
    name: 'Social Media Marketing',
    category: 'GROWTH',
    categoryLabel: 'Growth & Social Strategy',
    iconName: 'Share2',
    icon: Share2,
    iconAnimType: 'bounce',
    accentColor: '#008CFF',
    glowColor: 'rgba(0, 140, 255, 0.45)',
    meaning:
      'Developing and executing multi-channel social media strategies that elevate brand awareness, nurture active community engagement, and turn casual followers into qualified business inquiries.',
    practicalActivities: [
      'Multi-platform editorial scheduling across Instagram & LinkedIn',
      'Audience segmentation, hashtag research & engagement benchmarking',
      'Community management, direct messaging workflows & organic outreach',
      'Social media performance auditing & algorithm-friendly content pacing',
    ],
    realWorldImpact:
      'Builds sustainable audience trust, broadens brand reach across demographics, and fuels organic inbound lead generation.',
    tags: ['SMO', 'Channel Growth', 'Community Building', 'Audience Retention'],
  },
  {
    id: 'content-creation',
    name: 'Content Creation',
    category: 'CREATIVE',
    categoryLabel: 'Visual Design & Storytelling',
    iconName: 'Palette',
    icon: Palette,
    iconAnimType: 'tilt',
    accentColor: '#00E5FF',
    glowColor: 'rgba(0, 229, 255, 0.45)',
    meaning:
      'Designing compelling visual narratives, educational carousels, and promotional graphic assets tailored for digital feeds to stop the scroll and communicate complex messages instantly.',
    practicalActivities: [
      'High-retention carousel design for educational & case-study content',
      'Promotional posters, product banners & visual copywriting layout',
      'Harmonizing typography, color palettes & cohesive brand guidelines',
      'Optimizing visual asset formats for feed, stories & landscape placements',
    ],
    realWorldImpact:
      'Increases content save and share rates by over 40%, strengthening overall brand authority and digital brand recall.',
    tags: ['Carousels', 'Brand Aesthetics', 'Visual Layout', 'Infographics'],
  },
  {
    id: 'campaign-planning',
    name: 'Campaign Planning',
    category: 'STRATEGY',
    categoryLabel: 'Marketing Strategy & Execution',
    iconName: 'CalendarDays',
    icon: CalendarDays,
    iconAnimType: 'pulse',
    accentColor: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.45)',
    meaning:
      'Orchestrating end-to-end promotional campaigns, from initial concept brainstorms and audience persona definition to milestone scheduling, multi-format collateral rollouts, and launch execution.',
    practicalActivities: [
      'Comprehensive monthly and quarterly content calendar roadmaps',
      'Aligning campaign objectives with lead generation funnels & KPIs',
      'Coordinating multi-channel asset handoffs and cross-platform timing',
      'Post-campaign review sessions and iterative strategy adjustments',
    ],
    realWorldImpact:
      'Eliminates last-minute bottlenecks, guarantees on-time delivery across channels, and maximizes campaign ROI.',
    tags: ['Roadmaps', 'Funnel Design', 'Timeline Management', 'Milestone Review'],
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    category: 'ANALYTICS',
    categoryLabel: 'Data & Performance Analytics',
    iconName: 'BarChart2',
    icon: BarChart2,
    iconAnimType: 'pulse',
    accentColor: '#00E5FF',
    glowColor: 'rgba(0, 229, 255, 0.4)',
    meaning:
      'Transforming raw website traffic and campaign interaction metrics into clear, actionable business insights that guide budget allocation and performance improvements.',
    practicalActivities: [
      'Google Analytics 4 (GA4) traffic attribution, event & goal tracking',
      'Evaluating click-through rates (CTR), bounce rates & funnel drop-offs',
      'Synthesizing weekly and monthly executive performance dashboards',
      'A/B testing creative variations to uncover highest-converting formats',
    ],
    realWorldImpact:
      'Replaces subjective guesswork with measurable empirical metrics, reducing wasted ad spend and driving consistent conversion gains.',
    tags: ['GA4', 'Funnel Tracking', 'A/B Testing', 'Conversion Optimization'],
  },
  {
    id: 'seo-keyword-research',
    name: 'SEO & Keyword Research',
    category: 'SEARCH',
    categoryLabel: 'Search Optimization & Local Visibility',
    iconName: 'Search',
    icon: Search,
    iconAnimType: 'tilt',
    accentColor: '#008CFF',
    glowColor: 'rgba(0, 140, 255, 0.45)',
    meaning:
      'Conducting search intent analysis and on-page optimization to position website pages and business listings at the top of search engine results for high-value organic queries.',
    practicalActivities: [
      'High-intent, long-tail keyword discovery and competitive search gaps',
      'On-page title tags, meta descriptions, header structure & image alt text',
      'Google Business Profile (GBP) local citation & map ranking optimization',
      'Google Search Console indexing diagnostics and crawl monitoring',
    ],
    realWorldImpact:
      'Generates compounding long-term organic traffic without ongoing ad spend, attracting high-intent prospects actively seeking solutions.',
    tags: ['On-Page SEO', 'Keyword Discovery', 'Google Business Profile', 'Local SEO'],
  },
  {
    id: 'communication-strategy',
    name: 'Communication & Strategy',
    category: 'LEADERSHIP',
    categoryLabel: 'Strategic Leadership & Alignment',
    iconName: 'Compass',
    icon: Compass,
    iconAnimType: 'spin',
    accentColor: '#EC4899',
    glowColor: 'rgba(236, 72, 153, 0.45)',
    meaning:
      'Bridging technical capabilities with business objectives through articulate client consultations, stakeholder pitches, collaborative feedback loops, and cross-team alignment.',
    practicalActivities: [
      'Crafting high-impact client presentations and strategic growth proposals',
      'Translating complex analytics findings into concise executive summaries',
      'Facilitating clear feedback loops between creative and operational teams',
      'Guiding discovery conversations to uncover core business challenges',
    ],
    realWorldImpact:
      'Builds enduring client confidence, minimizes project ambiguity, and creates seamless alignment across multidisciplinary teams.',
    tags: ['Presentations', 'Stakeholder Alignment', 'Value Storytelling', 'Client Trust'],
  },
  {
    id: 'video-editing',
    name: 'Video Editing',
    category: 'PRODUCTION',
    categoryLabel: 'Motion & Short-Form Video',
    iconName: 'Film',
    icon: Film,
    iconAnimType: 'tilt',
    accentColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.45)',
    meaning:
      'Crafting dynamic, retention-optimized short-form video reels and promotional videos with deliberate visual pacing, seamless transitions, kinetic subtitles, and professional audio balancing.',
    practicalActivities: [
      'Editing high-energy Instagram Reels, YouTube Shorts & TikTok content',
      'Crafting compelling 3-second visual hooks to curb viewer drop-off',
      'Synchronizing sound effects, background audio & voiceover clarity',
      'Applying cinematic color correction, motion graphics & dynamic text',
    ],
    realWorldImpact:
      'Significantly elevates video completion rates, enhances algorithm distribution, and humanizes brand presence across modern video platforms.',
    tags: ['Reels & Shorts', 'Audio Balancing', 'Kinetic Typography', 'Retention Hooks'],
  },
  {
    id: 'ai-graphic-designing',
    name: 'AI Graphic Designing',
    category: 'AI & DESIGN',
    categoryLabel: 'Generative AI & Rapid Prototyping',
    iconName: 'Sparkles',
    icon: Sparkles,
    iconAnimType: 'spin',
    accentColor: '#00E5FF',
    glowColor: 'rgba(0, 229, 255, 0.5)',
    meaning:
      'Harnessing prompt engineering and cutting-edge generative AI design tools to rapidly produce custom visual assets, conceptual marketing posters, and iterative campaign variations.',
    practicalActivities: [
      'Prompt structuring for photorealistic & conceptual marketing imagery',
      'Rapid ideation of promotional campaign themes and backdrop elements',
      'AI upscaling, background expansion & selective visual refinement',
      'Blending AI-generated elements with typography and vector branding',
    ],
    realWorldImpact:
      'Accelerates creative production cycles by up to 60%, allowing rapid testing of multiple visual concepts while preserving premium aesthetics.',
    tags: ['Prompt Engineering', 'Generative Design', 'Rapid Ideation', 'Creative Velocity'],
  },
  {
    id: 'blog-writing',
    name: 'Blog Writing',
    category: 'EDITORIAL',
    categoryLabel: 'Content Writing & Thought Leadership',
    iconName: 'FileText',
    icon: FileText,
    iconAnimType: 'float',
    accentColor: '#008CFF',
    glowColor: 'rgba(0, 140, 255, 0.45)',
    meaning:
      'Writing structured, informative, and search-optimized blog articles that answer audience inquiries, build industry authority, and nurture readers along the buyer journey.',
    practicalActivities: [
      'Comprehensive topic research, content outlines & search-intent mapping',
      'Drafting scannable, reader-friendly articles with headers & key takeaways',
      'Embedding strategic internal links, related resources & relevant CTAs',
      'Editing existing articles to maintain search rankings and freshness',
    ],
    realWorldImpact:
      'Positions the brand as a dependable knowledge authority, improves site dwell time, and converts informational readers into lead inquiries.',
    tags: ['SEO Articles', 'Audience Research', 'Content Outlines', 'Editorial Cadence'],
  },
  {
    id: 'coordination',
    name: 'Coordination',
    category: 'OPERATIONS',
    categoryLabel: 'Workflow Organization & Delivery',
    iconName: 'Users',
    icon: Users,
    iconAnimType: 'pulse',
    accentColor: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.45)',
    meaning:
      'Managing task flows, synchronizing deliverables between copywriters, designers, and video editors, and keeping complex creative projects strictly on schedule.',
    practicalActivities: [
      'Structuring project boards, assigning sprint tasks & monitoring deadlines',
      'Conducting daily check-ins to unblock creative and technical hurdles',
      'Establishing centralized digital asset repositories for swift handoffs',
      'Maintaining clear documentation of client revisions and asset approvals',
    ],
    realWorldImpact:
      'Prevents scope creep, eliminates dropped deliverables, and ensures frictionless collaborative production across all project phases.',
    tags: ['Task Management', 'Asset Handoffs', 'Sprint Tracking', 'Process Discipline'],
  },
  {
    id: 'client-management',
    name: 'Client Management',
    category: 'RELATIONS',
    categoryLabel: 'Client Success & Account Growth',
    iconName: 'Briefcase',
    icon: Briefcase,
    iconAnimType: 'tilt',
    accentColor: '#EC4899',
    glowColor: 'rgba(236, 72, 153, 0.45)',
    meaning:
      'Nurturing transparent, dependable client partnerships by proactively communicating campaign progress, setting realistic expectations, and addressing feedback with speed.',
    practicalActivities: [
      'Conducting structured client onboarding and discovery sessions',
      'Delivering transparent progress updates with clear next-step roadmaps',
      'Synthesizing client feedback into actionable creative revision briefs',
      'Identifying expansion opportunities to add further value to client accounts',
    ],
    realWorldImpact:
      'Drives high client retention rates, generates enthusiastic referrals, and transforms one-off projects into long-term strategic retainers.',
    tags: ['Client Onboarding', 'Expectation Setting', 'Retention Strategy', 'Account Growth'],
  },
  {
    id: 'microsoft-azure',
    name: 'Microsoft Azure',
    category: 'CLOUD INFRA',
    categoryLabel: 'Cloud Infrastructure & Scalability',
    iconName: 'Cloud',
    icon: Cloud,
    iconAnimType: 'float',
    accentColor: '#008CFF',
    glowColor: 'rgba(0, 140, 255, 0.5)',
    meaning:
      'Understanding foundational cloud computing architecture, storage accounts, virtual machines, and cloud service deployments to support robust, scalable web applications.',
    practicalActivities: [
      'Navigating the Azure portal, resource groups & cloud management tools',
      'Configuring Blob storage containers and secure access policies',
      'Understanding fundamental cloud networking, security groups & uptime',
      'Collaborating with engineering teams to align marketing tech with cloud hosting',
    ],
    realWorldImpact:
      'Enables technical literacy when discussing hosting, web infrastructure, data security, and enterprise-grade cloud deployments.',
    tags: ['Cloud Fundamentals', 'Azure Portal', 'Blob Storage', 'Infrastructure'],
  },
];
