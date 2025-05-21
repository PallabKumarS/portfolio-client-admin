import LoginPage from "@/components/pages/LoginPage";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "PKS Portfolio | Login",
  description: "Login to your account",
};

const page = () => {
  return (
    <Suspense>
      <LoginPage />
    </Suspense>
  );
};

export default page;
