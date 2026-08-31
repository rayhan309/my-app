"use client";

import { JSX } from "react";
import Hero from "@/components/home/Hero/Hero";
import About from "@/components/home/About/About";
import SkillsSection from "@/components/home/Skills/SkillsSection";
import ProjectsSection from "@/components/home/Projects/ProjectsSection";
import ContactSection from "@/components/home/Contact/ContactSection";
import FinalSection from "@/components/home/FinalSection/FinalSection";
import Services from "@/components/home/Services/Services";

export default function HomePage(): JSX.Element {
  return (
    <div className="relative min-h-screen">
      <Hero />
      <About />
      <SkillsSection />
      <ProjectsSection />
      <Services />
      <ContactSection />
      <FinalSection />
    </div>
  );
}
