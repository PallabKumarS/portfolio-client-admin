import { Metadata } from "next";
import AdminProjectPage from "./AdminProjectPage";
import { getAllProjects } from "@/services/project.service";

export const metadata: Metadata = {
  title: "Project Management",
  description: "Add, delete or edit projects here",
};

const ProjectManageMentPage = async () => {
  const res = await getAllProjects();

  return <AdminProjectPage data={res?.data} />;
};

export default ProjectManageMentPage;
