import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetails from "@/components/projects/ProjectDetails/ProjectDetails";
import { singleProjectDitails } from "@/lib/projects/Projects";

type PageProps = {
  params: Promise<{ name: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { name } = await params;
  const project = singleProjectDitails(name);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { name } = await params;
  const project = singleProjectDitails(name);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto min-h-[calc(100vh-5rem)] px-4 pt-6">
      <ProjectDetails project={project} />
    </div>
  );
}
