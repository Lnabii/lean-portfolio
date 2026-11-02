"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { asset, profile, skills } from "../data";
import { Icon, MaskLine, Reveal, SectionLabel } from "./ui";

const facts = [
  ["Full name", profile.first + " " + profile.last],
  ["Age", `${profile.age} years old`],
  ["Location", profile.location],
  ["Position", profile.role],
  ["Status", profile.status],
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const ghostX = useTransform(scrollYProgress, [0, 1], ["8%", "-28%"]);

  return (
    // slides up over the sticky hero like a curtain
    <section id="about" ref={ref} className="relative z-10 overflow-hidden rounded-t-[40px] bg-paper text-ink md:rounded-t-[64px]">
      <motion.p
        style={{ x: ghostX }}
        aria-hidden="true"
        className="display pointer-events-none absolute left-0 top-[18%] whitespace-nowrap text-[clamp(120px,22vw,360px)] text-black/[0.035]"
      >
        {profile.first} {profile.last}
      </motion.p>

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-24 md:grid-cols-[1fr_1.5fr] md:px-10 md:py-32 lg:pl-20">
        <div>
          <SectionLabel n="01" text="Profile" />
          <h2 className="display mt-5 text-[clamp(56px,7.5vw,110px)]">
            <MaskLine>About</MaskLine>
            <MaskLine delay={0.1} className="text-brand">Me</MaskLine>
          </h2>

          <dl className="mt-14 grid gap-5">
            {facts.map(([k, v], i) => (
              <Reveal key={k} delay={i * 0.06} y={20}>
                <dt className="label text-[9px] text-black/40">{k}</dt>
                <dd className="display mt-1 text-[15px] tracking-normal">{v}</dd>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={0.3} y={20}>
            <a href={asset("/Lean-Naive-CV.pdf")} download className="label mt-10 inline-flex items-center gap-3 rounded-lg bg-ink px-5 py-4 font-bold text-white transition-colors hover:bg-brand">
              Download CV <Icon name="Download" size={15} />
            </a>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <p className="text-[clamp(18px,1.6vw,23px)] leading-relaxed text-black/80">{profile.bio}</p>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            <SkillCard title="Software Engineer" className="md:col-span-2">
              <div className="grid grid-cols-5 gap-5 sm:grid-cols-7">
                {skills.engineer.map((s) => (
                  <img key={s.n} src={s.src} alt={s.n} title={s.n} width={36} height={36} className="skill-icon mx-auto h-9 w-9" />
                ))}
              </div>
            </SkillCard>
            <SkillCard title="Tools & Server">
              <div className="grid grid-cols-4 gap-5">
                {skills.tools.map((s) => (
                  <img key={s.n} src={s.src} alt={s.n} title={s.n} width={34} height={34} className="skill-icon mx-auto h-8 w-8" />
                ))}
              </div>
            </SkillCard>
            <SkillCard title="Soft Skills">
              <div className="flex flex-wrap gap-2">
                {skills.soft.map((s) => (
                  <span key={s} className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-sm text-black/60">
                    {s}
                  </span>
                ))}
              </div>
            </SkillCard>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillCard({ title, children, className = "" }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <Reveal className={className} y={30}>
      <div className="h-full rounded-3xl border border-black/5 bg-white/60 p-6 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.25)] backdrop-blur transition-shadow hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)]">
        <p className="label mb-6 text-[10px] font-bold text-black/40">{title}</p>
        {children}
      </div>
    </Reveal>
  );
}
