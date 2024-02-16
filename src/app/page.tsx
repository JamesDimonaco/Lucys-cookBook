import RecipeCard from "@/components/recipeCard";
import { SkeletonCard } from "@/components/ui/skeletonCard";
import { getRecipes } from "@/functions/recipes";
import { FilterIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/Search";
import { auth } from "@/utils/auth";

type HomeProps = {
  params: any;
  searchParams: { [key: string]: string | string[] | undefined };
};
export default async function Home({ params, searchParams }: HomeProps) {
  const limit = searchParams.limit
    ? parseInt(searchParams.limit as string)
    : 10;
  const skip = searchParams.skip ? parseInt(searchParams.skip as string) : 0;

  const search = searchParams.search ? (searchParams.search as string) : "";

  const { recipes, error } = await getRecipes({ limit, skip, search });
  if (!recipes) return <SkeletonCard />;

  return (
    <main className="flex flex-col gap-8 p-4 md:p-6">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
        <SearchBar />
        <Button className="w-full md:w-auto" variant="outline">
          <FilterIcon className="h-5 w-5 mr-2" />
          Filter
        </Button>
      </div>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </main>
  );
}
