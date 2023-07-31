import Header from "./components/Header";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={`${inter.className} bg-background`}>
        <header className="bg-secondary sticky top-0 z-50">
          <Header />
        </header>
        {children}
      </body>
    </html>
  );
}
