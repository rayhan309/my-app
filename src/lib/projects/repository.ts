import type { WithId } from "mongodb";
import dbConnect from "@/lib/dbConnect";
import type { ProjectDocument, ProjectCardData } from "./types";

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
    source: "dashboard",
  };
}

export async function fetchDbProjects(): Promise<ProjectCardData[]> {
  if (!process.env.MONGO_DB_URI?.trim() || !process.env.MONGO_DB_NAME?.trim()) {
    return [];
  }

  const collection = dbConnect<ProjectDocument>(PROJECTS_COLLECTION_NAME);
  const rows = await collection.find({}).sort({ createdAt: -1 }).toArray();
  return rows.map(serializeProject);
}

export async function fetchDbProjectById(
  id: string
): Promise<WithId<ProjectDocument> | null> {
  if (!process.env.MONGO_DB_URI?.trim() || !process.env.MONGO_DB_NAME?.trim()) {
    return null;
  }

  const collection = dbConnect<ProjectDocument>(PROJECTS_COLLECTION_NAME);
  return collection.findOne({ id });
}

export async function createDbProject(
  input: Omit<ProjectDocument, "createdAt">
): Promise<ProjectCardData> {
  const collection = dbConnect<ProjectDocument>(PROJECTS_COLLECTION_NAME);
  const existing = await collection.findOne({ id: input.id });
  if (existing) {
    throw new Error("A project with this slug already exists.");
  }

  const doc: ProjectDocument = {
    ...input,
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
    updatedAt: new Date(),
  };

  if (input.image) {
    update.image = input.image;
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
