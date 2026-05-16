"use client";

import { JSX } from "react";
import { motion } from "framer-motion";
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import {
  ArrowRight,
} from "lucide-react";
import { SERVICESDATA } from "@/lib/ServicesData/ServicesData";
import ServiceCard from "./ServiceCard";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta-sans",
});

const SERVICES = SERVICESDATA.slice(0, 6);



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
            View all Services
            <ArrowRight className="w-4 h-4 opacity-60 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
