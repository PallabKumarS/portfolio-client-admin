"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

// get all messages
export const getAllMessages = async () => {
  try {
    const res = await fetch(`${process.env.BASE_API}/messages`, {
      method: "GET",
      next: {
        revalidate: 60,
        tags: ["messages"],
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

// mark as read
export const markAsRead = async (id: string) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/messages/${id}/mark`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: await getValidToken(),
      },
    });

    revalidateTag("messages");

    return await res.json();
  } catch (error: any) {
    return error;
  }
};

// delete message
export const deleteMessage = async (id: string) => {
  try {
    const res = await fetch(`${process.env.BASE_API}/messages/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: await getValidToken(),
      },
    });

    revalidateTag("messages");

    return await res.json();
  } catch (error: any) {
    return error;
  }
};
