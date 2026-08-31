import { JSX } from "react";

export default function OverlayPattern(): JSX.Element {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,rgba(228,201,160,0.07),transparent_55%)]" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.35] [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.28%22/></svg>')]" />
    </>
  );
}
