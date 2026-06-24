import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { isImageKitConfigured, uploadProjectImage } from "@/lib/imagekit";
import {
  createDbProject,
  deleteDbProject,
  fetchDbProjects,
  slugifyTitle,
  updateDbProject,
} from "@/lib/projects/repository";
import type { ProjectCardData } from "@/lib/projects/types";

export type AdminProjectsResponse = {
  success: boolean;
  message?: string;
  projects: ProjectCardData[];
};

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

function parseTechnologies(raw: FormDataEntryValue | null): string[] {
  if (typeof raw !== "string") return [];
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export async function GET(req: Request) {
  const authError = requireAdmin(req);
  if (authError) return authError;

  try {
    const projects = await fetchDbProjects();
    return NextResponse.json({ success: true, projects });
  } catch (error) {
    console.error("Admin projects GET error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load projects.", projects: [] },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const authError = requireAdmin(req);
  if (authError) return authError;

  if (!isImageKitConfigured()) {
    return NextResponse.json(
      { success: false, message: "ImageKit is not configured." },
      { status: 503 }
    );
  }

  try {
    const formData = await req.formData();
    const title = String(formData.get("title") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const githubLink = String(formData.get("githubLink") ?? "").trim();
    const liveLinkRaw = String(formData.get("liveLink") ?? "").trim();
    const liveLink = liveLinkRaw || null;
    const technologies = parseTechnologies(formData.get("technologies"));
    const imageFile = formData.get("image");

    if (!title || !description) {
      return NextResponse.json(
        { success: false, message: "Title and description are required." },
        { status: 400 }
      );
    }

    if (!(imageFile instanceof File) || imageFile.size === 0) {
      return NextResponse.json(
        { success: false, message: "Project image is required." },
        { status: 400 }
      );
    }

    if (!ALLOWED_IMAGE_TYPES.has(imageFile.type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Only JPEG, PNG, WebP, or GIF images are allowed.",
        },
        { status: 400 }
      );
    }

    if (imageFile.size > MAX_IMAGE_BYTES) {
      return NextResponse.json(
        { success: false, message: "Image must be 5 MB or smaller." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const imageUrl = await uploadProjectImage(buffer, imageFile.name);
    const id = slugifyTitle(title);

    const project = await createDbProject({
      id,
      title,
      description,
      image: imageUrl,
      githubLink: githubLink || "#",
      liveLink,
      technologies,
    });

    return NextResponse.json({
      success: true,
      message: "Project added successfully.",
      project,
    });
  } catch (error) {
    console.error("Admin projects POST error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to add project.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const authError = requireAdmin(req);
  if (authError) return authError;

  try {
    const formData = await req.formData();
    const id = String(formData.get("id") ?? "").trim();
    const title = String(formData.get("title") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const githubLink = String(formData.get("githubLink") ?? "").trim();
    const liveLinkRaw = String(formData.get("liveLink") ?? "").trim();
    const liveLink = liveLinkRaw || null;
    const technologies = parseTechnologies(formData.get("technologies"));
    const imageFile = formData.get("image");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Project id is required." },
        { status: 400 }
      );
    }

    if (!title || !description) {
      return NextResponse.json(
        { success: false, message: "Title and description are required." },
        { status: 400 }
      );
    }

    let imageUrl: string | undefined;
    if (imageFile instanceof File && imageFile.size > 0) {
      if (!isImageKitConfigured()) {
        return NextResponse.json(
          { success: false, message: "ImageKit is not configured." },
          { status: 503 }
        );
      }

      if (!ALLOWED_IMAGE_TYPES.has(imageFile.type)) {
        return NextResponse.json(
          {
            success: false,
            message: "Only JPEG, PNG, WebP, or GIF images are allowed.",
          },
          { status: 400 }
        );
      }

      if (imageFile.size > MAX_IMAGE_BYTES) {
        return NextResponse.json(
          { success: false, message: "Image must be 5 MB or smaller." },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await imageFile.arrayBuffer());
      imageUrl = await uploadProjectImage(buffer, imageFile.name);
    }

    const project = await updateDbProject({
      id,
      title,
      description,
      image: imageUrl,
      githubLink: githubLink || "#",
      liveLink,
      technologies,
    });

    return NextResponse.json({
      success: true,
      message: "Project updated successfully.",
      project,
    });
  } catch (error) {
    console.error("Admin projects PATCH error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to update project.";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const authError = requireAdmin(req);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id")?.trim();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Project id is required." },
        { status: 400 }
      );
    }

    const deleted = await deleteDbProject(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Project not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted.",
    });
  } catch (error) {
    console.error("Admin projects DELETE error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete project." },
      { status: 500 }
    );
  }
}
