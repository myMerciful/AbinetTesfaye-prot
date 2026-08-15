import { useState } from "react";
import toast from "react-hot-toast";
import {
  HiOutlineMail,
  HiOutlineLocationMarker,
  HiPaperAirplane,
} from "react-icons/hi";
import { SiGithub, SiLeetcode, SiCodeforces } from "react-icons/si";
import { FaLinkedin, FaTelegram } from "react-icons/fa";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { profile } from "../data/portfolio";

const socials = [
  { icon: SiGithub, label: "GitHub", href: profile.github },
  { icon: FaLinkedin, label: "LinkedIn", href: profile.linkedin },
  { icon: FaTelegram, label: "Telegram", href: profile.telegram },
  { icon: SiLeetcode, label: "LeetCode", href: profile.leetcode },
  { icon: SiCodeforces, label: "Codeforces", href: profile.codeforces },
].filter(s => s.href); // Filter out empty links

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setForm({ name: "", email: "", message: "" });
        toast.success("Message sent successfully!");
      } else {
        toast.error("Failed to send message.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-24 py-24">
      <div className="absolute inset-0 -z-10 aura-bg opacity-50" />
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something great"
          description="Have a project, an opportunity, or just want to say hi? My inbox is always open."
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <Reveal direction="right">
            <div className="flex h-full flex-col justify-between gap-8">
              <div className="space-y-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="glass glow-border flex items-center gap-4 rounded-2xl p-5 transition-transform hover:-translate-y-1"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-neon-violet/30 to-neon-cyan/20 text-neon-cyan">
                    <HiOutlineMail size={22} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Email
                    </p>
                    <p className="truncate font-medium text-white">
                      {profile.email}
                    </p>
                  </div>
                </a>

                <div className="glass flex items-center gap-4 rounded-2xl p-5">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-neon-violet/30 to-neon-cyan/20 text-neon-cyan">
                    <HiOutlineLocationMarker size={22} />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Location
                    </p>
                    <p className="font-medium text-white">{profile.location}</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm text-slate-400">Find me online</p>
                <div className="flex flex-wrap gap-3">
                  {socials.map((s) => {
                    const Icon = s.icon;
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label}
                        className="grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition-all hover:-translate-y-0.5 hover:border-neon-cyan/60 hover:text-white"
                      >
                        <Icon size={20} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="glass glow-border rounded-2xl p-6 sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-300">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={onChange}
                    placeholder="Your name"
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-neon-cyan/60"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-300">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={onChange}
                    placeholder="you@example.com"
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-neon-cyan/60"
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={onChange}
                  placeholder="Tell me about your project or idea..."
                  className="resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-neon-cyan/60"
                />
              </div>

              <button
                type="submit"
                className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neon-violet to-neon-cyan px-6 py-3.5 font-semibold text-white shadow-[0_8px_30px_-8px_var(--color-neon-violet)] transition-transform hover:-translate-y-0.5"
              >
                Send Message
                <HiPaperAirplane className="rotate-90 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
