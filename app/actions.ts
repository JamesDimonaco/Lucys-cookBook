"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { IngredientSectionType, RecipeType } from "./types/recipe";

function extractFormData(recipe: any): Record<string, any> {
  const data: Record<string, any> = {};
  for (let pair of recipe.entries()) {
    data[pair[0]] = pair[1];
  }
  return data;
}

function prepareIngredientSections(
  data: Record<string, any>
): IngredientSectionType[] {
  const sections: IngredientSectionType[] = [];
  let i = 0;

  while (data[`ingredientTitle${i}`]) {
    sections.push({
      title: data[`ingredientTitle${i}`],
      ingredients: data[`ingredients${i}`].split(","),
    });
    i++;
  }

  return sections;
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

  const recipeData: RecipeType = {
    title: formData.title,
    content: formData.content,
    imageUrl: formData.imageUrl || null,
    difficulty: formData.difficulty || "none",
    duration: parseInt(formData.duration, 10) || null,
    notes: formData.notes || null,
    tags: formData.tags ? formData.tags.split(",") : [],
    type: formData.type || "none",
    whereFrom: formData.whereFrom || "",
    ingredientSections: ingredientSections.map((section) => ({
      title: section.title,
      ingredients: {
        create: section.ingredients.map((ingredient) => ({ name: ingredient })),
      },
    })),
    id: formData.id,
  };

  await deleteExistingIngredientSections(formData.id);

  const updatedRecipe = await prisma.recipe.update({
    where: { id: formData.id },
    data: {
      ...recipeData,
      ingredientSections: {
        deleteMany: {}, // This deletes all the associated ingredient sections
        create: ingredientSections.map((section) => ({
          title: section.title,
          ingredients: {
            create: section.ingredients.map((ingredient) => ({
              name: ingredient,
            })),
          },
        })),
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
  const formData = extractFormData(recipe);
  const ingredientSections = prepareIngredientSections(formData);

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
      create: ingredientSections.map((section) => ({
        title: section.title,
        ingredients: {
          create: section.ingredients.map((ingredient) => ({
            name: ingredient,
          })),
        },
      })),
    },
  };

  const createdRecipe = await prisma.recipe.create({ data: recipeData });
  revalidatePath(`/`);
  revalidatePath(`/recipe/${createdRecipe.id}`);

  redirect(`/recipe/${createdRecipe.id}`);
}
