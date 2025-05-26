/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

// get all  skills
export const getAllSkills = async () => {
  try {
    const res = await fetch(`${process.env.BASE_API}/skills`, {
      method: "GET",
      next: {
        revalidate: 60,
        tags: ["skills"],
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: await getValidToken(),
      },
    });

    return await res.json();
  } catch (error: any) {
    return error;
  }
};

// create skill
export const createSkill = async (data: FieldValues) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/skills`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: await getValidToken(),
      },
    });

    revalidateTag("skills");

    return await res.json();
  } catch (error: any) {
    return error;
  }
};

// update skills
export const updateSkill = async (data: FieldValues, id: string) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/skills/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: await getValidToken(),
      },
    });

    return await res.json();
  } catch (error: any) {
    return error;
  }
};
