import Image from "next/image";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";
import { Metadata } from "next";
import { getMe } from "@/services/user.service";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard page contains all the information about the user",
};

const ProfilePage = async () => {
  const user = await getMe();
  const welcomeWords = `Welcome ${user?.data?.name}, to your dashboard!`;

  return (
    <div className="container mx-auto p-4">
      <TextGenerateEffect
        words={welcomeWords}
        className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-400 text-transparent bg-clip-text"
      />
      <div className="max-w-md mx-auto bg-black/60 rounded-lg p-6 text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <Image
            src={user?.data?.image || "https://github.com/shadcn.png"}
            alt="Profile Picture"
            fill
            className="rounded-full object-cover"
          />
        </div>
        <p className="text-white/80">{user?.data?.email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
