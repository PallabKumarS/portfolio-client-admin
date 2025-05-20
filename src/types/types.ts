export type TProject = {
  title: string;
  images: string[];
  description: string;
  technology: string[];
  liveLink: string;
  clientRepo?: string;
  serverRepo?: string;
  videoLink?: string;
};

export type TMessage = {
  message: string;
  email: string;
  name: string;
};

export type TMongoose = {
  _id: string;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TUser = {
  name?: string;
  email?: string;
  image?: string;
  password?: string;
};
