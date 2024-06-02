"use server";
import prisma from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { IIngredient, IIngredientSection, IRecipe } from "./types/recipeTypes";
import { getRecipes } from "./functions/recipes";
import { Prisma } from "@prisma/client";

function extractFormData(recipe: FormData): Record<string, any> {
  const data: Record<string, any> = {};
  for (let pair of Array.from(recipe.entries())) {
    data[pair[0]] = pair[1];
  }
  return data;
}

function prepareIngredientSections(
  formData: Record<string, any>
): Prisma.IngredientSectionCreateWithoutRecipeInput[] {
  const ingredientSections: Prisma.IngredientSectionCreateWithoutRecipeInput[] =
    [];

  const sectionIndices = Object.keys(formData)
    .filter((key) => key.startsWith("ingredientSectionTitle-"))
    .map((key) => key.split("-")[1]);

  sectionIndices.forEach((index) => {
    const title = formData[`ingredientSectionTitle-${index}`];

    const sectionIngredients = Object.keys(formData)
      .filter((key) => key.startsWith(`ingredient-${index}-`))
      .map((key) => ({
        id: key.split("-")[2],
        name: formData[key],
      }));

    const ingredientSection: Prisma.IngredientSectionCreateWithoutRecipeInput =
      {
        title,
        ingredients: {
          create: sectionIngredients
            .filter(({ name }) => name)
            .map(({ name }) => ({ name })),
        },
      };

    ingredientSections.push(ingredientSection);
  });

  return ingredientSections;
}

export const deleteRecipe = async (recipeId: string) => {
  console.log("Deleting recipe with ID:", recipeId);

  try {
    // Delete the associated ingredients first
    await prisma.ingredient.deleteMany({
      where: {
        ingredientSection: {
          recipeId: recipeId,
        },
      },
    });

    // Delete the associated ingredientSections
    await prisma.ingredientSection.deleteMany({
      where: {
        recipeId: recipeId,
      },
    });

    // Delete the recipe
    const deletedRecipe = await prisma.recipe.delete({
      where: {
        id: recipeId,
      },
    });

    console.log("Recipe deleted successfully:", deletedRecipe);
    revalidatePath(`/`);
    // Perform any additional actions or return a response
  } catch (error) {
    console.error("Error deleting recipe:", error);
    throw error;
  } finally {
    redirect("/");
  }
};

export const editRecipe = async (recipe: FormData) => {
  const formData = extractFormData(recipe);
  const ingredientSections = prepareIngredientSections(recipe);

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
        updateMany: ingredientSections,
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
  const formData = extractFormData(recipe);
  console.log("Form data", formData);
  console.log("-------------------");
  const ingredientSections = prepareIngredientSections(formData);

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

  const createdRecipe = await prisma.recipe.create({ data: recipeData });
  revalidatePath(`/`);
  revalidatePath(`/recipe/${createdRecipe.id}`);

  redirect(`/recipe/${createdRecipe.id}`);
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
