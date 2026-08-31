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
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="flex h-full flex-col border-t border-border pt-6"
    >
      <p className="text-[0.7rem] uppercase tracking-[0.2em] text-primary">
        {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="font-display mt-3 text-2xl md:text-[1.75rem]">{service.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-muted-foreground">
        {service.description}
      </p>
      <p className="mt-5 text-xs tracking-wide text-muted-foreground">
        {service.tags.join("  ·  ")}
      </p>
    </motion.article>
  );
}
