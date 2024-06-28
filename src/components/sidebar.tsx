import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getSession, signOut } from "@/utils/auth";
import { BookOpenIcon } from "lucide-react";
import { auth } from "@/utils/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import SidebarExtras from "./sidebar-extras";

export async function Sidebar() {
  const { sessionUser } = await getSession();

  const userImage = sessionUser?.image || "";

  return (
    <div className="flex h-full flex-col gap-2 col-span-1 ">
      <div className="flex h-[60px] justify-between items-center border-b px-6 bg-white ">
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
      {sessionUser && <SidebarExtras sessionUser={sessionUser} />}
    </div>
  );
}
