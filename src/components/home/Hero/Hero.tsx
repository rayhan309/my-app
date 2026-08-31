"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TypingRotator from "@/components/home/Hero/TypingRotator";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const socialLinks = [
  { href: "https://github.com/rayhan309", label: "GitHub", Icon: FaGithub },
  {
    href: "https://www.linkedin.com/in/abu-rayhan-undefined-2514b5390/",
    label: "LinkedIn",
    Icon: FaLinkedin,
  },
  { href: "https://x.com/AbuRayhan1818", label: "X", Icon: FaTwitter },
  { href: "https://facebook.com/aburayhan1818/", label: "Facebook", Icon: FaFacebook },
];

export default function Hero() {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        pt: { xs: 4, md: 8 },
        pb: { xs: 10, md: 16 },
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1.15fr 0.85fr" },
          gap: { xs: 7, lg: 10 },
          alignItems: "center",
        }}
      >
          <motion.div initial="hidden" animate="visible">
            <Stack spacing={3.5}>
              <motion.div variants={fadeUp} custom={0}>
                <Typography
                  variant="overline"
                  sx={{
                    letterSpacing: "0.22em",
                    color: "text.secondary",
                    fontWeight: 500,
                  }}
                >
                  Senior Full-stack Engineer · Dhaka
                </Typography>
              </motion.div>

              <motion.div variants={fadeUp} custom={0.08}>
                <Typography
                  variant="h1"
                  className="font-display"
                  sx={{
                    fontSize: { xs: "3rem", sm: "4rem", md: "4.75rem", lg: "5.4rem" },
                    maxWidth: 720,
                  }}
                >
                  Building <TypingRotator /> products for ambitious teams.
                </Typography>
              </motion.div>

              <motion.div variants={fadeUp} custom={0.18}>
                <Typography
                  color="text.secondary"
                  sx={{ maxWidth: 520, fontSize: { xs: "1.05rem", md: "1.15rem" }, lineHeight: 1.8 }}
                >
                  I&apos;m Abu Rayhan. I architect high-performance web applications
                  at{" "}
                  <Link
                    href="https://flexshipit.com"
                    target="_blank"
                    className="text-foreground underline decoration-primary/50 underline-offset-4 hover:decoration-primary"
                  >
                    FlexShip IT
                  </Link>
                  —where product taste and engineering rigor meet.
                </Typography>
              </motion.div>

              <motion.div variants={fadeUp} custom={0.28}>
                <Stack direction="row" spacing={1.5} sx={{ flexWrap: "wrap", gap: 1.5 }}>
                  <Button
                    variant="contained"
                    size="large"
                    href="https://wa.me/8801621807642?text=Hi! I'm interested in working with you."
                    target="_blank"
                    component="a"
                    endIcon={<ArrowUpRight size={16} />}
                  >
                    Start a project
                  </Button>
                  <Button variant="outlined" size="large" href="/projects" component="a">
                    Selected work
                  </Button>
                </Stack>
              </motion.div>

              <motion.div variants={fadeUp} custom={0.38}>
                <Stack
                  direction="row"
                  spacing={2.5}
                  sx={{ pt: 1, color: "text.secondary", flexWrap: "wrap" }}
                >
                  {socialLinks.map((social) => (
                    <Typography
                      key={social.label}
                      component="a"
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="body2"
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 0.75,
                        textDecoration: "none",
                        "&:hover": { color: "primary.main" },
                      }}
                    >
                      <social.Icon size={14} />
                      {social.label}
                    </Typography>
                  ))}
                </Stack>
              </motion.div>
            </Stack>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <Box sx={{ position: "relative", maxWidth: 480, mx: "auto" }}>
              <Box
                sx={{
                  position: "relative",
                  aspectRatio: "4 / 5",
                  overflow: "hidden",
                  borderRadius: "4px 4px 80px 4px",
                  border: 1,
                  borderColor: "divider",
                }}
              >
                <Image
                  src="/hero-rayhan.png"
                  alt="Abu Rayhan at workstation"
                  fill
                  sizes="(max-width: 1024px) 90vw, 480px"
                  className="object-cover object-[30%_18%]"
                  priority
                />
              </Box>
              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  mt: 2,
                  color: "text.secondary",
                }}
              >
                <Typography variant="caption" sx={{ letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  Available worldwide
                </Typography>
                <Typography variant="caption" sx={{ letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  111+ shipped
                </Typography>
              </Stack>
            </Box>
          </motion.div>
        </Box>
    </Box>
  );
}
