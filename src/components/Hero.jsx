import { motion } from "framer-motion";
import {
  HiArrowDown,
  HiOutlineMail,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { stats } from "../data/portfolio";
import { useProfile } from "../context/ProfileContext";
import { TypeAnimation } from 'react-type-animation';
import { useEffect } from "react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const profile = useProfile();
  useEffect(() => {
    // any hero-specific mounting logic
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
    >
      <div className="aura-bg absolute inset-0 -z-10" />
      <div className="grid-overlay absolute inset-0 -z-10" />

      {/* Floating glow blobs */}
      <div className="absolute -left-24 top-32 -z-10 h-72 w-72 rounded-full bg-neon-violet/20 blur-[110px]" />
      <div className="absolute -right-16 bottom-10 -z-10 h-80 w-80 rounded-full bg-neon-cyan/15 blur-[120px]" />



      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.15fr_0.85fr] z-10">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="mb-6">
            <div className="relative inline-block">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-neon-violet to-neon-cyan blur opacity-70 animate-pulse" />
              <img
                src={profile.imageUrl || "/profile.png"}
                alt={profile.name}
                className="relative h-40 w-40 md:h-48 md:w-48 rounded-full border-2 border-white/10 bg-black/50 object-cover shadow-2xl"
              />
            </div>
          </motion.div>

          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Available for opportunities
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl"
          >
            Hi, I'm <span className="text-gradient">{profile.name}</span>
          </motion.h1>

          <motion.div
            variants={item}
            className="mt-4 font-mono text-lg text-neon-cyan sm:text-xl min-h-[32px]"
          >
            {"<"} <TypeAnimation
              sequence={[
                'Full-Stack Developer',
                2000,
                'React & Node.js Enthusiast',
                2000,
                'Software Engineering Student',
                2000,
                'Building Scalable Web Apps',
                2000
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            /> {"/>"}
          </motion.div>

          <motion.p
            variants={item}
            className="mt-5 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
          >
            {profile.blurb}
          </motion.p>

          <motion.div variants={item} className="mt-7 flex flex-wrap items-center gap-4 text-sm text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <HiOutlineLocationMarker className="text-neon-violet" />
              {profile.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <HiOutlineMail className="text-neon-violet" />
              {profile.email}
            </span>
          </motion.div>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-neon-violet to-neon-cyan px-6 py-3 font-semibold text-white shadow-[0_8px_30px_-8px_var(--color-neon-violet)] transition-transform hover:-translate-y-0.5"
            >
              View My Work
              <HiArrowDown className="transition-transform group-hover:translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:border-neon-cyan/60 hover:bg-white/10"
            >
              Contact Me
            </a>
            <a
              href={profile.resumeUrl}
              download="Abinet_Tesfaye_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:border-neon-violet/60 hover:bg-white/10"
            >
              Resume
            </a>
            <div className="flex items-center gap-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-neon-cyan/60 hover:text-white"
              >
                <SiGithub size={20} />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-neon-cyan/60 hover:text-white"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 grid max-w-lg grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="text-center sm:text-left">
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-slate-500">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Code card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block"
        >
          <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-neon-violet/30 to-neon-cyan/20 blur-2xl" />
          <div className="glass animate-float rounded-2xl p-5 font-mono text-sm shadow-2xl">
            <div className="mb-4 flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
              <span className="h-3 w-3 rounded-full bg-green-400/80" />
              <span className="ml-3 text-xs text-slate-500">developer.js</span>
            </div>
            <pre className="leading-relaxed text-slate-300 overflow-x-auto">
              <span className="text-pink-400">const</span>{" "}
              <span className="text-cyan-300">developer</span> = {"{"}
              {"\n"}  name: <span className="text-emerald-300">'{profile.name}'</span>,
              {"\n"}  role: <span className="text-emerald-300">'{profile.role}'</span>,
              {"\n"}  stack: [<span className="text-emerald-300">'React'</span>,{" "}
              <span className="text-emerald-300">'Node'</span>,{" "}
              <span className="text-emerald-300">'MySQL'</span>],
              {"\n"}  learning: <span className="text-emerald-300">'Machine Learning'</span>,
              {"\n"}  caffeinated: <span className="text-orange-300">true</span>,
              {"\n"}  <span className="text-violet-300">solveProblem</span>() {"{"}
              {"\n"}    <span className="text-pink-400">return</span>{" "}
              <span className="text-emerald-300">'shipped 🚀'</span>;
              {"\n"}  {"}"},
              {"\n"}
              {"}"};
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
