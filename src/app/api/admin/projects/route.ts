import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { isImageKitConfigured, uploadProjectImage } from "@/lib/imagekit";
import {
  createDbProject,
  deleteDbProject,
  fetchAdminProjects,
  slugifyTitle,
  updateDbProject,
} from "@/lib/projects/repository";
import type { ProjectAdminData } from "@/lib/projects/types";
import {
  buildStackFromForm,
  detailsFromForm,
  parseCommaList,
  parseLineList,
  type ProjectFormValues,
} from "@/lib/projects/project-form";

export type AdminProjectsResponse = {
  success: boolean;
  message?: string;
  projects: ProjectAdminData[];
};

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);
const MAX_GALLERY_IMAGES = 8;

function formString(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

function parseFormValues(formData: FormData): ProjectFormValues {
  return {
    title: formString(formData, "title"),
    subtitle: formString(formData, "subtitle"),
    description: formString(formData, "description"),
    overview: formString(formData, "overview"),
    githubLink: formString(formData, "githubLink"),
    liveLink: formString(formData, "liveLink"),
    technologies: formString(formData, "technologies"),
    features: String(formData.get("features") ?? ""),
    client: formString(formData, "client"),
    duration: formString(formData, "duration"),
    role: formString(formData, "role"),
    category: formString(formData, "category"),
    stackFrontend: formString(formData, "stackFrontend"),
    stackBackend: formString(formData, "stackBackend"),
    stackDeployment: formString(formData, "stackDeployment"),
    stackExtra: String(formData.get("stackExtra") ?? ""),
  };
}

function parseProjectFields(formData: FormData) {
  const values = parseFormValues(formData);
  const technologies = parseCommaList(values.technologies);
  const stack = buildStackFromForm(values);
  if (!Object.keys(stack).length && technologies.length) {
    stack.frontend = technologies;
  }

  return {
    title: values.title,
    subtitle: values.subtitle,
    description: values.description,
    overview: values.overview || values.description,
    githubLink: values.githubLink || "#",
    liveLink: values.liveLink || null,
    technologies,
    features: parseLineList(values.features),
    details: detailsFromForm(values),
    stack,
  };
}

function asImageFiles(entries: FormDataEntryValue[]): File[] {
  return entries.filter(
    (entry): entry is File => entry instanceof File && entry.size > 0
  );
}

function validateImageFile(file: File): string | null {
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
    return "Only JPEG, PNG, WebP, or GIF images are allowed.";
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return "Each image must be 5 MB or smaller.";
  }
  return null;
}

async function uploadFiles(files: File[]): Promise<string[]> {
  const urls: string[] = [];
  for (const file of files) {
    const error = validateImageFile(file);
    if (error) throw new Error(error);
    const buffer = Buffer.from(await file.arrayBuffer());
    urls.push(await uploadProjectImage(buffer, file.name));
  }
  return urls;
}

export async function GET(req: Request) {
  const authError = requireAdmin(req);
  if (authError) return authError;

  try {
    const projects = await fetchAdminProjects();
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
    const fields = parseProjectFields(formData);
    const imageFile = formData.get("image");
    const galleryFiles = asImageFiles(formData.getAll("gallery"));

    if (!fields.title || !fields.description) {
      return NextResponse.json(
        { success: false, message: "Title and description are required." },
        { status: 400 }
      );
    }

    if (!(imageFile instanceof File) || imageFile.size === 0) {
      return NextResponse.json(
        { success: false, message: "Cover image is required." },
        { status: 400 }
      );
    }

    const coverError = validateImageFile(imageFile);
    if (coverError) {
      return NextResponse.json({ success: false, message: coverError }, { status: 400 });
    }

    if (galleryFiles.length > MAX_GALLERY_IMAGES) {
      return NextResponse.json(
        { success: false, message: `Gallery can include up to ${MAX_GALLERY_IMAGES} images.` },
        { status: 400 }
      );
    }

    const imageUrl = await uploadProjectImage(
      Buffer.from(await imageFile.arrayBuffer()),
      imageFile.name
    );
    const galleryUrls = await uploadFiles(galleryFiles);
    const gallery = galleryUrls.length ? galleryUrls : [imageUrl];
    const id = slugifyTitle(fields.title);

    const project = await createDbProject({
      id,
      title: fields.title,
      description: fields.description,
      image: imageUrl,
      githubLink: fields.githubLink,
      liveLink: fields.liveLink,
      technologies: fields.technologies,
      subtitle: fields.subtitle || fields.title,
      overview: fields.overview,
      features: fields.features,
      details: fields.details,
      stack: fields.stack,
      gallery,
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
    const id = formString(formData, "id");
    const fields = parseProjectFields(formData);
    const imageFile = formData.get("image");
    const galleryFiles = asImageFiles(formData.getAll("gallery"));
    const keptGallery = parseCommaList(formString(formData, "galleryUrls"));

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Project id is required." },
        { status: 400 }
      );
    }

    if (!fields.title || !fields.description) {
      return NextResponse.json(
        { success: false, message: "Title and description are required." },
        { status: 400 }
      );
    }

    let imageUrl: string | undefined;
    const needsUpload =
      (imageFile instanceof File && imageFile.size > 0) || galleryFiles.length > 0;

    if (needsUpload && !isImageKitConfigured()) {
      return NextResponse.json(
        { success: false, message: "ImageKit is not configured." },
        { status: 503 }
      );
    }

    if (imageFile instanceof File && imageFile.size > 0) {
      const coverError = validateImageFile(imageFile);
      if (coverError) {
        return NextResponse.json({ success: false, message: coverError }, { status: 400 });
      }
      imageUrl = await uploadProjectImage(
        Buffer.from(await imageFile.arrayBuffer()),
        imageFile.name
      );
    }

    if (galleryFiles.length + keptGallery.length > MAX_GALLERY_IMAGES) {
      return NextResponse.json(
        { success: false, message: `Gallery can include up to ${MAX_GALLERY_IMAGES} images.` },
        { status: 400 }
      );
    }

    const uploadedGallery = galleryFiles.length ? await uploadFiles(galleryFiles) : [];
    const gallery = [...keptGallery, ...uploadedGallery];

    const project = await updateDbProject({
      id,
      title: fields.title,
      description: fields.description,
      image: imageUrl,
      githubLink: fields.githubLink,
      liveLink: fields.liveLink,
      technologies: fields.technologies,
      subtitle: fields.subtitle || fields.title,
      overview: fields.overview,
      features: fields.features,
      details: fields.details,
      stack: fields.stack,
      gallery,
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
