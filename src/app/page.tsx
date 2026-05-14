"use client";

import { JSX } from "react";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import SkillsSection from "@/components/home/Skills/SkillsSection";

export default function Home(): JSX.Element {
  return (
    <div className="relative min-h-screen">
      {/* Main Sections */}
      <main>
        <Hero />
        <About />
        <SkillsSection />
        {/* Additional sections can be added here */}
        <div className="h-[20vh]" /> 
      </main>
    </div>
  );
}
