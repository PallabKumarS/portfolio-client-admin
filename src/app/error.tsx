"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
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
            src="/error.gif"
            alt="Error Illustration"
            width={300}
            height={300}
            className="mx-auto"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-bold text-primary"
        >
          Oops! Something went wrong
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-destructive/10 text-destructive p-4 rounded-lg"
        >
          {error.message}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Button
            onClick={() => {
              reset();
              window.location.reload();
            }}
            className="bg-primary hover:bg-primary/90"
          >
            Try Again
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ErrorPage;
