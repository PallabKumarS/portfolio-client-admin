"use client";

import { motion } from "framer-motion";
import { FaProjectDiagram } from "react-icons/fa";
import { MdEmail, MdDashboard } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Logo from "./Logo";

const Dashboard = () => {
  const pathname = usePathname();

  const sidebarLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <MdDashboard className="h-5 w-5" />,
    },
    {
      name: "Project Management",
      path: "/dashboard/project-management",
      icon: <FaProjectDiagram className="h-5 w-5" />,
    },
    {
      name: "Messages",
      path: "/dashboard/messages",
      icon: <MdEmail className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen flex sticky top-0 left-0 z-50 ">
      {/* Desktop Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className="hidden lg:flex flex-col w-64 bg-background border-r bg-gradient-to-b from-slate-100 via-slate-200 to-slate-300 dark:from-neutral-950 dark:to-neutral-900"
      >
        <div className="flex flex-col gap-2 p-4">
          {sidebarLinks.map((link) => (
            <Link href={link.path} key={link.path}>
              <motion.div
                whileHover={{
                  x: 5,
                  backgroundColor: "rgba(var(--primary), 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  pathname === link.path
                    ? "bg-primary/10 text-primary border-r-2 border-primary"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.icon}
                <span>{link.name}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </motion.div>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-64 bg-background border-r bg-gradient-to-b from-slate-100 via-slate-200 to-slate-300 dark:from-neutral-950 dark:to-neutral-900"
          >
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
            <motion.div
              className="flex flex-col gap-4 mt-6"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="">
                <Logo />
              </div>

              {sidebarLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={link.path}>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        pathname === link.path
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Dashboard;
