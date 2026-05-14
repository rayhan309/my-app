"use client";

import { JSX } from "react";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Background3D from "@/components/home/Background3D";

export default function Home(): JSX.Element {
  return (
    <div className="relative min-h-screen">
      {/* 3D Background */}
      <Background3D />
      
      {/* Overlay Pattern */}
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_800px_at_100%_200px,var(--color-primary-10),transparent)]" />

      {/* Main Sections */}
      <main>
        <Hero />
        <About />
        {/* Additional sections can be added here */}
        <div className="h-[20vh]" /> 
      </main>
    </div>
  );
}
