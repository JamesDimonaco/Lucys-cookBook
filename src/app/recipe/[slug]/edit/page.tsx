import prisma from "@/utils/prisma";
import RecipeForm from "@/components/ui/form/Form";
import { IRecipe, IIngredientSection, IIngredient } from "@/types/recipeTypes";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { Recipe } from "@/components/recipe";
import { editRecipe } from "@/actions";
import { auth } from "@/utils/auth";

export default async function Page({ params }: { params: { slug: string } }) {
  const session = await auth();
  const fetchData = async () => {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: params.slug,
      },
      include: {
        author: true,
        ingredientSections: {
          include: {
            ingredients: true,
          },
        },
      },
    });

    return recipe || null;
  };

  const recipeData: IRecipe | null = await fetchData();
  if (!recipeData) notFound();

  return <RecipeForm initalRecipe={recipeData} submitAction={editRecipe} />;
}
