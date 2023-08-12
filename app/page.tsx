import prisma from "@/lib/prisma";

import RecipeCard from "./components/Card";
import { RecipeType } from "./types/recipe";
import Display from "./components/DisplayRecipesCards";

async function getFeedData() {
  const feed = await prisma.recipe.findMany({
    include: {
      author: true,
    },
  });

  return feed;
}

export default async function Home() {
  const fetchData = async () => {
    const data = await getFeedData();
    return data;
  };

  const recipes: any[] = await fetchData();
  return (
    <main>
      {/* {recipes &&
        recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)} */}

      <Display recipesFromServer={recipes} />
    </main>
  );
}
