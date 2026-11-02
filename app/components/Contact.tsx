"use client";

import { useEffect, useState } from "react";
import { profile, socials } from "../data";
import { Icon, MaskLine, Reveal, SectionLabel } from "./ui";

function useManilaTime() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Manila", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

export default function Contact() {
  const time = useManilaTime();

  return (
    <section id="contact" className="relative z-10 overflow-hidden bg-ink pt-24 md:pt-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10 lg:pl-20">
        <SectionLabel n="04" text="Get in touch" />
        <div className="relative mt-6">
          <span className="absolute -left-4 top-[10%] hidden h-[30%] w-1 bg-brand md:block lg:-left-8" />
          <h2 className="display text-[clamp(52px,10.5vw,170px)]">
            <MaskLine>Let&apos;s create</MaskLine>
            <MaskLine delay={0.1} className="text-brand">Something</MaskLine>
            <MaskLine delay={0.2}>Great.</MaskLine>
          </h2>
        </div>

        <div className="mt-24 grid gap-12 border-t border-white/10 pt-12 md:grid-cols-3">
          <Reveal>
            <p className="label text-[10px] font-bold text-white/40">Socials</p>
            <ul className="mt-6 grid gap-4">
              {socials.map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noopener" className="label group inline-flex items-center gap-3 text-[11px] font-bold text-white transition-colors hover:text-brand">
                    <Icon name={s.name} size={15} />
                    {s.name}
                    <Icon name="Arrow" size={12} className="-translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="label text-[10px] font-bold text-white/40">Contact details</p>
            <a href={`mailto:${profile.email}`} className="mt-6 block break-all text-lg font-semibold transition-colors hover:text-brand md:text-xl">
              {profile.email}
            </a>
            <p className="label mt-5 text-[10px] leading-6 text-white/40">
              {profile.location}, Philippines
              <br />
              Available for freelance projects
            </p>
          </Reveal>

          <Reveal delay={0.2} className="md:text-right">
            <p className="label text-[10px] font-bold text-white/40">Local time</p>
            <p className="display mt-5 text-[clamp(34px,4vw,52px)] tabular-nums tracking-normal" suppressHydrationWarning>
              {time} <span className="label align-middle text-xs text-brand">PHT</span>
            </p>
            <a
              href="#home"
              aria-label="Back to top"
              className="mt-6 inline-grid h-16 w-16 place-items-center rounded-full bg-brand text-white shadow-[0_10px_40px_-5px_rgba(227,36,43,0.7)] transition-transform hover:-translate-y-1"
            >
              <Icon name="Up" size={20} />
            </a>
          </Reveal>
        </div>
      </div>

      <footer className="mx-auto mt-24 flex max-w-7xl flex-wrap justify-between gap-3 border-t border-white/5 px-5 py-7 md:px-10 lg:pl-20">
        <p className="label text-[9px] text-white/30">© 2026 {profile.first} {profile.last}. All rights reserved.</p>
        <p className="label text-[9px] text-white/30">Built with Next.js</p>
      </footer>
    </section>
  );
}
