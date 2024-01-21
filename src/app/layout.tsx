import Header from "../components/Header";
import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/utils/tw-merge";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {" "}
        <header className="bg-secondary sticky top-0 z-50">
          <Header />
        </header>
        {children}
      </body>
    </html>
  );
}
