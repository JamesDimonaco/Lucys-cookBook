import NextAuth, { type Session, User } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextResponse } from "next/server";
import prisma from "@/utils/prisma";
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub, Google],
});
const baseUrl = process.env.BASE_URL || "http://localhost:3000";

export const getSession = async (): Promise<{
  session: Session;
  sessionUser: User;
} | null> => {
  const session = await auth();
  if (!session) return null;

  const sessionUser = session.user;
  if (!sessionUser) return null;

  return { session, sessionUser };
};

export const verifySession = async () => {
  const sessionData = await getSession();
  if (!sessionData) {
    return false;
  }
  return NextResponse.next();
};

export const deleteSession = async () => {
  const session = await auth();
  if (!session) {
    return NextResponse.redirect("/api/auth/signin");
  }
  return NextResponse.redirect("/api/auth/signout");
};
