"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectCard({
  project,
  index,
}: {
  project: {
    id: string;
    image: string;
    title: string;
    description: string;
    liveLink: string | null;
    technologies: string[];
  };
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.24) }}
      className="group"
    >
      <Link href={`/projects/${project.id}`} className="block">
        <div className="relative mb-5 aspect-[16/11] overflow-hidden rounded-sm border border-border bg-card">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
              {project.technologies[0] ? ` · ${project.technologies[0]}` : ""}
            </p>
            <h3 className="font-display mt-2 text-2xl leading-tight md:text-[1.7rem]">
              {project.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
              {project.description}
            </p>
          </div>
          <ArrowUpRight
            size={18}
            className="mt-1 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
          />
        </div>
      </Link>
    </motion.article>
  );
}
