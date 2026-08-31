"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Dialog from "@mui/material/Dialog";
import type { ProjectDetailData } from "@/lib/projects/types";

function formatStackTitle(key: string): string {
  return key
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function ProjectDetails({
  project,
}: {
  project: ProjectDetailData;
}) {
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
    { label: "Client", value: project.details.client },
    { label: "Timeline", value: project.details.duration },
    { label: "Role", value: project.details.role },
    { label: "Discipline", value: project.details.category },
  ].filter((item) => item.value?.trim());

  const showOverviewAside =
    Boolean(project.overview) && project.overview !== project.description;

  return (
    <article className="pb-24">
      <div className="h-px bg-primary" />

      <nav className="flex flex-wrap items-center gap-2 py-6 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Archive
        </Link>
        <span className="text-border">/</span>
        <span className="text-foreground/80">{project.title}</span>
      </nav>

      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-8 border-b border-border pb-10 md:pb-12 lg:flex-row lg:items-end lg:justify-between lg:gap-16"
      >
        <div className="min-w-0 max-w-3xl">
          {project.details.category ? (
            <p className="mb-4 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-primary">
              {project.details.category}
            </p>
          ) : null}
          <h1 className="font-display text-4xl leading-[0.95] tracking-tight text-foreground sm:text-5xl md:text-7xl">
            {project.title}
          </h1>
          {project.subtitle ? (
            <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground md:text-xl">
              {project.subtitle}
            </p>
          ) : null}
        </div>

        <div className="flex shrink-0 flex-wrap gap-3 lg:justify-end">
          {project.liveLink ? (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              View live
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : null}
          {hasGithub ? (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border px-6 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] transition-colors hover:border-primary hover:text-primary"
            >
              <FaGithub className="h-3.5 w-3.5" />
              Source
            </a>
          ) : null}
        </div>
      </motion.header>

      <motion.figure
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="mt-10 md:mt-12"
      >
        <div className="relative aspect-[16/9] min-h-[240px] overflow-hidden border border-border bg-card sm:min-h-[320px]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        {meta.length > 0 ? (
          <figcaption className="grid grid-cols-2 border-x border-b border-border md:grid-cols-4">
            {meta.map((item, index) => (
              <div
                key={item.label}
                className={`px-4 py-5 md:px-5 ${
                  index > 0 ? "border-l border-border" : ""
                } ${index === 2 ? "border-t border-border md:border-t-0" : ""} ${
                  index === 3 ? "border-t border-border md:border-t-0" : ""
                }`}
              >
                <p className="text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
                  {item.label}
                </p>
                <p className="font-display mt-2 text-lg leading-snug text-foreground">
                  {item.value}
                </p>
              </div>
            ))}
          </figcaption>
        ) : null}
      </motion.figure>

      <div className="mt-16 grid grid-cols-1 gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-16">
        <div className="space-y-14 lg:col-span-8">
          <section>
            <p className="mb-5 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-primary">
              01 — Brief
            </p>
            <h2 className="font-display mb-6 text-3xl md:text-4xl">Overview</h2>
            <p className="max-w-2xl text-base leading-8 text-muted-foreground md:text-lg md:leading-9">
              {project.description}
            </p>
          </section>

          {showOverviewAside ? (
            <section className="border-l-[3px] border-primary pl-6 md:pl-8">
              <p className="mb-4 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
                02 — Approach
              </p>
              <h2 className="font-display mb-5 text-3xl md:text-4xl">
                Challenge & method
              </h2>
              <p className="max-w-2xl text-base leading-8 text-muted-foreground md:text-lg md:leading-9">
                {project.overview}
              </p>
            </section>
          ) : null}

          {project.features.length > 0 ? (
            <section>
              <p className="mb-5 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-primary">
                {showOverviewAside ? "03" : "02"} — Delivery
              </p>
              <h2 className="font-display mb-8 text-3xl md:text-4xl">
                What shipped
              </h2>
              <ol className="divide-y divide-border border-y border-border">
                {project.features.map((item, i) => (
                  <li
                    key={`${item}-${i}`}
                    className="grid grid-cols-[3.5rem_1fr] gap-4 py-5 md:grid-cols-[4.5rem_1fr] md:gap-8"
                  >
                    <span className="font-display text-xl text-primary md:text-2xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="pt-1 text-sm leading-7 text-foreground/90 md:text-base md:leading-8">
                      {item}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}
        </div>

        <aside className="lg:col-span-4">
          <div className="border-t border-primary pt-6 lg:sticky lg:top-24">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-primary">
              Specification
            </p>
            <h2 className="font-display mt-3 mb-8 text-2xl">Tech stack</h2>
            {stackGroups.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Stack details coming soon.
              </p>
            ) : (
              <dl className="space-y-0">
                {stackGroups.map((group) => (
                  <div
                    key={group.title}
                    className="border-b border-border py-5 first:border-t"
                  >
                    <dt className="text-[0.62rem] uppercase tracking-[0.18em] text-muted-foreground">
                      {group.title}
                    </dt>
                    <dd className="mt-3 flex flex-wrap gap-2">
                      {group.items.map((tech) => (
                        <span
                          key={tech}
                          className="border border-border px-2.5 py-1 text-[11px] tracking-wide text-foreground/90"
                        >
                          {tech}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </aside>
      </div>

      {gallery.length > 0 ? (
        <section className="mt-20 border-t border-border pt-12 md:mt-24 md:pt-16">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-primary">
                Plates
              </p>
              <h2 className="font-display text-3xl md:text-4xl">Gallery</h2>
            </div>
            <p className="hidden text-sm text-muted-foreground sm:block">
              {String(gallery.length).padStart(2, "0")} frames
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {gallery.map((src, i) => (
              <button
                key={`${src}-${i}`}
                type="button"
                onClick={() => setActiveImage(src)}
                className={`group relative overflow-hidden border border-border bg-card text-left ${
                  i === 0 && gallery.length > 1
                    ? "aspect-[16/9] md:col-span-2"
                    : "aspect-video"
                }`}
              >
                <Image
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes={
                    i === 0 && gallery.length > 1
                      ? "100vw"
                      : "(max-width: 768px) 100vw, 50vw"
                  }
                />
                <span className="absolute left-4 top-4 font-display text-sm text-primary mix-blend-difference">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="absolute right-4 top-4 bg-background/80 p-2 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      <div className="mt-16 flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to archive
        </Link>
        {project.liveLink ? (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary"
          >
            Open live site
            <ArrowUpRight className="h-4 w-4" />
          </a>
        ) : null}
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
