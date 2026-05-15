'use client'

import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { IoMdInformationCircleOutline } from "react-icons/io";

export default function ProjectCard({ project, index }: { project: any; index: number }) {
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
          {project.technologies.map((tech: any, i: number) => (
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