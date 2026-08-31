import ProjectCard from "@/components/projects/ProjectCard/ProjectCard";
import { getMergedProjects } from "@/lib/projects/get-projects";
import PageHeader from "@/components/projects/PageHeaders/PageHeaders";
import FinalSection from "@/components/home/FinalSection/FinalSection";

export default async function ProjectsPage() {
  const projects = await getMergedProjects();

  return (
    <div className="min-h-[calc(100vh-5rem)]">
      <PageHeader />
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* simple footer */}
      <FinalSection />
      

    </div>
  );
}