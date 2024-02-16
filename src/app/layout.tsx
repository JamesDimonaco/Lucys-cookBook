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
        {" "}
        {/* <header className="bg-secondary sticky top-0 z-50">
          <Header />
        </header> */}
        <main className="grid max-w-6xl min-h-screen w-full gap-4 p-4 mx-auto lg:grid-cols-[250px_1fr]">
          <Sidebar />
          {children}
        </main>
      </body>
    </html>
  );
}
