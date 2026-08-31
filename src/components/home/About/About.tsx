"use client";

import { motion } from "framer-motion";
import { Code2, Lightbulb, Rocket, ShieldCheck } from "lucide-react";
import Link from "next/link";

const principles = [
  {
    icon: Code2,
    title: "Clean architecture",
    description: "Systems that stay readable as they grow—clear boundaries, honest APIs, and code you can ship with confidence.",
  },
  {
    icon: Rocket,
    title: "Performance first",
    description: "Fast by default: careful rendering, lean payloads, and interfaces that feel instant on real devices.",
  },
  {
    icon: ShieldCheck,
    title: "Quiet security",
    description: "Hardening, auth, and data hygiene treated as product quality—not a last-minute checklist.",
  },
  {
    icon: Lightbulb,
    title: "Taste in the details",
    description: "The last 10% is the product: spacing, copy, motion, and the feeling that someone cared.",
  },
];

export default function About() {
  return (
    <section id="about" data-reveal className="relative py-24 md:py-32">
      <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8 lg:col-span-5"
          >
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-primary">
              Practice
            </p>
            <h2 className="font-display text-4xl leading-[1.1] md:text-5xl lg:text-6xl">
              Software with the discipline of a craft.
            </h2>
            <div className="space-y-5 text-[1.05rem] leading-8 text-muted-foreground">
              <p>
                I am a{" "}
                <span className="text-foreground">Senior Full-stack Engineer</span>{" "}
                drawn to work that has to hold up in production—not just in a demo.
              </p>
              <p>
                At{" "}
                <Link
                  href="https://flexshipit.com"
                  target="_blank"
                  className="text-foreground underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
                >
                  FlexShip IT
                </Link>
                , I lead technical work across backend systems and the interfaces people actually use. Great software starts with the human on the other side of the screen.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 border-t border-border pt-8">
              <div>
                <p className="font-display text-4xl">05+</p>
                <p className="mt-1 text-sm text-muted-foreground">Years in practice</p>
              </div>
              <div>
                <p className="font-display text-4xl">111+</p>
                <p className="mt-1 text-sm text-muted-foreground">Projects delivered</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:col-span-7"
          >
            {principles.map((item) => (
              <div key={item.title} className="bg-card p-7">
                <item.icon size={18} className="mb-5 text-primary" strokeWidth={1.6} />
                <h3 className="font-display text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
    </section>
  );
}
