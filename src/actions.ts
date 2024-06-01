"use server";
import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { IIngredientSection, IRecipe } from "./types/recipeTypes";
import { getRecipes } from "./functions/recipes";
import { Prisma } from "@prisma/client";

function extractFormData(recipe: any): Record<string, any> {
  const data: Record<string, any> = {};
  for (let pair of recipe.entries()) {
    data[pair[0]] = pair[1];
  }
  return data;
}

function prepareIngredientSections(
  data: Record<string, any>
): IIngredientSection[] {
  return Object.entries(data)
    .filter(([key]) => key.startsWith("ingredientTitle"))
    .map(([key, value], index) => ({
      id: data[`ingredientId${index}`] || null,
      title: value,
      ingredients: {
        create:
          data[`ingredients${index}`]?.split(",").map((ingredient: string) => ({
            name: ingredient.trim(),
          })) || [],
      },
    }));
}

async function deleteExistingIngredientSections(recipeId: string) {
  const existingSections = await prisma.ingredientSection.findMany({
    where: { recipeId: recipeId },
  });

  for (let section of existingSections) {
    await prisma.ingredient.deleteMany({
      where: { ingredientSectionId: section.id },
    });
    await prisma.ingredientSection.delete({ where: { id: section.id } });
  }
}

export const editRecipe = async (recipe: any) => {
  const formData = extractFormData(recipe);
  const ingredientSections = prepareIngredientSections(formData);

  const recipeData: IRecipe = {
    title: formData.title,
    content: formData.content,
    imageUrl: formData.imageUrl || null,
    difficulty: formData.difficulty || "none",
    duration: parseInt(formData.duration, 10) || null,
    notes: formData.notes || null,
    tags: formData.tags ? formData.tags.split(",") : [],
    type: formData.type || "none",
    whereFrom: formData.whereFrom || "",
    ingredientSections: ingredientSections,
    id: formData.id,
  };

  const updatedRecipe = await prisma.recipe.update({
    where: { id: formData.id },
    data: {
      ...recipeData,
      ingredientSections: {
        deleteMany: {},
        create: ingredientSections,
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

export async function postRecipe(recipe: FormData) {
  console.log("Posting recipe");
  console.log(recipe);

  const formData = extractFormData(recipe);
  const ingredientSections = prepareIngredientSections(formData);

  console.log("Form data", formData);
  console.log("Ingredient sections", ingredientSections);

  const recipeData = {
    title: formData.title,
    content: formData.content || "",
    imageUrl: formData.imageUrl || null,
    difficulty: formData.difficulty || "none",
    duration: parseInt(formData.duration, 10) || null,
    notes: formData.notes || null,
    tags: formData.tags ? formData.tags.split(",") : [],
    type: formData.type || "none",
    whereFrom: formData.whereFrom || "",
    ingredientSections: {
      create: ingredientSections,
    },
  };

  console.log("Recipe data", recipeData);

  // const createdRecipe = await prisma.recipe.create({ data: recipeData });
  // revalidatePath(`/`);
  // revalidatePath(`/recipe/${createdRecipe.id}`);

  // redirect(`/recipe/${createdRecipe.id}`);
}

export async function searchRecipes(searchTerm: string) {
  const recipes = await prisma.recipe.findMany({
    include: {
      author: true,
    },
    where: {
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          tags: {
            hasSome: searchTerm.split(","),
          },
        },
      ],
    },
  });

  revalidatePath("/");

  return recipes;
}

export async function fetchPecipes({
  limit = 10,
  skip = 0,
  search,
}: {
  limit?: number;
  skip?: number;
  search?: string;
}) {
  try {
    const { recipes } = await getRecipes({ limit, skip, search });
    return recipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return { error: error };
  }
}
