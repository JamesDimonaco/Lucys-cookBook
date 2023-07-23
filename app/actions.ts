"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface IngredientSectionType {
  title: string;
  ingredients: string[];
}

export interface RecipeType {
  title: string;
  content: string;
  imageUrl: string | null;
  difficulty: string;
  duration: number | null;
  notes: string | null;
  tags: string[];
  whereFrom: string;
  id?: string;
  ingredientSections: any[];
}

export const editRecipe = async (recipe: any) => {
  const data: Record<string, any> = {};
  for (let pair of recipe.entries()) {
    data[pair[0]] = pair[1];
  }
  // Prepare ingredient sections
  let ingredientSections = [];
  let i = 0;
  while (data[`ingredientTitle${i}`] !== undefined) {
    ingredientSections.push({
      title: data[`ingredientTitle${i}`],
      ingredients: data[`ingredients${i}`].split(","),
    });
    i++;
  }

  const ingredientSectionsData = ingredientSections.map(
    (section: IngredientSectionType) => ({
      title: section.title,
      ingredients: {
        create: section.ingredients.map((ingredient) => ({
          name: ingredient,
        })),
      },
    })
  );

  const recipeData: RecipeType = {
    title: data.title,
    content: data.content,
    imageUrl: data.imageUrl || null,
    difficulty: data.difficulty || "none",
    duration: parseInt(data.duration, 10) || null,
    notes: data.notes || null,
    tags: data.tags ? data.tags : [],
    whereFrom: data.whereFrom || "",
    ingredientSections: ingredientSectionsData,
    id: data.id,
  };

  console.log(recipeData, "recipeData");

  // Delete existing ingredient sections
  const existingIngredientSections = await prisma.ingredientSection.findMany({
    where: { recipeId: data.id },
  });

  console.log(existingIngredientSections, "existingIngredientSections");

  for (let section of existingIngredientSections) {
    await prisma.ingredient.deleteMany({
      where: { ingredientSectionId: section.id },
    });
    await prisma.ingredientSection.delete({ where: { id: section.id } });
  }

  // Update recipe and create new ingredient sections
  const updatedRecipe = await prisma.recipe.update({
    where: {
      id: data.id,
    },
    data: {
      ...recipeData,
      ingredientSections: {
        create: ingredientSectionsData,
      },
    },
    include: {
      ingredientSections: {
        include: {
          ingredients: true,
        },
      },
    },
  });

  revalidatePath(`/recipes/${updatedRecipe.id}`);

  return updatedRecipe;
};

export async function postRecipe(recipe: any) {
  const data: Record<string, any> = {};
  for (let pair of recipe.entries()) {
    data[pair[0]] = pair[1];
  }

  // Prepare ingredient sections
  let ingredientSections = [];
  let i = 0;
  while (data[`ingredientTitle${i}`] !== undefined) {
    ingredientSections.push({
      title: data[`ingredientTitle${i}`],
      ingredients: data[`ingredients${i}`].split(","),
    });
    i++;
  }

  const ingredientSectionsData = ingredientSections.map(
    (section: IngredientSectionType) => ({
      title: section.title,
      ingredients: {
        create: section.ingredients.map((ingredient) => ({
          name: ingredient,
        })),
      },
    })
  );

  // Prepare recipe data
  const recipeData = {
    title: data.title,
    content: data.content || "",
    imageUrl: data.imageUrl || null,
    difficulty: data.difficulty || "none",
    duration: parseInt(data.duration, 10) || null,
    notes: data.notes || null,
    tags: data.tags ? data.tags.split("\n") : [],
    whereFrom: data.whereFrom || "",
    ingredientSections: {
      create: ingredientSectionsData,
    },
  };
  const createdRecipe = await prisma.recipe.create({
    data: recipeData,
  });
  revalidatePath(`/`);
  redirect("/");
}
