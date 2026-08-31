"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Calendar,
  CheckCircle2,
  Clock,
  RefreshCw,
  Search,
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
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import DashboardShell, {
  type DashboardNavId,
} from "@/components/dashboard/DashboardShell";
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

const cardSx = {
  height: "100%",
  "&:hover": {
    transform: "none",
    boxShadow: "none",
    borderColor: "divider",
  },
} as const;

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
    <Card elevation={0} sx={cardSx}>
      <CardContent sx={{ py: 2.25, "&:last-child": { pb: 2.25 } }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
              {label}
            </Typography>
            <Typography variant="h4" sx={{ mt: 0.5, fontWeight: 800, letterSpacing: "-0.03em" }}>
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
              bgcolor: "action.selected",
              color: "primary.main",
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
  const [nav, setNav] = React.useState<DashboardNavId>("bookings");
  const [query, setQuery] = React.useState("");

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
  const q = query.trim().toLowerCase();
  const filteredBookings = q
    ? bookings.filter((booking) => {
        const haystack = [
          booking.name,
          booking.email,
          booking.phone,
          booking.date,
          booking.notes,
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      })
    : bookings;

  return (
    <DashboardShell
      activeNav={nav}
      onNavChange={setNav}
      onLogout={handleLogout}
      actions={
        nav === "bookings" ? (
          <Button
            variant="outlined"
            size="small"
            onClick={() => refetch()}
            disabled={isFetching}
            startIcon={<RefreshCw size={16} className={isFetching ? "animate-spin" : ""} />}
          >
            Refresh
          </Button>
        ) : undefined
      }
    >
      {nav === "projects" ? (
        <ProjectsAdminPanel />
      ) : (
        <Stack spacing={3}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <StatCard label="Total bookings" value={stats.total} icon={Users} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <StatCard label="Upcoming" value={stats.upcoming} icon={Calendar} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <StatCard label="Past" value={stats.past} icon={Clock} />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <StatCard label="Marked" value={stats.marked} icon={CheckCircle2} />
            </Grid>
          </Grid>

          <Card elevation={0} sx={cardSx}>
            <Box
              sx={{
                px: 3,
                py: 2,
                borderBottom: 1,
                borderColor: "divider",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                justifyContent: "space-between",
                alignItems: { sm: "center" },
              }}
            >
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  All bookings
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {filteredBookings.length} of {bookings.length} record
                  {bookings.length === 1 ? "" : "s"}
                </Typography>
              </Box>
              <TextField
                size="small"
                placeholder="Search name, email, notes…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                sx={{ width: { xs: "100%", sm: 280 } }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search size={16} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
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
            ) : filteredBookings.length === 0 ? (
              <Box sx={{ p: 6, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary">
                  No bookings match “{query}”.
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
                    {filteredBookings.map((booking) => (
                      <TableRow
                        key={booking._id}
                        hover
                        sx={{
                          bgcolor: booking.marked ? "action.selected" : undefined,
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
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
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
        </Stack>
      )}
    </DashboardShell>
  );
}
