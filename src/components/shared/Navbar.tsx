"use client";

import React, { useState, useEffect, JSX } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Container from "@/components/shared/Container";
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
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { gsap, registerGsapPlugins } from "@/lib/gsap";
import { getScrollY, scrollToHash } from "@/lib/smooth-scroll";

registerGsapPlugins();

const navItems = [
  { name: "Work", href: "/#projects" },
  { name: "About", href: "/#about" },
  { name: "Services", href: "/#services" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar(): JSX.Element {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
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
          py: 0.5,
          transition: "background-color 0.3s ease, border-color 0.3s ease",
        }}
      >
        <Container>
          <Toolbar disableGutters sx={{ justifyContent: "space-between", minHeight: 72 }}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <Typography
                className="font-display"
                sx={{
                  fontSize: "1.45rem",
                  color: "text.primary",
                  lineHeight: 1,
                }}
              >
                Abu Rayhan
              </Typography>
            </Link>

            <Stack
              direction="row"
              spacing={0.5}
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
                  sx={{
                    color: "text.secondary",
                    fontWeight: 500,
                    px: 1.5,
                    "&:hover": { color: "text.primary", bgcolor: "transparent" },
                  }}
                >
                  {item.name}
                </Button>
              ))}

              <Button
                variant="contained"
                color="primary"
                href="/booking-meeting"
                component="a"
                sx={{ ml: 1 }}
              >
                Book a call
              </Button>
            </Stack>

            <Stack direction="row" spacing={0.5} sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                onClick={() => setMobileMenuOpen(true)}
                color="inherit"
                aria-label="Open menu"
              >
                <Menu />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: 300,
              bgcolor: "background.default",
              borderLeft: 1,
              borderColor: "divider",
            },
          },
        }}
      >
        <Box sx={{ p: 2.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography className="font-display" sx={{ fontSize: "1.35rem" }}>
            Menu
          </Typography>
          <IconButton onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
            <X />
          </IconButton>
        </Box>
        <Divider />
        <List sx={{ px: 1.5, py: 2 }}>
          {navItems.map((item) => (
            <ListItemButton
              key={item.name}
              component="a"
              href={item.href}
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                handleNavClick(e, item.href)
              }
              sx={{ borderRadius: 1.5, mb: 0.5, py: 1.4 }}
            >
              <ListItemText
                primary={item.name}
                slotProps={{ primary: { sx: { fontSize: "1.05rem" } } }}
              />
            </ListItemButton>
          ))}
        </List>
        <Box sx={{ p: 2.5 }}>
          <Button fullWidth variant="contained" href="/booking-meeting" component="a">
            Book a call
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
