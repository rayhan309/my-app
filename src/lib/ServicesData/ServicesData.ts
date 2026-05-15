import { BarChart3, Code2, Cpu, LucideIcon, Megaphone, ShieldCheck, Workflow } from "lucide-react";

export const SERVICESDATA: {
    title: string;
    description: string;
    icon: LucideIcon;
    tags: string[];
}[] = [
    {
      title: "Fullstack Development",
      description:
        "End-to-end web platforms with scalable backends, modern frontends, and clean APIs—from MVP to production.",
      icon: Code2,
      tags: ["Next.js", "APIs", "Cloud"],
    },
    {
      title: "Workflow Automation",
      description:
        "Streamline operations with integrations, custom scripts, and reliable pipelines that cut manual work and errors.",
      icon: Workflow,
      tags: ["Integrations", "Pipelines"],
    },
    {
      title: "Cybersecurity & Hardening",
      description:
        "Secure architecture reviews, hardening, and best practices so your stack resists common threats and abuse.",
      icon: ShieldCheck,
      tags: ["Hardening", "Best practices"],
    },
    {
      title: "AI & Realtime Tech",
      description:
        "Intelligent features, agents, and live experiences using modern AI stacks and real-time channels where it matters.",
      icon: Cpu,
      tags: ["AI", "WebSockets"],
    },
    {
      title: "Data Analytics",
      description:
        "Dashboards, reporting, and data pipelines that turn raw metrics into decisions you can trust.",
      icon: BarChart3,
      tags: ["BI", "ETL"],
    },
    {
      title: "Performance Marketing",
      description:
        "High-impact paid and funnel strategy aligned with solid tracking, landing experiences, and measurable ROAS.",
      icon: Megaphone,
      tags: ["Meta", "Google", "Analytics"],
    },
    // {
    //   title: "Dropshipping",
    //   description:
    //     "Store builds, supplier workflows, and ops playbooks focused on conversion, fulfilment, and sustainable margins.",
    //   icon: Package,
    //   tags: ["E-commerce", "Ops"],
    // },
  ] satisfies {
    title: string;
    description: string;
    icon: LucideIcon;
    tags: string[];
  }[];