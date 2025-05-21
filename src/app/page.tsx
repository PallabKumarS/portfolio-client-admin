import Image from "next/image";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";
import { Metadata } from "next";
import { getAbout } from "@/services/about.service";
import { LoaderComponent } from "@/components/shared/LoaderComponent";
import { TAbout } from "@/types/types";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard page contains all the information about the user",
};

const ProfilePage = async () => {
  const res = (await getAbout()) as { data: [TAbout] };

  if (!res?.data?.length) return <LoaderComponent centered size={"xl"} />;

  const welcomeWords = `Welcome ${res?.data[0]?.name}, to your dashboard!`;

  return (
    <div className="container mx-auto p-4">
      <TextGenerateEffect
        words={welcomeWords}
        className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-400 text-transparent bg-clip-text"
      />
      <div className="max-w-md mx-auto bg-black/60 rounded-lg p-6 text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <Image
            src={res?.data[0]?.image || "https://github.com/shadcn.png"}
            alt="Profile Picture"
            fill
            sizes={"500"}
            priority={true}
            className="rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
