import { Allprojects, singleProjectDitails } from "@/lib/projects/Projects";
import {
  fetchDbProjectById,
  fetchDbProjects,
} from "@/lib/projects/repository";
import type { ProjectCardData, ProjectDetailData } from "./types";

export async function getMergedProjects(): Promise<ProjectCardData[]> {
  const dbProjects = await fetchDbProjects();
  const staticProjects: ProjectCardData[] = Allprojects.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    image: p.image,
    githubLink: p.githubLink,
    liveLink: p.liveLink ?? null,
    technologies: p.technologies,
    source: "static",
  }));

  const staticIds = new Set(staticProjects.map((p) => p.id));
  const uniqueDb = dbProjects.filter((p) => !staticIds.has(p.id));

  return [...uniqueDb, ...staticProjects];
}

export function dbProjectToDetail(
  doc: Awaited<ReturnType<typeof fetchDbProjectById>>
): ProjectDetailData | null {
  if (!doc) return null;

  return {
    id: doc.id,
    title: doc.title,
    subtitle: doc.subtitle || doc.title,
    description: doc.description,
    image: doc.image,
    liveLink: doc.liveLink || "#",
    githubLink: doc.githubLink || "#",
    details: {
      client: "Portfolio Project",
      duration: "—",
      role: "Full-stack Engineer",
      category: "Web Application",
    },
    features: doc.features?.length
      ? doc.features
      : [
          "Modern, responsive user interface",
          "Scalable full-stack architecture",
          "Optimized performance and UX",
        ],
    stack: {
      frontend: doc.technologies,
      backend: [],
      deployment: [],
    },
    gallery: [doc.image],
    overview: doc.overview || doc.description,
  };
}

export async function getProjectDetailById(
  id: string
): Promise<ProjectDetailData | null> {
  const staticDetail = singleProjectDitails(id);
  if (staticDetail) return staticDetail as ProjectDetailData;

  const dbDoc = await fetchDbProjectById(id);
  return dbProjectToDetail(dbDoc);
}
