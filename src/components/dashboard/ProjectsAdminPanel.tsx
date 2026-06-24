"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ImagePlus, Loader2, Pencil, Trash2 } from "lucide-react";
import {
  adminAuthHeaders,
  clearAdminToken,
} from "@/lib/admin-session";
import type { AdminProjectsResponse } from "@/app/api/admin/projects/route";
import type { ProjectCardData } from "@/lib/projects/types";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

type ProjectMutationResponse = {
  success: boolean;
  message?: string;
  project?: ProjectCardData;
};

function technologiesToString(technologies: string[]): string {
  return technologies.join(", ");
}

export default function ProjectsAdminPanel() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const editFileInputRef = React.useRef<HTMLInputElement>(null);

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [githubLink, setGithubLink] = React.useState("");
  const [liveLink, setLiveLink] = React.useState("");
  const [technologies, setTechnologies] = React.useState("");
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [formSuccess, setFormSuccess] = React.useState<string | null>(null);

  const [editOpen, setEditOpen] = React.useState(false);
  const [editingProject, setEditingProject] =
    React.useState<ProjectCardData | null>(null);
  const [editTitle, setEditTitle] = React.useState("");
  const [editDescription, setEditDescription] = React.useState("");
  const [editGithubLink, setEditGithubLink] = React.useState("");
  const [editLiveLink, setEditLiveLink] = React.useState("");
  const [editTechnologies, setEditTechnologies] = React.useState("");
  const [editImageFile, setEditImageFile] = React.useState<File | null>(null);
  const [editPreviewUrl, setEditPreviewUrl] = React.useState<string | null>(null);
  const [editError, setEditError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  React.useEffect(() => {
    if (!editImageFile) {
      setEditPreviewUrl(editingProject?.image ?? null);
      return;
    }
    const url = URL.createObjectURL(editImageFile);
    setEditPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [editImageFile, editingProject?.image]);

  const { data, isLoading, isError, error } = useQuery<AdminProjectsResponse>({
    queryKey: ["admin-projects"],
    queryFn: async () => {
      const res = await fetch("/api/admin/projects", {
        headers: {
          ...adminAuthHeaders(),
        },
      });
      const json = (await res.json()) as AdminProjectsResponse;

      if (res.status === 401) {
        clearAdminToken();
        router.replace("/dashboard/login");
        throw new Error("Session expired. Please sign in again.");
      }

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to load projects");
      }

      return json;
    },
  });

  const handleAuthError = (res: Response) => {
    if (res.status === 401) {
      clearAdminToken();
      router.replace("/dashboard/login");
      throw new Error("Session expired. Please sign in again.");
    }
  };

  const addMutation = useMutation({
    mutationFn: async () => {
      if (!imageFile) {
        throw new Error("Please select a project image.");
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("githubLink", githubLink);
      formData.append("liveLink", liveLink);
      formData.append("technologies", technologies);
      formData.append("image", imageFile);

      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: {
          ...adminAuthHeaders(),
        },
        body: formData,
      });

      const json = (await res.json()) as ProjectMutationResponse;
      handleAuthError(res);

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to add project");
      }

      return json;
    },
    onSuccess: (json) => {
      setFormSuccess(json.message || "Project added.");
      setFormError(null);
      setTitle("");
      setDescription("");
      setGithubLink("");
      setLiveLink("");
      setTechnologies("");
      setImageFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      queryClient.invalidateQueries({ queryKey: ["public-projects"] });
    },
    onError: (err) => {
      setFormSuccess(null);
      setFormError(err instanceof Error ? err.message : "Failed to add project");
    },
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      if (!editingProject) {
        throw new Error("No project selected.");
      }

      const formData = new FormData();
      formData.append("id", editingProject.id);
      formData.append("title", editTitle);
      formData.append("description", editDescription);
      formData.append("githubLink", editGithubLink);
      formData.append("liveLink", editLiveLink);
      formData.append("technologies", editTechnologies);
      if (editImageFile) {
        formData.append("image", editImageFile);
      }

      const res = await fetch("/api/admin/projects", {
        method: "PATCH",
        headers: {
          ...adminAuthHeaders(),
        },
        body: formData,
      });

      const json = (await res.json()) as ProjectMutationResponse;
      handleAuthError(res);

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to update project");
      }

      return json;
    },
    onSuccess: () => {
      setEditOpen(false);
      setEditingProject(null);
      setEditImageFile(null);
      if (editFileInputRef.current) editFileInputRef.current.value = "";
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      queryClient.invalidateQueries({ queryKey: ["public-projects"] });
    },
    onError: (err) => {
      setEditError(
        err instanceof Error ? err.message : "Failed to update project"
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(
        `/api/admin/projects?id=${encodeURIComponent(id)}`,
        {
          method: "DELETE",
          headers: {
            ...adminAuthHeaders(),
          },
        }
      );
      const json = (await res.json()) as { success: boolean; message?: string };

      handleAuthError(res);

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to delete project");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      queryClient.invalidateQueries({ queryKey: ["public-projects"] });
    },
  });

  const projects = data?.projects ?? [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);
    addMutation.mutate();
  };

  const openEditDialog = (project: ProjectCardData) => {
    setEditingProject(project);
    setEditTitle(project.title);
    setEditDescription(project.description);
    setEditGithubLink(project.githubLink === "#" ? "" : project.githubLink);
    setEditLiveLink(project.liveLink ?? "");
    setEditTechnologies(technologiesToString(project.technologies));
    setEditImageFile(null);
    setEditError(null);
    setEditOpen(true);
  };

  const closeEditDialog = () => {
    setEditOpen(false);
    setEditingProject(null);
    setEditImageFile(null);
    setEditError(null);
    if (editFileInputRef.current) editFileInputRef.current.value = "";
  };

  return (
    <Stack spacing={3}>
      <Card elevation={0}>
        <Box sx={{ px: 3, py: 2, borderBottom: 1, borderColor: "divider" }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Add new project
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Image uploads to ImageKit. Project appears on the site after save.
          </Typography>
        </Box>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Technologies"
                  placeholder="React, Node.js, MongoDB"
                  value={technologies}
                  onChange={(e) => setTechnologies(e.target.value)}
                  helperText="Comma-separated"
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  multiline
                  minRows={3}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="GitHub link"
                  value={githubLink}
                  onChange={(e) => setGithubLink(e.target.value)}
                  placeholder="https://github.com/..."
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Live demo link"
                  value={liveLink}
                  onChange={(e) => setLiveLink(e.target.value)}
                  placeholder="https://..."
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Stack spacing={1.5}>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<ImagePlus size={18} />}
                  >
                    {imageFile ? "Change image" : "Upload project image"}
                    <input
                      ref={fileInputRef}
                      type="file"
                      hidden
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      onChange={(e) => {
                        const file = e.target.files?.[0] ?? null;
                        setImageFile(file);
                      }}
                    />
                  </Button>
                  {previewUrl && (
                    <Box
                      component="img"
                      src={previewUrl}
                      alt="Preview"
                      sx={{
                        width: "100%",
                        maxWidth: 360,
                        height: 200,
                        objectFit: "cover",
                        borderRadius: 2,
                        border: 1,
                        borderColor: "divider",
                      }}
                    />
                  )}
                </Stack>
              </Grid>
            </Grid>

            {formError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {formError}
              </Alert>
            )}
            {formSuccess && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {formSuccess}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3 }}
              disabled={addMutation.isPending}
              startIcon={
                addMutation.isPending ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : undefined
              }
            >
              {addMutation.isPending ? "Saving..." : "Add project"}
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Card elevation={0}>
        <Box sx={{ px: 3, py: 2, borderBottom: 1, borderColor: "divider" }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Dashboard projects
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {projects.length} project{projects.length === 1 ? "" : "s"} from database
          </Typography>
        </Box>

        {isLoading ? (
          <Box sx={{ p: 6, display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : isError ? (
          <Box sx={{ p: 3 }}>
            <Alert severity="error">
              {error instanceof Error ? error.message : "Failed to load projects"}
            </Alert>
          </Box>
        ) : projects.length === 0 ? (
          <Box sx={{ p: 6, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              No dashboard projects yet. Add one above.
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Technologies</TableCell>
                  <TableCell>Links</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>
                        {project.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        /projects/{project.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.5 }}>
                        {project.technologies.slice(0, 4).map((tech) => (
                          <Chip key={tech} label={tech} size="small" />
                        ))}
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack spacing={0.5}>
                        {project.liveLink && (
                          <Typography
                            component="a"
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="caption"
                            color="primary"
                          >
                            Live
                          </Typography>
                        )}
                        {project.githubLink && project.githubLink !== "#" && (
                          <Typography
                            component="a"
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="caption"
                            color="text.secondary"
                          >
                            GitHub
                          </Typography>
                        )}
                      </Stack>
                    </TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end" }}>
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<Pencil size={14} />}
                          onClick={() => openEditDialog(project)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          variant="outlined"
                          startIcon={<Trash2 size={14} />}
                          disabled={deleteMutation.isPending}
                          onClick={() => {
                            if (confirm(`Delete "${project.title}"?`)) {
                              deleteMutation.mutate(project.id);
                            }
                          }}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>

      <Dialog open={editOpen} onClose={closeEditDialog} fullWidth maxWidth="md">
        <DialogTitle sx={{ fontWeight: 700 }}>Edit project</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <TextField
              label="Title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Technologies"
              value={editTechnologies}
              onChange={(e) => setEditTechnologies(e.target.value)}
              helperText="Comma-separated"
              fullWidth
            />
            <TextField
              label="Description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              required
              multiline
              minRows={3}
              fullWidth
            />
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="GitHub link"
                  value={editGithubLink}
                  onChange={(e) => setEditGithubLink(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Live demo link"
                  value={editLiveLink}
                  onChange={(e) => setEditLiveLink(e.target.value)}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Stack spacing={1.5}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<ImagePlus size={18} />}
              >
                {editImageFile ? "Change image" : "Replace image (optional)"}
                <input
                  ref={editFileInputRef}
                  type="file"
                  hidden
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    setEditImageFile(file);
                  }}
                />
              </Button>
              {editPreviewUrl && (
                <Box
                  component="img"
                  src={editPreviewUrl}
                  alt="Project preview"
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    height: 200,
                    objectFit: "cover",
                    borderRadius: 2,
                    border: 1,
                    borderColor: "divider",
                  }}
                />
              )}
            </Stack>
            {editError && <Alert severity="error">{editError}</Alert>}
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={closeEditDialog}>Cancel</Button>
          <Button
            variant="contained"
            disabled={updateMutation.isPending}
            onClick={() => {
              setEditError(null);
              updateMutation.mutate();
            }}
            startIcon={
              updateMutation.isPending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : undefined
            }
          >
            {updateMutation.isPending ? "Saving..." : "Save changes"}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
