# Abinet Tesfaye — Portfolio

A modern, dark-themed personal portfolio built with **React**, **Vite**, and **Tailwind CSS v4**, with smooth scroll animations powered by **Framer Motion**.

## Sections

- **Hero** — animated intro, CTAs, live "developer object" code card
- **About** — professional summary + highlight cards
- **Skills** — grouped badges (Frontend, Backend, Databases, Languages, Tools)
- **Projects** — card layout featuring the Library Management System with tech tags + demo/source links
- **Competitive Programming** — LeetCode & Codeforces highlight with practice topics
- **Contact** — contact form (mailto) + social links and footer

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Framer Motion (animations)
- react-icons

## Getting Started

```bash
npm install      # install dependencies
npm run dev      # start dev server (http://localhost:5173)
npm run build    # production build -> dist/
npm run preview  # preview the production build
npm run lint     # run ESLint
```

## Customizing

All site content lives in a single file: **`src/data/portfolio.js`**.
Update your name, links, skills, projects, and competitive-programming info there —
no need to touch the components.

Replace the placeholder links:

- `profile.github`, `profile.linkedin`, `profile.leetcode`, `profile.codeforces`
- each project's `repo` and `demo` (currently `"#"`)

## Project Structure

```
src/
  components/
    ui/              # Reveal (scroll animation), SectionHeading
    Navbar.jsx
    Hero.jsx
    About.jsx
    Skills.jsx
    Projects.jsx
    CompetitiveProgramming.jsx
    Contact.jsx
    Footer.jsx
  data/
    portfolio.js     # <-- edit your content here
  index.css          # theme tokens, animations, utilities
  App.jsx
```
