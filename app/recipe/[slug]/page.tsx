import prisma from "@/lib/prisma";
import { Recipe } from "@prisma/client";
import EditRecipe from "@/app/components/editRecipe";

export default async function Page({ params }: { params: { slug: string } }) {
  const fetchData = async () => {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: params.slug,
      },
      include: {
        author: true,
      },
    });

    console.log(recipe);
    return recipe || null;
  };

  const recipe: Recipe | null = await fetchData();
  if (!recipe) return <div>Recipe not found</div>;

  const deleteRecipe = async () => {
    "use server";
    console.log(params.slug);

    const recipe = await prisma.recipe.delete({
      where: {
        id: params.slug,
      },
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12  md:px-0">
      <div className="flex justify-between p-6">
        <form action={deleteRecipe}>
          <button type="submit" className="">
            Delete
          </button>
        </form>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 text-gray-600 px-2">
        <h1 className="text-4xl font-semibold text-gray-900 mb-2">
          {recipe.title}
        </h1>
        <div className="mb-4">
          <p className="text-sm text-gray-500">
            Difficulty: {recipe.difficulty}
          </p>
          <p className="text-sm text-gray-500">
            Duration: {recipe.duration} minutes
          </p>
        </div>
        {recipe.imageUrl && (
          <div className="mb-8">
            <img
              src={recipe.imageUrl}
              alt={recipe.title}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        )}
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Ingredients
        </h2>
        <ul className="list-disc list-inside text-gray-700 mb-8">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Instructions
        </h2>
        <div
          className="prose prose-lg"
          dangerouslySetInnerHTML={{
            __html: recipe.content ? recipe.content : "",
          }}
        />

        <h2 className="text-2xl font-semibold text-gray-900 mb-2 mt-8">
          Notes
        </h2>
        <p className="text-gray-700">{recipe.notes}</p>
      </div>
      <EditRecipe recipe={recipe} />
    </div>
  );
}
