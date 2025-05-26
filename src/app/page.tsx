import { Metadata } from "next";
import AboutPage from "./AboutPage";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Dashboard page contains personal information about Pallab Kumar Sarker",
};

const ProfilePage = async () => {
  return (
    <div>
      <AboutPage />
    </div>
  );
};

export default ProfilePage;
