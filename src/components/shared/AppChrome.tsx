"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import CustomCursor from "@/components/shared/CustomCursor";
import Background3D from "@/components/shared/Background3D";
import OverlayPattern from "@/components/shared/OverlayPattern";
import SmoothScroll from "@/components/shared/SmoothScroll";

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
      <CustomCursor />
      <Background3D />
      <OverlayPattern />
      <Navbar />
      <SmoothScroll>
        <main className="pt-20">{children}</main>
      </SmoothScroll>
    </>
  );
}
