/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

// get about
export const getAbout = async () => {
  try {
    const res = await fetch(`${process.env.BASE_API}/about`, {
      method: "GET",

      next: {
        revalidate: 60,
        tags: ["about"],
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

// create about
export const createAbout = async (data: FieldValues) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/about`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: await getValidToken(),
      },
    });

    revalidateTag("about");
    return await res.json();
  } catch (error: any) {
    return error;
  }
};

// update about
export const updateAbout = async (data: FieldValues, id: string) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/about/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: await getValidToken(),
      },
    });

    revalidateTag("about");
    return await res.json();
  } catch (error: any) {
    return error;
  }
};
