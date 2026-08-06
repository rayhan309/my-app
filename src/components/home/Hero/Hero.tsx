"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { RiArrowRightLongFill } from "react-icons/ri";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Plus_Jakarta_Sans } from "next/font/google";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TypingRotator from "@/components/home/Hero/TypingRotator";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta-sans",
});

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const pullDown = {
  hidden: { opacity: 0, y: -160 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.48,
      delay: 2.1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function Hero() {
  const socialLinks: {
    href: string;
    Icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { href: "https://github.com/rayhan309", Icon: FaGithub },
    {
      href: "https://www.linkedin.com/in/abu-rayhan-undefined-2514b5390/",
      Icon: FaLinkedin,
    },
    { href: "https://x.com/AbuRayhan1818", Icon: FaTwitter },
    { href: "https://facebook.com/aburayhan1818/", Icon: FaFacebook },
  ];

  return (
    <Box component="section" sx={{ position: "relative", pt: 5, pb: 10 }}>
      <Box className="container mx-auto px-4">
        <Grid container spacing={6} sx={{ alignItems: "center" }}>
          <Grid size={{ xs: 12, lg: 6 }} sx={{ order: { xs: 2, lg: 1 } }}>
            <motion.div initial="hidden" animate="visible">
            <Stack spacing={3}>
              <motion.div variants={fadeUp} custom={0}>
                <Chip
                  label="Available for New Projects"
                  color="primary"
                  variant="outlined"
                  icon={
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "primary.main",
                        boxShadow: "0 0 0 4px rgba(59,130,246,0.18)",
                      }}
                    />
                  }
                  sx={{ alignSelf: { xs: "center", lg: "flex-start" }, fontWeight: 700 }}
                />
              </motion.div>

              <motion.div variants={fadeUp} custom={0.1}>
                <Typography
                  variant="h1"
                  className={jakartaSans.className}
                  sx={{
                    fontSize: { xs: "2.5rem", md: "3.75rem", lg: "4.5rem" },
                    textAlign: { xs: "center", lg: "left" },
                  }}
                >
                  Building <TypingRotator /> digital solutions.
                </Typography>
              </motion.div>

              <motion.div variants={fadeUp} custom={0.22}>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    maxWidth: 560,
                    fontSize: "1.1rem",
                    textAlign: { xs: "center", lg: "left" },
                    mx: { xs: "auto", lg: 0 },
                  }}
                >
                  I&apos;m <strong>Abu Rayhan</strong>, Senior Full-stack Engineer at{" "}
                  <Link href="https://flexshipit.com" target="_blank" style={{ color: "inherit" }}>
                    FlexShip IT
                  </Link>
                  . I architect high-performance web applications that merge modern aesthetics with
                  robust, scalable engineering.
                </Typography>
              </motion.div>

              <motion.div variants={fadeUp} custom={0.34}>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    flexWrap: "wrap",
                    gap: 1,
                    justifyContent: { xs: "center", lg: "flex-start" },
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    href="https://wa.me/8801621807642?text=Hi! I'm interested in working with you."
                    target="_blank"
                    component="a"
                    endIcon={<RiArrowRightLongFill />}
                  >
                    Let&apos;s Talk
                  </Button>
                  <Button variant="outlined" size="large" href="/projects" component="a">
                    View My Work
                  </Button>
                </Stack>
              </motion.div>

              <motion.div variants={fadeUp} custom={0.46}>
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{
                    pt: 2,
                    borderTop: 1,
                    borderColor: "divider",
                    width: "fit-content",
                    mx: { xs: "auto", lg: 0 },
                  }}
                >
                  {socialLinks.map((Social, i) => (
                    <IconButton
                      key={i}
                      component="a"
                      href={Social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      color="default"
                      sx={{
                        color: "text.secondary",
                        "&:hover": { color: "primary.main", bgcolor: "action.hover" },
                      }}
                    >
                      <Social.Icon className="w-5 h-5" />
                    </IconButton>
                  ))}
                </Stack>
              </motion.div>
            </Stack>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }} sx={{ order: { xs: 1, lg: 2 } }}>
            <motion.div
              variants={pullDown}
              initial="hidden"
              animate="visible"
              style={{ position: "relative", maxWidth: 500, margin: "0 auto" }}
            >
              <Paper
                elevation={0}
                className="group"
                sx={{
                  position: "relative",
                  aspectRatio: "1 / 1",
                  overflow: "hidden",
                  borderRadius: 2,
                  border: 1,
                  borderColor: "divider",
                  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.35)",
                }}
              >
                <Image
                  src="/hero-rayhan.png"
                  alt="Abu Rayhan at workstation"
                  fill
                  sizes="(max-width: 1024px) 90vw, 500px"
                  className="object-cover object-[30%_20%] transition-transform duration-700 group-hover:scale-110"
                  priority
                />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(2,6,23,0.75), transparent 55%, transparent)",
                    opacity: 0.55,
                    pointerEvents: "none",
                  }}
                />
              </Paper>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="hidden md:block"
                style={{
                  position: "absolute",
                  top: -16,
                  right: -16,
                }}
              >
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  minWidth: 180,
                }}
              >
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      bgcolor: "success.main",
                      opacity: 0.15,
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <Box sx={{ width: 14, height: 14, borderRadius: "50%", bgcolor: "success.main" }} />
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Completed
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                      111+ Projects
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
              </motion.div>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
