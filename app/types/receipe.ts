import { Prisma } from "@prisma/client";

export type FullRecipeTypeFromPrisma = Prisma.RecipeGetPayload<{
  include: {
    author: true;
    ingredientSections: {
      include: {
        ingredients: true;
      };
    };
  };
}>;
