"use client";

import SkillsGrid from "./SkillsGrid";
import { JSX } from "react";
import Box from "@mui/material/Box";
import SectionHeading from "@/components/ui/SectionHeading";

export default function SkillsSection(): JSX.Element {
  return (
    <Box component="section" id="skills" data-reveal sx={{ py: { xs: 10, md: 16 } }}>
      <SectionHeading
          eyebrow="Capabilities"
          title="A focused stack, used in production."
          description="Tools I reach for when the work has to ship, scale, and stay maintainable."
        />
        <SkillsGrid />
    </Box>
  );
}
