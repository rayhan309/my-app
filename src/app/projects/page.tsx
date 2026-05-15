import ProjectCard from "@/components/projects/ProjectCard/ProjectCard";
import { Allprojects } from "@/lib/projects/Projects";
import PageHeader from "@/components/projects/PageHeaders/PageHeaders";
import FinalSection from "@/components/home/FinalSection";

export default function ProjectsPage() {
  const projects = Allprojects;

  return (
    <div className="container mx-auto px-4 min-h-[calc(100vh-5rem)]">
      <PageHeader />
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {projects.map((project: any, index: number) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>

      {/* simple footer */}
      <FinalSection />
      

    </div>
  );
}