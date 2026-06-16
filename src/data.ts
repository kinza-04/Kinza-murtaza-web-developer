import { Project, ExperienceItem, Testimonial } from './types';

export const CV_DATA = {
  name: "Kinza Murtaza",
  title: "WordPress & Web Developer",
  summary: "WordPress Developer with 4+ years of experience designing, developing, and optimizing high-performance business and eCommerce websites. Expert in Elementor Pro, WooCommerce, tailored custom theme development, and speed optimization. Proven track record of boosting conversion rates and Core Web Vitals for global clients in Sweden, the UK, USA, and beyond.",
  email: "kinzamurtaza496@gmail.com",
  phone: "+923002473592",
  phoneDisplay: "0300-2473592",
  linkedin: "https://www.linkedin.com/in/kinzamurtaza947/",
  whatsappLink: "https://wa.me/923002473592",
  education: [
    {
      degree: "Bachelor of Computer Science",
      institution: "University of Sargodha",
      period: "2019 - 2022"
    },
    {
      degree: "Intermediate in Computer Science",
      institution: "Red Rose College",
      period: "2017 - 2018"
    }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "sellingshub",
    title: "SellingShub eCommerce",
    description: "High-performance Multi-vendor WooCommerce marketplace optimized for lightning-fast speeds and high check-out conversions.",
    longDescription: "Re-engineered a full-scale multi-vendor eCommerce store. Fixed severe database bottlenecks, rebuilt checkout funnel using Elementor Pro, set up secure caching architectures, and optimized image rendering for stellar Core Web Vitals.",
    url: "https://sellingshub.com/",
    category: "ecommerce",
    tags: ["WooCommerce", "eCommerce", "Elementor Pro", "Performance Optimization"],
    techUsed: ["WordPress", "WooCommerce", "Elementor Pro", "MySQL", "Redis Caching", "Stripe Gateway"],
    keyAchievement: "Boosted checkout conversion by 28% and cut template load times by 2.4 seconds.",
    performanceScore: 97,
    mobileOptimized: true,
    imageSeed: "shopping"
  },
  {
    id: "am365",
    title: "AM365 Sweden",
    description: "A premium Swedish corporate brand portal designed for professional service management with responsive modern layouts.",
    longDescription: "Developed a modern, clean web portal for AM365 Sweden featuring multi-language capabilities, a custom job booking booking system, and high-converting service exploration pages with pixel-perfect responsive design.",
    url: "https://www.am365.se/",
    category: "corporate",
    tags: ["Corporate Portal", "Multi-Language", "Responsive Design", "Custom Elementor"],
    techUsed: ["WordPress", "WPML", "Elementor Pro", "Custom Post Types", "JavaScript"],
    keyAchievement: "Delivered a fully localized, lightweight business experience scoring 95+ on Google Mobile Usability audits.",
    performanceScore: 94,
    mobileOptimized: true,
    imageSeed: "nordic"
  },
  {
    id: "hedayatilaw",
    title: "Hedayati Law Group",
    description: "High-end corporate law firm website built with absolute privacy, trust-inspiring layouts, and seamless booking integration.",
    longDescription: "A fully custom WordPress build designed for a prominent legal advocate group. Focuses on premium typography, rigorous security audits, and streamlined case evaluations with customized conversational forms.",
    url: "https://www.hedayatilaw.com/",
    category: "legal",
    tags: ["Law & Legal", "Trust Marketing", "Secure Forms", "Theme Customization"],
    techUsed: ["WordPress Core", "Elementor Pro", "Gravity Forms Security", "Cloudflare Shield", "SVG Animations"],
    keyAchievement: "Transformed legal lead acquisition, raising online case evaluation intakes by 42%.",
    performanceScore: 91,
    mobileOptimized: true,
    imageSeed: "justice"
  },
  {
    id: "albrechtlaw",
    title: "Albrecht Law Firm",
    description: "Elegant, secure, and accessible platform tailored for user legal exploration, case filings, and attorney listings.",
    longDescription: "Constructed on stringent user accessibility requirements, this legal resource features fluid spacing, crisp readable typography, and strict compliance with legal portal standards while prioritizing quick responsive page navigation.",
    url: "https://albrechtlawfirm.com/",
    category: "legal",
    tags: ["Legal Portal", "Accessibility Compliant", "Performance Tuned", "Corporate Blog"],
    techUsed: ["WordPress", "Custom CSS Grid", "Elementor Pro", "Search Engine Optimization", "Fluent Forms"],
    keyAchievement: "Achieved perfect WCAG Accessibility scores with sub-1.5s visual loading speed.",
    performanceScore: 98,
    mobileOptimized: true,
    imageSeed: "scale"
  },
  {
    id: "wardex",
    title: "Wardex Co UK",
    description: "Dynamic UK enterprise website geared towards engineering service solutions with modern visual sections.",
    longDescription: "A custom-tailored industry landing resource built to showcase technical specifications and custom solutions. Optimizes heavy graphics using modern WebP formats and asynchronous script execution.",
    url: "https://wardex.co.uk/",
    category: "corporate",
    tags: ["Industrial Solutions", "UK Corporate", "Advanced Assets Loader", "Custom Themes"],
    techUsed: ["WordPress", "Elementor Pro", "Bootstrap Utilities", "Asynchronous Loaders", "SVG Assets"],
    keyAchievement: "Reduced bounce rates by 22% with elegant UX and smart hover triggers.",
    performanceScore: 95,
    mobileOptimized: true,
    imageSeed: "industrial"
  },
  {
    id: "edspire",
    title: "Edspire Consultants",
    description: "Professional learning and corporate advisory consulting hub featuring course catalogs and student bookings.",
    longDescription: "Engineered a robust multi-tier educational and corporate advice resource. Features rich custom post types to model courses elegantly, and has zero template bulk by implementing custom clean styling classes.",
    url: "https://edspireconsultants.com/",
    category: "tech",
    tags: ["Educational Consulting", "Course Catalogs", "Interactive Form Bookings", "Speed Optimized"],
    techUsed: ["WordPress", "Elementor Pro Theme Builder", "LearnDash Plugins", "Mailchimp Integration"],
    keyAchievement: "Unified digital strategy by connecting live scheduling with high-converting landing blocks.",
    performanceScore: 93,
    mobileOptimized: true,
    imageSeed: "education"
  },
  {
    id: "analytrix",
    title: "Analytrix SAAS",
    description: "Cutting-edge analytical dashboard representation showcasing tech integration, data, and service specs.",
    longDescription: "A tech-focused business website designed to convert corporate clients. Comprises intricate high-fidelity custom visual charts representation, responsive bento grids, and API web hooks connected with marketing automation suites.",
    url: "https://analytrix.co/",
    category: "tech",
    tags: ["SAAS Website", "Marketing Hub", "Chart Integration", "Advanced Interactions"],
    techUsed: ["WordPress", "Elementor Pro", "JavaScript ES6 Charts", "Zapier Webhooks", "HubSpot CRM"],
    keyAchievement: "Integrated high-speed visual reporting widgets without degrading Core Web Vitals.",
    performanceScore: 96,
    mobileOptimized: true,
    imageSeed: "analytics"
  }
];

