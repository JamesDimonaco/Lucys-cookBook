import prisma from "@/lib/prisma";
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
      <Display recipesFromServer={recipes} />
    </main>
  );
}
