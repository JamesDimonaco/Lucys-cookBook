import { type NextRequest, NextResponse } from "next/server";
import { verifySession } from "./utils/auth";

export default async function middleware(req: NextRequest) {
  const baseUrl = process.env.BASE_URL || "https://recpies.dimonaco.co.uk";

  const publicRoutes = ["/", "/api/auth/signin", "/api/auth/signout"];

  const currentPath = req.nextUrl.pathname;

  if (publicRoutes.includes(currentPath)) {
    return NextResponse.next();
  }
  console.log("Current path", currentPath);

  console.log("Verifying session");

  const validSession = await verifySession();

  if (!validSession) return NextResponse.redirect(`${baseUrl}/api/auth/signin`);

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
