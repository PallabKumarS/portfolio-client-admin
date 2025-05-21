"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FiArrowRight, FiEdit, FiTrash2 } from "react-icons/fi";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Image from "next/image";
import { TBlog, TMongoose } from "@/types/types";
import { Modal } from "../shared/Modal";
import { useState } from "react";
import ConfirmationBox from "../shared/ConfirmationBox";
import { toast } from "sonner";
import BlogForm from "../forms/BlogForm";

interface BlogCardProps {
  data: TBlog & TMongoose;
  edit?: boolean;
}

const BlogCard = ({ data, edit = false }: BlogCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { title, content, image, category } = data;

  const deleteBlog = async (id: string) => {
    const toastId = toast.loading("Deleting blog...");

    const res = await fetch(`/api/blogs/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Blog deleted successfully", {
        id: toastId,
      });
    } else {
      toast.error("Something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <CardContainer className="inter-var w-72 sm:w-96 md:w-full">
      <Card className="w-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-100 via-teal-100 to-violet-100 dark:from-rose-900/20 dark:via-teal-900/20 dark:to-violet-900/20 border-none">
        <CardBody className="relative w-72 sm:w-96 md:w-full h-fit flex flex-col gap-y-3 dark:hover:shadow-2xl dark:hover:shadow-purple-500/[0.1] rounded-xl p-2 md:p-6">
          <CardItem className="absolute top-4 right-4">
            <Badge
              variant="secondary"
              className="bg-black/10 dark:bg-white/10 backdrop-blur-md"
            >
              {category}
            </Badge>
          </CardItem>

          <CardItem className="w-full h-48 relative rounded-lg overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </CardItem>

          <CardItem className="text-lg sm:text-xl font-bold text-neutral-600 dark:text-white">
            {title}
          </CardItem>

          <CardItem className="text-neutral-500 text-xs sm:text-sm dark:text-neutral-300 line-clamp-3">
            {content}
          </CardItem>

          {edit ? (
            <div className="mt-auto flex items-center gap-2">
              <CardItem>
                <Modal
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  trigger={
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs sm:text-sm text-green-500"
                    >
                      <FiEdit className="w-3 h-3 md:w-4 md:h-4" />
                      Edit
                    </Button>
                  }
                  title="Edit Blog"
                  content={
                    <BlogForm setIsOpen={setIsOpen} data={data} edit={true} />
                  }
                />
              </CardItem>
              <CardItem>
                <ConfirmationBox
                  trigger={
                    <p className="text-xs sm:text-sm flex items-center gap-1 justify-center bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 px-3 rounded-md">
                      <FiTrash2 className="w-3 h-3 md:w-4 md:h-4" />
                      Delete
                    </p>
                  }
                  onConfirm={() => deleteBlog(data._id)}
                />
              </CardItem>
            </div>
          ) : (
            <CardItem className="mt-auto">
              <Link href={`/blogs/${data._id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs sm:text-sm group"
                >
                  Read More
                  <FiArrowRight className="ml-2 w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardItem>
          )}
        </CardBody>
      </Card>
    </CardContainer>
  );
};

export default BlogCard;
