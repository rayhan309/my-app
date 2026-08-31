"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import {
  adminAuthHeaders,
  clearAdminToken,
} from "@/lib/admin-session";
import type { AdminProjectsResponse } from "@/app/api/admin/projects/route";
import type { ProjectAdminData } from "@/lib/projects/types";
import {
  appendProjectFormFields,
  emptyProjectFormValues,
  projectToFormValues,
  type ProjectFormValues,
} from "@/lib/projects/project-form";
import ProjectFormFields from "@/components/dashboard/ProjectFormFields";
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
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

type ProjectMutationResponse = {
  success: boolean;
  message?: string;
  project?: ProjectAdminData;
};

function useObjectUrls(files: File[]) {
  const [urls, setUrls] = React.useState<string[]>([]);

  React.useEffect(() => {
    const next = files.map((file) => URL.createObjectURL(file));
    setUrls(next);
    return () => next.forEach((url) => URL.revokeObjectURL(url));
  }, [files]);

  return urls;
}

export default function ProjectsAdminPanel() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const galleryInputRef = React.useRef<HTMLInputElement>(null);
  const editFileInputRef = React.useRef<HTMLInputElement>(null);
  const editGalleryInputRef = React.useRef<HTMLInputElement>(null);

  const [values, setValues] = React.useState<ProjectFormValues>(emptyProjectFormValues);
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = React.useState<File[]>([]);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [formSuccess, setFormSuccess] = React.useState<string | null>(null);

  const [editOpen, setEditOpen] = React.useState(false);
  const [editingProject, setEditingProject] = React.useState<ProjectAdminData | null>(null);
  const [editValues, setEditValues] = React.useState<ProjectFormValues>(emptyProjectFormValues);
  const [editImageFile, setEditImageFile] = React.useState<File | null>(null);
  const [editGalleryFiles, setEditGalleryFiles] = React.useState<File[]>([]);
  const [editGalleryUrls, setEditGalleryUrls] = React.useState<string[]>([]);
  const [editError, setEditError] = React.useState<string | null>(null);

  const coverPreview = useObjectUrls(imageFile ? [imageFile] : [])[0] ?? null;
  const galleryPreviews = useObjectUrls(galleryFiles);
  const editCoverPreview =
    useObjectUrls(editImageFile ? [editImageFile] : [])[0] ?? editingProject?.image ?? null;
  const editGalleryPreviews = useObjectUrls(editGalleryFiles);

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
        throw new Error("Please select a cover image.");
      }

      const formData = new FormData();
      appendProjectFormFields(formData, values);
      formData.append("image", imageFile);
      galleryFiles.forEach((file) => formData.append("gallery", file));

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
      setValues(emptyProjectFormValues());
      setImageFile(null);
      setGalleryFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (galleryInputRef.current) galleryInputRef.current.value = "";
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
      appendProjectFormFields(formData, editValues);
      formData.append("galleryUrls", editGalleryUrls.join(","));
      if (editImageFile) {
        formData.append("image", editImageFile);
      }
      editGalleryFiles.forEach((file) => formData.append("gallery", file));

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
      setEditGalleryFiles([]);
      if (editFileInputRef.current) editFileInputRef.current.value = "";
      if (editGalleryInputRef.current) editGalleryInputRef.current.value = "";
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      queryClient.invalidateQueries({ queryKey: ["public-projects"] });
    },
    onError: (err) => {
      setEditError(err instanceof Error ? err.message : "Failed to update project");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/projects?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: {
          ...adminAuthHeaders(),
        },
      });
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

  const openEditDialog = (project: ProjectAdminData) => {
    setEditingProject(project);
    setEditValues(projectToFormValues(project));
    setEditGalleryUrls(project.gallery ?? []);
    setEditImageFile(null);
    setEditGalleryFiles([]);
    setEditError(null);
    setEditOpen(true);
  };

  const closeEditDialog = () => {
    setEditOpen(false);
    setEditingProject(null);
    setEditImageFile(null);
    setEditGalleryFiles([]);
    setEditError(null);
    if (editFileInputRef.current) editFileInputRef.current.value = "";
    if (editGalleryInputRef.current) editGalleryInputRef.current.value = "";
  };

  return (
    <Stack spacing={3}>
      <Card elevation={0}>
        <Box sx={{ px: 3, py: 2, borderBottom: 1, borderColor: "divider" }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Add project
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Full case-study fields appear on the public project details page.
          </Typography>
        </Box>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            <ProjectFormFields
              values={values}
              onChange={(patch) => setValues((current) => ({ ...current, ...patch }))}
              coverLabel={imageFile ? "Change cover image" : "Upload cover image"}
              coverInputRef={fileInputRef}
              onCoverFile={setImageFile}
              coverPreview={coverPreview}
              galleryInputRef={galleryInputRef}
              onGalleryFiles={(list) => setGalleryFiles(list ? Array.from(list) : [])}
              existingGallery={[]}
              onRemoveGalleryUrl={() => undefined}
              newGalleryPreviews={galleryPreviews}
            />

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
            All projects
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {projects.length} project{projects.length === 1 ? "" : "s"} in the database
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
              No projects yet. Add one above.
            </Typography>
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Stack</TableCell>
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
                      <Typography variant="body2" color="text.secondary">
                        {project.details.category}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.5 }}>
                        {project.technologies.slice(0, 4).map((tech) => (
                          <Chip key={tech} label={tech} size="small" />
                        ))}
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

      <Dialog open={editOpen} onClose={closeEditDialog} fullWidth maxWidth="lg">
        <DialogTitle sx={{ fontWeight: 700 }}>Edit project details</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <ProjectFormFields
              values={editValues}
              onChange={(patch) => setEditValues((current) => ({ ...current, ...patch }))}
              coverLabel={editImageFile ? "Change cover image" : "Replace cover image (optional)"}
              coverInputRef={editFileInputRef}
              onCoverFile={setEditImageFile}
              coverPreview={editCoverPreview}
              galleryInputRef={editGalleryInputRef}
              onGalleryFiles={(list) =>
                setEditGalleryFiles(list ? Array.from(list) : [])
              }
              existingGallery={editGalleryUrls}
              onRemoveGalleryUrl={(url) =>
                setEditGalleryUrls((current) => current.filter((item) => item !== url))
              }
              newGalleryPreviews={editGalleryPreviews}
            />
            {editError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {editError}
              </Alert>
            )}
          </Box>
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
            {updateMutation.isPending ? "Saving..." : "Save details"}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
