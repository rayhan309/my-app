"use client";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

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
  align = "left",
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
      <Typography
        variant="overline"
        sx={{
          color: "primary.main",
          letterSpacing: "0.22em",
          fontWeight: 500,
          fontSize: "0.7rem",
        }}
      >
        {eyebrow}
      </Typography>
      <Typography
        variant="h2"
        component="h2"
        className="font-display"
        sx={{
          fontSize: { xs: "2.4rem", md: "3.4rem", lg: "4rem" },
          maxWidth: centered ? 820 : 720,
          fontWeight: 400,
        }}
      >
        {title}
      </Typography>
      {description ? (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: centered ? 640 : 540, fontSize: "1.05rem" }}
        >
          {description}
        </Typography>
      ) : null}
    </Stack>
  );
}
