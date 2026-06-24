"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Calendar,
  CheckCircle2,
  Clock,
  LogOut,
  RefreshCw,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  adminAuthHeaders,
  clearAdminToken,
  getAdminToken,
} from "@/lib/admin-session";
import type { AdminBookingRow } from "@/app/api/admin/bookings/route";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import ProjectsAdminPanel from "@/components/dashboard/ProjectsAdminPanel";

type AdminBookingsResponse = {
  success: boolean;
  message?: string;
  bookings: AdminBookingRow[];
  stats?: {
    total: number;
    upcoming: number;
    past: number;
    marked: number;
  };
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function StatCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
  icon: LucideIcon;
}) {
  return (
    <Card elevation={0} sx={{ height: "100%" }}>
      <CardContent>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              {label}
            </Typography>
            <Typography variant="h4" sx={{ mt: 0.5, fontWeight: 800 }}>
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              display: "grid",
              placeItems: "center",
              bgcolor: "primary.main",
              color: "primary.contrastText",
              opacity: 0.9,
            }}
          >
            <Icon size={20} />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function DashboardClient() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [ready, setReady] = React.useState(false);
  const [tab, setTab] = React.useState(0);

  React.useEffect(() => {
    if (!getAdminToken()) {
      router.replace("/dashboard/login");
      return;
    }
    setReady(true);
  }, [router]);

  const { data, isLoading, isError, error, refetch, isFetching } =
    useQuery<AdminBookingsResponse>({
      queryKey: ["admin-bookings"],
      enabled: ready,
      queryFn: async () => {
        const res = await fetch("/api/admin/bookings", {
          headers: {
            "Content-Type": "application/json",
            ...adminAuthHeaders(),
          },
        });
        const json = (await res.json()) as AdminBookingsResponse;

        if (res.status === 401) {
          clearAdminToken();
          router.replace("/dashboard/login");
          throw new Error("Session expired. Please sign in again.");
        }

        if (!res.ok || !json.success) {
          throw new Error(json.message || "Failed to load bookings");
        }

        return json;
      },
    });

  const markMutation = useMutation({
    mutationFn: async ({
      id,
      marked,
    }: {
      id: string;
      marked: boolean;
    }) => {
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...adminAuthHeaders(),
        },
        body: JSON.stringify({ id, marked }),
      });
      const json = (await res.json()) as {
        success: boolean;
        message?: string;
      };

      if (res.status === 401) {
        clearAdminToken();
        router.replace("/dashboard/login");
        throw new Error("Session expired.");
      }

      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to update booking");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-bookings"] });
    },
  });

  const handleLogout = () => {
    clearAdminToken();
    router.replace("/dashboard/login");
  };

  if (!ready) {
    return (
      <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  const bookings = data?.bookings ?? [];
  const stats = data?.stats ?? { total: 0, upcoming: 0, past: 0, marked: 0 };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="sticky" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Dashboard
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Bookings & projects
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              onClick={() => refetch()}
              disabled={isFetching}
              startIcon={<RefreshCw size={16} className={isFetching ? "animate-spin" : ""} />}
            >
              Refresh
            </Button>
            <Button variant="contained" onClick={handleLogout} startIcon={<LogOut size={16} />}>
              Logout
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Stack spacing={3}>
          <Tabs
            value={tab}
            onChange={(_, value) => setTab(value)}
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tab label="Bookings" />
            <Tab label="Add Project" />
          </Tabs>

          {tab === 1 ? (
            <ProjectsAdminPanel />
          ) : (
            <>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 3 }}>
              <StatCard label="Total bookings" value={stats.total} icon={Users} />
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
              <StatCard label="Upcoming" value={stats.upcoming} icon={Calendar} />
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
              <StatCard label="Past" value={stats.past} icon={Clock} />
            </Grid>
            <Grid size={{ xs: 12, sm: 3 }}>
              <StatCard label="Marked" value={stats.marked} icon={CheckCircle2} />
            </Grid>
          </Grid>

          <Card elevation={0}>
            <Box sx={{ px: 3, py: 2, borderBottom: 1, borderColor: "divider", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                All bookings
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {bookings.length} record{bookings.length === 1 ? "" : "s"}
              </Typography>
            </Box>

            {isLoading ? (
              <Box sx={{ p: 6, display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : isError ? (
              <Box sx={{ p: 3 }}>
                <Alert severity="error">
                  {error instanceof Error ? error.message : "Failed to load data"}
                </Alert>
              </Box>
            ) : bookings.length === 0 ? (
              <Box sx={{ p: 6, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  No bookings yet.
                </Typography>
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">Mark</TableCell>
                      <TableCell>Client</TableCell>
                      <TableCell>Contact</TableCell>
                      <TableCell>Meeting</TableCell>
                      <TableCell>Notes</TableCell>
                      <TableCell>Booked</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow
                        key={booking._id}
                        hover
                        sx={{
                          bgcolor: booking.marked
                            ? "action.selected"
                            : undefined,
                        }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={booking.marked}
                            disabled={markMutation.isPending}
                            onChange={(_, checked) =>
                              markMutation.mutate({
                                id: booking._id,
                                marked: checked,
                              })
                            }
                            aria-label={`Mark booking for ${booking.name}`}
                          />
                        </TableCell>
                        <TableCell>
                          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                            <User size={16} />
                            <Typography variant="body2" sx={{ fontWeight: 700 }}>
                              {booking.name}
                            </Typography>
                            {booking.marked && (
                              <Chip
                                label="Marked"
                                size="small"
                                color="success"
                                variant="outlined"
                              />
                            )}
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Stack spacing={0.5}>
                            <Typography
                              component="a"
                              href={`mailto:${booking.email}`}
                              variant="body2"
                              color="text.secondary"
                              sx={{ textDecoration: "none", "&:hover": { color: "primary.main" } }}
                            >
                              {booking.email}
                            </Typography>
                            <Typography
                              component="a"
                              href={`tel:${booking.phone}`}
                              variant="body2"
                              color="text.secondary"
                              sx={{ textDecoration: "none", "&:hover": { color: "primary.main" } }}
                            >
                              {booking.phone}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {booking.date}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {booking.time12h} – {booking.meetingEnds12h}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ maxWidth: 280 }}>
                          <Typography variant="body2" color="text.secondary" sx={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                            {booking.notes || "—"}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {formatDate(booking.createdAt)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Card>
            </>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
