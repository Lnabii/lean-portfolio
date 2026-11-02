"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile, socials } from "../data";
import { Icon } from "./ui";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "project", label: "Project" },
  { id: "awards", label: "Awards" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    links.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-ink/85 backdrop-blur-md"
      >
        <nav className="mx-auto flex h-16 items-center justify-between px-5 md:px-8">
          <a href="#home" className="display text-xl tracking-tight md:text-2xl">
            {profile.logo[0]}
            <span className="text-brand">{profile.logo[1]}</span>
          </a>
          <ul className="hidden items-center gap-9 md:flex">
            {links.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className={`label relative py-1 transition-colors hover:text-white ${active === l.id ? "text-brand" : "text-white/50"}`}>
                  {l.label}
                  {active === l.id && <motion.span layoutId="nav-underline" className="absolute inset-x-0 -bottom-0.5 h-px bg-brand" />}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="label hidden rounded-md border border-white/80 px-4 py-2.5 font-bold text-white transition-colors hover:border-brand hover:bg-brand md:block">
            Contact Me
          </a>
          <button onClick={() => setOpen(!open)} aria-expanded={open} className="label rounded-md border border-white/20 px-3 py-2 md:hidden">
            {open ? "Close" : "Menu"}
          </button>
        </nav>
        {open && (
          <ul className="flex flex-col gap-1 border-t border-white/10 bg-black/95 px-5 pb-5 pt-2 md:hidden">
            {links.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} onClick={() => setOpen(false)} className={`label block py-3 ${active === l.id ? "text-brand" : "text-white/70"}`}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </motion.header>

      {/* vertical socials on the left edge */}
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-6 text-white/40 mix-blend-difference lg:flex"
      >
        {socials.slice(0, 3).map((s) => (
          <a key={s.name} href={s.href} target="_blank" rel="noopener" aria-label={s.name} className="transition-colors hover:text-brand">
            <Icon name={s.name} size={17} />
          </a>
        ))}
      </motion.div>
    </>
  );
}
