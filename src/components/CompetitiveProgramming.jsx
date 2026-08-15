import { HiArrowUpRight } from "react-icons/hi2";
import { FaTrophy } from "react-icons/fa";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { competitive } from "../data/portfolio";

const accentRing = {
  cyan: "group-hover:border-neon-cyan/60 text-neon-cyan",
  violet: "group-hover:border-neon-violet/60 text-neon-violet",
};

export default function CompetitiveProgramming() {
  return (
    <section id="competitive" className="relative scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Competitive Programming"
          title="Sharpening the algorithmic edge"
          description={competitive.blurb}
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          {/* Platforms */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {competitive.platforms.map((platform, i) => {
              const Icon = platform.icon;
              return (
                <Reveal key={platform.name} delay={i * 0.08} direction="right">
                  <a
                    href={platform.url}
                    target="_blank"
                    rel="noreferrer"
                    className="glass group flex items-center gap-4 rounded-2xl border-white/10 p-5 transition-all hover:-translate-y-1"
                  >
                    <span
                      className={`grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-2xl transition-colors ${accentRing[platform.accent]}`}
                    >
                      <Icon />
                    </span>
                    <div className="min-w-0">
                      <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                        {platform.name}
                        <HiArrowUpRight className="text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </h3>
                      <p className="truncate font-mono text-sm text-slate-400">
                        {platform.handle}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">{platform.focus}</p>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>

          {/* Topics */}
          <Reveal direction="left" delay={0.1}>
            <div className="glass glow-border h-full rounded-2xl p-7">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-neon-violet/30 to-neon-cyan/20 text-neon-cyan">
                  <FaTrophy size={18} />
                </span>
                <h3 className="text-lg font-semibold text-white">
                  Topics I practice
                </h3>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                Consistent practice across the core problem categories that show up
                in interviews and contests alike.
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {competitive.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200 transition-colors hover:border-neon-cyan/40 hover:text-white"
                  >
                    {topic}
                  </span>
                ))}
              </div>

              <div className="mt-7 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 text-center">
                <div>
                  <div className="text-xl font-bold text-white">Java</div>
                  <div className="mt-1 text-xs text-slate-500">Contest language</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-white">DS & Algo</div>
                  <div className="mt-1 text-xs text-slate-500">Daily focus</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-white">Daily</div>
                  <div className="mt-1 text-xs text-slate-500">Practice habit</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
