import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/shared/Footer";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/app-sidebar";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import Providers from "@/providers/Provider";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "PKS Portfolio",
  description: "Portfolio of Pallab Kumar Sarker (PKS)",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="">
        <Providers>
          <BackgroundBeamsWithCollision>
            <SidebarProvider className="flex min-h-screen overflow-x-hidden">
              {/* Add overflow-x-hidden */}
              <Suspense>
                <AppSidebar />
              </Suspense>
              <div className="flex flex-1 flex-col overflow-x-hidden">
                {/* Add overflow-x-hidden */}
                <div className="flex items-center justify-between border-b px-4 py-2">
                  <SidebarTrigger />
                  <div className="flex items-center justify-between gap-2">
                    <ThemeToggle />
                  </div>
                </div>
                <div className="mt-2 flex-1 p-4 min-h-screen overflow-x-hidden">
                  {/* Add overflow-x-hidden */}
                  {children}
                </div>
                <Footer />
              </div>
            </SidebarProvider>
          </BackgroundBeamsWithCollision>
        </Providers>
      </body>
    </html>
  );
}
