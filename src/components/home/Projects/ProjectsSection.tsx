"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import ProjectCard from "@/components/projects/ProjectCard/ProjectCard";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRight } from "lucide-react";
import type { ProjectCardData } from "@/lib/projects/types";
import { PUBLIC_PROJECTS_QUERY_KEY } from "@/lib/projects/query-keys";

type ProjectsResponse = {
  success: boolean;
  projects: ProjectCardData[];
};

export default function ProjectsSection() {
  const { data, isLoading } = useQuery<ProjectsResponse>({
    queryKey: PUBLIC_PROJECTS_QUERY_KEY,
    queryFn: async () => {
      const res = await fetch("/api/projects");
      const json = (await res.json()) as ProjectsResponse;
      if (!res.ok || !json.success) {
        throw new Error("Failed to load projects");
      }
      return json;
    },
  });

  const projects = (data?.projects ?? []).slice(0, 6);

  return (
    <Box component="section" id="projects" data-reveal sx={{ py: { xs: 10, md: 16 } }}>
      <Stack
          direction={{ xs: "column", md: "row" }}
          sx={{
            mb: { xs: 5, md: 8 },
            alignItems: { md: "flex-end" },
            justifyContent: "space-between",
            gap: 3,
          }}
        >
          <SectionHeading
            eyebrow="Selected work"
            title="Projects with a point of view."
            description="A short list of products where design, architecture, and shipping actually met."
          />
          <Button
            component={Link}
            href="/projects"
            variant="outlined"
            endIcon={<ArrowRight size={16} />}
            sx={{ mb: { md: 8 }, flexShrink: 0 }}
          >
            All projects
          </Button>
        </Stack>

        {isLoading ? (
          <Stack sx={{ py: 8, alignItems: "center" }}>
            <CircularProgress />
          </Stack>
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
    </Box>
  );
}
