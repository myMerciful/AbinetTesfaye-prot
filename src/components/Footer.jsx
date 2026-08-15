import { HiArrowUp } from "react-icons/hi";
import { SiGithub } from "react-icons/si";
import { FaLinkedin, FaTelegram } from "react-icons/fa";
import { profile } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-10 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl text-neon-cyan">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
          </span>
          <div>
            <p className="font-semibold text-white">{profile.name}</p>
            <p className="text-xs text-slate-500">{profile.role}</p>
          </div>
        </div>

        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} {profile.name}. Built with React &
          Tailwind CSS.
        </p>

        <div className="flex items-center gap-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors hover:text-white"
          >
            <SiGithub size={18} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors hover:text-white"
          >
            <FaLinkedin size={18} />
          </a>
          {profile.telegram && (
            <a
              href={profile.telegram}
              target="_blank"
              rel="noreferrer"
              aria-label="Telegram"
              className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-colors hover:text-white"
            >
              <FaTelegram size={18} />
            </a>
          )}
          <a
            href="#home"
            aria-label="Back to top"
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition-all hover:-translate-y-0.5 hover:text-neon-cyan"
          >
            <HiArrowUp size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
