import type { Project, ExperienceItem, EducationItem, SkillCategory, PersonalStrength, ProcessStep } from '../types';

export const personalInfo = {
  name: 'Joel Thomas',
  initials: 'JT',
  title: 'Business Development Officer | Social Media Manager',
  roles: ['Business Development Officer', 'Social Media Manager',],
  email: 'joelt6704@gmail.com',
  phone: '+91 9495 943 808',
  phoneRaw: '+919495943808',
  location: 'Kerala, India',
  linkedin: 'https://www.linkedin.com/in/joel-thomas-289120354?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  instagram: 'https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=min72ba',
  facebook: 'https://www.facebook.com/share/1E8MtUSFSS/',
  twitter: 'https://x.com/JoelThomas33750',
  threads: 'https://www.threads.com/@joel___thomas___?invite=0',
  whatsapp: 'https://wa.me/919495943808',
  heroHeadline: 'Turning Creative Ideas Into Meaningful Business Growth.',
  heroSubheadline:
    'Business Development Officer and Social Media Manager bridging the gap between creative storytelling and data-backed growth. Experienced in lead generation, social media strategy, SEO, content creation, and targeted digital campaigns.',
  aboutIntro:
    'I work across business development and digital marketing, helping businesses attract and engage customers through lead generation, social media strategy, SEO, content creation, and targeted digital campaigns. I combine creative thinking with data-driven insights to improve brand visibility, audience engagement, and business growth.',
  aboutPhilosophy:
    'Rather than relying on vanity metrics or one-size-fits-all templates, I prioritize deeply understanding customer journeys, designing purposeful content, and refining strategies through systematic analytics.',
};

export const aboutHighlights = [
  {
    title: 'Business Development & Lead Generation',
    description: 'Nurturing relationships, identifying target segments, and driving qualified inquiries through structured outreach and student enrollment initiatives.',
    icon: 'TrendingUp',
  },
  {
    title: 'Social Media Management & Content Planning',
    description: 'Planning end-to-end editorial calendars, publishing consistently, and crafting high-retention content tailored for each platform.',
    icon: 'Share2',
  },
  {
    title: 'SEO & Digital Visibility',
    description: 'Executing on-page optimization, in-depth keyword research, and Google Business Profile management to enhance organic discoverability.',
    icon: 'Search',
  },
  {
    title: 'Marketing Analytics & Performance Reporting',
    description: 'Analyzing user behavior, engagement metrics, and conversion paths using Google Analytics to derive actionable optimizations.',
    icon: 'BarChart3',
  },
  {
    title: 'AI & Technology-Driven Marketing',
    description: 'Leveraging AI workflows, automation principles, and cloud fundamentals to increase campaign velocity and operational efficiency.',
    icon: 'Cpu',
  },
  {
    title: 'Microsoft Azure',
    description: 'Working with Microsoft Azure cloud services, cloud infrastructure, deployment, and essential cloud computing concepts to support scalable and reliable digital solutions.',
    icon: 'Cloud',
  },
];

export const approachPrinciples = [
  {
    number: '01',
    title: 'Understand the audience.',
    description: 'Uncover pain points, motivations, and preferred channels before writing a single headline or launching a campaign.',
  },
  {
    number: '02',
    title: 'Create meaningful content.',
    description: 'Produce high-value, visually engaging creatives that genuinely educate, build trust, and spark genuine interest.',
  },
  {
    number: '03',
    title: 'Measure, learn, and improve.',
    description: 'Continuously track engagement and conversion data to make calculated adjustments that maximize return on effort.',
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'Business Development',
    description: 'Strategic outreach, client communication, and revenue growth initiatives.',
    iconName: 'Briefcase',
    skills: [
      'Sales Strategy',
      'Lead Generation',
      'Customer Engagement',
      'Team Coordination',
      'Report Presentation',
    ],
  },
  {
    title: 'Social Media & Content',
    description: 'Multi-platform audience growth, brand positioning, and digital assets.',
    iconName: 'Sparkles',
    skills: [
      'Social Media Optimization (SMO)',
      'Meta Business Suite',
      'Canva',
      'CapCut',
      'Content Creation',
      'Content Calendar Planning',
      'Campaign Management',
    ],
  },
  {
    title: 'SEO & Analytics',
    description: 'Organic search visibility, traffic diagnostics, and local presence.',
    iconName: 'LineChart',
    skills: [
      'Search Engine Optimization',
      'Keyword Research',
      'SEO Audits',
      'Backlink Building',
      'Google Analytics',
      'Google Business Profile Management',
      'Performance Reporting',
    ],
  },
  {
    title: 'Technology & AI',
    description: 'Next-generation workflows, data principles, and cloud infrastructure foundations.',
    iconName: 'Cpu',
    skills: [
      'Digital Marketing with AI',
      'AI-Driven Marketing Automation Concepts',
      'Data-Driven Marketing',
      'Microsoft Azure Fundamentals',
      'Azure Virtual Machines and Storage',
      'Basic Azure Networking and Cloud Services',
    ],
  },
];

