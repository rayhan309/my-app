"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { FaGithub } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Link from "next/link";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta-sans",
});

const projects = [
  // {
  //   id: "1",
  //   title: "FairBazar",
  //   description: "A comprehensive e-commerce platform designed for seamless shopping experiences with a clean, modern UI.",
  //   image: "/fairbazar_mockup.png", // Update with your actual screenshot path
  //   githubLink: "https://github.com/rayhan309",
  //   liveLink: "https://fairbazar.vercel.app/",
  //   technologies: ["Next.js", "Tailwind CSS", "Redux", "Node.js"],
  // },
  {
    id: "2",
    title: "Fashion Museum BD",
    description: "A premium fashion retail solution focusing on high-quality visual presentation and user engagement.",
    image: "/fashionmuseum_mockup.png",
    githubLink: "https://github.com/rayhan309",
    liveLink: "https://fashionmuseumbd.com/",
    technologies: ["Next.js", "React", "Tailwind CSS", "Vercel", "MUI", "Framer Motion"],
  },
  {
    id: "7",
    title: "ChatsNest",
    description: "A real-time instant messaging application featuring seamless room-based communication and live interaction using WebSockets.",
    image: "/chatsnest_mockup.png", // actual path check kore nio
    githubLink: "https://github.com/rayhan309",
    liveLink: "https://chatsnest.vercel.app/",
    technologies: ["Next.js", "Socket.io", "Express.js", "Tailwind CSS"],
  },
  {
    id: "3",
    title: "Ibrahim Mahmud Portfolio",
    description: "A professional digital strategist portfolio showcasing services, results, and expertise with sleek animations.",
    image: "/ibrahim_portfolio_mockup.png",
    githubLink: "https://github.com/rayhan309",
    liveLink: "https://ibrahimmahmud.com/",
    technologies: ["Next.js", "Framer Motion", "Tailwind", "Lucide Icons"],
  },
  {
    id: "4",
    title: "Automation Section",
    description: "A specialized automation landing page demonstrating high-speed processing and modern interface logic.",
    image: "/automation_mockup.png",
    githubLink: "https://github.com/rayhan309",
    liveLink: "https://next-js-la-section-automation.vercel.app/",
    technologies: ["Next.js", "TypeScript", "GSAP", "Server Components"],
  },
  {
    id: "5",
    title: "Halal Market BD",
    description: "A niche e-commerce marketplace focused on halal-certified products with secure payment integration.",
    image: "/halalmarket_mockup.png",
    githubLink: "https://github.com/rayhan309",
    liveLink: "https://halalmarketbd.com/",
    technologies: ["React", "Node.js", "MongoDB", "Payment Gateway"],
  },
  {
    id: "6",
    title: "FlexShip IT",
    description: "Official agency website for FlexShip IT, highlighting high-performance software engineering and digital solutions.",
    image: "/flexship_mockup.png",
    githubLink: "https://github.com/rayhan309",
    liveLink: "https://flexship-it.vercel.app/",
    technologies: ["Next.js", "Tailwind", "Shadcn UI", "Agency Site"],
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-card/40 border border-border/10 rounded-md overflow-hidden hover:border-primary/30 transition-all duration-500 backdrop-blur-sm"
    >
      {/* Project Image Container */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />

        {/* Hover Overlay Buttons */}
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
          {/* <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white text-black rounded-full transition-transform"
            title="GitHub Repository"
          >
            <FaGithub size={20} />
          </a> */}
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-primary text-white rounded-full transition-transform"
            title="Live Preview"
          >
            <ExternalLink size={20} />
          </a>
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6 space-y-4">
        <Link href={`/project/${project.id}`} target="_blank" rel="noopener noreferrer" className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <IoMdInformationCircleOutline className="text-muted-foreground group-hover:text-primary transition-all" size={22} />
        </Link>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description.slice(0, 100) + "..."}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary/5 text-primary border border-primary/10 rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

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
          <button className="px-10 py-4 bg-transparent border border-border hover:border-primary/50 text-foreground rounded-md font-bold transition-all hover:bg-primary/5 group">
            See All Projects
            <motion.span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
              →
            </motion.span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
