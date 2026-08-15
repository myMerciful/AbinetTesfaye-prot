import { HiCheckCircle } from "react-icons/hi";
import { FaGraduationCap, FaBrain, FaCode, FaRocket } from "react-icons/fa";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { about } from "../data/portfolio";

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="About Me"
          title="Engineer by training, builder by passion"
          description="A snapshot of who I am, what drives me, and where I'm headed."
        />

        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <Reveal direction="right">
            <div className="space-y-5">
              {about.summary.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-slate-400 sm:text-[1.05rem]"
                >
                  {paragraph}
                </p>
              ))}

              <div className="flex flex-wrap gap-3 pt-2">
                {about.highlights.map((h) => (
                  <span
                    key={h}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
                  >
                    <HiCheckCircle className="text-neon-cyan" />
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: FaGraduationCap,
                  title: "Education",
                  body: "B.Sc. CS & Engineering, 3rd Year @ ASTU",
                },
                {
                  icon: FaCode,
                  title: "Specialty",
                  body: "React, Node.js, Express, MySQL",
                },
                {
                  icon: FaBrain,
                  title: "Exploring",
                  body: "Machine Learning & AI systems",
                },
                {
                  icon: FaRocket,
                  title: "Mindset",
                  body: "Continuous learning & shipping",
                },
              ].map((card, i) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className={`glass glow-border rounded-2xl p-5 transition-transform hover:-translate-y-1 ${
                      i % 2 === 1 ? "translate-y-4" : ""
                    }`}
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-neon-violet/30 to-neon-cyan/20 text-neon-cyan">
                      <Icon size={20} />
                    </span>
                    <h3 className="mt-4 font-semibold text-white">{card.title}</h3>
                    <p className="mt-1 text-sm leading-snug text-slate-400">
                      {card.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
