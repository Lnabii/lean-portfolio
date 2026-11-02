"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "../data";
import { ease } from "./ui";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.25]);

  // photo drifts slightly against the mouse
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(useTransform(mx, (v) => v * -18), { stiffness: 60, damping: 20 });
  const py = useSpring(useTransform(my, (v) => v * -10), { stiffness: 60, damping: 20 });

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={(e) => {
        mx.set(e.clientX / window.innerWidth - 0.5);
        my.set(e.clientY / window.innerHeight - 0.5);
      }}
      className="glow sticky top-0 h-[100svh] overflow-hidden"
    >
      <div className="stripes absolute inset-0" />
      <motion.div style={{ scale, opacity: fade }} className="absolute inset-0">
        {/* first name */}
        <motion.h1
          initial={{ opacity: 0, scale: 1.12, filter: "blur(24px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.4, ease }}
          className="display name-shine absolute inset-x-0 top-[24%] text-center text-[clamp(96px,21vw,330px)] md:top-[20%]"
        >
          {profile.first}
        </motion.h1>

        {/* last name sliding left → right behind the photo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute inset-x-0 top-[44%] md:top-[47%]"
        >
          <motion.p
            animate={{ x: ["-75vw", "75vw"] }}
            transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
            className="display name-fade whitespace-nowrap text-center text-[clamp(70px,13vw,210px)]"
          >
            {profile.last}
          </motion.p>
        </motion.div>

        {/* photo rises in, sharpens, then follows the mouse a little */}
        <motion.div
          initial={{ opacity: 0, y: 140, filter: "blur(14px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease, delay: 0.35 }}
          className="absolute bottom-0 left-1/2 w-[min(92vw,640px)] -translate-x-1/2 md:w-[min(50vw,720px)]"
        >
          <motion.img
            src="/lean.webp"
            alt="Lean Naive"
            width={1000}
            height={1000}
            style={{ x: px, y: py }}
            className="w-full [mask-image:linear-gradient(to_bottom,#000_70%,transparent)]"
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="label absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40"
      >
        {profile.role} · BSCS 3B
      </motion.div>
    </section>
  );
}
