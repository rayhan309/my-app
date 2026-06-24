"use client";

import React, { useState, useEffect, JSX } from "react";
import { flushSync } from "react-dom";
import {
  Home,
  User,
  Code,
  Briefcase,
  Mail,
  Menu,
  X,
  Sun,
  Moon,
  Send,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { getScrollY, scrollToHash } from "@/lib/smooth-scroll";

registerGsapPlugins();

declare global {
  interface Document {
    startViewTransition(callback: () => void): {
      ready: Promise<void>;
      finished: Promise<void>;
      updateCallbackDone: Promise<void>;
    };
  }
}

const navItems = [
  { name: "Home", href: "/#", icon: Home },
  { name: "About", href: "/#about", icon: User },
  { name: "Skills", href: "/#skills", icon: Code },
  { name: "Projects", href: "/#projects", icon: Briefcase },
  { name: "Contact", href: "/#contact", icon: Mail },
];

export default function Navbar(): JSX.Element {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateScrolled = () => {
      setScrolled(getScrollY() > 20);
    };

    updateScrolled();
    gsap.ticker.add(updateScrolled);

    return () => {
      gsap.ticker.remove(updateScrolled);
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (!href.includes("#")) return;

    const onHome = window.location.pathname === "/";
    if (!onHome) return;

    e.preventDefault();
    const hash = href.includes("#") ? `#${href.split("#")[1]}` : "#";
    scrollToHash(hash);
    setMobileMenuOpen(false);
  };

  const toggleTheme = (e: React.MouseEvent) => {
    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(theme === "dark" ? "light" : "dark");
      return;
    }

    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const nextTheme = theme === "dark" ? "light" : "dark";

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: "ease-in-out",
          fill: "forwards",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        sx={{
          borderBottom: scrolled ? 1 : 0,
          borderColor: "divider",
          bgcolor: scrolled ? "background.paper" : "transparent",
          py: scrolled ? 0.25 : 0.75,
          transition: "all 0.3s ease",
        }}
      >
        <Box className="container mx-auto px-4">
          <Toolbar disableGutters sx={{ justifyContent: "space-between", gap: 2 }}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Abu Rayhan
              </Typography>
            </Link>

            <Stack
              direction="row"
              spacing={1}
              sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
            >
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  component="a"
                  href={item.href}
                  onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                    handleNavClick(e, item.href)
                  }
                  color="inherit"
                  startIcon={<item.icon size={16} />}
                  sx={{
                    color: "text.secondary",
                    fontWeight: 600,
                    "&:hover": { color: "text.primary", bgcolor: "action.hover" },
                  }}
                >
                  {item.name}
                </Button>
              ))}

              <IconButton onClick={toggleTheme} color="inherit" aria-label="Toggle theme">
                {mounted && (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />)}
              </IconButton>

              <Button
                variant="contained"
                color="primary"
                startIcon={<Send size={16} />}
                href="/booking-meeting"
                component="a"
              >
                Book a Meeting
              </Button>
            </Stack>

            <Stack direction="row" spacing={1} sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton onClick={toggleTheme} color="inherit" aria-label="Toggle theme">
                {mounted && (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />)}
              </IconButton>
              <IconButton
                onClick={() => setMobileMenuOpen(true)}
                color="inherit"
                aria-label="Open menu"
              >
                <Menu />
              </IconButton>
            </Stack>
          </Toolbar>
        </Box>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        PaperProps={{
          sx: {
            width: 300,
            bgcolor: "background.paper",
            borderLeft: 1,
            borderColor: "divider",
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
            Menu
          </Typography>
          <IconButton onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
            <X />
          </IconButton>
        </Box>
        <Divider />
        <List sx={{ px: 1, py: 2 }}>
          {navItems.map((item) => (
            <ListItemButton
              key={item.name}
              component="a"
              href={item.href}
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                handleNavClick(e, item.href)
              }
              sx={{ borderRadius: 2, mb: 0.5 }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <item.icon size={20} />
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          ))}
        </List>
        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="contained"
            href="/booking-meeting"
            component="a"
            startIcon={<Send size={16} />}
          >
            Book a Meeting
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
