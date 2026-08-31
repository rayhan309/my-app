"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  ExternalLink,
  Layers,
  Sparkles,
  User,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Dialog from "@mui/material/Dialog";
import type { ProjectDetailData } from "@/lib/projects/types";

function formatStackTitle(key: string): string {
  return key
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function ProjectDetails({ project }: { project: ProjectDetailData }) {
  const [activeImage, setActiveImage] = React.useState<string | null>(null);

  const stackGroups = Object.entries(project.stack ?? {})
    .filter(([, items]) => Array.isArray(items) && items.length > 0)
    .map(([key, items]) => ({
      title: formatStackTitle(key),
      items,
    }));

  const gallery = project.gallery?.length ? project.gallery : [project.image];
  const hasGithub = Boolean(project.githubLink) && project.githubLink !== "#";
  const meta = [
    { icon: User, label: "Client", value: project.details.client },
    { icon: Calendar, label: "Timeline", value: project.details.duration },
    { icon: Layers, label: "Role", value: project.details.role },
    { icon: Sparkles, label: "Type", value: project.details.category },
  ];

  return (
    <article className="pb-24">
      <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link href="/projects" className="inline-flex items-center gap-2 hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Projects
        </Link>
        <span>/</span>
        <span className="text-foreground/80">{project.title}</span>
      </nav>

      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 max-w-4xl"
      >
        {project.details.category ? (
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
            {project.details.category}
          </p>
        ) : null}
        <h1
          className="font-display text-4xl tracking-tight text-foreground sm:text-5xl md:text-6xl"
        >
          {project.title}
        </h1>
        {project.subtitle ? (
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {project.subtitle}
          </p>
        ) : null}

        <div className="mt-7 flex flex-wrap gap-3">
          {project.liveLink ? (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 hover:opacity-90"
            >
              View live
              <ExternalLink className="h-4 w-4" />
            </a>
          ) : null}
          {hasGithub ? (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-bold hover:border-primary/50"
            >
              <FaGithub className="h-4 w-4" />
              Source
            </a>
          ) : null}
        </div>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="relative mb-12 overflow-hidden rounded-3xl border border-border/40 bg-card"
      >
        <div className="relative aspect-[16/9] min-h-[240px] sm:min-h-[320px]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </motion.div>

      <div className="mb-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {meta.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="rounded-2xl border border-border/40 bg-card/60 p-4 sm:p-5"
          >
            <Icon className="mb-3 h-4 w-4 text-primary" />
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              {label}
            </p>
            <p className="mt-1 text-sm font-semibold leading-snug text-foreground">
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="space-y-8 lg:col-span-8">
          <section>
            <h2 className={`mb-4 text-2xl font-display`}>Overview</h2>
            <p className="text-base leading-8 text-muted-foreground">{project.description}</p>
          </section>

          {project.overview && project.overview !== project.description ? (
            <section className="rounded-2xl border border-border/30 bg-card/50 p-6 sm:p-8">
              <h2 className={`mb-4 text-2xl font-display`}>
                Challenge & approach
              </h2>
              <p className="text-base leading-8 text-muted-foreground">{project.overview}</p>
            </section>
          ) : null}

          {project.features.length > 0 ? (
            <section>
              <h2 className={`mb-6 text-2xl font-display`}>
                What shipped
              </h2>
              <ol className="grid gap-4 sm:grid-cols-2">
                {project.features.map((item, i) => (
                  <li
                    key={`${item}-${i}`}
                    className="rounded-2xl border border-border/30 bg-card/40 p-5"
                  >
                    <span className="text-xs font-bold tracking-widest text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/90">{item}</p>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}
        </div>

        <aside className="lg:col-span-4">
          <div className="rounded-2xl border border-border/30 bg-card/60 p-6 sm:p-7 lg:sticky lg:top-24">
            <h2 className={`mb-6 text-lg font-display`}>Tech stack</h2>
            {stackGroups.length === 0 ? (
              <p className="text-sm text-muted-foreground">Stack details coming soon.</p>
            ) : (
              <div className="space-y-6">
                {stackGroups.map((group) => (
                  <div key={group.title}>
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                      {group.title}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>

      {gallery.length > 0 ? (
        <section className="mt-16">
          <h2 className={`mb-6 text-2xl font-display`}>Gallery</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                onClick={() => setActiveImage(src)}
                className="group relative aspect-video overflow-hidden rounded-2xl border border-border/30 bg-card/30 text-left"
              >
                <Image
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <span className="absolute right-3 top-3 rounded-full bg-background/80 p-2 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      <div className="mt-16 border-t border-border/40 pt-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all projects
        </Link>
      </div>

      <Dialog
        open={Boolean(activeImage)}
        onClose={() => setActiveImage(null)}
        maxWidth="lg"
        fullWidth
      >
        {activeImage ? (
          <div className="relative aspect-video bg-black">
            <Image
              src={activeImage}
              alt={`${project.title} preview`}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        ) : null}
      </Dialog>
    </article>
  );
}
