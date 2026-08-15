import { HiArrowUpRight, HiCheck } from "react-icons/hi2";
import { SiGithub } from "react-icons/si";
import { FaFolderOpen } from "react-icons/fa";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { projects as staticProjects } from "../data/portfolio";
import { useState, useEffect } from "react";

export default function Projects() {
  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setProjectsData(data);
        } else {
          setProjectsData(staticProjects);
        }
      })
      .catch(err => {
        console.error("Failed to fetch projects", err);
        setProjectsData(staticProjects);
      });
  }, []);

  return (
    <section id="projects" className="relative scroll-mt-24 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Projects"
          title="Things I've built"
          description="Selected work that reflects how I approach real-world engineering problems."
        />

        <div className="grid gap-8">
          {projectsData.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.08}>
              <article className="glass glow-border group grid overflow-hidden rounded-3xl lg:grid-cols-[1.1fr_1fr]">
                {/* Visual panel */}
                <div className="relative min-h-[260px] overflow-hidden border-b border-white/10 lg:border-b-0 lg:border-r">
                  {project.imageUrl ? (
                    <img src={project.imageUrl} alt={project.title} className="absolute inset-0 h-full w-full object-cover" />
                  ) : (
                    <>
                      <div className="aura-bg absolute inset-0 opacity-90" />
                      <div className="grid-overlay absolute inset-0" />
                      <div className="absolute inset-0 grid place-items-center p-8">
                        <div className="text-center">
                          <span className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-white/5 text-neon-cyan backdrop-blur-md transition-transform duration-500 group-hover:scale-110">
                            <FaFolderOpen size={36} />
                          </span>
                          <p className="mt-5 font-mono text-sm text-slate-300">
                            {project.type}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                  {project.featured && (
                    <span className="absolute top-4 left-4 inline-block rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-3 py-1 text-xs font-medium text-neon-cyan backdrop-blur-md">
                      Featured Project
                    </span>
                  )}
                </div>

                {/* Content panel */}
                <div className="p-7 sm:p-8">
                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {project.description}
                  </p>

                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-slate-300"
                      >
                        <HiCheck className="mt-0.5 shrink-0 text-neon-cyan" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-violet to-neon-cyan px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                    >
                      Live Demo <HiArrowUpRight />
                    </a>
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:border-neon-cyan/60 hover:bg-white/10"
                    >
                      <SiGithub /> Source Code
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
