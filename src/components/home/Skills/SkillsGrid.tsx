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

type Skill = {
  name: string;
  icon: React.ReactNode;
  cat: string;
};

const skills: Skill[] = [
  { name: "TypeScript", icon: <SiTypescript />, cat: "Languages" },
  { name: "Go", icon: <SiGo />, cat: "Languages" },
  { name: "Python", icon: <SiPython />, cat: "Languages" },
  { name: "PHP", icon: <SiPhp />, cat: "Languages" },
  { name: "C++", icon: <SiCplusplus />, cat: "Languages" },
  { name: "React", icon: <SiReact />, cat: "Frontend" },
  { name: "Next.js", icon: <SiNextdotjs />, cat: "Frontend" },
  { name: "Vue.js", icon: <SiVuedotjs />, cat: "Frontend" },
  { name: "Gatsby", icon: <SiGatsby />, cat: "Frontend" },
  { name: "Node.js", icon: <SiNodedotjs />, cat: "Backend" },
  { name: "Gin", icon: <SiGin />, cat: "Backend" },
  { name: "Socket.io", icon: <SiSocketdotio />, cat: "Backend" },
  { name: "MongoDB", icon: <SiMongodb />, cat: "Data" },
  { name: "PostgreSQL", icon: <SiPostgresql />, cat: "Data" },
  { name: "Redis", icon: <SiRedis />, cat: "Data" },
  { name: "Docker", icon: <SiDocker />, cat: "Infrastructure" },
  { name: "NGINX", icon: <SiNginx />, cat: "Infrastructure" },
  { name: "GitHub", icon: <SiGithub />, cat: "Infrastructure" },
  { name: "WordPress", icon: <SiWordpress />, cat: "Platforms" },
  { name: "Shopify", icon: <SiShopify />, cat: "Platforms" },
  { name: "Cybersecurity", icon: <SiSecurityscorecard />, cat: "Growth" },
  { name: "Meta Ads", icon: <SiMeta />, cat: "Growth" },
  { name: "Google Ads", icon: <SiGoogleads />, cat: "Growth" },
  { name: "TikTok Ads", icon: <SiTiktok />, cat: "Growth" },
];

const categoryOrder = [
  "Languages",
  "Frontend",
  "Backend",
  "Data",
  "Infrastructure",
  "Platforms",
  "Growth",
];

export default function SkillsGrid() {
  const grouped = categoryOrder
    .map((cat) => ({
      cat,
      items: skills.filter((skill) => skill.cat === cat),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="divide-y divide-border border-y border-border">
      {grouped.map((group, index) => (
        <motion.div
          key={group.cat}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: index * 0.04 }}
          className="grid grid-cols-1 gap-4 py-7 md:grid-cols-12 md:items-start"
        >
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted-foreground md:col-span-3">
            {group.cat}
          </p>
          <ul className="flex flex-wrap gap-2.5 md:col-span-9">
            {group.items.map((skill) => (
              <li
                key={skill.name}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-sm text-foreground"
              >
                <span className="text-[0.95rem] opacity-80">{skill.icon}</span>
                {skill.name}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