export const experiences: ExperienceItem[] = [
  {
    id: 'prep-academy',
    company: 'Prep Academy',
    role: 'Business Development Officer & Social Media Manager',
    period: 'January 2026 – Present',
    isCurrent: true,
    responsibilities: [
      'Managed sales and marketing activities, including telecalling, lead generation, and student enrollment campaigns.',
      'Managed daily social media publishing, content planning, Google Business Profile updates, and performance reporting.',
      'Created social media carousels, promotional posters, and digital creatives for CareerIQ360.',
      'Planned content calendars and executed digital marketing campaigns.',
      'Promoted the CareerIQ360 career guidance product through customer interactions and presentations.',
      'Conducted weekly social media performance analysis.',
      'Coordinated with designers and content teams to develop marketing materials and strengthen brand awareness.',
    ],
    tags: [
      'Business Development',
      'CareerIQ360',
      'Lead Generation',
      'Social Media Planning',
      'Google Business Profile',
      'Performance Reporting',
    ],
  },
  {
    id: 'pixelboho',
    company: 'PIXELBOHO Digital Marketing Agency',
    role: 'Digital Marketing Intern',
    period: 'October 2025 – December 2025',
    isCurrent: false,
    responsibilities: [
      'Executed on-page SEO strategies and keyword research.',
      'Analyzed website traffic, user behavior, and conversions using Google Analytics.',
      'Optimized Google Business Profiles to strengthen local search visibility.',
      'Identified valuable search terms to improve content discoverability.',
      'Supported organic search performance through SEO optimization and data-driven improvements.',
    ],
    tags: [
      'On-Page SEO',
      'Keyword Research',
      'Google Analytics',
      'GBP Optimization',
      'Search Visibility',
    ],
  },
];

