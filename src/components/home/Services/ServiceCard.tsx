"use client";

import { motion } from "framer-motion";
import { Service } from "@/lib/ServicesData/ServicesData";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const Icon = service.icon;
  const tags = service.tags;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      style={{ height: "100%" }}
    >
      <Card elevation={0} sx={{ height: "100%", position: "relative", overflow: "hidden" }}>
        <CardContent sx={{ height: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                display: "grid",
                placeItems: "center",
                bgcolor: "primary.main",
                color: "primary.contrastText",
                opacity: 0.95,
              }}
            >
              <Icon className="w-6 h-6" strokeWidth={1.75} />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800, letterSpacing: "0.16em" }}>
                {String(index + 1).padStart(2, "0")}
              </Typography>
              <Typography variant="h6" sx={{ lineHeight: 1.2, fontWeight: 900 }}>
                {service.title}
              </Typography>
            </Box>
          </Stack>

          <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
            {service.description}
          </Typography>

          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
            {tags.map((t: string) => (
              <Chip key={t} label={t} size="small" color="primary" variant="filled" />
            ))}
          </Stack>
        </CardContent>
      </Card>
    </motion.div>
  );
}
