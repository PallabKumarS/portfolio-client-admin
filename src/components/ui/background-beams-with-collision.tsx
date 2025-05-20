"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

export const BackgroundBeamsWithCollision = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const colorThemes = [
    "from-primary via-primary/70 to-transparent",
    "from-accent via-accent/70 to-transparent",
    "from-indigo-500 via-purple-500 to-transparent",
    "from-blue-500 via-cyan-500 to-transparent",
    "from-rose-500 via-pink-500 to-transparent",
    "from-amber-500 via-yellow-500 to-transparent",
    "from-emerald-500 via-green-500 to-transparent",
  ];

  // Generate random color theme index
  const getRandomColorTheme = () => {
    return colorThemes[Math.floor(Math.random() * colorThemes.length)];
  };

  // Generate random width class
  const getRandomWidth = () => {
    const widths = ["w-0.5", "w-1", "w-1.5", "w-2"];
    return widths[Math.floor(Math.random() * widths.length)];
  };

  const getRandomHeight = () => {
    const widths = ["h-4", "h-6", "h-8", "h-10"];
    return widths[Math.floor(Math.random() * widths.length)];
  };

  const beams = [
    {
      initialX: 10,
      translateX: 10,
      duration: 7,
      repeatDelay: 3,
      delay: 2,
      colorTheme: getRandomColorTheme(),
      width: getRandomWidth(),
      height: getRandomHeight(),
    },
    {
      initialX: 600,
      translateX: 600,
      duration: 3,
      repeatDelay: 3,
      delay: 4,
      colorTheme: getRandomColorTheme(),
      width: getRandomWidth(),
      height: getRandomHeight(),
    },
    {
      initialX: 100,
      translateX: 100,
      duration: 7,
      repeatDelay: 7,
      height: getRandomHeight(),
      colorTheme: getRandomColorTheme(),
      width: getRandomWidth(),
    },
    {
      initialX: 400,
      translateX: 400,
      duration: 5,
      repeatDelay: 14,
      delay: 4,
      colorTheme: getRandomColorTheme(),
      width: getRandomWidth(),
    },
    {
      initialX: 800,
      translateX: 800,
      duration: 11,
      repeatDelay: 2,
      height: getRandomHeight(),
      colorTheme: getRandomColorTheme(),
      width: getRandomWidth(),
    },
    {
      initialX: 1000,
      translateX: 1000,
      duration: 4,
      repeatDelay: 2,
      height: getRandomHeight(),
      colorTheme: getRandomColorTheme(),
      width: getRandomWidth(),
    },
    {
      initialX: 1200,
      translateX: 1200,
      duration: 6,
      repeatDelay: 4,
      delay: 2,
      height: getRandomHeight(),
      colorTheme: getRandomColorTheme(),
      width: getRandomWidth(),
    },
    {
      initialX: 1400,
      translateX: 1400,
      duration: 6,
      repeatDelay: 4,
      delay: 2,
      height: getRandomHeight(),
      colorTheme: getRandomColorTheme(),
      width: getRandomWidth(),
    },
    {
      initialX: 1600,
      translateX: 1600,
      duration: 6,
      repeatDelay: 4,
      delay: 2,
      height: getRandomHeight(),
      colorTheme: getRandomColorTheme(),
      width: getRandomWidth(),
    },
    {
      initialX: 1800,
      translateX: 1800,
      duration: 6,
      repeatDelay: 4,
      delay: 2,
      height: getRandomHeight(),
      colorTheme: getRandomColorTheme(),
      width: getRandomWidth(),
    },
    {
      initialX: 1960,
      translateX: 1960,
      duration: 6,
      repeatDelay: 4,
      delay: 2,
      className: "h-6 w-6",
      colorTheme: getRandomColorTheme(),
      height: getRandomHeight(),
    },
  ];

  return (
    <div
      ref={parentRef}
      className={cn(
        "min-h-fit bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-950 dark:to-neutral-800 relative flex items-center w-full justify-center overflow-hidden",

        className
      )}
    >
      {beams.map((beam) => (
        <CollisionMechanism
          key={beam.initialX + "beam-idx"}
          beamOptions={beam}
          containerRef={containerRef as React.RefObject<HTMLDivElement>}
          parentRef={parentRef as React.RefObject<HTMLDivElement>}
        />
      ))}

      {children}
      <div
        ref={containerRef}
        className="absolute bottom-0 bg-neutral-100 w-full inset-x-0 pointer-events-none"
        style={{
          boxShadow:
            "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
        }}
      ></div>
    </div>
  );
};

