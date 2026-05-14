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
} from "react-icons/si";
import { motion } from "framer-motion";

const skills = [
  { name: "Dropshipping", icon: <SiShopify className="text-[#95BF47]" />, cat: "Business" },
  { name: "Meta Ads", icon: <SiMeta className="text-[#0668E1]" />, cat: "Marketing" },
  { name: "Google Ads", icon: <SiGoogleads className="text-[#4285F4]" />, cat: "Marketing" },
  { name: "TikTok Ads", icon: <SiTiktok className="text-[#00f2ea]" />, cat: "Paid Marketing" },
  { name: "Cybersecurity", icon: <SiSecurityscorecard className="text-[#FF3E3E]" />, cat: "Security" },
  { name: "PHP", icon: <SiPhp className="text-[#777BB4]" />, cat: "Backend" },
  { name: "C++", icon: <SiCplusplus className="text-[#00599C]" />, cat: "Backend" },
  { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" />, cat: "Backend" },
  { name: "React.js", icon: <SiReact className="text-[#61DAFB]" />, cat: "Frontend" },
  { name: "Vue.js", icon: <SiVuedotjs className="text-[#4FC08D]" />, cat: "Frontend" },
  { name: "Next.js", icon: <SiNextdotjs className="text-foreground" />, cat: "Framework" },
  { name: "Gatsby", icon: <SiGatsby className="text-[#663399]" />, cat: "Framework" },
  { name: "WordPress", icon: <SiWordpress className="text-[#21759B]" />, cat: "CMS" },
  { name: "Python", icon: <SiPython className="text-[#3776AB]" />, cat: "Backend" },
  { name: "GitHub", icon: <SiGithub className="text-foreground" />, cat: "Version Control" },
  { name: "Node.js", icon: <SiNodedotjs className="text-[#339933]" />, cat: "Backend" },
  { name: "Socket.io", icon: <SiSocketdotio className="text-foreground" />, cat: "Real-time" },
  { name: "NGINX", icon: <SiNginx className="text-[#009639]" />, cat: "Server" },
  { name: "MongoDB", icon: <SiMongodb className="text-[#47A248]" />, cat: "Database" },
];

const SkillsGrid = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {skills.map((skill, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: i * 0.05,
            ease: "easeOut",
          }}
          whileHover={{
            y: -8,
            backgroundColor: "var(--color-primary-10)",
          }}
          className="bg-card/40 border border-border/10 hover:border hover:border-primary/20 p-5 rounded-md flex items-center gap-4 hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer group backdrop-blur-sm"
        >
          <div className="text-3xl group-hover:scale-110 transition-transform duration-500 shrink-0 filter drop-shadow-sm">
            {skill.icon}
          </div>

          <div className="min-w-0">
            <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors truncate">
              {skill.name}
            </h4>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1 truncate">
              {skill.cat}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default SkillsGrid;