export const projects: Project[] = [
  {
    id: 'prep-academy-social-media',
    title: 'Prep Academy – Social Media Management & Growth',
    category: 'Social Media Management',
    categoryLabel: 'Featured Project · Social Media Management',
    tagline:
      'Managed social media strategy, design, and content creation for Prep Academy, focusing on student admissions, competitive exams, and visual grid consistency.',
    overview:
      'Managed social media strategy, design, and content creation for Prep Academy, focusing on student admissions, competitive exams, and visual grid consistency. Created educational marketing creatives, admission-focused content, entrance examination updates, and engaging social media posts to maintain a consistent brand identity across the Instagram feed. Focused on clear communication, visually appealing designs, content planning, and audience engagement to support the academy\'s digital presence.',
    objective:
      'Establish a cohesive, informative visual presence on Instagram to drive student interest, admission inquiries, and brand trust for Prep Academy.',
    role: 'Social Media Manager & Content Strategist',
    strategy: [
      'Social Media Content Planning',
      'Educational Creatives',
      'Admission',
      'Competitive Exam Updates',
      'Visual Grid Consistency',
      'Brand Communication',
    ],
    deliverables: [
      'Social Media Content Planning',
      'Educational Creatives',
      'Admissions',
      'Competitive Exam Updates',
      'Visual Grid Consistency',
      'Brand Communication',
    ],
    outcome:
      'Maintained consistent visual grid aesthetics and active social media presence supporting student admissions and competitive exam guidance.',
    badge: '@prepacademy.in',
    assetType: 'instagram',
    imageUrl: '/prepacademy-instagram.png',
    externalLink: {
      url: 'https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=min72ba',
      label: 'VIEW LIVE PROFILE',
    },
    mockupDetails: {
      accentColor: '#0066FF',
      metricsLabel: 'Platform',
      metricsValue: 'Instagram Feed',
      sublabel: '@prepacademy.in • Education & Admissions',
      highlights: [
        'Social Media Content Planning',
        'Educational Creatives',
        'Admissions',
        'Competitive Exam Updates',
        'Visual Grid Consistency',
        'Brand Communication',
      ],
    },
  },
  {
    id: 'careeriq360-social-media',
    title: 'CareerIQ360 – Social Media Management, Content Creation & Creative Design',
    category: 'Social Media Management • Graphic Design • Content Creation',
    categoryLabel: 'PROJECT 02 · Social Media Management',
    tagline:
      'Personally managed the CareerIQ360 Instagram page and designed original branded creatives for career guidance, self-discovery, and student awareness.',
    overview:
      'Personally managed the CareerIQ360 Instagram page and created branded social media creatives to communicate career guidance, student awareness, self-discovery, learning styles, and future career opportunities. I handled the creative design process, content preparation, regular posting, and overall visual consistency of the page.',
    objective:
      'Create engaging, informative social media creatives to build brand awareness, communicate CareerIQ360’s services to students and parents, and maintain a consistent visual identity.',
    role: 'Social Media Manager & Creative Designer',
    strategy: [
      'Social Media Content Planning',
      'Educational Creatives & Infographics',
      'Career Guidance & Awareness Topics',
      'Visual Grid & Layout Consistency',
      'Branded Typography & Visual Identity',
      'Publishing & Daily Page Activities',
    ],
    deliverables: [
      'Designed original Instagram posts and creatives for CareerIQ360.',
      'Created educational content focused on career awareness, student development, and career guidance.',
      'Managed Instagram content publishing and day-to-day page activities.',
      'Maintained consistent branding, typography, layouts, and visual identity across posts.',
      'Prepared content and creatives to communicate CareerIQ360\'s services to students and parents.',
      'Managed the social media page and its creative content from design to publication.',
    ],
    outcome:
      'Personally directed and created all visual assets and published regular content, maintaining strong brand identity and visual consistency across the CareerIQ360 Instagram page.',
    badge: '@careeriq360',
    assetType: 'instagram',
    imageUrl: '/careeriq360-instagram.png',
    externalLink: {
      url: 'https://www.instagram.com/careeriq360/',
      label: 'VIEW LIVE PROFILE',
    },
    mockupDetails: {
      accentColor: '#8B5CF6',
      metricsLabel: 'Platform',
      metricsValue: 'Instagram Feed',
      sublabel: '@careeriq360 • Career Guidance & Self-Discovery',
      highlights: [
        'Original Instagram Posts & Creatives',
        'Career Awareness & Student Development',
        'Publishing & Day-to-Day Management',
        'Consistent Branding & Typography',
        'Service Communication for Parents & Students',
        'Full Management: Design to Publication',
      ],
    },
  },
  {
    id: 'careeriq360-blog',
    title: 'Blogs',
    category: 'CareerIQ360 – Career Insights Blog',
    categoryLabel: 'PROJECT 03 · Career Insights Blog',
    tagline: 'CareerIQ360 – Career Insights Blog',
    overview:
      'A career-focused blog platform for CareerIQ360 with expert articles on career planning, skill development, industry trends, and psychometric insights. Helps students and parents make smarter career decisions after Class 10 and 12.',
    objective:
      'Provide students and parents with expert career guidance, assessment insights, and educational pathway planning through a clean, modern digital publication.',
    role: 'Content Strategist & Web Developer',
    strategy: [
      'Category filters: All Insights, Career Guidance, Career Assessment, Parent Guidance',
      'Blog cards with thumbnail, category label, title, short excerpt, date and read time',
      'Search bar for topics, skills and keywords',
      'Newsletter subscription ("Stay Updated")',
      'Clean, responsive card-based layout with a hero section',
      'React, Tailwind CSS, Responsive UI, SEO-Friendly',
    ],
    deliverables: [
      'Category filters: All Insights, Career Guidance, Career Assessment, Parent Guidance',
      'Blog cards with thumbnail, category label, title, short excerpt, date and read time',
      'Search bar for topics, skills and keywords',
      'Newsletter subscription ("Stay Updated")',
      'Clean, responsive card-based layout with a hero section',
      'React, Tailwind CSS, Responsive UI, SEO-Friendly',
    ],
    outcome:
      'Successfully published and organized rich career guidance insights, enabling students and parents to navigate crucial academic and professional pathways.',
    badge: 'careeriq360.ai/blog',
    assetType: 'website',
    imageUrl: '/blogs-project.png',
    externalLink: {
      url: 'https://careeriq360.ai/blog',
      label: 'VIEW BLOGS',
    },
    mockupDetails: {
      accentColor: '#0066FF',
      metricsLabel: 'Platform',
      metricsValue: 'Web Blog Platform',
      sublabel: 'careeriq360.ai/blog • Career Insights & Guidance',
      highlights: [
        'Category filters: All Insights, Guidance, Assessment',
        'Blog cards with thumbnail, date & read time',
        'Search bar for topics, skills & keywords',
        'Newsletter subscription ("Stay Updated")',
        'Clean, responsive card layout with hero section',
        'React, Tailwind CSS, Responsive UI, SEO-friendly',
      ],
    },
  },
  {
    id: 'prep-academy-blogs',
    title: 'Blogs',
    category: 'Prep Academy – Educational Resources & Career Development Blogs',
    categoryLabel: 'PROJECT 04 · Educational Resources & Career Development Blogs',
    tagline: 'Prep Academy – Educational Resources & Career Development Blogs',
    overview:
      'A blog platform for Prep Academy with educational resources and career development articles for CAT, IPM/BBA and other entrance exam aspirants. Covers exam strategies, study plans and tips, success stories, popular articles, latest updates and notifications, and coaching guides, all published and managed by me.',
    objective:
      'Provide comprehensive exam preparation strategies, study tips, and educational resources for students targeting top management and competitive entrance examinations.',
    role: 'Blog Strategist & Content Manager',
    strategy: [
      'Category filters: All, Success Stories, Exam Strategies, Popular Articles, Latest Updates & Notification, Study Plans & Tips, Entrance Exams',
      'Search bar to find blogs by keyword',
      'Blog cards with a custom banner image, title, short excerpt and "Read More" link',
      'Responsive 4-column card grid with a dark theme and red/orange accents',
      'Navigation with All Courses, Blogs, Contact, Take A Quick Test and Login',
      'React, Tailwind CSS, Responsive UI, SEO-Friendly, Content Management',
    ],
    deliverables: [
      'Category filters: All, Success Stories, Exam Strategies, Popular Articles, Latest Updates & Notification, Study Plans & Tips, Entrance Exams',
      'Search bar to find blogs by keyword',
      'Blog cards with a custom banner image, title, short excerpt and "Read More" link',
      'Responsive 4-column card grid with a dark theme and red/orange accents',
      'Navigation with All Courses, Blogs, Contact, Take A Quick Test and Login',
      'React, Tailwind CSS, Responsive UI, SEO-Friendly, Content Management',
    ],
    outcome:
      'Published and managed strategic educational articles, study plans, and notifications empowering CAT, IPM/BBA, and competitive entrance test candidates.',
    badge: 'prepacademy.in/blogs',
    assetType: 'website',
    imageUrl: '/prep-academy-blogs.png',
    externalLink: {
      url: 'https://prepacademy.in/blogs',
      label: 'VIEW ALL BLOGS',
    },
    mockupDetails: {
      accentColor: '#0066FF',
      metricsLabel: 'Platform',
      metricsValue: 'Educational Blog Portal',
      sublabel: 'prepacademy.in/blogs • Entrance Exam Strategies & Guides',
      highlights: [
        'Category filters: Strategies, Tips & Exam Updates',
        'Keyword search for exam topics & study plans',
        'Blog cards with custom banners, excerpt & Read More',
        'Responsive 4-column grid layout',
        'Interactive navigation with Test portal link',
        'React, Tailwind CSS, Responsive UI, SEO-friendly',
      ],
    },
  },
  {
    id: 'whatnext-overseas-education',
    title: 'What Next Overseas Education Consultancy Service',
    category: 'What Next Overseas Education Consultancy Service',
    categoryLink: 'https://in.linkedin.com/company/what-next-overseas-education-consultancy-service',
    categoryLabel: 'PROJECT 05 · What Next Overseas Education Consultancy Service',
    tagline: 'What Next – Overseas Education Consultancy Service & Student Career Guidance',
    overview:
      'A comprehensive educational and career guidance presentation deck developed for What Next Overseas Education Consultancy Service (Bengaluru). Features strategic planning, overseas education insights, university selection pathways, success mindsets, and decision frameworks designed to empower students and aspirants navigating international education.',
    objective:
      'Empower students and study abroad aspirants with clear global educational pathways, actionable guidance, and university preparation frameworks through an engaging digital presentation.',
    role: 'Content Creator, Educational Strategist & Presentation Designer',
    strategy: [
      'Overseas Education Planning',
      'Global University Pathways',
      'Success Mindsets & Discipline',
      'Student Motivation & Clarity',
      'Branded Presentation Layouts',
      'Digital Document Publishing',
    ],
    deliverables: [
      'Curated 22-page comprehensive overseas education & guidance deck',
      'Core frameworks: Persistence, Hard Work, Discipline, and Global Readiness',
      'Quotes and insights from global thought leaders adapted for students',
      'Custom branded layout, structured typography, and slide deck',
      'Multi-channel digital publication and shareable presentation resource',
    ],
    outcome:
      'Authored and delivered a comprehensive 22-page educational and strategic guidance presentation for What Next Overseas Education Consultancy Service, supporting student counseling and global study preparation.',
    badge: 'What Next Overseas Education',
    assetType: 'pdf',
    imageUrl: '/whatnext-consultancy.png',
    pdfUrl: '/blogs/whatnext-blogs.pdf',
    externalLink: {
      url: 'https://drive.google.com/file/d/1NM5_cBoGqSWUyBH4NJg7J6pVqh1X6U8I/view?usp=drive_link',
      label: 'VIEW MORE',
    },
    mockupDetails: {
      accentColor: '#10B981',
      metricsLabel: 'Format',
      metricsValue: 'Overseas Education Deck',
      sublabel: 'What Next Overseas Education Consultancy Service',
      highlights: [
        '22-Page Guidance Deck',
        'Study Abroad Pathways',
        'Success Mindset Framework',
        'Branded Slide Typography',
        'Student Advisory Materials',
        'Digital Publication (PDF)',
      ],
    },
  },
  {
    id: 'whatnext-blogs',
    title: 'Whatnext Blogs',
    category: 'WhatNext – Overseas Study & Student Life Blogs',
    categoryLabel: 'PROJECT 06 · Educational Blogs',
    tagline: 'WhatNext – Overseas Study Planning, Student Life & Career Guidance Publication',
    overview:
      'A curated 37-page comprehensive educational blog publication created for WhatNext Overseas Education Consultancy. Authored by Dr. Kalyani Yalamanchi (PhD, Founder & CEO), this series covers essential study abroad insights including overcoming homesickness, avoiding critical planning mistakes, application timelines, scholarship strategies, and international employability.',
    objective:
      'Provide international students and study abroad aspirants with authentic, actionable advice on overcoming cultural adjustments, mastering university applications, and building global career readiness.',
    role: 'Content Publisher, Blog Strategist & Publication Designer',
    strategy: [
      'Student Life & Homesickness Guide',
      'Common Study Abroad Pitfalls',
      'Application Timelines & Intakes',
      'Scholarship & Financial Strategy',
      'Global Employability & O-1 Visa',
      'International Student LinkedIn Guide',
    ],
    deliverables: [
      '37-page educational blog and student guide collection',
      'Comprehensive articles on overcoming homesickness and cultural adjustment',
      'Practical strategies for application timing, test preparation, and scholarships',
      'Insights on graduate employability vs degree selection by Dr. Kalyani Yalamanchi',
      'Digital publication and shareable PDF guide for global education aspirants',
    ],
    outcome:
      'Successfully produced and released an extensive 37-page student advisory publication, educating students on international education realities and enhancing WhatNext\'s authoritative guidance.',
    badge: 'WhatNext • Blogs',
    assetType: 'pdf',
    imageUrl: '/whatnext-blogs-cover.png',
    pdfUrl: '/blogs/blogs-what-next.pdf',
    externalLink: {
      url: 'https://drive.google.com/file/d/1gsKgHFRDIHfAixptep0XGomOEi7uEMrC/view?usp=sharing',
      label: 'VIEW MORE',
    },
    mockupDetails: {
      accentColor: '#FB7185',
      metricsLabel: 'Format',
      metricsValue: '37-Page Blog Collection',
      sublabel: 'WhatNext • Educational Blog Series',
      highlights: [
        '37-Page Blog Publication',
        'Student Homesickness Guide',
        'Study Abroad Pitfalls & Tips',
        'Scholarships & Timeline Guide',
        'Employability & LinkedIn Advice',
        'Digital Publication (PDF)',
      ],
    },
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Discover',
    description: 'Understand the brand, target audience persona, and specific business objectives before formulating any tactic.',
    iconName: 'Compass',
  },
  {
    step: '02',
    title: 'Strategize',
    description: 'Plan the content calendar, keyword targets, campaign funnels, and execution timelines for maximum relevance.',
    iconName: 'Target',
  },
  {
    step: '03',
    title: 'Create',
    description: 'Develop compelling visual creatives, promotional carousels, and high-impact marketing assets using Canva and modern tools.',
    iconName: 'PencilRuler',
  },
  {
    step: '04',
    title: 'Execute',
    description: 'Publish across channels, initiate outreach or telecalling, coordinate team deliverables, and manage day-to-day campaign activities.',
    iconName: 'Rocket',
  },
  {
    step: '05',
    title: 'Analyze',
    description: 'Review engagement metrics and conversion data to extract actionable insights and continually refine future performance.',
    iconName: 'TrendingUp',
  },
];

