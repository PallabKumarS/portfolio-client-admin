"use client";

import { BackgroundGradient } from "../ui/gradient";

export const NoData = () => {
  return (
    <div className="max-w-lg mx-auto mt-28 mb-10">
      <BackgroundGradient className="rounded-[22px] max-w-sm p-4 bg-white dark:bg-zinc-900 my-10 mx-auto">
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-tr from-primary/20 to-primary/40 mb-4 mx-auto">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-bold text-neutral-600 dark:text-white mb-2 text-center">
          No Data Found
        </h3>
        <p className="text-neutral-500 dark:text-neutral-300">
          There&apos;s nothing here yet. Data will appear once available.
        </p>
      </BackgroundGradient>
    </div>
  );
};
