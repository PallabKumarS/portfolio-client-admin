"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const Logo = () => {
  return (
    <div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-4 text-center"
      >
        <Link
          href="/"
          className="font-bold text-2xl bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent"
        >
          Pallab Kumar Sarker
        </Link>
      </motion.div>
    </div>
  );
};

export default Logo;
