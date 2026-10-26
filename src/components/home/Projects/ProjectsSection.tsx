"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import ProjectCard from "@/components/projects/ProjectCard/ProjectCard";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import SectionHeading from "@/components/ui/SectionHeading";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { ProjectCardData } from "@/lib/projects/types";
import { PUBLIC_PROJECTS_QUERY_KEY } from "@/lib/projects/query-keys";
import { scrollToHash } from "@/lib/smooth-scroll";

type ProjectsResponse = {
  success: boolean;
  projects: ProjectCardData[];
};

export default function ProjectsSection() {
  const [swiperInstance, setSwiperInstance] = React.useState<SwiperType | null>(null);
  const [activePageIndex, setActivePageIndex] = React.useState(0);

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

  const PROJECTS_PER_PAGE = 3;
  // Limit to exactly 10 projects for the homepage
  const displayProjects = (data?.projects ?? []).slice(0, 10);
  const totalProjects = displayProjects.length;

  // Chunk projects into pages of 3
  const projectPages = React.useMemo(() => {
    const pages: ProjectCardData[][] = [];
    for (let i = 0; i < displayProjects.length; i += PROJECTS_PER_PAGE) {
      pages.push(displayProjects.slice(i, i + PROJECTS_PER_PAGE));
    }
    return pages;
  }, [displayProjects]);

  const totalPages = Math.max(1, projectPages.length);
  const activePage = Math.min(totalPages, activePageIndex + 1);

  const firstVisible = totalProjects === 0 ? 0 : activePageIndex * PROJECTS_PER_PAGE + 1;
  const lastVisible = Math.min(
    (activePageIndex + 1) * PROJECTS_PER_PAGE,
    totalProjects
  );

  const scrollToProjectsTopOnMobile = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      scrollToHash("projects", 70);
    }
  };

  const handlePrev = () => {
    swiperInstance?.slidePrev();
    scrollToProjectsTopOnMobile();
  };

  const handleNext = () => {
    swiperInstance?.slideNext();
    scrollToProjectsTopOnMobile();
  };

  const handlePageClick = (pageNumber: number) => {
    if (!swiperInstance) return;
    swiperInstance.slideTo(pageNumber - 1);
    scrollToProjectsTopOnMobile();
  };

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
        <Box sx={{ width: "100%" }}>
          <Swiper
            className="projects-swiper"
            modules={[Autoplay, A11y]}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            rewind={true}
            speed={650}
            autoHeight={true}
            spaceBetween={32}
            slidesPerView={1}
            onSwiper={(swiper) => {
              setSwiperInstance(swiper);
              setActivePageIndex(swiper.realIndex ?? 0);
            }}
            onSlideChange={(swiper) => {
              setActivePageIndex(swiper.realIndex ?? 0);
            }}
            onTouchEnd={(swiper) => {
              if (Math.abs(swiper.touches.diff) > 40) {
                scrollToProjectsTopOnMobile();
              }
            }}
            grabCursor
            a11y={{
              prevSlideMessage: "Previous page",
              nextSlideMessage: "Next page",
            }}
          >
            {projectPages.map((pageProjects, pageIndex) => (
              <SwiperSlide key={pageIndex} style={{ height: "auto" }}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
                  {pageProjects.map((project, itemIndex) => {
                    const globalIndex = pageIndex * PROJECTS_PER_PAGE + itemIndex;
                    return (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        index={globalIndex}
                      />
                    );
                  })}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Bottom Navigation as per design (Mobile responsive) */}
          {totalProjects > 0 && (
            <div className="mt-10 sm:mt-14 flex flex-col items-center justify-center gap-2.5 sm:gap-3 px-2">
              <div className="flex items-center justify-center gap-1.5 sm:gap-3">
                {/* Prev Arrow */}
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous page"
                  className="group flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card/90 text-muted-foreground backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:text-primary active:scale-95"
                >
                  <ChevronLeft size={16} className="sm:w-[18px] sm:h-[18px] transition-transform group-hover:-translate-x-0.5" />
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-1.5 sm:gap-2.5">
                  {projectPages.map((_, i) => {
                    const page = i + 1;
                    const isActive = page === activePage;
                    return (
                      <button
                        key={page}
                        type="button"
                        onClick={() => handlePageClick(page)}
                        aria-label={`Go to page ${page}`}
                        className={`flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                          isActive
                            ? "font-bold text-primary-foreground shadow-[0_0_20px_rgba(228,201,160,0.35)] scale-105"
                            : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                        }`}
                        style={
                          isActive
                            ? {
                                background:
                                  "linear-gradient(135deg, #f5dfbe 0%, #e4c9a0 50%, #c9aa79 100%)",
                              }
                            : undefined
                        }
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                {/* Next Arrow */}
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next page"
                  className="group flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card/90 text-muted-foreground backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:bg-primary/10 hover:text-primary active:scale-95"
                >
                  <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px] transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>

              {/* Status info */}
              <p className="text-xs sm:text-sm font-medium tracking-wide text-muted-foreground text-center">
                Showing <span className="text-foreground/90 font-semibold">{firstVisible}–{lastVisible}</span> of <span className="text-foreground/90 font-semibold">{totalProjects}</span> projects
              </p>
            </div>
          )}
        </Box>
      )}
    </Box>
  );
}
