/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div className="text-center space-y-6 max-w-2xl">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Image
            src="/notFound.gif"
            alt="404 Not Found"
            width={400}
            height={400}
            className="mx-auto rounded-lg"
            priority
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-bold text-primary"
        >
          Page Not Found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-muted-foreground text-lg"
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-4"
        >
          <Button
            onClick={() => router.push("/")}
            className="bg-primary hover:bg-primary/90"
          >
            Go Home
          </Button>
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="hover:bg-primary/10"
          >
            Go Back
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFound;
