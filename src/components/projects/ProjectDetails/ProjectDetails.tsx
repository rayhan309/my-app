"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Layers,
  Sparkles,
  User,
} from "lucide-react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { FaGithub } from "react-icons/fa";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export type ProjectDetailData = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  liveLink: string;
  githubLink: string;
  details: {
    client: string;
    duration: string;
    role: string;
    category: string;
  };
  features: string[];
  stack: {
    frontend: string[];
    backend: string[];
    deployment: string[];
  };
  gallery: string[];
  overview: string;
};

export default function ProjectDetails({ project }: { project: ProjectDetailData }) {
  const stackGroups = [
    { title: "Frontend", items: project.stack.frontend },
    { title: "Backend", items: project.stack.backend },
    { title: "Deployment", items: project.stack.deployment },
  ].filter((g) => g.items?.length > 0);

  const gallery = project.gallery?.length ? project.gallery : [project.image];

  return (
    <div className="pb-20">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to projects
      </Link>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-md overflow-hidden border border-border/30 mb-12"
      >
        <div className="relative aspect-[21/9] sm:aspect-[2/1] min-h-[220px]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        <motion.div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <span className="inline-block mb-3 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-primary/20 text-primary border border-primary/30">
            {project.details.category}
          </span>
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-black text-foreground leading-tight ${jakarta.className}`}
          >
            {project.title}
          </h1>
          <p className="mt-2 text-base sm:text-lg text-primary/90 font-medium max-w-2xl">
            {project.subtitle}
          </p>
        </motion.div>
      </motion.section>

      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-14">
        <div className="flex flex-wrap gap-3">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md text-sm font-bold shadow-lg shadow-primary/25 hover:opacity-90"
          >
            Live site
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-md text-sm font-bold hover:border-primary/50 transition-colors"
          >
            <FaGithub className="w-4 h-4" />
            GitHub
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:max-w-2xl">
          {[
            { icon: User, label: "Client", value: project.details.client },
            { icon: Calendar, label: "Timeline", value: project.details.duration },
            { icon: Layers, label: "Role", value: project.details.role },
            { icon: Sparkles, label: "Type", value: project.details.category },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="rounded-md border border-border/40 bg-card/50 p-4 backdrop-blur-sm"
            >
              <Icon className="w-4 h-4 text-primary mb-2" />
              <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wide">
                {label}
              </p>
              <p className="text-sm font-semibold mt-1 leading-snug">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 space-y-8">
          <section className="rounded-md border border-border/20 bg-card/30 p-6 sm:p-8">
            <h2 className={`text-xl font-black mb-4 ${jakarta.className}`}>About</h2>
            <p className="text-muted-foreground leading-relaxed">{project.description}</p>
          </section>

          <section className="rounded-md border border-border/20 bg-card/30 p-6 sm:p-8">
            <h2 className={`text-xl font-black mb-4 ${jakarta.className}`}>
              Challenge & approach
            </h2>
            <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
          </section>

          <section className="rounded-md border border-border/20 bg-card/30 p-6 sm:p-8">
            <h2 className={`text-xl font-black mb-6 ${jakarta.className}`}>Key features</h2>
            <ul className="grid sm:grid-cols-2 gap-4">
              {project.features.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-sm text-muted-foreground p-4 rounded-lg bg-background/40 border border-border/30"
                >
                  <span className="text-primary font-bold shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside>
          <div className="rounded-md border border-border/20 bg-card/30 p-6 sm:p-8 lg:sticky lg:top-24 space-y-6">
            <h2 className={`text-lg font-black ${jakarta.className}`}>Tech stack</h2>
            {stackGroups.map((group) => (
              <div key={group.title}>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  {group.title}
                </p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-[10px] font-bold uppercase bg-primary/10 text-primary border border-primary/20 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <section className="mt-14">
        <h2 className={`text-lg font-black mb-6 ${jakarta.className}`}>Screenshots</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gallery.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative aspect-video rounded-md overflow-hidden border border-border/30 bg-card/20"
            >
              <Image
                src={src}
                alt={`${project.title} screenshot ${i + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