export const educationList: EducationItem[] = [
  {
    id: 'bca',
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Mahatma Gandhi University',
    period: 'July 2022 – May 2025',
    status: 'Completed',
    certification: 'Degree of Bachelor of Computer Applications',
    certificateImage: '/education/bca/bca-degree-certificate-mahatma-gandhi-university.jpg',
    certificateTitle: 'Mahatma Gandhi University — BCA Degree',
    certificateSubtitle: 'Faculty of Technology & Applied Sciences · Joel Thomas · Reg No: 220021083014',
    details: 'Comprehensive foundations in computer applications, programming fundamentals, databases, web technologies, and computational logic.',
    focusAreas: ['Computer Applications', 'Web Technologies', 'Database Systems', 'Software Concepts'],
  },
  {
    id: 'dm-ai',
    degree: 'Digital Marketing with AI',
    institution: 'Unique Occassio Tech',
    period: 'June 2025 – August 2025',
    status: 'Completed',
    certification: 'Certified in Digital Marketing With AI',
    certificateImage: '/education/digital-marketing/sted-council-digital-marketing-certificate.jpg',
    details: 'Intensive specialization focused on data-driven strategies, marketing automation concepts, performance optimization, and AI-driven tools in modern digital marketing.',
    focusAreas: ['AI-Driven Marketing Tools', 'Performance Optimization', 'Automation Concepts', 'Data Analytics'],
  },
  {
    id: 'azure',
    degree: 'Microsoft Azure Fundamentals',
    institution: 'Unique Occassio Tech',
    period: 'August 2026 – October 2026',
    status: 'Completed',
    certification: 'Certificate of Achievement — Microsoft Azure',
    certificateImage: '/education/microsoft-azure/microsoft-azure-certificate.jpg',
    certificateTitle: 'Unique Occassio Tech — Microsoft Azure',
    certificateSubtitle: 'Certificate of Achievement · Issued to Joel Thomas · Grade A',
    details: 'Completed cloud computing fundamentals, Azure Virtual Machines, Storage, Networking, and basic cloud deployment and management.',
    focusAreas: ['Cloud Fundamentals', 'Azure Virtual Machines', 'Cloud Storage', 'Basic Azure Networking'],
  },
];

export const personalStrengths: PersonalStrength[] = [
  {
    title: 'Creative Problem-Solving',
    description: 'Finding resourceful, unconventional solutions to marketing roadblocks and audience engagement challenges.',
    iconName: 'Lightbulb',
  },
  {
    title: 'Communication',
    description: 'Articulating value propositions with clarity in presentations, client calls, and written copy.',
    iconName: 'MessageSquare',
  },
  {
    title: 'Analytical Thinking',
    description: 'Dissecting data metrics to uncover underlying trends, consumer intent, and optimization avenues.',
    iconName: 'LineChart',
  },
  {
    title: 'Team Collaboration',
    description: 'Coordinating seamlessly with cross-functional designers, content creators, and leadership to ship cohesive work.',
    iconName: 'Users',
  },
  {
    title: 'Time Management',
    description: 'Balancing simultaneous deadlines across daily publishing, telecalling campaigns, and analytics reporting.',
    iconName: 'Clock',
  },
  {
    title: 'Continuous Learning',
    description: 'Actively expanding technical competencies across cloud infrastructure, AI marketing, and digital trends.',
    iconName: 'GraduationCap',
  },
];