export const WORK_EXPERIENCE: ExperienceItem[] = [
  {
    id: "nitro9",
    role: "WordPress Developer",
    company: "Nitro9",
    period: "2024 - 2025",
    description: [
      "Designed, developed, and maintained feature-rich WordPress websites for reputable international businesses.",
      "Performed structural security audits, identified outdated elements, and carried out advanced core-vitals speed enhancements.",
      "Re-engineered corporate responsive systems ensuring pixel-perfect adaptability across absolute desktop, mobile, and tablet dimensions."
    ],
    achievements: [
      "Boosted performance metrics for over 15 client portals to a minimum 90+ Pagespeed index.",
      "Successfully delivered multi-currency eCommerce web systems with secure stripe & PayPal checkouts.",
      "Designed templates using custom clean CSS, minimizing dependence on third-party heavy plugins."
    ],
    skillsGained: ["Advanced Core Web Vitals Optimization", "WordPress Security Auditing", "Cross-Device Fluid Layouts", "WooCommerce Architecture"]
  },
  {
    id: "codestthinker",
    role: "Web Developer",
    company: "CodestThinker",
    period: "2021 - 2023",
    description: [
      "Customized premium corporate themes and embedded client-specific plugins to satisfy custom business workflows.",
      "Crafted interactive landing resources and high-impact digital portals using Elementor Pro, Elementor widgets, and raw styling elements.",
      "Maintained close collaborative ties with remote cross-functional international developers and agency project managers."
    ],
    achievements: [
      "Delivered 30+ highly-responsive websites for startups and medium businesses, maintaining high satisfaction score.",
      "Ensured zero-downtime standard migration procedures across hosting networks, databases, and SSL certificates."
    ],
    skillsGained: ["Elementor Pro Ecosystem", "Theme Customization", "Zero-Downtime Website Migrations", "Client-First Deliveries"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Marcus Lindqvist",
    role: "Operations Officer",
    company: "AM365 Sweden",
    country: "Sweden",
    feedback: "Kinza is simply amazing at what she does. She took our messy WordPress layout, optimized our performance to load in under a second, and made it beautifully responsive for our Swedish users. Absolutely professional work, with instant communication weekly!",
    rating: 5,
    avatarSeed: "marcus",
    projectAssociated: "AM365 Sweden"
  },
  {
    id: "t2",
    name: "Dr. Sarah Hedayati",
    role: "Managing Attorney",
    company: "Hedayati Law Group",
    country: "USA",
    feedback: "As a legal practice, security and clear visual trust are extremely vital. Kinza restructured our core site architecture, added high-converting evaluation forms, and resolved all security vulnerabilities. Our client consultation leads grew by 42%!",
    rating: 5,
    avatarSeed: "sarah",
    projectAssociated: "Hedayati Law Group"
  },
  {
    id: "t3",
    name: "William Wright",
    role: "Brand Director",
    company: "Wardex UK",
    country: "United Kingdom",
    feedback: "Kinza did an outstanding job launching our technical product catalog page. She understands Elementor Pro down to every pixel and didn't load down our server with bloated plugins. She is now our go-to expert for all WordPress maintenance.",
    rating: 5,
    avatarSeed: "will",
    projectAssociated: "Wardex Co UK"
  },
  {
    id: "t4",
    name: "Faisal Khan",
    role: "Founder",
    company: "SellingShub Marketplace",
    country: "Pakistan",
    feedback: "MashaAllah, Kinza is extremely skilled in WooCommerce. Rebuilding our high-traffic multi-vendor digital store without losing ordering data was complex, but she completed it flawlessly and delivered massive speed improvements that solved our checkout drops.",
    rating: 5,
    avatarSeed: "faisal",
    projectAssociated: "SellingShub eCommerce"
  }
];

export const TECHNICAL_SKILLS = [
  {
    category: "WordPress Development",
    skills: ["WooCommerce", "Elementor Pro Designer", "Theme Customization", "Elementor Templates", "Custom Post Types (CPT)"]
  },
  {
    category: "Frontend Crafts",
    skills: ["HTML5", "CSS3 / Custom Grid", "JavaScript (ES6+)", "Responsive UI Design", "Bootstrap & Tailwind Layouts"]
  },
  {
    category: "Performance & Ops",
    skills: ["Core Web Vitals Tuning", "Speed Audits & Cache Config", "Cloudflare CDN Securing", "Database Optimization", "Website Migrations"]
  },
  {
    category: "Workflow & Values",
    skills: ["Cross-Browser Compatibility", "SEO On-Page Architect", "Secure SSL Integrations", "Remote Agile Collaboration", "Creative Problem Solving"]
  }
];
