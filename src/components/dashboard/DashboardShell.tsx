"use client";

import React from "react";
import Link from "next/link";
import {
  Calendar,
  ExternalLink,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Menu,
  type LucideIcon,
} from "lucide-react";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

const DRAWER_WIDTH = 272;

export type DashboardNavId = "bookings" | "projects";

const NAV_ITEMS: {
  id: DashboardNavId;
  label: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    id: "bookings",
    label: "Bookings",
    description: "Meetings & leads",
    icon: Calendar,
  },
  {
    id: "projects",
    label: "Projects",
    description: "Portfolio work",
    icon: FolderKanban,
  },
];

type DashboardShellProps = {
  activeNav: DashboardNavId;
  onNavChange: (id: DashboardNavId) => void;
  onLogout: () => void;
  actions?: React.ReactNode;
  children: React.ReactNode;
};

function SidebarBrand() {
  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", px: 2.5, py: 2.25 }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: 2,
          display: "grid",
          placeItems: "center",
          bgcolor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        <LayoutDashboard size={20} />
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
          Admin
        </Typography>
        <Typography variant="caption" color="text.secondary" noWrap>
          Portfolio console
        </Typography>
      </Box>
    </Stack>
  );
}

function SidebarNav({
  activeNav,
  onNavChange,
  onNavigate,
}: {
  activeNav: DashboardNavId;
  onNavChange: (id: DashboardNavId) => void;
  onNavigate?: () => void;
}) {
  return (
    <List sx={{ px: 1.5, py: 0.5 }}>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          display: "block",
          px: 1.5,
          pb: 1,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        Workspace
      </Typography>
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const selected = activeNav === item.id;
        return (
          <ListItemButton
            key={item.id}
            selected={selected}
            onClick={() => {
              onNavChange(item.id);
              onNavigate?.();
            }}
            sx={{
              mb: 0.5,
              borderRadius: 2,
              py: 1.1,
              "&.Mui-selected": {
                bgcolor: "action.selected",
                "&:hover": { bgcolor: "action.selected" },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: selected ? "primary.main" : "text.secondary" }}>
              <Icon size={18} />
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              secondary={item.description}
              slotProps={{
                primary: {
                  sx: { fontWeight: selected ? 800 : 600, fontSize: "0.9rem" },
                },
                secondary: { sx: { fontSize: "0.7rem" } },
              }}
            />
          </ListItemButton>
        );
      })}
    </List>
  );
}

function SidebarFooter({ onLogout }: { onLogout: () => void }) {
  return (
    <Box sx={{ px: 1.5, pb: 2, mt: "auto" }}>
      <Divider sx={{ mb: 1.5 }} />
      <Stack
        direction="row"
        spacing={1.25}
        sx={{
          alignItems: "center",
          px: 1,
          py: 1,
          borderRadius: 2,
        }}
      >
        <Avatar sx={{ width: 36, height: 36, bgcolor: "primary.main", fontSize: 13, fontWeight: 800 }}>
          AR
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="body2" sx={{ fontWeight: 700 }} noWrap>
            Abu Rayhan
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            Administrator
          </Typography>
        </Box>
        <Tooltip title="Sign out">
          <IconButton size="small" onClick={onLogout} aria-label="Sign out">
            <LogOut size={16} />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
}

function SidebarContent({
  activeNav,
  onNavChange,
  onLogout,
  onNavigate,
}: {
  activeNav: DashboardNavId;
  onNavChange: (id: DashboardNavId) => void;
  onLogout: () => void;
  onNavigate?: () => void;
}) {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
    >
      <SidebarBrand />
      <Divider />
      <Box sx={{ flex: 1, overflow: "auto", py: 1.5 }}>
        <SidebarNav activeNav={activeNav} onNavChange={onNavChange} onNavigate={onNavigate} />
      </Box>
      <SidebarFooter onLogout={onLogout} />
    </Box>
  );
}

export default function DashboardShell({
  activeNav,
  onNavChange,
  onLogout,
  actions,
  children,
}: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const activeItem = NAV_ITEMS.find((item) => item.id === activeNav) ?? NAV_ITEMS[0];

  const closeMobile = () => setMobileOpen(false);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          ml: { md: `${DRAWER_WIDTH}px` },
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
          backdropFilter: "none",
        }}
      >
        <Toolbar sx={{ gap: 1.5, minHeight: { xs: 64, md: 72 } }}>
          <IconButton
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ display: { md: "none" } }}
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </IconButton>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }} noWrap>
              {activeItem.label}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {activeItem.description}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            {actions}
            <Tooltip title="View site">
              <IconButton component={Link} href="/" aria-label="View public site">
                <ExternalLink size={18} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Sign out">
              <IconButton
                onClick={onLogout}
                aria-label="Sign out"
                sx={{ display: { md: "none" } }}
              >
                <LogOut size={18} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={closeMobile}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
              borderRight: 1,
              borderColor: "divider",
              bgcolor: "background.paper",
              backgroundImage: "none",
              backdropFilter: "none",
            },
          }}
        >
          <SidebarContent
            activeNav={activeNav}
            onNavChange={onNavChange}
            onLogout={onLogout}
            onNavigate={closeMobile}
          />
        </Drawer>
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
              borderRight: 1,
              borderColor: "divider",
              bgcolor: "background.paper",
              backgroundImage: "none",
              backdropFilter: "none",
            },
          }}
        >
          <SidebarContent activeNav={activeNav} onNavChange={onNavChange} onLogout={onLogout} />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          minWidth: 0,
          minHeight: "100vh",
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 64, md: 72 } }} />
        <Box sx={{ px: { xs: 2, sm: 3, lg: 4 }, py: { xs: 2.5, md: 3.5 }, maxWidth: 1440, mx: "auto" }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
