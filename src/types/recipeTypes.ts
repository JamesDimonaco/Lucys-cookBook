import { Prisma } from "@prisma/client";

// This interface represents the full recipe fetched from Prisma with all nested relations
export interface IFullRecipeFromPrisma
  extends Prisma.RecipeGetPayload<{
    include: {
      author: true;
      ingredientSections: {
        include: {
          ingredients: true;
        };
      };
    };
  }> {}

export interface IIngredient {
  id: string;
  name: string;
}

export interface IIngredientSection {
  id: string | null;
  title: string;
  ingredients: IIngredient[] | null;
}

export interface IRecipe {
  id: string;
  title: string;
  content?: string | null;
  imageUrl?: string | null;
  difficulty?: string | null;
  duration?: number | null;
  ingredientSections: IIngredientSection[];
  notes?: string | null;
  tags: string[];
  type?: string | null;
  makes?: number | null;
  description?: string | null;
  whereFrom?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  author?: Prisma.UserGetPayload<{}> | null;
  authorId?: string | null;
}
