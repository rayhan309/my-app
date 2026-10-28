"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiHtml5,
  SiGo,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiRedux,
  SiReactquery,
  SiGatsby,
  SiNodedotjs,
  SiExpress,
  SiGin,
  SiMongodb,
  SiRedis,
  SiFirebase,
  SiPostgresql,
  SiGithub,
  SiDocker,
  SiVercel,
  SiSocketdotio,
  SiLinux,
  SiNginx,
  SiMeta,
  SiInstagram,
  SiTiktok,
} from "react-icons/si";
import { FaCss3Alt } from "react-icons/fa";

type SkillItem = {
  name: string;
  percentage: number;
  icon: React.ReactNode;
};

type SkillCategory = {
  title: string;
  description: string;
  indexStr: string;
  skills: SkillItem[];
};

const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    description: "Core programming languages I work with daily",
    indexStr: "01 / 05",
    skills: [
      {
        name: "JavaScript",
        percentage: 92,
        icon: <SiJavascript className="text-[#f7df1e]" />,
      },
      {
        name: "TypeScript",
        percentage: 88,
        icon: <SiTypescript className="text-[#3178c6]" />,
      },
      {
        name: "Go",
        percentage: 82,
        icon: <SiGo className="text-[#00add8]" />,
      },
      {
        name: "Python",
        percentage: 78,
        icon: <SiPython className="text-[#3776ab]" />,
      },
      {
        name: "HTML5",
        percentage: 95,
        icon: <SiHtml5 className="text-[#e34f26]" />,
      },
      {
        name: "CSS3",
        percentage: 90,
        icon: <FaCss3Alt className="text-[#1572b6]" />,
      },
    ],
  },
  {
    title: "Frontend",
    description: "Frameworks, state & modern reactive UI libraries",
    indexStr: "02 / 05",
    skills: [
      {
        name: "React",
        percentage: 95,
        icon: <SiReact className="text-[#61dafb]" />,
      },
      {
        name: "Next.js",
        percentage: 92,
        icon: <SiNextdotjs className="text-foreground" />,
      },
      {
        name: "TanStack Query",
        percentage: 90,
        icon: <SiReactquery className="text-[#ff4154]" />,
      },
      {
        name: "Tailwind CSS",
        percentage: 90,
        icon: <SiTailwindcss className="text-[#38bdf8]" />,
      },
      {
        name: "Gatsby",
        percentage: 84,
        icon: <SiGatsby className="text-[#663399]" />,
      },
      {
        name: "Redux Toolkit",
        percentage: 84,
        icon: <SiRedux className="text-[#764abc]" />,
      },
    ],
  },
  {
    title: "Backend & Database",
    description: "High-performance servers, APIs, caching & databases",
    indexStr: "03 / 05",
    skills: [
      {
        name: "Node.js",
        percentage: 88,
        icon: <SiNodedotjs className="text-[#339933]" />,
      },
      {
        name: "Express.js",
        percentage: 85,
        icon: <SiExpress className="text-foreground/90" />,
      },
      {
        name: "Gin",
        percentage: 82,
        icon: <SiGin className="text-[#00add8]" />,
      },
      {
        name: "MongoDB",
        percentage: 85,
        icon: <SiMongodb className="text-[#47a248]" />,
      },
      {
        name: "Redis",
        percentage: 84,
        icon: <SiRedis className="text-[#dc382d]" />,
      },
      {
        name: "PostgreSQL",
        percentage: 80,
        icon: <SiPostgresql className="text-[#4169e1]" />,
      },
      {
        name: "Firebase",
        percentage: 80,
        icon: <SiFirebase className="text-[#ffca28]" />,
      },
    ],
  },
  {
    title: "Tools & Infrastructure",
    description: "Linux systems, reverse proxies, containers & DevOps",
    indexStr: "04 / 05",
    skills: [
      {
        name: "Linux VPS",
        percentage: 88,
        icon: <SiLinux className="text-[#fcc624]" />,
      },
      {
        name: "NGINX",
        percentage: 85,
        icon: <SiNginx className="text-[#009639]" />,
      },
      {
        name: "Git & GitHub",
        percentage: 92,
        icon: <SiGithub className="text-foreground" />,
      },
      {
        name: "Docker",
        percentage: 78,
        icon: <SiDocker className="text-[#2496ed]" />,
      },
      {
        name: "Vercel",
        percentage: 90,
        icon: <SiVercel className="text-foreground" />,
      },
      {
        name: "Socket.io",
        percentage: 82,
        icon: <SiSocketdotio className="text-foreground/90" />,
      },
    ],
  },
  {
    title: "Growth & Performance Marketing",
    description: "Paid social advertising, conversion tracking & audience scaling",
    indexStr: "05 / 05",
    skills: [
      {
        name: "Meta Ads",
        percentage: 88,
        icon: <SiMeta className="text-[#0668e1]" />,
      },
      {
        name: "Instagram Ads",
        percentage: 88,
        icon: <SiInstagram className="text-[#e4405f]" />,
      },
      {
        name: "TikTok Ads",
        percentage: 85,
        icon: <SiTiktok className="text-[#00f2fe]" />,
      },
    ],
  },
];

export default function SkillsGrid() {
  return (
    <div className="mt-8 space-y-12 sm:space-y-16">
      {skillCategories.map((cat, catIdx) => (
        <motion.div
          key={cat.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: catIdx * 0.08 }}
          className="space-y-5"
        >
          {/* Category Header */}
          <div className="flex items-end justify-between border-b border-border pb-3.5">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {cat.title}
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                {cat.description}
              </p>
            </div>
            <span className="font-mono text-xs sm:text-sm tracking-wider text-muted-foreground/80">
              {cat.indexStr}
            </span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
            {cat.skills.map((skill, skillIdx) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: catIdx * 0.05 + skillIdx * 0.04,
                }}
                className="group relative rounded-2xl border border-border bg-card/85 p-4 sm:p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/45 hover:bg-card hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
              >
                {/* Top Info Row */}
                <div className="flex items-center gap-3.5">
                  {/* Icon container */}
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl border border-border/80 bg-background/60 text-xl sm:text-2xl transition-all duration-300 group-hover:scale-105 group-hover:border-primary/40 group-hover:bg-primary/10">
                    {skill.icon}
                  </div>

                  {/* Name and Percentage */}
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate text-sm sm:text-base font-bold text-foreground transition-colors group-hover:text-primary">
                      {skill.name}
                    </h4>
                    <span className="font-mono text-xs sm:text-sm font-semibold text-primary">
                      {skill.percentage}%
                    </span>
                  </div>
                </div>

                {/* Progress Bar with Portfolio Champagne Gold Theme */}
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-muted/60">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.1,
                      delay: catIdx * 0.08 + skillIdx * 0.05,
                      ease: "easeOut",
                    }}
                    className="h-full rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, #c9aa79 0%, #e4c9a0 65%, #f5dfbe 100%)",
                      boxShadow: "0 0 10px rgba(228, 201, 160, 0.4)",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
