import Header from "../components/Header";
import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/utils/tw-merge";
import { Sidebar } from "@/components/sidebar";

export const metadata = {
  title: "Lucy's Recipes",
  description: "A collection of recipes from Lucy's kitchen and friends",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <main className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Sidebar />
          {children}
        </main>
      </body>
    </html>
  );
}
