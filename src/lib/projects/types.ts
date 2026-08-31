export type ProjectSource = "static" | "dashboard";

export type ProjectCardData = {
  id: string;
  title: string;
  description: string;
  image: string;
  githubLink: string;
  liveLink: string | null;
  technologies: string[];
  source?: ProjectSource;
};

export type ProjectDetailsMeta = {
  client: string;
  duration: string;
  role: string;
  category: string;
};

export type ProjectAdminData = ProjectCardData & {
  subtitle: string;
  overview: string;
  features: string[];
  details: ProjectDetailsMeta;
  stack: Record<string, string[]>;
  gallery: string[];
};

export type ProjectDocument = {
  id: string;
  title: string;
  description: string;
  image: string;
  githubLink: string;
  liveLink: string | null;
  technologies: string[];
  source: ProjectSource;
  sortOrder: number;
  subtitle?: string;
  overview?: string;
  features?: string[];
  details?: ProjectDetailsMeta;
  stack?: Record<string, string[]>;
  gallery?: string[];
  createdAt: Date;
  updatedAt?: Date;
};

export type ProjectDetailData = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  liveLink: string | null;
  githubLink: string;
  details: ProjectDetailsMeta;
  features: string[];
  stack: Record<string, string[]>;
  gallery: string[];
  overview: string;
};
