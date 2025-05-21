/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";
import { TProject } from "@/types/types";
import { revalidateTag } from "next/cache";

// get all projects
export const getAllProjects = async () => {
  try {
    const res = await fetch(`${process.env.BASE_API}/projects`, {
      next: {
        tags: ["projects"],
        revalidate: 60,
      },
      headers: {
        Authorization: await getValidToken(),
      },
    });
    return await res.json();
  } catch (error: any) {
    return error;
  }
};

// get project details
export const getProjectDetails = async (projectId: string) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/projects/${projectId}`, {
      next: {
        tags: ["project"],
        revalidate: 60,
      },
      headers: {
        Authorization: await getValidToken(),
      },
    });
    return await res.json();
  } catch (error: any) {
    return error;
  }
};

// create project
export const createProject = async (data: TProject) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: await getValidToken(),
      },
      body: JSON.stringify(data),
    });

    revalidateTag("projects");
    revalidateTag("project");

    return await res.json();
  } catch (error: any) {
    return error;
  }
};

// update project
export const updateProject = async (data: TProject, projectId: string) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/projects${projectId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: await getValidToken(),
      },
      body: JSON.stringify(data),
    });

    revalidateTag("projects");
    revalidateTag("project");

    return await res.json();
  } catch (error: any) {
    return error;
  }
};
