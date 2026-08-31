import type { ProjectAdminData, ProjectDetailsMeta } from "@/lib/projects/types";

export type ProjectFormValues = {
  title: string;
  subtitle: string;
  description: string;
  overview: string;
  githubLink: string;
  liveLink: string;
  technologies: string;
  features: string;
  client: string;
  duration: string;
  role: string;
  category: string;
  stackFrontend: string;
  stackBackend: string;
  stackDeployment: string;
  stackExtra: string;
};

const CORE_STACK_KEYS = new Set(["frontend", "backend", "deployment"]);

export function emptyProjectFormValues(): ProjectFormValues {
  return {
    title: "",
    subtitle: "",
    description: "",
    overview: "",
    githubLink: "",
    liveLink: "",
    technologies: "",
    features: "",
    client: "",
    duration: "",
    role: "",
    category: "",
    stackFrontend: "",
    stackBackend: "",
    stackDeployment: "",
    stackExtra: "",
  };
}

export function parseCommaList(raw: string): string[] {
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function parseLineList(raw: string): string[] {
  return raw
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function buildStackFromForm(values: Pick<
  ProjectFormValues,
  "stackFrontend" | "stackBackend" | "stackDeployment" | "stackExtra"
>): Record<string, string[]> {
  const stack: Record<string, string[]> = {};
  const frontend = parseCommaList(values.stackFrontend);
  const backend = parseCommaList(values.stackBackend);
  const deployment = parseCommaList(values.stackDeployment);

  if (frontend.length) stack.frontend = frontend;
  if (backend.length) stack.backend = backend;
  if (deployment.length) stack.deployment = deployment;

  for (const line of parseLineList(values.stackExtra)) {
    const separator = line.indexOf(":");
    if (separator <= 0) continue;
    const key = line
      .slice(0, separator)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");
    const items = parseCommaList(line.slice(separator + 1));
    if (key && items.length) stack[key] = items;
  }

  return stack;
}

export function detailsFromForm(values: ProjectFormValues): ProjectDetailsMeta {
  return {
    client: values.client.trim() || "Portfolio Project",
    duration: values.duration.trim() || "—",
    role: values.role.trim() || "Full-stack Engineer",
    category: values.category.trim() || "Web Application",
  };
}

export function extraStackToText(stack: Record<string, string[]>): string {
  return Object.entries(stack)
    .filter(([key]) => !CORE_STACK_KEYS.has(key))
    .map(([key, items]) => `${key}: ${items.join(", ")}`)
    .join("\n");
}

export function projectToFormValues(project: ProjectAdminData): ProjectFormValues {
  const stack = project.stack ?? {};
  return {
    title: project.title,
    subtitle: project.subtitle ?? "",
    description: project.description,
    overview: project.overview ?? "",
    githubLink: project.githubLink === "#" ? "" : project.githubLink,
    liveLink: project.liveLink ?? "",
    technologies: project.technologies.join(", "),
    features: (project.features ?? []).join("\n"),
    client: project.details?.client ?? "",
    duration: project.details?.duration ?? "",
    role: project.details?.role ?? "",
    category: project.details?.category ?? "",
    stackFrontend: (stack.frontend ?? project.technologies).join(", "),
    stackBackend: (stack.backend ?? []).join(", "),
    stackDeployment: (stack.deployment ?? []).join(", "),
    stackExtra: extraStackToText(stack),
  };
}

export function appendProjectFormFields(
  formData: FormData,
  values: ProjectFormValues
): void {
  formData.append("title", values.title);
  formData.append("subtitle", values.subtitle);
  formData.append("description", values.description);
  formData.append("overview", values.overview);
  formData.append("githubLink", values.githubLink);
  formData.append("liveLink", values.liveLink);
  formData.append("technologies", values.technologies);
  formData.append("features", values.features);
  formData.append("client", values.client);
  formData.append("duration", values.duration);
  formData.append("role", values.role);
  formData.append("category", values.category);
  formData.append("stackFrontend", values.stackFrontend);
  formData.append("stackBackend", values.stackBackend);
  formData.append("stackDeployment", values.stackDeployment);
  formData.append("stackExtra", values.stackExtra);
}
