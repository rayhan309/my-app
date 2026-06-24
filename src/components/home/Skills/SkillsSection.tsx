"use client";

import SkillsGrid from "./SkillsGrid";
import { JSX } from "react";
import Box from "@mui/material/Box";
import SectionHeading from "@/components/ui/SectionHeading";

export default function SkillsSection(): JSX.Element {
  return (
    <Box component="section" id="skills" data-reveal sx={{ py: 10, position: "relative", overflow: "hidden" }}>
      <Box className="container mx-auto px-4">
        <SectionHeading
          eyebrow="My Technical Arsenal"
          title={
            <>
              Skills & <Box component="span" sx={{ color: "text.secondary" }}>Expertise.</Box>
            </>
          }
          description="A comprehensive set of tools and technologies I've mastered over the years to build robust, scalable, and secure digital products."
        />
        <SkillsGrid />
      </Box>
    </Box>
  );
}
