import { Allprojects, singleProjectDitails } from "@/lib/projects/Projects";
import {
  fetchDbProjectById,
  fetchDbProjects,
} from "@/lib/projects/repository";
import type { ProjectCardData, ProjectDetailData } from "./types";

function staticProjectsAsCards(): ProjectCardData[] {
  return Allprojects.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    image: p.image,
    githubLink: p.githubLink,
    liveLink: p.liveLink ?? null,
    technologies: p.technologies,
    source: "static" as const,
  }));
}

export async function getMergedProjects(): Promise<ProjectCardData[]> {
  try {
    const dbProjects = await fetchDbProjects();
    if (dbProjects.length > 0) {
      return dbProjects;
    }
  } catch (error) {
    console.error("Failed to load projects from database:", error);
  }

  return staticProjectsAsCards();
}

export function dbProjectToDetail(
  doc: Awaited<ReturnType<typeof fetchDbProjectById>>
): ProjectDetailData | null {
  if (!doc) return null;

  const stack =
    doc.stack && Object.keys(doc.stack).length > 0
      ? doc.stack
      : { frontend: doc.technologies };

  return {
    id: doc.id,
    title: doc.title,
    subtitle: doc.subtitle || doc.title,
    description: doc.description,
    image: doc.image,
    liveLink: doc.liveLink,
    githubLink: doc.githubLink || "#",
    details: doc.details ?? {
      client: "Portfolio Project",
      duration: "—",
      role: "Full-stack Engineer",
      category: "Web Application",
    },
    features: doc.features ?? [],
    stack,
    gallery: doc.gallery?.length ? doc.gallery : [doc.image],
    overview: doc.overview || doc.description,
  };
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function normalizeStack(value: unknown, fallback: string[] = []): Record<string, string[]> {
  if (!value || typeof value !== "object") {
    return fallback.length ? { frontend: fallback } : {};
  }

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .map(([key, items]) => [key, toStringArray(items)] as const)
      .filter(([, items]) => items.length > 0)
  );
}

function staticDetailToProjectDetail(
  id: string
): ProjectDetailData | null {
  const staticDetail = singleProjectDitails(id);
  if (!staticDetail) return null;

  return {
    id: staticDetail.id,
    title: staticDetail.title,
    subtitle: staticDetail.subtitle,
    description: staticDetail.description,
    image: staticDetail.image,
    liveLink: staticDetail.liveLink ?? null,
    githubLink: staticDetail.githubLink,
    details: staticDetail.details,
    features: staticDetail.features,
    stack: normalizeStack(staticDetail.stack),
    gallery: staticDetail.gallery,
    overview: staticDetail.overview,
  };
}

export async function getProjectDetailById(
  id: string
): Promise<ProjectDetailData | null> {
  try {
    const dbDoc = await fetchDbProjectById(id);
    const fromDb = dbProjectToDetail(dbDoc);
    if (fromDb) return fromDb;
  } catch (error) {
    console.error("Failed to load project detail from database:", error);
  }

  return staticDetailToProjectDetail(id);
}
