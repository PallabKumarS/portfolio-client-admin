import ContainerComponent from "@/components/shared/ContainerComponent";
import { Metadata } from "next";
import AdminSkillPage from "./AdminSkillPage";

export const metadata: Metadata = {
  title: "Skill Management",
  description:
    "Skill Management page contains all the information about the user",
};

const page = () => {
  return (
    <ContainerComponent>
      <AdminSkillPage />
    </ContainerComponent>
  );
};

export default page;
