import { Metadata } from "next";
import AdminProjectPage from "./AdminProjectPage";
import { getAllProjects } from "@/services/project.service";
import ContainerComponent from "@/components/shared/ContainerComponent";

export const metadata: Metadata = {
  title: "Project Management",
  description: "Add, delete or edit projects here",
};

const ProjectManageMentPage = async () => {
  const res = await getAllProjects();

  return (
    <ContainerComponent>
      <AdminProjectPage data={res?.data} />
    </ContainerComponent>
  );
};

export default ProjectManageMentPage;
