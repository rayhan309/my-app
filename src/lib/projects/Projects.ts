export const Allprojects = [
  {
    id: "2",
    title: "Fashion Museum BD",
    description: "A premium fashion retail solution focusing on high-quality visual presentation and user engagement.",
    image: "/fashionmuseum_mockup.png",
    githubLink: "https://github.com/rayhan309",
    liveLink: "https://fashionmuseumbd.com/",
    technologies: ["Next.js", "React", "Tailwind CSS", "Vercel", "MUI", "Framer Motion"],
  },
  {
    id: "7",
    title: "ChatsNest",
    description: "A real-time instant messaging application featuring seamless room-based communication and live interaction using WebSockets.",
    image: "/chatsnest_mockup.png", // actual path check kore nio
    githubLink: "https://github.com/rayhan309",
    liveLink: "https://chatsnest.vercel.app/",
    technologies: ["Next.js", "Socket.io", "Express.js", "Tailwind CSS"],
  },
  {
    id: "3",
    title: "Ibrahim Mahmud Portfolio",
    description: "A professional digital strategist portfolio showcasing services, results, and expertise with sleek animations.",
    image: "/ibrahim_portfolio_mockup.png",
    githubLink: "https://github.com/rayhan309",
    liveLink: "https://ibrahimmahmud.com/",
    technologies: ["Next.js", "Framer Motion", "Tailwind", "Lucide Icons"],
  },
  {
    id: "4",
    title: "Automation Section",
    description: "A specialized automation landing page demonstrating high-speed processing and modern interface logic.",
    image: "/automation_mockup.png",
    githubLink: "https://github.com/rayhan309",
    liveLink: "https://next-js-la-section-automation.vercel.app/",
    technologies: ["Next.js", "TypeScript", "GSAP", "Server Components"],
  },
  {
    id: "5",
    title: "Halal Market BD",
    description: "A niche e-commerce marketplace focused on halal-certified products with secure payment integration.",
    image: "/halalmarket_mockup.png",
    githubLink: "https://github.com/rayhan309",
    liveLink: "https://halalmarketbd.com/",
    technologies: ["React", "Node.js", "MongoDB", "Payment Gateway"],
  },
  {
    id: "6",
    title: "FlexShip IT",
    description: "Official agency website for FlexShip IT, highlighting high-performance software engineering and digital solutions.",
    image: "/flexship_mockup.png",
    githubLink: "https://github.com/rayhan309",
    liveLink: "https://flexship-it.vercel.app/",
    technologies: ["Next.js", "Tailwind", "Shadcn UI", "Agency Site"],
  },
  {
    id: "1",
    title: "FairBazar",
    description: "A comprehensive e-commerce platform designed for seamless shopping experiences with a clean, modern UI.",
    image: "/fairbazar_mockup.png", // Update with your actual screenshot path
    githubLink: "https://github.com/rayhan309",
    liveLink: "https://fairbazar.vercel.app/",
    technologies: ["Next.js", "Tailwind CSS", "Redux", "Node.js"],
  },
  {
    id: "8",
    title: "Rongchowa",
    description: "A visually stunning creative landing page featuring high-end animations and a seamless full-stack integration for lead management.",
    image: "/rongchowa_mockup.png",
    githubLink: "https://github.com/rayhan309",
    liveLink: "https://rongchowa.vercel.app/",
    technologies: ["React", "Framer Motion", "Node.js", "MongoDB"],
  },
  {
    id: "9",
    title: "SubashStyle",
    description: "A luxury fragrance landing page designed with elegant transitions and a robust full-stack architecture for a premium shopping experience.",
    image: "/subashstyle_mockup.png",
    githubLink: "https://github.com/rayhan309",
    liveLink: "https://subashstyle-com.vercel.app/",
    technologies: ["React", "Framer Motion", "Node.js", "MongoDB"],
  },
  {
    id: "10",
    title: "MOAS-DB",
    description: "A high-conversion educational landing page built with interactive course modules and a seamless full-stack backend for student enrollment.",
    image: "/moas_db_mockup.png",
    githubLink: "https://github.com/rayhan309",
    liveLink: "https://moas-db.vercel.app/",
    technologies: ["React", "Framer Motion", "Node.js", "MongoDB"],
  },
  {
    id: "11",
    title: "AssetVerse Pro",
    description: "An enterprise-level Asset & Employee Management System featuring automated tracking, role-based access control (RBAC), and secure Stripe payment integration.",
    image: "/assetverse_mockup.png",
    githubLink: "https://github.com/rayhan309",
    liveLink: "https://assets-pro-ca84b.web.app/",
    technologies: ["React", "Firebase", "Node.js", "Stripe API", "Tailwind CSS"],
  },
  {
    id: "12",
    title: "ElectroPay Dashboard",
    description: "A digital utility billing platform that streamlines electricity bill management with real-time tracking, historical data visualization, and a seamless animated UI.",
    image: "/electricity_bill_mockup.png",
    githubLink: "https://github.com/rayhan309",
    liveLink: "https://electricity-bills-225bf.web.app/",
    technologies: ["React", "Framer Motion", "Node.js", "MongoDB", "MUI/Tailwind"],
  },
  {
    id: "13",
    title: "Burger Shot",
    description: "A high-performance, responsive fast-food landing page built with raw HTML and optimized JavaScript, focusing on pixel-perfect UI and smooth scrolling.",
    image: "/burger_shop_mockup.png",
    githubLink: "https://github.com/rayhan309/Burgur-Shop",
    liveLink: "https://rayhan309.github.io/Burgur-Shop/",
    technologies: ["HTML5", "Tailwind CSS", "JavaScript", "FontAwesome"],
  },
  {
    id: "14",
    title: "AI Autonomous Agent",
    description: "A Python-based AI agent designed for automated task execution and data analysis.",
    image: "/ai_agent_preview.png",
    githubLink: "https://github.com/rayhan309",
    liveLink: null, // No live link
    status: "Private/Local Tool",
    technologies: ["Python", "OpenAI API", "LangChain"],
  }
];

