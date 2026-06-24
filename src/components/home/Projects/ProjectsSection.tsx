"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import ProjectCard from "@/components/projects/ProjectCard/ProjectCard";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRight } from "lucide-react";
import type { ProjectCardData } from "@/lib/projects/types";

type ProjectsResponse = {
  success: boolean;
  projects: ProjectCardData[];
};

export default function ProjectsSection() {
  const { data, isLoading } = useQuery<ProjectsResponse>({
    queryKey: ["public-projects"],
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
    <Box component="section" id="projects" data-reveal sx={{ py: 10, position: "relative", overflow: "hidden" }}>
      <Box className="container mx-auto px-4">
        <SectionHeading
          eyebrow="My Recent Work"
          title={
            <>
              Featured <Box component="span" sx={{ color: "text.secondary" }}>Projects.</Box>
            </>
          }
          description="Explore my latest creations where design meets engineering. Each project is crafted with precision, performance, and user experience in mind."
        />

        {isLoading ? (
          <Stack sx={{ py: 8, alignItems: "center" }}>
            <CircularProgress />
          </Stack>
        ) : (
          <Grid container spacing={3}>
            {projects.map((project, index) => (
              <Grid key={project.id} size={{ xs: 12, md: 6, lg: 4 }}>
                <ProjectCard project={project} index={index} />
              </Grid>
            ))}
          </Grid>
        )}

        <Stack sx={{ mt: 8, alignItems: "center" }}>
          <Button
            component={Link}
            href="/projects"
            variant="outlined"
            endIcon={<ArrowRight size={16} />}
          >
            View All Projects
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
