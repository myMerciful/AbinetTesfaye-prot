import {
  SiReact,
  SiTailwindcss,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiJsonwebtokens,
  SiMysql,
  SiMongodb,
  SiPython,
  SiCplusplus,
  SiGit,
  SiGithub,
  SiPostman,
  SiVite,
  SiCloudinary,
  SiLeetcode,
  SiCodeforces,
} from "react-icons/si";
import { FaJava, FaServer } from "react-icons/fa";

export const profile = {
  name: "Abinet Tesfaye",
  firstName: "Abinet",
  role: "Full-Stack Developer",
  tagline: "Full-Stack JavaScript Developer",
  location: "Adama, Ethiopia",
  email: "abinettesfaye441@gmail.com",
  github: "https://github.com/myMerciful",
  linkedin: "https://www.linkedin.com/in/abinet-tesfaye",
  leetcode: "https://leetcode.com/",
  codeforces: "https://codeforces.com/",
  resumeUrl: "#",
  blurb:
    "I’m a full-stack JavaScript developer. I use React for the frontend, Node.js and Express for the backend, and MySQL for the database.",
};

export const stats = [
  { label: "Tech Stack", value: "React & Node" },
  { label: "Year @ ASTU", value: "3rd" },
  { label: "Core Languages", value: "5+" },
  { label: "Focus Areas", value: "3" },
];

export const about = {
  summary: [
    "I'm a 3rd-year B.Sc. Computer Science & Engineering student at Adama Science and Technology University (ASTU).",
    "I’m a full-stack JavaScript developer. I use React for the frontend, Node.js and Express for the backend, and MySQL for the database.",
  ],
  highlights: [
    "Full-Stack Engineering",
    "Competitive Programming",
    "Continuous learner",
  ],
};

export const skillGroups = [
  {
    title: "Frontend",
    accent: "violet",
    skills: [
      { name: "React", icon: SiReact },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Redux", icon: SiRedux },
      { name: "HTML5", icon: SiHtml5 },
      { name: "CSS3", icon: SiCss },
    ],
  },
  {
    title: "Backend",
    accent: "cyan",
    skills: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express", icon: SiExpress },
      { name: "REST APIs", icon: FaServer },
      { name: "JWT Auth", icon: SiJsonwebtokens },
      { name: "Cloudinary", icon: SiCloudinary },
    ],
  },
  {
    title: "Databases",
    accent: "pink",
    skills: [
      { name: "MySQL", icon: SiMysql },
    ],
  },
  {
    title: "Languages",
    accent: "violet",
    skills: [
      { name: "Python", icon: SiPython },
      { name: "Java", icon: FaJava },
      { name: "C++", icon: SiCplusplus },
      { name: "JavaScript", icon: SiJavascript },
    ],
  },
  {
    title: "Tools",
    accent: "cyan",
    skills: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "Postman", icon: SiPostman },
      { name: "Vite", icon: SiVite },
    ],
  },
];

export const projects = [
  {
    title: "Library Management System",
    type: "Full-Stack Web App",
    featured: true,
    description:
      "A complete library platform with secure JWT authentication, automated email notifications, and cloud media storage. Exposes RESTful APIs for book and user management, borrowing tracking, and an integrated payment system.",
    features: [
      "JWT-based authentication & role management",
      "RESTful APIs for books, users & borrowing",
      "Nodemailer email notifications",
      "Cloudinary media storage",
      "Borrowing tracking & payment system",
    ],
    tags: ["React", "Node.js", "Express", "MySQL", "Tailwind CSS", "JWT"],
    repo: "#",
    demo: "#",
  },
];

export const competitive = {
  blurb:
    "I treat algorithms as a craft. Through daily practice on LeetCode and Codeforces, I strengthen my command of data structures, algorithms, and problem-solving under constraints — skills that make my production code sharper.",
  platforms: [
    {
      name: "LeetCode",
      icon: SiLeetcode,
      handle: "@AbinetTesfaye",
      focus: "Data Structures & Algorithms",
      url: "https://leetcode.com/",
      accent: "cyan",
    },
    {
      name: "Codeforces",
      icon: SiCodeforces,
      handle: "@AbinetTesfaye",
      focus: "Competitive Contests (Java)",
      url: "https://codeforces.com/",
      accent: "violet",
    },
  ],
  topics: [
    "Arrays & Strings",
    "Hashing",
    "Two Pointers",
    "Dynamic Programming",
    "Graphs & Trees",
    "Greedy",
    "Binary Search",
    "Recursion & Backtracking",
  ],
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Coding", href: "#competitive" },
  { label: "Contact", href: "#contact" },
];
