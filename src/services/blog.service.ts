/* eslint-disable @typescript-eslint/no-explicit-any */
import { getValidToken } from "@/lib/verifyToken";
import { FieldValues } from "react-hook-form";

// get all blog
export const getAllBlog = async () => {
  try {
    const res = await fetch(`${process.env.BASE_API}/blogs`, {
      method: "GET",
      next: {
        revalidate: 60,
        tags: ["blogs"],
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

// get single blog
export const getSingleBlog = async (id: string) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/blogs/${id}`, {
      method: "GET",
      next: {
        revalidate: 60,
        tags: ["blog"],
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

// create blog
export const createBlog = async (data: FieldValues) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/blog`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: await getValidToken(),
      },
    });

    return await res.json();
  } catch (error: any) {
    return error;
  }
};

// update blog
export const updateBlog = async (data: FieldValues, id: string) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/blogs/${id}`, {
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

// delete blog
export const deleteBlog = async (id: string) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/blogs/${id}`, {
      method: "DELETE",
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
