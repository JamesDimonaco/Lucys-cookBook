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

export const getRecipes = async ({
  limit = 10,
  skip = 0,
  search,
}: {
  limit: number;
  skip: number;
  search?: string;
}) => {
  try {

    const recipes = await prisma.recipe.findMany({
      take: limit,
      skip: skip,
      where: search
        ? {
            OR: [
              { title: { contains: search } },
              { content: { contains: search } },
              { description: { contains: search } },
              { tags: { hasSome: [search] } },
            ],
          }
        : {},
    });

    return { recipes: JSON.parse(JSON.stringify(recipes)) };
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return { error: error };
  }
};
