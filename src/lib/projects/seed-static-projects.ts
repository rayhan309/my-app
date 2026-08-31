import { Allprojects, AllprojectsDitails } from "@/lib/projects/Projects";
import dbConnect from "@/lib/dbConnect";
import type {
  ProjectDetailsMeta,
  ProjectDocument,
} from "@/lib/projects/types";

const PROJECTS_COLLECTION_NAME =
  process.env.MONGO_PROJECTS_COLLECTION?.trim() || "projects";

let seedPromise: Promise<number> | null = null;

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function toStack(
  value: unknown,
  technologies: string[]
): Record<string, string[]> {
  if (!value || typeof value !== "object") {
    return { frontend: technologies };
  }

  const entries = Object.entries(value as Record<string, unknown>)
    .map(([key, items]) => [key, toStringArray(items)] as const)
    .filter(([, items]) => items.length > 0);

  if (!entries.length) {
    return { frontend: technologies };
  }

  return Object.fromEntries(entries);
}

function toDetails(value: unknown): ProjectDetailsMeta {
  const d =
    value && typeof value === "object"
      ? (value as Record<string, unknown>)
      : {};

  return {
    client: typeof d.client === "string" ? d.client : "Portfolio Project",
    duration: typeof d.duration === "string" ? d.duration : "—",
    role: typeof d.role === "string" ? d.role : "Full-stack Engineer",
    category: typeof d.category === "string" ? d.category : "Web Application",
  };
}

function buildStaticDocuments(): Omit<ProjectDocument, never>[] {
  const detailsById = new Map(
    AllprojectsDitails.map((detail) => [String(detail.id), detail])
  );

  return Allprojects.map((project, index) => {
    const detail = detailsById.get(String(project.id)) as
      | (typeof AllprojectsDitails)[number]
      | undefined;
    const technologies = toStringArray(project.technologies);
    const liveLink =
      typeof project.liveLink === "string" && project.liveLink
        ? project.liveLink
        : null;

    return {
      id: String(project.id),
      title: project.title,
      description:
        (detail && "description" in detail
          ? String(detail.description)
          : project.description) || project.description,
      image: project.image,
      githubLink: project.githubLink || "#",
      liveLink,
      technologies,
      source: "static" as const,
      sortOrder: 1000 + index,
      subtitle:
        detail && "subtitle" in detail && typeof detail.subtitle === "string"
          ? detail.subtitle
          : project.title,
      overview:
        detail && "overview" in detail && typeof detail.overview === "string"
          ? detail.overview
          : project.description,
      features: toStringArray(detail?.features),
      details: toDetails(detail?.details),
      stack: toStack(detail?.stack, technologies),
      gallery: (() => {
        const gallery = toStringArray(detail?.gallery);
        return gallery.length ? gallery : [project.image];
      })(),
      createdAt: new Date(Date.UTC(2024, 0, 1) + index * 60_000),
    };
  });
}

async function seedStaticProjects(): Promise<number> {
  if (!process.env.MONGO_DB_URI?.trim() || !process.env.MONGO_DB_NAME?.trim()) {
    return 0;
  }

  const documents = buildStaticDocuments();
  const collection = dbConnect<ProjectDocument>(PROJECTS_COLLECTION_NAME);

  const result = await collection.bulkWrite(
    documents.map((doc) => ({
      updateOne: {
        filter: { id: doc.id },
        update: { $setOnInsert: doc },
        upsert: true,
      },
    })),
    { ordered: false }
  );

  return result.upsertedCount;
}

export async function ensureStaticProjectsSeeded(): Promise<void> {
  if (!seedPromise) {
    seedPromise = seedStaticProjects().catch((error) => {
      seedPromise = null;
      throw error;
    });
  }

  await seedPromise;
}
