import RecipeCard from "@/components/recipeCard";
import Hero from "@/components/Hero";
import { searchRecipes } from "@/actions";

type HomeProps = {
  params: any;
  searchParams: any;
};
export default async function Home({ params, searchParams }: HomeProps) {
  const recipes: any[] = await searchRecipes("");

  return (
    <main className="p-16 ">
      {/* <Display recipesFromServer={recipes} /> */}
      <Hero recipesFromServer={recipes} />
      <RecipeCard recipes={recipes} />
    </main>
  );
}
