import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import HomePage from "@/components/home/HomePage";
import { getMergedProjects } from "@/lib/projects/get-projects";
import { PUBLIC_PROJECTS_QUERY_KEY } from "@/lib/projects/query-keys";

export default async function Home() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  try {
    const projects = await getMergedProjects();
    queryClient.setQueryData(PUBLIC_PROJECTS_QUERY_KEY, {
      success: true,
      projects,
    });
  } catch (error) {
    console.error("Failed to prefetch projects:", error);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePage />
    </HydrationBoundary>
  );
}
