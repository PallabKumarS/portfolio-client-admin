"use client";

import { LoaderComponent } from "@/components/shared/LoaderComponent";
import { getAllSkills } from "@/services/skill.service";
import { TSkill } from "@/types/types";
import { useEffect, useState } from "react";

const AdminSkillPage = () => {
  const [skillData, setSkillData] = useState<TSkill>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getSkills = async () => {
      const res = await getAllSkills();
      setSkillData(res?.data[0]);
      setLoading(false);
    };

    getSkills();
  });

  if (loading) return <LoaderComponent centered size={"xl"} />;

  return (
    <div>
      <h1>This is AdminSkillPage Component</h1>
    </div>
  );
};

export default AdminSkillPage;
