import Header from "../components/Header";
import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/utils/tw-merge";
import { Sidebar } from "@/components/sidebar";

export const metadata = {
  title: "Recipe Book",
  description: "A collection of recipes from your kitchen and friends",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <main className="grid gap-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          <div className="sticky top-0 h-screen">
            <Sidebar />
          </div>
          <div className="md:col-span-2  lg:col-span-3 flex flex-grow">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
