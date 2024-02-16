import { RecipeType } from "@/types/recipe";
import prisma from "@/utils/prisma";

export const getRecipeData = async (id: string) => {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id: String(id) },
      include: {
        author: {
          select: { name: true },
        },
      },
    });
    return recipe;
  } catch (error) {
    console.error("Error fetching recipe:", error);
  }
};

export const getRecipes = async (limit = 10, skip = 0) => {
  try {
    const recipes = await prisma.recipe.findMany({
      take: limit,
      skip: skip,
    });
    return recipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};
