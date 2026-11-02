"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { awards, profile, type Award } from "../data";
import { MaskLine, Reveal, SectionLabel, ease } from "./ui";

const n = awards.length;

export default function Awards() {
  const [active, setActive] = useState(2);
  const [paused, setPaused] = useState(false);
  const go = (i: number) => setActive(((i % n) + n) % n);

  useEffect(() => {
    if (paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((a) => (a + 1) % n), 3500);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section id="awards" className="relative z-10 overflow-hidden bg-ink py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_45%_at_50%_58%,rgba(140,14,16,0.35),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-10 lg:pl-20">
        <SectionLabel n="03" text="Recognition" />
        <h2 className="display mt-5 text-[clamp(44px,7vw,100px)]">
          <MaskLine>Awards &amp;</MaskLine>
          <MaskLine delay={0.1} className="-skew-x-12 text-brand">Certificates</MaskLine>
        </h2>
      </div>

      <Reveal y={60}>
        <motion.div
          onHoverStart={() => setPaused(true)}
          onHoverEnd={() => setPaused(false)}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) go(active + 1);
            else if (info.offset.x > 60) go(active - 1);
          }}
          className="relative mx-auto mt-16 h-[440px] max-w-6xl cursor-grab [perspective:1400px] active:cursor-grabbing md:h-[480px]"
        >
          {awards.map((a, i) => {
            // shortest distance from the active card, wrapping around
            let d = i - active;
            if (d > n / 2) d -= n;
            if (d < -n / 2) d += n;
            const abs = Math.abs(d);
            return (
              <motion.button
                key={a.title}
                onClick={() => go(i)}
                aria-label={`${a.title}, ${a.year}`}
                aria-current={d === 0}
                animate={{
                  x: `${d * 62}%`,
                  scale: 1 - Math.min(abs, 2) * 0.16,
                  rotateY: d * -28,
                  opacity: abs > 2 ? 0 : 1 - abs * 0.3,
                  zIndex: 10 - abs,
                }}
                transition={{ duration: 0.7, ease }}
                style={{ pointerEvents: abs > 2 ? "none" : "auto" }}
                className="absolute left-1/2 top-0 -ml-[min(42vw,180px)] w-[min(84vw,360px)] text-left"
              >
                <Card award={a} active={d === 0} />
              </motion.button>
            );
          })}
        </motion.div>

        <div className="mt-2 flex justify-center gap-2">
          {awards.map((a, i) => (
            <button
              key={a.title}
              onClick={() => go(i)}
              aria-label={`Show ${a.title}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-brand" : "w-1.5 bg-white/25 hover:bg-white/50"}`}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function Card({ award, active }: { award: Award; active: boolean }) {
  return (
    <div
      className={`rounded-2xl p-5 transition-[background,box-shadow] duration-700 ${
        active ? "bg-gradient-to-b from-[#3a0a0c] to-[#140708] shadow-[0_40px_100px_-30px_rgba(227,36,43,0.55)] ring-1 ring-brand/30" : "bg-[#141414] ring-1 ring-white/5"
      }`}
    >
      <p className="label mb-4 text-[9px] text-white/40">{award.type}</p>
      {/* the "paper" certificate */}
      <div className="relative aspect-[1.414] overflow-hidden rounded-md bg-white p-[7%] text-center text-[#1f2937] shadow-xl">
        <div className="absolute inset-[4%] rounded-sm border-2 border-[#c9a227]/70" />
        <div className="absolute -right-6 bottom-[-18px] h-24 w-24 rounded-full bg-gradient-to-br from-[#f5d77a] to-[#b8860b] opacity-90 shadow-md" />
        <p className="relative text-[7px] tracking-[0.3em] text-[#6b7280]">CERTIFICATE OF</p>
        <p className="relative font-serif text-[clamp(14px,1.6vw,20px)] font-bold tracking-wide text-[#111827]">
          {award.type === "AWARD" ? "ACHIEVEMENT" : "COMPLETION"}
        </p>
        <p className="relative mt-2 text-[7px] text-[#6b7280]">proudly presented to</p>
        <p className="relative font-serif text-[clamp(13px,1.5vw,18px)] italic text-[#991b1b]">
          {profile.first[0] + profile.first.slice(1).toLowerCase()} {profile.last[0] + profile.last.slice(1).toLowerCase()}
        </p>
        <p className="relative mt-1 text-[8px] font-semibold">{award.title}</p>
        <p className="relative text-[7px] text-[#6b7280]">{award.issuer}</p>
      </div>
      <h3 className="display mt-5 text-[15px] leading-tight tracking-normal text-white">{award.title}</h3>
      <p className="label mt-2 text-[9px] text-white/40">{award.year}</p>
    </div>
  );
}
