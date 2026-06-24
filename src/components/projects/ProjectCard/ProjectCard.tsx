"use client";

import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function ProjectCard({
  project,
  index,
}: {
  project: {
    id: string;
    image: string;
    title: string;
    description: string;
    liveLink: string | null;
    technologies: string[];
  };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card elevation={0} sx={{ overflow: "hidden" }}>
        <Box sx={{ position: "relative", height: 256, overflow: "hidden" }}>
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 hover:scale-110"
          />
          {project.liveLink && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0,
                transition: "opacity 0.3s ease",
                bgcolor: "rgba(0,0,0,0.4)",
                ".MuiCard-root:hover &": { opacity: 1 },
              }}
            >
              <IconButton
                component="a"
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                sx={{ bgcolor: "primary.main", color: "primary.contrastText", "&:hover": { bgcolor: "primary.dark" } }}
              >
                <ExternalLink size={20} />
              </IconButton>
            </Box>
          )}
        </Box>

        <CardContent>
          <Stack spacing={2}>
            <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-start" }}>
              <Link href={`/projects/${project.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  {project.title}
                </Typography>
              </Link>
              <IoMdInformationCircleOutline size={22} />
            </Stack>

            <Typography variant="body2" color="text.secondary" sx={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
              {project.description.slice(0, 100)}...
            </Typography>

            <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
              {project.technologies.map((tech) => (
                <Chip key={tech} label={tech} size="small" color="primary" variant="filled" />
              ))}
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  );
}
