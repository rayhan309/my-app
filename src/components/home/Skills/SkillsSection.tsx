"use client";

import SkillsGrid from "./SkillsGrid";
import { JSX } from "react";
import { motion } from "framer-motion";
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta-sans",
});

export default function SkillsSection(): JSX.Element {
  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold tracking-wider uppercase text-sm"
          >
            My Technical Arsenal
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] ${jakartaSans.className}`}
          >
            Skills & <span className="text-muted-foreground">Expertise.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl"
          >
            A comprehensive set of tools and technologies I've mastered over the years
            to build robust, scalable, and secure digital products.
          </motion.p>
        </div>

        <SkillsGrid />
      </div>

      {/* <div className="w-fit mx-auto pt-20 pb-16">
        <Link href="/services" className="px-10 py-4 bg-transparent border border-border hover:border-primary/50 text-foreground rounded-md font-bold transition-all hover:bg-primary/5 group">
            Services
            <motion.span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
              →
            </motion.span>
          </Link>
      </div> */}
    </section>
  );
}