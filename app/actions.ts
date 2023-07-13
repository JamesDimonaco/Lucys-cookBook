"use server";
import prisma from "@/lib/prisma";
import { Recipe } from "@prisma/client";

export const editRecipe = async (recipe: any) => {
  console.log(recipe, "recipe");

  const data: Record<string, string> = {};
  for (let pair of recipe.entries()) {
    data[pair[0]] = pair[1];
  }

  // Prepare recipe data
  const recipeData: Recipe = {
    title: data.title,
    content: data.content || null,
    imageUrl: data.imageUrl || null,
    difficulty: data.difficulty || null,
    duration: parseInt(data.duration, 10) || null,
    ingredients: data.ingredients ? data.ingredients.split("\n") : [],
    notes: data.notes || null,
    tags: data.tags ? data.tags.split("\n") : [],
    whereFrom: data.whereFrom || null,
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
  const recipeData: Recipe = {
    title: data.title,
    content: data.content || null,
    imageUrl: data.imageUrl || null,
    difficulty: data.difficulty || null,
    duration: parseInt(data.duration, 10) || null,
    ingredients: data.ingredients ? data.ingredients.split("\n") : [],
    notes: data.notes || null,
    tags: data.tags ? data.tags.split("\n") : [],
    whereFrom: data.whereFrom || null,
  };

  console.log(recipeData);

  const createdRecipe = await prisma.recipe.create({
    data: recipeData,
  });

  return createdRecipe;
}
