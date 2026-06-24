"use client";

import React from "react";
import {
  SiShopify,
  SiMeta,
  SiGoogleads,
  SiReact,
  SiNextdotjs,
  SiGatsby,
  SiGithub,
  SiMongodb,
  SiNodedotjs,
  SiVuedotjs,
  SiTiktok,
  SiPython,
  SiNginx,
  SiSocketdotio,
  SiWordpress,
  SiSecurityscorecard,
  SiPhp,
  SiCplusplus,
  SiTypescript,
  SiGo,
  SiGin,
  SiPostgresql,
  SiRedis,
  SiDocker,
} from "react-icons/si";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type Skill = {
  name: string;
  icon: React.ReactNode;
  cat: string;
  percent: number;
};

const skills: Skill[] = [
  { name: "Dropshipping", icon: <SiShopify className="text-[#95BF47]" />, cat: "Business", percent: 85 },
  { name: "Meta Ads", icon: <SiMeta className="text-[#0668E1]" />, cat: "Marketing", percent: 88 },
  { name: "Google Ads", icon: <SiGoogleads className="text-[#4285F4]" />, cat: "Marketing", percent: 85 },
  { name: "TikTok Ads", icon: <SiTiktok className="text-[#00f2ea]" />, cat: "Paid Marketing", percent: 82 },
  { name: "Cybersecurity", icon: <SiSecurityscorecard className="text-[#FF3E3E]" />, cat: "Security", percent: 80 },
  { name: "PHP", icon: <SiPhp className="text-[#777BB4]" />, cat: "Backend", percent: 72 },
  { name: "C++", icon: <SiCplusplus className="text-[#00599C]" />, cat: "Backend", percent: 75 },
  { name: "Go", icon: <SiGo className="text-[#00ADD8]" />, cat: "Backend", percent: 88 },
  { name: "Gin", icon: <SiGin className="text-[#00ADD8]" />, cat: "Framework", percent: 86 },
  { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" />, cat: "Backend", percent: 92 },
  { name: "React.js", icon: <SiReact className="text-[#61DAFB]" />, cat: "Frontend", percent: 95 },
  { name: "Vue.js", icon: <SiVuedotjs className="text-[#4FC08D]" />, cat: "Frontend", percent: 82 },
  { name: "Next.js", icon: <SiNextdotjs className="text-foreground" />, cat: "Framework", percent: 94 },
  { name: "Gatsby", icon: <SiGatsby className="text-[#663399]" />, cat: "Framework", percent: 78 },
  { name: "WordPress", icon: <SiWordpress className="text-[#21759B]" />, cat: "CMS", percent: 80 },
  { name: "Python", icon: <SiPython className="text-[#3776AB]" />, cat: "Backend", percent: 85 },
  { name: "GitHub", icon: <SiGithub className="text-foreground" />, cat: "Version Control", percent: 92 },
  { name: "Node.js", icon: <SiNodedotjs className="text-[#339933]" />, cat: "Backend", percent: 90 },
  { name: "Socket.io", icon: <SiSocketdotio className="text-foreground" />, cat: "Real-time", percent: 88 },
  { name: "NGINX", icon: <SiNginx className="text-[#009639]" />, cat: "Server", percent: 85 },
  { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" />, cat: "Database", percent: 90 },
  { name: "PostgreSQL", icon: <SiPostgresql className="text-[#4169E1]" />, cat: "Database", percent: 85 },
  { name: "Redis", icon: <SiRedis className="text-[#DC382D]" />, cat: "Database", percent: 82 },
  { name: "Docker", icon: <SiDocker className="text-[#2496ED]" />, cat: "DevOps", percent: 84 },
];

const SkillsGrid = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
          xl: "repeat(4, 1fr)",
        },
        gap: 2,
      }}
    >
      {skills.map((skill, i) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.04, ease: "easeOut" }}
          whileHover={{ y: -6 }}
        >
          <Card elevation={0} sx={{ height: "100%" }}>
            <CardContent>
              <Stack spacing={2}>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                  <Box sx={{ fontSize: "1.6rem", display: "flex" }}>{skill.icon}</Box>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Stack direction="row" spacing={1} sx={{ justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800 }} noWrap>
                        {skill.name}
                      </Typography>
                      <Typography variant="caption" color="primary" sx={{ fontWeight: 800 }}>
                        {skill.percent}%
                      </Typography>
                    </Stack>
                    <Chip label={skill.cat} size="small" color="primary" variant="outlined" sx={{ mt: 0.75 }} />
                  </Box>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={skill.percent}
                  color="primary"
                />
              </Stack>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </Box>
  );
};

export default SkillsGrid;
