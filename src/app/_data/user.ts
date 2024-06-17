import { getSession } from "@/utils/auth";
import Prisma from "@/utils/prisma";

export const getUser = async () => {
  const { sessionUser } = await getSession();

  const user = await Prisma.user.findUnique({
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

export const getUserRecipes = async () => {
  const { sessionUser } = await getSession();

  const recipes = await Prisma.recipe.findMany({
    where: {
      authorId: sessionUser.id,
    },
  });

  return recipes;
};

export const getUserRecipe = async (recipeId: string) => {
  const { sessionUser } = await getSession();

  const recipe = await Prisma.recipe.findUnique({
    where: {
      id: recipeId,
      authorId: sessionUser.id,
    },
  });

  return recipe;
};
