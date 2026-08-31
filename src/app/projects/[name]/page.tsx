import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetails from "@/components/projects/ProjectDetails/ProjectDetails";
import { getProjectDetailById } from "@/lib/projects/get-projects";

type PageProps = {
  params: Promise<{ name: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { name } = await params;
  const project = await getProjectDetailById(name);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { name } = await params;
  const project = await getProjectDetailById(name);

  if (!project) {
    notFound();
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] pt-8">
      <ProjectDetails project={project} />
    </div>
  );
};
