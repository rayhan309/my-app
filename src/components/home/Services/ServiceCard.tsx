"use client";

import { motion } from "framer-motion";


import { Service } from "@/lib/ServicesData/ServicesData";

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
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group relative flex flex-col h-full rounded-md border border-border/10 bg-card/40 backdrop-blur-sm p-6 md:p-7 overflow-hidden hover:border-primary/35 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500"
    >
      <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-primary/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative flex items-center gap-4 mb-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary border border-primary/15 group-hover:bg-primary/15 transition-colors">
          <Icon className="w-6 h-6" strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3
            className={`mt-1 text-lg md:text-xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors`}
          >
            {service.title}
          </h3>
        </div>
      </div>

      <p className="relative text-sm text-muted-foreground leading-relaxed flex-1 mb-5">
        {service.description}
      </p>

      <div className="relative flex flex-wrap gap-2">
        {tags.map((t: string) => (
          <span
            key={t}
            className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-primary/5 text-primary border border-primary/10 rounded-md"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.article>
  );
}