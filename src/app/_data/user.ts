import { getSession } from "@/utils/auth";
import prisma from "@/utils/prisma";

export const getUser = async () => {
  const { sessionUser } = await getSession();

  if (!sessionUser) return null;

  const user = await prisma.user.findUnique({
    where: {
      id: sessionUser.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });

  return user;
};

export const getUserById = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });
  return user;
};

export const getUserRecipe = async (recipeId: string) => {
  const { sessionUser } = await getSession();
  if (!sessionUser) return null;

  const recipe = await prisma.recipe.findUnique({
    where: {
      id: recipeId,
      authorId: sessionUser.id,
    },
  });

  return recipe;
};
