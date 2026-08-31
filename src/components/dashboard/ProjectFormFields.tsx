"use client";

import React from "react";
import type { ProjectFormValues } from "@/lib/projects/project-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { ImagePlus, X } from "lucide-react";

type ProjectFormFieldsProps = {
  values: ProjectFormValues;
  onChange: (patch: Partial<ProjectFormValues>) => void;
  coverLabel: string;
  coverInputRef: React.RefObject<HTMLInputElement | null>;
  onCoverFile: (file: File | null) => void;
  coverPreview: string | null;
  galleryInputRef: React.RefObject<HTMLInputElement | null>;
  onGalleryFiles: (files: FileList | null) => void;
  existingGallery: string[];
  onRemoveGalleryUrl: (url: string) => void;
  newGalleryPreviews: string[];
};

export default function ProjectFormFields({
  values,
  onChange,
  coverLabel,
  coverInputRef,
  onCoverFile,
  coverPreview,
  galleryInputRef,
  onGalleryFiles,
  existingGallery,
  onRemoveGalleryUrl,
  newGalleryPreviews,
}: ProjectFormFieldsProps) {
  const field = (key: keyof ProjectFormValues) => ({
    value: values[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange({ [key]: e.target.value }),
  });

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField label="Title" required fullWidth {...field("title")} />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          label="Subtitle"
          placeholder="Short case-study line"
          fullWidth
          {...field("subtitle")}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          label="Card description"
          required
          multiline
          minRows={3}
          fullWidth
          helperText="Shown on project cards and the details intro."
          {...field("description")}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          label="Challenge & approach"
          multiline
          minRows={4}
          fullWidth
          helperText="Longer case-study write-up for the details page."
          {...field("overview")}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          label="GitHub link"
          placeholder="https://github.com/..."
          fullWidth
          {...field("githubLink")}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          label="Live demo link"
          placeholder="https://..."
          fullWidth
          {...field("liveLink")}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          label="Client"
          placeholder="Fashion Museum BD"
          fullWidth
          {...field("client")}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          label="Timeline"
          placeholder="2 Months"
          fullWidth
          {...field("duration")}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          label="Role"
          placeholder="Senior Full-stack Engineer"
          fullWidth
          {...field("role")}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          label="Category"
          placeholder="E-commerce / Retail"
          fullWidth
          {...field("category")}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          label="Key features"
          multiline
          minRows={4}
          fullWidth
          helperText="One feature per line."
          {...field("features")}
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
          Tech stack
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          label="Card technologies"
          placeholder="React, Node.js, MongoDB"
          helperText="Comma-separated. Used on project cards."
          fullWidth
          {...field("technologies")}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField label="Frontend" placeholder="Next.js, MUI" fullWidth {...field("stackFrontend")} />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField label="Backend" placeholder="Node.js, MongoDB" fullWidth {...field("stackBackend")} />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField label="Deployment" placeholder="Vercel" fullWidth {...field("stackDeployment")} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <TextField
          label="Additional stack groups"
          placeholder={"language: Python\nai_frameworks: LangChain, OpenAI"}
          multiline
          minRows={2}
          fullWidth
          helperText="Optional. One group per line as name: item, item"
          {...field("stackExtra")}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Stack spacing={1.5}>
          <Button variant="outlined" component="label" startIcon={<ImagePlus size={18} />}>
            {coverLabel}
            <input
              ref={coverInputRef}
              type="file"
              hidden
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={(e) => onCoverFile(e.target.files?.[0] ?? null)}
            />
          </Button>
          {coverPreview && (
            <Box
              component="img"
              src={coverPreview}
              alt="Cover preview"
              sx={{
                width: "100%",
                height: 180,
                objectFit: "cover",
                borderRadius: 2,
                border: 1,
                borderColor: "divider",
              }}
            />
          )}
        </Stack>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Stack spacing={1.5}>
          <Button variant="outlined" component="label" startIcon={<ImagePlus size={18} />}>
            Add gallery screenshots
            <input
              ref={galleryInputRef}
              type="file"
              hidden
              multiple
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={(e) => onGalleryFiles(e.target.files)}
            />
          </Button>
          <Typography variant="caption" color="text.secondary">
            Up to 8 images. These appear on the project details page.
          </Typography>
          {(existingGallery.length > 0 || newGalleryPreviews.length > 0) && (
            <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
              {existingGallery.map((url) => (
                <Box key={url} sx={{ position: "relative", width: 88, height: 64 }}>
                  <Box
                    component="img"
                    src={url}
                    alt="Gallery"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: 1,
                      border: 1,
                      borderColor: "divider",
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => onRemoveGalleryUrl(url)}
                    aria-label="Remove screenshot"
                    sx={{
                      position: "absolute",
                      top: -8,
                      right: -8,
                      bgcolor: "background.paper",
                      boxShadow: 1,
                      "&:hover": { bgcolor: "background.paper" },
                    }}
                  >
                    <X size={12} />
                  </IconButton>
                </Box>
              ))}
              {newGalleryPreviews.map((url) => (
                <Box
                  key={url}
                  component="img"
                  src={url}
                  alt="New screenshot"
                  sx={{
                    width: 88,
                    height: 64,
                    objectFit: "cover",
                    borderRadius: 1,
                    border: 1,
                    borderColor: "primary.main",
                  }}
                />
              ))}
            </Stack>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}
