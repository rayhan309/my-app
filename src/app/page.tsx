"use client";

import { JSX } from "react";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import SkillsSection from "@/components/home/Skills/SkillsSection";
import ProjectsSection from "@/components/home/Projects/ProjectsSection";
import ContactSection from "@/components/home/Contact/ContactSection";
import FinalSection from "@/components/home/FinalSection";

export default function Home(): JSX.Element {
  return (
    <div className="relative min-h-screen">
      {/* Main Sections */}
      <main>
        <Hero />
        <About />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
        <FinalSection />
        {/* Spacing remove or adjust */}
      </main>
    </div>
  );
}
