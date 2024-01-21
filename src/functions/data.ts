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
