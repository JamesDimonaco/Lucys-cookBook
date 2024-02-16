import RecipeCard from "@/components/recipeCard";
import Hero from "@/components/Hero";
import { searchRecipes } from "@/actions";
import { HomePage } from "@/components/home-page";

type HomeProps = {
  params: any;
  searchParams: any;
};
export default async function Home({ params, searchParams }: HomeProps) {
  const recipes: any[] = await searchRecipes("");

  return (
    <main>
      {/* <Hero recipesFromServer={recipes} /> */}
      {/* <RecipeCard recipes={recipes} /> */}
      <HomePage />
    </main>
  );
}
