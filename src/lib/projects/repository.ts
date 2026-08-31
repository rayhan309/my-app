import type { WithId } from "mongodb";
import dbConnect from "@/lib/dbConnect";
import { ensureStaticProjectsSeeded } from "@/lib/projects/seed-static-projects";
import type {
  ProjectAdminData,
  ProjectCardData,
  ProjectDocument,
} from "./types";

export const PROJECTS_COLLECTION_NAME =
  process.env.MONGO_PROJECTS_COLLECTION?.trim() || "projects";

export function slugifyTitle(title: string): string {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || `project-${Date.now()}`;
}

export function serializeProject(doc: WithId<ProjectDocument>): ProjectCardData {
  return {
    id: doc.id,
    title: doc.title,
    description: doc.description,
    image: doc.image,
    githubLink: doc.githubLink,
    liveLink: doc.liveLink,
    technologies: doc.technologies,
    source: doc.source ?? "dashboard",
  };
}

export function serializeAdminProject(
  doc: WithId<ProjectDocument>
): ProjectAdminData {
  return {
    ...serializeProject(doc),
    subtitle: doc.subtitle || doc.title,
    overview: doc.overview || doc.description,
    features: doc.features ?? [],
    details: doc.details ?? {
      client: "Portfolio Project",
      duration: "—",
      role: "Full-stack Engineer",
      category: "Web Application",
    },
    stack:
      doc.stack && Object.keys(doc.stack).length > 0
        ? doc.stack
        : { frontend: doc.technologies },
    gallery: doc.gallery?.length ? doc.gallery : [doc.image],
  };
}

export async function fetchDbProjects(): Promise<ProjectCardData[]> {
  if (!process.env.MONGO_DB_URI?.trim() || !process.env.MONGO_DB_NAME?.trim()) {
    return [];
  }

  await ensureStaticProjectsSeeded();

  const collection = dbConnect<ProjectDocument>(PROJECTS_COLLECTION_NAME);
  const rows = await collection
    .find({})
    .sort({ sortOrder: 1, createdAt: -1 })
    .toArray();
  return rows.map(serializeProject);
}

export async function fetchAdminProjects(): Promise<ProjectAdminData[]> {
  if (!process.env.MONGO_DB_URI?.trim() || !process.env.MONGO_DB_NAME?.trim()) {
    return [];
  }

  await ensureStaticProjectsSeeded();

  const collection = dbConnect<ProjectDocument>(PROJECTS_COLLECTION_NAME);
  const rows = await collection
    .find({})
    .sort({ sortOrder: 1, createdAt: -1 })
    .toArray();
  return rows.map(serializeAdminProject);
}

export async function fetchDbProjectById(
  id: string
): Promise<WithId<ProjectDocument> | null> {
  if (!process.env.MONGO_DB_URI?.trim() || !process.env.MONGO_DB_NAME?.trim()) {
    return null;
  }

  await ensureStaticProjectsSeeded();

  const collection = dbConnect<ProjectDocument>(PROJECTS_COLLECTION_NAME);
  return collection.findOne({ id });
}

export async function createDbProject(
  input: Omit<ProjectDocument, "createdAt" | "source" | "sortOrder"> &
    Partial<Pick<ProjectDocument, "source" | "sortOrder">>
): Promise<ProjectCardData> {
  const collection = dbConnect<ProjectDocument>(PROJECTS_COLLECTION_NAME);
  const existing = await collection.findOne({ id: input.id });
  if (existing) {
    throw new Error("A project with this slug already exists.");
  }

  const doc: ProjectDocument = {
    ...input,
    source: input.source ?? "dashboard",
    sortOrder: input.sortOrder ?? 0,
    createdAt: new Date(),
  };

  const result = await collection.insertOne(doc);
  if (!result.insertedId) {
    throw new Error("Failed to save project.");
  }

  return serializeProject({ ...doc, _id: result.insertedId });
}

export async function deleteDbProject(id: string): Promise<boolean> {
  const collection = dbConnect<ProjectDocument>(PROJECTS_COLLECTION_NAME);
  const result = await collection.deleteOne({ id });
  return result.deletedCount === 1;
}

export type UpdateDbProjectInput = {
  id: string;
  title: string;
  description: string;
  image?: string;
  githubLink: string;
  liveLink: string | null;
  technologies: string[];
  subtitle: string;
  overview: string;
  features: string[];
  details: ProjectDocument["details"];
  stack: Record<string, string[]>;
  gallery?: string[];
};

export async function updateDbProject(
  input: UpdateDbProjectInput
): Promise<ProjectCardData> {
  const collection = dbConnect<ProjectDocument>(PROJECTS_COLLECTION_NAME);
  const existing = await collection.findOne({ id: input.id });
  if (!existing) {
    throw new Error("Project not found.");
  }

  const update: Partial<ProjectDocument> = {
    title: input.title,
    description: input.description,
    githubLink: input.githubLink,
    liveLink: input.liveLink,
    technologies: input.technologies,
    subtitle: input.subtitle,
    overview: input.overview,
    features: input.features,
    details: input.details,
    stack: input.stack,
    updatedAt: new Date(),
  };

  if (input.image) {
    update.image = input.image;
  }

  if (input.gallery !== undefined) {
    update.gallery = input.gallery.length
      ? input.gallery
      : [input.image || existing.image];
  }

  const result = await collection.findOneAndUpdate(
    { id: input.id },
    { $set: update },
    { returnDocument: "after" }
  );

  if (!result) {
    throw new Error("Failed to update project.");
  }

  return serializeProject(result);
}
