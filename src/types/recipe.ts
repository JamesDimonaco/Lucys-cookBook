import { Prisma, Recipe } from "@prisma/client";

// This type represents the full recipe fetched from Prisma with all nested relations
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

export interface Ingredient {
  id: string;
  name: string;
}

export interface IngredientSectionType {
  id: string;
  title: string;
  ingredients: Ingredient[];
}
export interface RecipeType {
  title: string;
  content: string;
  imageUrl: string | null;
  difficulty: string;
  duration: number | null;
  notes: string | null;
  type: string;
  tags: string[];
  whereFrom: string;
  id: string;
  description?: string;
  ingredientSections: any[];
}
