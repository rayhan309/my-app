"use client";

import { motion } from "framer-motion";
import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";
import { Allprojects } from "@/lib/projects/Projects";
import ProjectCard from "@/components/projects/ProjectCard/ProjectCard";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta-sans",
});

const projects = Allprojects.slice(0, 6);

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-semibold tracking-wider uppercase text-sm"
          >
            My Recent Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] ${jakartaSans.className}`}
          >
            Featured <span className="text-muted-foreground">Projects.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl"
          >
            Explore my latest creations where design meets engineering. Each project is crafted
            with precision, performance, and user experience in mind.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-16"
        >
          <Link href="/projects" className="px-10 py-4 bg-transparent border border-border hover:border-primary/50 text-foreground rounded-md font-bold transition-all hover:bg-primary/5 group">
            See More Projects
            <motion.span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
