"use client";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Stack
      spacing={2}
      sx={{
        mb: { xs: 6, md: 8 },
        alignItems: centered ? "center" : "flex-start",
        textAlign: centered ? "center" : "left",
      }}
    >
      <Chip
        label={eyebrow}
        color="primary"
        variant="outlined"
        size="small"
        sx={{
          fontWeight: 700,
          letterSpacing: "0.12em",
          px: 0.5,
        }}
      />
      <Typography
        variant="h2"
        component="h2"
        className={jakartaSans.className}
        sx={{
          fontSize: { xs: "2.25rem", md: "3rem", lg: "3.5rem" },
          maxWidth: centered ? 900 : 720,
        }}
      >
        {title}
      </Typography>
      {description ? (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: centered ? 720 : 560, fontSize: "1.05rem" }}
        >
          {description}
        </Typography>
      ) : null}
    </Stack>
  );
}