const CollisionMechanism = React.forwardRef<
  HTMLDivElement,
  {
    containerRef: React.RefObject<HTMLDivElement>;
    parentRef: React.RefObject<HTMLDivElement>;
    beamOptions?: {
      initialX?: number;
      translateX?: number;
      initialY?: number;
      translateY?: number;
      rotate?: number;
      className?: string;
      duration?: number;
      delay?: number;
      repeatDelay?: number;
      colorTheme?: string;
      width?: string;
      height?: string;
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>(({ parentRef, containerRef, beamOptions = {} }, ref) => {
  const beamRef = useRef<HTMLDivElement>(null);
  const [collision, setCollision] = useState<{
    detected: boolean;
    coordinates: { x: number; y: number } | null;
  }>({
    detected: false,
    coordinates: null,
  });
  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);
  const [pageHeight, setPageHeight] = useState("6000px"); // Default fallback height

  // Calculate and update page height
  useEffect(() => {
    const updatePageHeight = () => {
      if (parentRef.current) {
        const height = Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          parentRef.current.scrollHeight
        );
        setPageHeight(`${height + 500}px`); // Add extra to ensure it goes beyond the bottom
      }
    };

    updatePageHeight();
    window.addEventListener("resize", updatePageHeight);
    window.addEventListener("scroll", updatePageHeight);

    return () => {
      window.removeEventListener("resize", updatePageHeight);
    };
  }, [parentRef]);

  useEffect(() => {
    const checkCollision = () => {
      if (
        beamRef.current &&
        containerRef.current &&
        parentRef.current &&
        !cycleCollisionDetected
      ) {
        const beamRect = beamRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();

        if (beamRect.bottom >= containerRect.top) {
          const relativeX =
            beamRect.left - parentRect.left + beamRect.width / 2;
          const relativeY = beamRect.bottom - parentRect.top;

          setCollision({
            detected: true,
            coordinates: {
              x: relativeX,
              y: relativeY,
            },
          });
          setCycleCollisionDetected(true);
        }
      }
    };

    const animationInterval = setInterval(checkCollision, 50);

    return () => clearInterval(animationInterval);
  }, [cycleCollisionDetected, containerRef, parentRef]);

  useEffect(() => {
    if (collision.detected && collision.coordinates) {
      setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setCycleCollisionDetected(false);
      }, 2000);

      setTimeout(() => {
        setBeamKey((prevKey) => prevKey + 1);
      }, 2000);
    }
  }, [collision]);

  return (
    <>
      <motion.div
        key={beamKey}
        ref={beamRef}
        animate="animate"
        initial={{
          translateY: beamOptions.initialY || "-200px",
          translateX: beamOptions.initialX || "0px",
          rotate: beamOptions.rotate || 0,
        }}
        variants={{
          animate: {
            translateY: beamOptions.translateY || pageHeight, // Use dynamic page height
            translateX: beamOptions.translateX || "0px",
            rotate: beamOptions.rotate || 0,
          },
        }}
        transition={{
          duration: beamOptions.duration || 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          delay: beamOptions.delay || 0,
          repeatDelay: beamOptions.repeatDelay || 0,
        }}
        className={cn(
          "absolute left-0 top-20 m-auto h-14 rounded-full bg-gradient-to-t",
          beamOptions.colorTheme,
          beamOptions.className,
          beamOptions.width,
          beamOptions.height
        )}
      />
      <AnimatePresence>
        {collision.detected && collision.coordinates && (
          <Explosion
            key={`${collision.coordinates.x}-${collision.coordinates.y}`}
            className=""
            color={beamOptions.colorTheme}
            style={{
              left: `${collision.coordinates.x}px`,
              top: `${collision.coordinates.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
});

CollisionMechanism.displayName = "CollisionMechanism";

const Explosion = ({
  colorTheme,
  ...props
}: React.HTMLProps<HTMLDivElement> & { colorTheme?: string }) => {
  const getExplosionColors = () => {
    if (!colorTheme) return "from-indigo-500 to-purple-500";

    // Extract the color names from the colorTheme string
    const matches = colorTheme.match(/from-([\w-]+).*?via-([\w-]+)/);
    if (matches && matches.length >= 3) {
      return `from-${matches[1]} to-${matches[2]}`;
    }

    return "from-indigo-500 to-purple-500";
  };

  const explosionColors = getExplosionColors();

  const spans = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: Math.floor(Math.random() * 80 - 40),
    directionY: Math.floor(Math.random() * -50 - 10),
  }));

  return (
    <div {...props} className={cn("absolute z-50 h-2 w-2", props.className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className={`absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent ${
          colorTheme
            ? colorTheme
                .replace("from-", "via-")
                .replace("via-", "")
                .replace("to-transparent", "")
            : "via-indigo-500"
        } to-transparent blur-sm`}
      ></motion.div>
      {spans.map((span) => (
        <motion.span
          key={span.id}
          initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
          animate={{
            x: span.directionX,
            y: span.directionY,
            opacity: 0,
          }}
          transition={{ duration: Math.random() * 1.5 + 0.5, ease: "easeOut" }}
          className={`absolute h-1 w-1 rounded-full bg-gradient-to-b ${explosionColors}`}
        />
      ))}
    </div>
  );
};
