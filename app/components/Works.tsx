"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { marquee, projects, type Project } from "../data";
import Mock from "./Mock";
import { Icon, MaskLine, Reveal, SectionLabel, ease } from "./ui";

export default function Works() {
  const [open, setOpen] = useState<Project | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="project" className="relative z-10 overflow-hidden bg-ink">
      {/* big word marquee */}
      <div className="border-y border-white/5 py-6" aria-hidden="true">
        <div className="marquee-track">
          {[...marquee, ...marquee].map((w, i) => (
            <span key={i} className="display flex items-center gap-10 pr-10 text-[clamp(28px,4vw,56px)] text-white/25">
              {w}
              <span className="h-3 w-3 rounded-full bg-brand" />
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32 lg:pl-20">
        <SectionLabel n="02" text="Selected" />
        <h2 className="display mt-5 text-[clamp(56px,9vw,130px)]">
          <MaskLine>Archived</MaskLine>
          <MaskLine delay={0.1} className="-skew-x-12 text-brand">Works</MaskLine>
        </h2>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.12} y={60}>
              <article className="group relative aspect-[16/10] overflow-hidden rounded-2xl bg-white ring-1 ring-white/10 transition-shadow duration-500 hover:shadow-[0_30px_80px_-30px_rgba(227,36,43,0.7)] hover:ring-brand/60">
                <span className="absolute left-4 top-0 z-20 h-2.5 w-9 rounded-b-md bg-brand" />
                <div className="h-full transition-transform duration-700 ease-out group-hover:scale-[1.06]">
                  <Mock kind={p.kind} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent transition-opacity duration-500 group-hover:from-black/95" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                  <p className="label mb-2 text-[9px] text-white/50">{p.tagline}</p>
                  <h3 className="display text-[clamp(20px,2.4vw,32px)] text-white">{p.title}</h3>
                  <div className="mt-4 flex items-center gap-2">
                    <button
                      onClick={() => setOpen(p)}
                      className="label inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-[10px] font-bold text-white backdrop-blur transition-colors hover:bg-brand"
                    >
                      View case <Icon name="Arrow" size={13} className="transition-transform group-hover:translate-x-1" />
                    </button>
                    <a href="https://github.com/" target="_blank" rel="noopener" aria-label="Source code" className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white hover:text-black">
                      <Icon name="GitHub" size={15} />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 text-center">
          <p className="label text-[9px] text-white/30">End of archive</p>
          <a href="#awards" className="display mt-3 inline-block text-[clamp(18px,2.4vw,30px)] text-white/30 transition-colors hover:text-white">
            Load more experience
          </a>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="mx-auto mt-4 block h-8 w-px bg-brand"
          />
        </Reveal>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[60] grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 60, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={open.title}
              className="max-h-[90vh] w-full max-w-3xl overflow-auto rounded-3xl bg-[#111] ring-1 ring-white/10"
            >
              <div className="aspect-[16/8] overflow-hidden">
                <Mock kind={open.kind} />
              </div>
              <div className="p-6 md:p-9">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="label text-[10px] text-brand">Case study</p>
                    <h3 className="display mt-2 text-[clamp(26px,4vw,44px)]">{open.title}</h3>
                  </div>
                  <button onClick={() => setOpen(null)} aria-label="Close" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 hover:bg-brand">
                    <Icon name="Close" />
                  </button>
                </div>
                <p className="mt-5 text-white/70">{open.description}</p>
                <div className="mt-7 grid gap-6 sm:grid-cols-3">
                  <div>
                    <p className="label text-[9px] text-white/40">Role</p>
                    <p className="mt-1 text-sm">{open.role}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="label text-[9px] text-white/40">Result</p>
                    <p className="mt-1 text-sm">{open.result}</p>
                  </div>
                </div>
                <div className="mt-7 flex flex-wrap gap-2">
                  {open.stack.map((s) => (
                    <span key={s} className="label rounded-full border border-white/15 px-3 py-1.5 text-[9px] text-white/70">{s}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
