"use client";
import { getSession } from "@/utils/auth";
import { ClockIcon, LaptopIcon, PlusIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { User } from "next-auth";

interface SidebarExtrasProps {
  sessionUser: User;
}

const SidebarExtras = ({ sessionUser }: SidebarExtrasProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth <= 768); // Set collapsed state for screens <= 768px
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Set initial collapsed state

    window.addEventListener("resize", handleResize); // Listen for window resize events

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up event listener on component unmount
    };
  }, []);

  return (
    <div>
      <button
        className={` ${
          isMobile ? "" : "hidden"
        } flex items-center justify-left h-10 px-4 mb-2  bg-gray-200  hover:bg-gray-300`}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <svg
          className={`h-6 w-6 ${isCollapsed ? "transform rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <div
        className={`space-y-1 py-4 bg-white z-10"  ${
          isCollapsed ? "hidden" : "lg:block"
        }`}
      >
        {sessionUser && (
          <Link
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
            href={`/${sessionUser.id}`}
          >
            <LaptopIcon className="text-gray-500" />
            <span className="ml-3">My Recipes</span>
          </Link>
        )}
        <Link
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          href="#"
        >
          <StarIcon className="text-gray-500" />
          <span className="ml-3">Favourites</span>
        </Link>
        <Link
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          href="#"
        >
          <ClockIcon className="text-gray-500" />
          <span className="ml-3">Recent</span>
        </Link>
        <Link
          className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          href="/recipe/new"
        >
          <PlusIcon className="text-gray-500" />
          <span className="ml-3">Add New Recipe</span>
        </Link>
      </div>
    </div>
  );
};

export default SidebarExtras;
