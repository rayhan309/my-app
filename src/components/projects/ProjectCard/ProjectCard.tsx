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
      className="group h-full"
    >
      <Link href={`/projects/${project.id}`} className="flex h-full flex-col">
        <div className="relative mb-5 aspect-[16/10] w-full overflow-hidden rounded-sm border border-border bg-card">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground">
              {String(index + 1).padStart(2, "0")}
              {project.technologies[0] ? ` · ${project.technologies[0]}` : ""}
            </p>
            <h3 className="font-display mt-2 line-clamp-2 text-2xl leading-tight md:text-[1.7rem]">
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
