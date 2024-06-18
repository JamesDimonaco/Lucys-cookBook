import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getSession, signOut } from "@/utils/auth";
import {
  BookOpenIcon,
  SearchIcon,
  StarIcon,
  ClockIcon,
  TagIcon,
  LaptopIcon,
  PlusIcon,
} from "lucide-react";
import { auth } from "@/utils/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export async function Sidebar() {
  const { sessionUser } = await getSession();

  const userImage = sessionUser?.image || "";

  return (
    <div className="flex h-full flex-col gap-2 col-span-1">
      <div className="flex h-[60px] justify-between items-center border-b px-6">
        <Link className="flex items-center gap-2 font-semibold" href="/">
          <BookOpenIcon className="h-6 w-6" />
          <span className="">Recipes</span>
        </Link>
        {sessionUser ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9">
                <AvatarImage alt="@shadcn" src={userImage} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button type="submit">
                  <DropdownMenuItem>Sign Out</DropdownMenuItem>
                </button>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/api/auth/signin">
            <Button>Login</Button>
          </Link>
        )}
      </div>
      <div className="space-y-1 py-4  lg:block">
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
}
