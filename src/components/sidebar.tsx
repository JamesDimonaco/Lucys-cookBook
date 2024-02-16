"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  BookOpenIcon,
  SearchIcon,
  StarIcon,
  ClockIcon,
  TagIcon,
} from "lucide-react";
import { auth } from "@/utils/auth";

export async function Sidebar() {
  const session = await auth();
  console.log(session);

  return (
    <div>
      <div className="flex h-full flex-col gap-2">
        <div className="flex h-[60px] justify-between items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="/">
            <BookOpenIcon className="h-6 w-6" />
            <span className="">Recipes</span>
          </Link>
          {session ? (
            <Link href="/api/auth/signout">
              <Button>Logout</Button>
            </Link>
          ) : (
            <Link href="/api/auth/signin">
              <Button>Login</Button>
            </Link>
          )}
          {/* <Link href="/recipe">
            <Button>Add</Button>
          </Link> */}
        </div>
        <div className="flex-1 overflow-auto p-4">
          <nav className="grid items-start px-4 text-sm font-medium">
            <Link
              className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
              href="#"
            >
              <BookOpenIcon className="h-4 w-4" />
              All Recipes
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              <StarIcon className="h-4 w-4" />
              Favourites
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              <ClockIcon className="h-4 w-4" />
              Recent
            </Link>
            <Link
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
              href="#"
            >
              <TagIcon className="h-4 w-4" />
              Categories
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
