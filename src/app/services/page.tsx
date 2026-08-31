"use client";

import { SERVICESDATA } from "@/lib/ServicesData/ServicesData";
import ServiceCard from "@/components/home/Services/ServiceCard";
import FinalSection from "@/components/home/FinalSection/FinalSection";
import { motion } from "framer-motion";


export default function ServicesPage() {

  const all_services = SERVICESDATA;

  return (
    <div className="pt-8">

      <div className="mb-16 max-w-2xl space-y-4">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary font-semibold tracking-wider uppercase text-sm"
        >
          What I deliver
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="font-display text-4xl leading-[1.1] md:text-5xl lg:text-6xl"
        >
          Services <span className="text-muted-foreground">&amp; capabilities.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.16 }}
          className="text-lg text-muted-foreground"
        >
          Engineering-first solutions with clear outcomes—whether you need a
          product built, secured, scaled, or grown.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {all_services.map((service, index) => (
          <div key={index}>
            <ServiceCard service={service} index={index} />
          </div>
        ))}
      </div>

      {/* simple footer */}
      <FinalSection />
    </div>
  );
}
