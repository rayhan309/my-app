export type ProjectCardData = {
  id: string;
  title: string;
  description: string;
  image: string;
  githubLink: string;
  liveLink: string | null;
  technologies: string[];
  source?: "static" | "dashboard";
};

export type ProjectDocument = {
  id: string;
  title: string;
  description: string;
  image: string;
  githubLink: string;
  liveLink: string | null;
  technologies: string[];
  subtitle?: string;
  overview?: string;
  features?: string[];
  createdAt: Date;
  updatedAt?: Date;
};

export type ProjectDetailData = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  liveLink: string;
  githubLink: string;
  details: {
    client: string;
    duration: string;
    role: string;
    category: string;
  };
  features: string[];
  stack: {
    frontend: string[];
    backend: string[];
    deployment: string[];
  };
  gallery: string[];
  overview: string;
};
