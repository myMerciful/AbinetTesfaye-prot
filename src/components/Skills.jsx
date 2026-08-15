import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { skillGroups } from "../data/portfolio";

const accentMap = {
  violet: "from-neon-violet/20 to-neon-violet/5 text-neon-violet",
  cyan: "from-neon-cyan/20 to-neon-cyan/5 text-neon-cyan",
  pink: "from-neon-pink/20 to-neon-pink/5 text-neon-pink",
};

const dotMap = {
  violet: "bg-neon-violet shadow-[0_0_10px_2px_var(--color-neon-violet)]",
  cyan: "bg-neon-cyan shadow-[0_0_10px_2px_var(--color-neon-cyan)]",
  pink: "bg-neon-pink shadow-[0_0_10px_2px_var(--color-neon-pink)]",
};

export default function Skills() {
  return (
    <section id="skills" className="relative scroll-mt-24 py-24">
      <div className="absolute inset-0 -z-10 aura-bg opacity-40" />
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Skills"
          title="My technical toolbox"
          description="Technologies I use to design, build, and ship full-stack applications."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 0.06}>
              <div className="glass glow-border h-full rounded-2xl p-6 transition-transform hover:-translate-y-1">
                <div className="mb-5 flex items-center gap-3">
                  <span className={`h-2.5 w-2.5 rounded-full ${dotMap[group.accent]}`} />
                  <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                  <span className="ml-auto font-mono text-xs text-slate-500">
                    {String(group.skills.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill, si) => {
                    const Icon = skill.icon;
                    return (
                      <motion.span
                        key={`${group.title}-${skill.name}`}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: si * 0.04 }}
                        className={`inline-flex items-center gap-2 rounded-lg border border-white/10 bg-gradient-to-br px-3 py-2 text-sm font-medium text-slate-200 transition-all hover:scale-105 ${accentMap[group.accent]}`}
                      >
                        <Icon size={16} />
                        {skill.name}
                      </motion.span>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
