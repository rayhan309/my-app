"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import CustomCursor from "@/components/shared/CustomCursor";
import Background3D from "@/components/shared/Background3D";
import OverlayPattern from "@/components/shared/OverlayPattern";
import PageLoadIntro from "@/components/shared/PageLoadIntro";
import SmoothScroll from "@/components/shared/SmoothScroll";
import Container from "@/components/shared/Container";

export default function AppChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <>
      <PageLoadIntro />
      <CustomCursor />
      <Background3D />
      <OverlayPattern />
      <Navbar />
      <SmoothScroll>
        <main className="pt-20">
          <Container>{children}</Container>
        </main>
      </SmoothScroll>
    </>
  );
}
