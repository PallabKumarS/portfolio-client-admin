"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FiEye, FiGithub, FiGlobe } from "react-icons/fi";
import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { BackgroundGradient } from "../ui/gradient";
import ImageCarousel from "../shared/ImageCarousel";
import { TMongoose, TProject } from "@/types/types";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { Modal } from "../shared/Modal";
import ProjectForm from "../forms/ProjectForm";
import { useState } from "react";
import ConfirmationBox from "../shared/ConfirmationBox";
import { toast } from "sonner";

interface ProjectCardProps {
  data: TProject & TMongoose;
  edit?: boolean;
}

const ProjectCard = ({ data, edit = false }: ProjectCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    title,
    images,
    description,
    technology,
    liveLink,
    clientRepo,
    serverRepo,
  } = data;

  const deleteProject = async (id: string) => {
    const toastId = toast.loading("Deleting project...");

    const res = await fetch(`/api/projects/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Project deleted successfully", {
        id: toastId,
      });
    } else {
      toast.error("Something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <CardContainer className="inter-var w-72 sm:w-96 md:w-full ">
      <BackgroundGradient className="rounded-[22px] p-4 bg-white dark:bg-zinc-900">
        <Card className="w-full bg-transparent border-none">
          <CardBody className="relative w-72 sm:w-96 md:w-full h-fit flex flex-col gap-y-3 dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] rounded-xl p-2 md:p-6">
            {/* title  */}
            <CardItem className="text-lg sm:text-xl font-bold text-neutral-600 dark:text-white">
              {title}
            </CardItem>

            {/* image here  */}
            <CardItem className="">
              <ImageCarousel images={images} title={title} />
            </CardItem>

            {/* description here  */}
            <CardItem className="text-neutral-500 text-xs sm:text-sm mt-4 dark:text-neutral-300 line-clamp-3">
              {description}
            </CardItem>

            {/* technology here  */}
            <CardItem className="flex flex-wrap gap-1 md:gap-2">
              {technology.slice(0, 9).map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="text-xs sm:text-sm animate-shine bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 bg-[length:200%_100%]"
                >
                  {tech}
                </Badge>
              ))}
              {technology.length > 9 && (
                <Badge
                  variant="secondary"
                  className="text-xs sm:text-sm animate-shine bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20 bg-[length:200%_100%]"
                >
                  +{technology.length - 9}
                </Badge>
              )}
            </CardItem>

            {/* links here  */}
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <CardItem>
                <Link href={liveLink} target="_blank">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs sm:text-sm"
                  >
                    <FiGlobe className="w-3 h-3 md:w-4 md:h-4" />
                    Live Site
                  </Button>
                </Link>
              </CardItem>

              {clientRepo && (
                <CardItem>
                  <Link href={clientRepo} target="_blank">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs sm:text-sm"
                    >
                      <FiGithub className="w-3 h-3 md:w-4 md:h-4" />
                      Client
                    </Button>
                  </Link>
                </CardItem>
              )}

              {serverRepo && (
                <CardItem>
                  <Link href={serverRepo} target="_blank">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs sm:text-sm"
                    >
                      <FiGithub className="w-3 h-3 md:w-4 md:h-4" />
                      Server
                    </Button>
                  </Link>
                </CardItem>
              )}
            </div>

            {/* management button here  */}
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
                    title="Edit Project"
                    content={
                      <ProjectForm
                        setIsOpen={setIsOpen}
                        data={data}
                        edit={true}
                      />
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
                    onConfirm={() => deleteProject(data._id)}
                  />
                </CardItem>
              </div>
            ) : (
              <CardItem>
                <Link href={`/projects/${data._id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs sm:text-sm text-primary"
                  >
                    <FiEye className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                    Details
                  </Button>
                </Link>
              </CardItem>
            )}
          </CardBody>
        </Card>
      </BackgroundGradient>
    </CardContainer>
  );
};

export default ProjectCard;
