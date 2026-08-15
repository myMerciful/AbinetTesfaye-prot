const { sequelize, Project, ProjectFeature, ProjectTag, Experience, Profile } = require('./db');
const { profile: portfolioProfile } = require('../src/data/portfolio');

const initialProjects = [
  {
    title: "Library Management System",
    type: "Full-Stack Web App",
    featured: true,
    description: "A complete library platform with secure JWT authentication, automated email notifications, and cloud media storage. Exposes RESTful APIs for book and user management, borrowing tracking, and an integrated payment system.",
    category: "Full-Stack",
    repo: "#",
    demo: "#",
    features: [
      "JWT-based authentication & role management",
      "RESTful APIs for books, users & borrowing",
      "Nodemailer email notifications",
      "Cloudinary media storage",
      "Borrowing tracking & payment system"
    ],
    tags: ["React", "Node.js", "Express", "MySQL", "Tailwind CSS", "JWT"]
  },
  {
    title: "AI Image Generator",
    type: "Machine Learning / Frontend",
    featured: false,
    description: "A frontend interface for generating images using OpenAI's DALL-E API. Includes prompt history, image downloading, and a modern masonry gallery layout.",
    category: "Frontend",
    repo: "#",
    demo: "#",
    features: [
      "OpenAI API integration",
      "Masonry grid layout",
      "Local storage for history",
      "One-click image download"
    ],
    tags: ["React", "Tailwind CSS", "API", "Vite"]
  },
  {
    title: "Real-Time Chat App",
    type: "Backend / Full-Stack",
    featured: false,
    description: "A real-time messaging application utilizing WebSockets via Socket.io. Features include typing indicators, read receipts, and online presence tracking.",
    category: "Full-Stack",
    repo: "#",
    demo: "#",
    features: [
      "Real-time bidirectional communication",
      "Socket.io integration",
      "Online presence tracking",
      "MySQL database for messages"
    ],
    tags: ["Node.js", "Socket.io", "MySQL", "Express", "React"]
  }
];

const initialExperience = [
  {
    role: "Full-Stack Developer Intern",
    company: "Tech Solutions (Mock)",
    duration: "June 2023 - Present",
    description: "Developed and maintained RESTful APIs using Node.js and Express. Built responsive frontend components in React and optimized database queries in MySQL."
  },
  {
    role: "Freelance Web Developer",
    company: "Self-Employed",
    duration: "Jan 2022 - May 2023",
    description: "Designed and developed landing pages and small web applications for local businesses using HTML, CSS, JavaScript, and Tailwind CSS."
  },
  {
    role: "B.Sc. Computer Science & Engineering",
    company: "Adama Science and Technology University (ASTU)",
    duration: "2021 - 2025",
    description: "Focusing on software engineering, data structures, algorithms, and machine learning. Active member of the competitive programming club."
  }
];

async function seed() {
  await sequelize.sync({ force: true });
  
  // Create Profile
  await Profile.create({
    name: portfolioProfile.name,
    firstName: portfolioProfile.firstName,
    role: portfolioProfile.role,
    tagline: portfolioProfile.tagline,
    location: portfolioProfile.location,
    email: portfolioProfile.email,
    github: portfolioProfile.github,
    linkedin: portfolioProfile.linkedin,
    resumeUrl: portfolioProfile.resumeUrl,
    blurb: portfolioProfile.blurb,
    imageUrl: '/profile.png'
  });

  for (const proj of initialProjects) {
    const p = await Project.create({
      title: proj.title,
      type: proj.type,
      featured: proj.featured,
      description: proj.description,
      category: proj.category,
      repo: proj.repo,
      demo: proj.demo
    });
    
    for (const f of proj.features) {
      await ProjectFeature.create({ feature: f, ProjectId: p.id });
    }
    
    for (const t of proj.tags) {
      await ProjectTag.create({ tag: t, ProjectId: p.id });
    }
  }
  
  for (const exp of initialExperience) {
    await Experience.create(exp);
  }
  
  console.log('Database seeded successfully!');
}

seed().catch(console.error);
