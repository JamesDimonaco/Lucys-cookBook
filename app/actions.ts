"use server";
import prisma from "@/lib/prisma";

interface RecipeType {
  title: string;
  content: string;
  imageUrl: string | null;
  difficulty: string;
  duration: number | null;
  ingredients: string[];
  notes: string | null;
  tags: string[];
  whereFrom: string;
  id?: string;
}

export const editRecipe = async (recipe: any) => {
  console.log(recipe, "recipe");

  const data: Record<string, string> = {};
  for (let pair of recipe.entries()) {
    data[pair[0]] = pair[1];
  }

  // Prepare recipe data
  const recipeData: RecipeType = {
    title: data.title,
    content: data.content,
    imageUrl: data.imageUrl || null,
    difficulty: data.difficulty || "none",
    duration: parseInt(data.duration, 10) || null,
    ingredients: data.ingredients ? data.ingredients.split("\n") : [],
    notes: data.notes || null,
    tags: data.tags ? data.tags.split("\n") : [],
    whereFrom: data.whereFrom || "",
    id: data.id,
  };

  console.log(recipeData);

  const updatedRecipe = await prisma.recipe.update({
    where: {
      id: data.id,
    },
    data: recipeData,
  });
};

export async function postRecipe(recipe: any) {
  console.log(recipe, "recipe");

  const data: Record<string, string> = {};
  for (let pair of recipe.entries()) {
    data[pair[0]] = pair[1];
  }

  // Prepare recipe data
  const recipeData: RecipeType = {
    title: data.title,
    content: data.content || "",
    imageUrl: data.imageUrl || null,
    difficulty: data.difficulty || "none",
    duration: parseInt(data.duration, 10) || null,
    ingredients: data.ingredients ? data.ingredients.split("\n") : [],
    notes: data.notes || null,
    tags: data.tags ? data.tags.split("\n") : [],
    whereFrom: data.whereFrom || "",
  };

  const createdRecipe = await prisma.recipe.create({
    data: recipeData,
  });

  return createdRecipe;
}
