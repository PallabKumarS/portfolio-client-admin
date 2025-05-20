

import LoginPage from "@/components/pages/LoginPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PKS Portfolio | Login",
  description: "Login to your account",
};

const page = () => {
  return <LoginPage />;
};

export default page;