export const singleProject = (id: string) => {
  return Allprojects.find((project: any) => project.id === id);
}

export const AllprojectsDitails = [
  {
  id: "2",
  title: "Fashion Museum BD",
  subtitle: "Premium E-commerce & Fashion Showcase",
  description: "A high-performance fashion retail platform built to deliver a luxury shopping experience. It features high-quality visual galleries, interactive product displays, and a seamless checkout flow optimized for conversion.",
  image: "/fashionmuseum_mockup.png",
  liveLink: "https://fashionmuseumbd.com/",
  githubLink: "https://github.com/rayhan309",
  
  // Detailed metadata for the project page
  details: {
    client: "Fashion Museum BD",
    duration: "2 Months",
    role: "Senior Full-stack Engineer",
    category: "E-commerce / Retail",
  },

  // Key highlights to show in a list
  features: [
    "Dynamic Product Catalog with advanced filtering",
    "High-end smooth animations using Framer Motion",
    "Responsive and Mobile-first Design with Tailwind & MUI",
    "SEO optimized Server-side rendering with Next.js",
    "Integrated secure payment and order tracking",
  ],

  // Grouped technologies for a better UI display
  stack: {
    frontend: ["Next.js", "React", "MUI", "Framer Motion", "Tailwind CSS"],
    backend: ["Node.js", "Express", "MongoDB"], // Based on your typical stack
    deployment: ["Vercel"],
  },

  // If you want to show a gallery on the details page
  gallery: [
    "/fashion-museum-home.png",
    "/fashion-museum-product.png",
    "/fashion-museum-mobile.png",
  ],

  // Challenges & Solutions (Senior level touch)
  overview: "The primary challenge was to balance high-quality imagery with fast loading speeds. By leveraging Next.js Image optimization and server-side rendering, I achieved a sub-second page load while maintaining a premium visual aesthetic."
},
{
  id: "7",
  title: "ChatsNest",
  subtitle: "Real-time Messaging & Collaboration Engine",
  description: "A robust instant messaging platform engineered for low-latency communication. It leverages WebSockets for bi-directional data flow, enabling users to interact in real-time within persistent and private chat rooms.",
  image: "/chatsnest_mockup.png",
  liveLink: "https://chatsnest.vercel.app/",
  githubLink: "https://github.com/rayhan309",
  
  details: {
    client: "Open Source / Personal Project",
    duration: "1.5 Months",
    role: "Lead Full-stack Architect",
    category: "Real-time Communication (RTC)",
  },

  features: [
    "Real-time bi-directional messaging with Socket.io",
    "Dynamic Room Creation and Management",
    "Instant Typing Indicators and Active Status tracking",
    "Message Persistence with database integration",
    "Responsive Chat UI with optimized auto-scroll logic",
  ],

  stack: {
    frontend: ["Next.js", "Socket.io-client", "Tailwind CSS", "Framer Motion"],
    backend: ["Node.js", "Express.js", "Socket.io Server"],
    database: ["MongoDB", "Redis (for scaling)"], // Assuming standard high-end chat stack
    deployment: ["Vercel", "Railway/Render"],
  },

  gallery: [
    "/fashion-museum-home.png",
    "/fashion-museum-product.png",
    "/fashion-museum-mobile.png",
  ],

  overview: "The primary engineering hurdle was managing concurrent socket connections and ensuring message delivery across different rooms without data leakage. I implemented a solid room-based architecture and handled socket cleanups to prevent memory leaks, resulting in a highly stable real-time environment."
},
{
  id: "3",
  title: "Ibrahim Mahmud Portfolio",
  subtitle: "Digital Strategy & Growth Showcase",
  description: "A high-conversion personal brand platform designed for a digital strategist. The project focuses on storytelling through data, showcasing results with interactive elements, and maintaining a premium aesthetic that builds instant authority.",
  image: "/ibrahim_portfolio_mockup.png",
  liveLink: "https://ibrahimmahmud.com/",
  githubLink: "https://github.com/rayhan309",
  
  details: {
    client: "Ibrahim Mahmud",
    duration: "3 Weeks",
    role: "Lead Frontend Developer",
    category: "Personal Branding / Portfolio",
  },

  features: [
    "Sleek and professional animations using Framer Motion",
    "Dynamic project filtering for case studies",
    "Custom iconography with Lucide Icons integration",
    "Optimized for high Lighthouse scores and SEO performance",
    "Mobile-responsive design with a focus on premium typography",
  ],

  stack: {
    frontend: ["Next.js", "React", "Framer Motion", "Tailwind CSS"],
    icons: ["Lucide Icons", "React Icons"],
    deployment: ["Vercel"],
    tools: ["PostCSS", "Autoprefixer"],
  },

  gallery: [
    "/fashion-museum-home.png",
    "/fashion-museum-product.png",
    "/fashion-museum-mobile.png",
  ],

  overview: "The main goal was to create a digital presence that feels both modern and trustworthy. I implemented a 'less is more' design philosophy, ensuring that the sleek animations didn't distract from the core content—Ibrahim's strategic results. Using Next.js, I ensured the site loads almost instantaneously, which is critical for a high-profile digital strategist."
},
{
  id: "4",
  title: "L.A Section Automation",
  subtitle: "Govt. Land Acquisition & Office Automation System",
  description: "A specialized automation platform developed for the Patuakhali District Land Office. This system streamlines complex land acquisition (L.A) processes, data management, and public service workflows with a focus on transparency and high-speed data processing.",
  image: "/automation_mockup.png",
  liveLink: "https://next-js-la-section-automation.vercel.app/",
  githubLink: "https://github.com/rayhan309",
  
  details: {
    client: "Patuakhali District Land Office (Govt. of Bangladesh)",
    duration: "3 Months",
    role: "Full-stack System Architect",
    category: "Government Automation / SaaS",
  },

  features: [
    "High-performance dashboard for land acquisition tracking",
    "Automated data entry and document generation logic",
    "Server-side rendering for instant data retrieval using Next.js",
    "Advanced UI interactions and smooth transitions with GSAP",
    "Role-based access control for administrative security",
  ],

  stack: {
    frontend: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    backend: ["Next.js API Routes", "Server Components"],
    database: ["PostgreSQL / MongoDB"], // update as per your project
    performance: ["Vercel Edge Functions", "Server-side Caching"],
  },

  gallery: [
    "/fashion-museum-home.png",
    "/fashion-museum-product.png",
    "/fashion-museum-mobile.png",
  ],

  overview: "Developed specifically for the Patuakhali Land Office, the challenge was to modernize a legacy manual process into a digital ecosystem. I focused on building a 'Logic-First' interface that simplifies complex land-related data entries while ensuring high security. Using GSAP, I added subtle but professional micro-interactions that make the heavy administrative tasks feel fluid and modern."
},
{
  id: "5",
  title: "Halal Market BD",
  subtitle: "Niche E-commerce Marketplace for Ethical Products",
  description: "A specialized e-commerce platform dedicated to providing halal-certified products. The project emphasizes secure transactions, a trust-driven user interface, and an efficient vendor-to-customer workflow to ensure product authenticity.",
  image: "/halalmarket_mockup.png",
  liveLink: "https://halalmarketbd.com/",
  githubLink: "https://github.com/rayhan309",
  
  details: {
    client: "Halal Market Bangladesh",
    duration: "2.5 Months",
    role: "Full-stack Developer",
    category: "E-commerce / Marketplace",
  },

  features: [
    "Trust-focused UI design for high brand credibility",
    "Secure Payment Gateway integration for seamless transactions",
    "Real-time order management and inventory tracking",
    "Advanced search and category filtering for niche products",
    "Dynamic product reviews and rating system to build community trust",
  ],

  stack: {
    frontend: ["React", "Tailwind CSS", "Redux (for state management)"],
    backend: ["Node.js", "Express.js"],
    database: ["MongoDB"],
    finance: ["SSLCommerz / Stripe Integration"], // assuming standard BD/Global gateway
  },

  gallery: [
    "/fashion-museum-home.png",
    "/fashion-museum-product.png",
    "/fashion-museum-mobile.png",
  ],

  overview: "The biggest challenge for Halal Market BD was creating an interface that felt both modern and ethically aligned. I focused on a 'Trust-First' architecture, ensuring that every step—from product discovery to the secure checkout—felt transparent and secure. By using Node.js and MongoDB, I ensured the platform could scale easily as the product catalog grew."
},
{
  id: "6",
  title: "FlexShip IT",
  subtitle: "Full-Service Digital Agency Solution",
  description: "The official digital presence for FlexShip IT. This platform serves as a high-performance hub for software engineering services, featuring optimized landing sections, interactive service showcases, and a seamless client acquisition funnel.",
  image: "/flexship_mockup.png",
  liveLink: "https://flexship-it.vercel.app/",
  githubLink: "https://github.com/rayhan309",
  
  details: {
    client: "FlexShip IT (Internal)",
    duration: "Ongoing / Evolution",
    role: "Founder & Lead Architect",
    category: "Agency / Enterprise Platform",
  },

  features: [
    "High-conversion landing architecture with modern UI components",
    "Dynamic service and portfolio management system",
    "Integration with Shadcn UI for consistent and accessible design",
    "Server-side performance optimization for ultra-fast loading",
    "Global state management for seamless navigation and user flow",
  ],

  stack: {
    frontend: ["React.js", "Next.js", "Tailwind CSS", "Shadcn UI", "Framer Motion"],
    backend: ["Node.js", "Express.js"],
    database: ["MongoDB"],
    deployment: ["Vercel", "Custom Domain Management"],
  },

  gallery: [
    "/fashion-museum-home.png",
    "/fashion-museum-product.png",
    "/fashion-museum-mobile.png",
  ],

  overview: "As the founder of FlexShip IT, I designed this platform to reflect our commitment to performance and precision. The core challenge was building a modular system that can grow with the agency. I utilized a combination of React for flexibility and Node/Mongo for robust data handling, ensuring every micro-interaction feels professional and aligns with our brand identity."
},
{
  id: "1",
  title: "FairBazar",
  subtitle: "Full-Stack Multi-Vendor E-commerce Ecosystem",
  description: "A comprehensive and scalable e-commerce solution designed for a modern shopping experience. The platform integrates complex product management, global state handling for seamless cart operations, and a robust backend to ensure reliable performance under load.",
  image: "/fairbazar_mockup.png",
  liveLink: "https://fairbazar.vercel.app/",
  githubLink: "https://github.com/rayhan309",
  
  details: {
    client: "FairBazar BD",
    duration: "3.5 Months",
    role: "Lead Full-stack Developer",
    category: "E-commerce / Retail Tech",
  },

  features: [
    "Advanced Global State Management using Redux Toolkit",
    "Dynamic Product Catalog with multi-layered filtering",
    "Secure User Authentication and Profile Management",
    "Optimized Checkout flow with real-time price calculation",
    "Admin Dashboard for inventory and order lifecycle tracking",
  ],

  stack: {
    frontend: ["React.js", "Next.js", "Redux Toolkit", "Tailwind CSS"],
    backend: ["Node.js", "Express.js"],
    database: ["MongoDB"],
    deployment: ["Vercel", "Heroku/Render"],
  },

  gallery: [
    "/fashion-museum-home.png",
    "/fashion-museum-product.png",
    "/fashion-museum-mobile.png",
  ],

  overview: "In building FairBazar, the primary focus was on state persistence and performance. Managing a complex cart and wishlist across sessions required a robust Redux implementation. I optimized the frontend for speed by implementing lazy loading for product components and ensured the Node.js API could efficiently handle concurrent requests for product data, resulting in a smooth, lag-free user experience."
},
{
  id: "8",
  title: "Rongchowa",
  subtitle: "Creative Landing Page & Lead Acquisition System",
  description: "A visually immersive landing page designed to captivate users through high-end storytelling and fluid animations. Beyond its aesthetics, it features a robust full-stack backend to capture and manage user inquiries, ensuring no potential lead is lost.",
  image: "/rongchowa_mockup.png",
  liveLink: "https://rongchowa.vercel.app/",
  githubLink: "https://github.com/rayhan309",
  
  details: {
    client: "Creative Agency / Brand",
    duration: "1 Month",
    role: "Lead Full-stack Engineer",
    category: "Creative Landing Page / Marketing Tech",
  },

  features: [
    "Immersive scroll-triggered animations with Framer Motion",
    "Dynamic Lead Management system with backend integration",
    "High-performance assets loading for seamless visual experience",
    "Custom contact forms with real-time validation and DB storage",
    "Responsive typography and layout for premium device experiences",
  ],

  stack: {
    frontend: ["React.js", "Framer Motion", "Tailwind CSS"],
    backend: ["Node.js", "Express.js"],
    database: ["MongoDB"],
    deployment: ["Vercel", "MongoDB Atlas"],
  },

  gallery: [
    "/fashion-museum-home.png",
    "/fashion-museum-product.png",
    "/fashion-museum-mobile.png",
  ],

  overview: "For Rongchowa, the challenge was to create a 'wow' factor without compromising on page speed. I utilized Framer Motion's advanced variants to orchestrate complex animations that respond to user interaction. To make it more than just a static site, I integrated a Node.js backend to securely handle contact data, providing a complete end-to-end solution for brand marketing."
},
{
  id: "9",
  title: "SubashStyle",
  subtitle: "Luxury Fragrance Showcase & E-commerce Landing",
  description: "A premium digital storefront for an elite fragrance brand. This project focuses on high-end visual storytelling, utilizing sophisticated transitions and a full-stack backend to deliver an exclusive shopping experience that resonates with luxury consumers.",
  image: "/subashstyle_mockup.png",
  liveLink: "https://subashstyle-com.vercel.app/",
  githubLink: "https://github.com/rayhan309",
  
  details: {
    client: "SubashStyle Premium",
    duration: "1.2 Months",
    role: "Full-stack UI/UX Engineer",
    category: "Luxury Retail / Lifestyle",
  },

  features: [
    "Elegant parallax effects and smooth transitions with Framer Motion",
    "Dynamic product discovery module with high-fidelity imagery",
    "Full-stack inquiry and order management system",
    "Responsive design tailored for premium mobile devices",
    "Integrated analytics to track user engagement and conversion",
  ],

  stack: {
    frontend: ["React.js", "Framer Motion", "Tailwind CSS"],
    backend: ["Node.js", "Express.js"],
    database: ["MongoDB"],
    design: ["Modern Typography", "Custom Iconography"],
  },

  gallery: [
    "/fashion-museum-home.png",
    "/fashion-museum-product.png",
    "/fashion-museum-mobile.png",
  ],

  overview: "For SubashStyle, the goal was to translate the 'scent of luxury' into a digital interface. I implemented a minimalist design philosophy, allowing high-quality product visuals to lead the experience. By using Framer Motion for subtle, non-intrusive animations, I ensured the page felt fluid and premium. The Node.js backend provides a reliable backbone for managing customer interactions, bridging the gap between a creative landing page and a functional business tool."
},
{
  id: "10",
  title: "MOAS-DB",
  subtitle: "Interactive EdTech Landing & Enrollment System",
  description: "A high-conversion educational platform designed to streamline course discovery and student enrollment. Featuring interactive syllabus modules and a smooth user flow, it bridges the gap between complex educational data and an intuitive user experience.",
  image: "/moas_db_mockup.png",
  liveLink: "https://moas-db.vercel.app/",
  githubLink: "https://github.com/rayhan309",
  
  details: {
    client: "MOAS Academy",
    duration: "1.5 Months",
    role: "Full-stack Developer & UI Designer",
    category: "EdTech / Education",
  },

  features: [
    "Interactive Course Modules with accordion-style syllabus",
    "Dynamic Enrollment System with backend data persistence",
    "Smooth scroll-triggered storytelling using Framer Motion",
    "Optimized SEO structure for course visibility",
    "Real-time form validation for student inquiries",
  ],

  stack: {
    frontend: ["React.js", "Framer Motion", "Tailwind CSS"],
    backend: ["Node.js", "Express.js"],
    database: ["MongoDB"],
    ux: ["Custom Animations", "Responsive Grid System"],
  },

  gallery: [
    "/fashion-museum-home.png",
    "/fashion-museum-product.png",
    "/fashion-museum-mobile.png",
  ],

  overview: "For MOAS-DB, the primary objective was to present a vast amount of course information without overwhelming the user. I implemented a modular UI design that allows students to explore the curriculum interactively. By utilizing Framer Motion for content transitions and Node.js for handling the enrollment logic, I created a balanced platform that is both informative and high-performing."
},
{
  id: "11",
  title: "AssetVerse Pro",
  subtitle: "Enterprise Asset & Employee Lifecycle Management",
  description: "A high-end SaaS platform designed for organizations to streamline asset tracking and workforce management. The system automates the entire lifecycle of corporate assets while ensuring strict security through Role-Based Access Control and a premium subscription model.",
  image: "/assetverse_mockup.png",
  liveLink: "https://assets-pro-ca84b.web.app/",
  githubLink: "https://github.com/rayhan309",
  
  details: {
    client: "Corporate / SaaS Product",
    duration: "4 Months",
    role: "Lead Full-stack Architect",
    category: "Enterprise Software (SaaS)",
  },

  features: [
    "Comprehensive Asset Tracking with real-time status updates",
    "Automated Employee Onboarding and Asset Allocation",
    "Secure Stripe Payment Gateway for tiered subscriptions",
    "Advanced RBAC (Role-Based Access Control) for Admin, HR, and Employees",
    "Dynamic Dashboard with data visualization and reporting",
    "Automated PDF Invoice generation and email notifications",
  ],

  stack: {
    frontend: ["React.js", "Tailwind CSS", "Headless UI", "Recharts"],
    backend: ["Node.js", "Express.js", "Firebase Admin SDK"],
    database: ["Firebase Firestore / PostgreSQL"],
    finance: ["Stripe API (Checkout & Webhooks)"],
    security: ["JWT", "Firebase Auth", "Role-based Middleware"],
  },

  gallery: [
    "/fashion-museum-home.png",
    "/fashion-museum-product.png",
    "/fashion-museum-mobile.png",
  ],

  overview: "AssetVerse Pro was built to solve the fragmentation in corporate resource management. I engineered a robust backend that handles complex relationships between assets and employees. The most critical part was the Stripe integration and Webhook handling to ensure subscriptions are always in sync with the user's access level. By using Firebase for real-time updates and Node.js for heavy business logic, I delivered a platform that is both fast and incredibly secure."
},
{
  id: "12",
  title: "ElectroPay Dashboard",
  subtitle: "Smart Utility Billing & Usage Analytics",
  description: "A centralized utility management platform designed to simplify electricity bill tracking. The system provides users with real-time billing updates, historical consumption analytics through interactive charts, and a seamless digital payment flow.",
  image: "/electricity_bill_mockup.png",
  liveLink: "https://electricity-bills-225bf.web.app/",
  githubLink: "https://github.com/rayhan309",
  
  details: {
    client: "Utility Service Provider (Project)",
    duration: "2 Months",
    role: "Full-stack Developer",
    category: "Utility / Fintech Dashboard",
  },

  features: [
    "Interactive usage analytics with real-time data visualization",
    "Comprehensive bill payment history and digital receipts",
    "Automated bill calculation logic based on consumption units",
    "Seamless animated transitions using Framer Motion for better UX",
    "Secure user authentication and sensitive data protection",
  ],

  stack: {
    frontend: ["React.js", "Framer Motion", "MUI", "Tailwind CSS", "Recharts/Chart.js"],
    backend: ["Node.js", "Express.js"],
    database: ["MongoDB"],
    deployment: ["Firebase / Vercel"],
  },

  gallery: [
    "/fashion-museum-home.png",
    "/fashion-museum-product.png",
    "/fashion-museum-mobile.png",
  ],

  overview: "The primary challenge in ElectroPay was ensuring data accuracy and presenting complex consumption patterns in an easy-to-understand format. I implemented interactive charts to help users visualize their energy usage over time. By using Node.js for the calculation engine and MongoDB for scalable data storage, I created a robust system that can handle thousands of billing records efficiently."
},
{
  id: "13",
  title: "Burger Shot",
  subtitle: "High-Performance Fast Food Landing Page",
  description: "A visually enticing and ultra-fast landing page developed for a premium burger brand. Built using core web technologies, the project focuses on high conversion through appetizing visual hierarchy, smooth navigation, and optimized assets.",
  image: "/burger_shop_mockup.png",
  liveLink: "https://rayhan309.github.io/Burgur-Shop/",
  githubLink: "https://github.com/rayhan309/Burgur-Shop",
  
  details: {
    client: "Food Tech / Restaurant (Concept)",
    duration: "2 Weeks",
    role: "Frontend UI Developer",
    category: "Landing Page / Food & Beverage",
  },

  features: [
    "Pixel-perfect responsive design across all screen sizes",
    "Optimized asset loading for sub-second page speeds",
    "Smooth scroll effects and interactive menu sections",
    "Lightweight codebase without heavy external libraries",
    "SEO-friendly semantic HTML5 structure",
  ],

  stack: {
    core: ["HTML5", "Vanilla JavaScript"],
    styling: ["Tailwind CSS", "FontAwesome"],
    performance: ["Image WebP Conversion", "Minified Assets"],
    hosting: ["GitHub Pages"],
  },

  gallery: [
    "/fashion-museum-home.png",
    "/fashion-museum-product.png",
    "/fashion-museum-mobile.png",
  ],

  overview: "The objective of Burger Shot was to demonstrate that a powerful user experience can be achieved with raw, lightweight technologies. I focused on a 'Mobile-First' approach, ensuring that the heavy imagery typical of food websites didn't compromise performance. By using Tailwind CSS for rapid styling and Vanilla JS for interactive elements, I delivered a site that feels as fast as the service it represents."
},
{
  id: "14",
  title: "Zorin: AI Autonomous Agent",
  subtitle: "Self-Evolving Automation & Intelligence Engine",
  description: "Zorin is a sophisticated Python-based autonomous agent designed to execute complex tasks with minimal human intervention. By leveraging Large Language Models (LLMs) and advanced chain-of-thought reasoning, it can analyze data, browse the web, and perform automated workflows intelligently.",
  image: "/zorin_ai_preview.png", // Use the logo we generated
  liveLink: null,
  githubLink: "https://github.com/rayhan309",
  
  details: {
    client: "Internal R&D / Productivity Tool",
    duration: "Ongoing",
    role: "AI Engineer & Architect",
    category: "Artificial Intelligence / Automation",
  },

  status: {
    label: "Private Tool",
    note: "Deployment limited to local environment for security and API cost management.",
  },

  features: [
    "Autonomous Task Planning using Chain-of-Thought reasoning",
    "Real-time Data Analysis and automated reporting",
    "Seamless integration with OpenAI GPT-4 and Claude models",
    "Multi-tool usage (Web Search, File System, API interactions)",
    "Memory persistence for long-term task context retention",
  ],

  stack: {
    language: ["Python"],
    ai_frameworks: ["LangChain", "OpenAI API", "AutoGPT Architecture"],
    data_processing: ["Pandas", "NumPy"],
    tools: ["BeautifulSoup", "Requests", "Dotenv"],
  },

  gallery: [
    "/fashion-museum-home.png",
    "/fashion-museum-product.png",
    "/fashion-museum-mobile.png",
  ],

  overview: "The core challenge in developing Zorin was managing 'hallucinations' and ensuring the agent stays within task boundaries. I implemented a recursive feedback loop where the agent self-evaluates its output before proceeding to the next step. Using LangChain's agentic framework, I enabled Zorin to dynamically select tools based on user intent, transforming it from a simple chatbot into a functional digital employee."
},
]
export const singleProjectDitails = (id: string) => {
  return AllprojectsDitails.find((project: any) => project.id === id);
}
