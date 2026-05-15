"use client";

import { JSX } from "react";
import { motion } from "framer-motion";
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Code2,
  Cpu,
  Megaphone,
  Package,
  ShieldCheck,
  Workflow,
  ArrowRight,
} from "lucide-react";
import { SERVICESDATA } from "@/lib/ServicesData/ServicesData";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta-sans",
});

const SERVICES = SERVICESDATA.slice(0, 6);

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const Icon = service.icon;
  const tags = service.tags;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group relative flex flex-col h-full rounded-md border border-border/10 bg-card/40 backdrop-blur-sm p-6 md:p-7 overflow-hidden hover:border-primary/35 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500"
    >
      <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-primary/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative flex items-center gap-4 mb-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary border border-primary/15 group-hover:bg-primary/15 transition-colors">
          <Icon className="w-6 h-6" strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3
            className={`mt-1 text-lg md:text-xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors ${jakartaSans.className}`}
          >
            {service.title}
          </h3>
        </div>
      </div>

      <p className="relative text-sm text-muted-foreground leading-relaxed flex-1 mb-5">
        {service.description}
      </p>

      <div className="relative flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary/5 text-primary border border-primary/10 rounded-md"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export default function Services(): JSX.Element {
  return (
    <section id="services" className="py-20 relative overflow-hidden scroll-mt-24">
      <div className="absolute top-1/2 left-0 w-px h-32 bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden md:block" />

      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16 space-y-4 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold tracking-wider uppercase text-sm"
          >
            What I deliver
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className={`text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] ${jakartaSans.className}`}
          >
            Services <span className="text-muted-foreground">&amp; capabilities.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            className="text-lg text-muted-foreground"
          >
            Engineering-first solutions with clear outcomes—whether you need a
            product built, secured, scaled, or grown.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16"
        >
          <Link
            href="/booking-meeting"
            className="inline-flex items-center gap-2 bg-primary/70 text-primary-foreground px-8 py-4 rounded-full text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity"
          >
            Discuss a project
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 border border-border px-8 py-4 rounded-full text-sm font-bold hover:border-primary/50 hover:bg-primary/5 transition-all"
          >
            View all on dedicated page
            <ArrowRight className="w-4 h-4 opacity-60 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
