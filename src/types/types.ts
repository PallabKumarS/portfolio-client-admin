export type TProject = {
  title: string;
  images: string[];
  description: string;
  technology: string[];
  liveLink: string;
  clientRepo?: string;
  serverRepo?: string;
  videoLink?: string;
  isFeatured?: boolean;
};

export type TMessage = {
  message: string;
  email: string;
  name: string;
};

export interface TSkill {
  category: "frontend" | "backend" | "tools";
  name: string;
  icon: string;
  proficiency: number;
}

export type TEducation = {
  degree: string;
  institution: string;
  department?: string;
  year?: string;
};

export type TExperience = {
  title: string;
  company: string;
  duration: string;
  description: string;
  technologies?: string[];
};

export type TAbout = {
  image: string;
  name: string;
  title: string;
  bio: string;
  education: TEducation[];
  experience?: TExperience[];
  address: string;
  resumeLink?: string;
};

export type TBlog = {
  title: string;
  content: string;
  image: string;
  category: string;
};

export type TMongoose = {
  _id: string;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
};
