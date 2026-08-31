"use client";

import { motion } from "framer-motion";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function FinalSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer data-reveal className="relative pb-10 pt-16 md:pb-16 md:pt-24">
      <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display select-none text-[12vw] leading-[0.85] tracking-[-0.05em] text-foreground/10 md:text-[8rem]"
        >
          Abu Rayhan
        </motion.p>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Merging craft and engineering so the work feels inevitable—and holds up after launch.
        </p>

        <div className="mt-12 flex flex-col items-start justify-between gap-8 border-t border-border pt-8 md:flex-row md:items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Abu Rayhan · Dhaka, available worldwide
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            {[
              { Icon: FaGithub, href: "https://github.com/rayhan309", label: "GitHub" },
              {
                Icon: FaLinkedin,
                href: "https://www.linkedin.com/in/abu-rayhan-dev-2514b5390/",
                label: "LinkedIn",
              },
              { Icon: FaTwitter, href: "https://x.com/AbuRayhan1818", label: "X" },
              { Icon: FaFacebook, href: "https://facebook.com/aburayhan1818/", label: "Facebook" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-primary"
              >
                <social.Icon size={14} />
                {social.label}
              </a>
            ))}
          </div>
        </div>
    </footer>
  );
}
