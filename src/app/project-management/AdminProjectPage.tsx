"use client";

import ProjectCard from "@/components/cards/ProjectCard";
import ProjectForm from "@/components/forms/ProjectForm";
import { Modal } from "@/components/shared/Modal";
import { NoData } from "@/components/shared/NoData";
import ShimmerButton from "@/components/shared/ShimmerButton";
import { TMongoose, TProject } from "@/types/types";
import { useState } from "react";

const AdminProjectPage = ({ data }: { data: (TMongoose & TProject)[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="my-10">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-semibold">All projects</h1>
        <Modal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title="Create Project"
          content={<ProjectForm setIsOpen={setIsOpen} />}
          trigger={<ShimmerButton>Add Project</ShimmerButton>}
        />
      </div>
      <div>
        {data?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 items-center justify-center gap-4">
            {data?.map((project) => (
              <ProjectCard edit={true} data={project} key={project?._id} />
            ))}
          </div>
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
};

export default AdminProjectPage;
