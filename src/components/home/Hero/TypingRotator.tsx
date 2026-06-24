"use client";

import React from "react";
import Box from "@mui/material/Box";

const DEFAULT_WORDS = [
  "exceptional",
  "scalable",
  "modern",
  "robust",
  "beautiful",
] as const;

type TypingRotatorProps = {
  words?: readonly string[];
};

export default function TypingRotator({
  words = DEFAULT_WORDS,
}: TypingRotatorProps) {
  const [index, setIndex] = React.useState(0);
  const [display, setDisplay] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [reducedMotion, setReducedMotion] = React.useState(false);

  const longestWord = words.reduce((a, b) => (a.length >= b.length ? a : b), "");

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  React.useEffect(() => {
    if (reducedMotion) {
      setDisplay(words[0]);
      return;
    }

    const word = words[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && display === word) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && display === "") {
      setIsDeleting(false);
      setIndex((current) => (current + 1) % words.length);
    } else {
      timeout = setTimeout(() => {
        setDisplay(
          isDeleting
            ? word.substring(0, display.length - 1)
            : word.substring(0, display.length + 1)
        );
      }, isDeleting ? 45 : 90);
    }

    return () => clearTimeout(timeout);
  }, [display, index, isDeleting, reducedMotion, words]);

  return (
    <Box
      component="span"
      aria-live="polite"
      sx={{
        position: "relative",
        display: "inline-block",
        verticalAlign: "bottom",
        color: "primary.main",
        fontStyle: "italic",
      }}
    >
      <Box component="span" aria-hidden sx={{ visibility: "hidden" }}>
        {longestWord}
      </Box>

      <Box
        component="span"
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          whiteSpace: "nowrap",
        }}
      >
        {display}
        {!reducedMotion && (
          <Box
            component="span"
            aria-hidden
            sx={{
              display: "inline-block",
              width: "2px",
              height: "0.85em",
              ml: "1px",
              verticalAlign: "-0.05em",
              bgcolor: "primary.main",
              animation: "typing-cursor 0.8s step-end infinite",
              "@keyframes typing-cursor": {
                "50%": { opacity: 0 },
              },
            }}
          />
        )}
      </Box>
    </Box>
  );
}
