import prisma from "@/utils/prisma";
import EditRecipe from "@/components/EditRecipe";
import { FullRecipeTypeFromPrisma } from "../../../types/recipe";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { Recipe } from "@/components/recipe";
export interface IngredientSectionType {
  title: string;
  ingredients: IngredientType[];
}

type IngredientType = {
  id: string;
  name: string;
};

export default async function Page({ params }: { params: { slug: string } }) {
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

  const recipeData: FullRecipeTypeFromPrisma | null = await fetchData();
  // if (!recipe) return <div>Recipe not found</div>;

  const deleteRecipe = async () => {
    "use server";
    console.log(params.slug);

    // Fetch the recipe with its related ingredientSections and ingredients
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: params.slug,
      },
      include: {
        ingredientSections: {
          include: {
            ingredients: true,
          },
        },
      },
    });

    // Delete ingredients

    if (!recipe) return <div>Recipe not found</div>;

    for (let section of recipe.ingredientSections) {
      await prisma.ingredient.deleteMany({
        where: {
          ingredientSectionId: section.id,
        },
      });
    }

    // Delete ingredientSections
    await prisma.ingredientSection.deleteMany({
      where: {
        recipeId: recipe.id,
      },
    });

    // Now delete the recipe
    await prisma.recipe.delete({
      where: {
        id: recipe.id,
      },
    });

    revalidatePath(`/`);
    redirect("/");
  };

  return <Recipe data={recipeData} />;

  // return (
  //   <div className="bg-background  min-h-screen pb-12  md:px-0">
  //     {/* <div className="flex justify-between p-6">
  //       <form action={deleteRecipe}>
  //         <button
  //           type="submit"
  //           className="bg-primary text-text hover:bg-accent p-2 rounded-md"
  //         >
  //           Delete
  //         </button>
  //       </form>
  //     </div> */}

  //     <div className="max-w-3xl mx-auto px-4 py-10 text-secondary bg-primary rounded-lg mt-4">
  //       <h1 className="text-4xl font-semibold text-text mb-2">
  //         {recipe.title}
  //       </h1>
  //       <div className="mb-4">
  //         <p className="text-sm text-secondary">
  //           Difficulty: {recipe.difficulty}
  //         </p>
  //         <p className="text-sm text-secondary">
  //           Duration: {recipe.duration} minutes
  //         </p>
  //       </div>
  //       {recipe.imageUrl && (
  //         <div className="mb-8">
  //           <Image
  //             width={500}
  //             height={300}
  //             src={recipe.imageUrl}
  //             alt={recipe.title}
  //             className="w-full h-64 object-cover rounded-lg shadow-md"
  //           />
  //         </div>
  //       )}
  //       <h2 className="text-2xl font-semibold text-text mb-2">Ingredients</h2>
  //       <ul className="list-disc list-inside text-secondary mb-8">
  //         {recipe.ingredientSections.map(
  //           (
  //             ingredientSection: IngredientSectionType,
  //             sectionIndex: number
  //           ) => (
  //             <div key={sectionIndex}>
  //               <h2>{ingredientSection.title}</h2>
  //               {ingredientSection.ingredients.map(
  //                 (ingredient: IngredientType, ingredientIndex: number) => (
  //                   <li key={ingredientIndex}>{ingredient.name}</li>
  //                 )
  //               )}
  //             </div>
  //           )
  //         )}
  //       </ul>
  //       <h2 className="text-2xl font-semibold text-text mb-2">Instructions</h2>
  //       <div
  //         className="prose  text-secondary "
  //         dangerouslySetInnerHTML={{
  //           __html: recipe.content ? recipe.content : "",
  //         }}
  //       />

  //       <h2 className="text-2xl font-semibold text-text mb-2 mt-8">Notes</h2>
  //       <p className="text-secondary">{recipe.notes}</p>
  //     </div>
  //     <EditRecipe recipe={recipe} />
  //   </div>
  // );
}
