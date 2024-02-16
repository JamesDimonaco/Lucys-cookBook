import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardContent, Card } from "@/components/ui/card";
import Image from "next/image";
import { FilterIcon, StarIcon } from "lucide-react";
import RecipeCard from "./recipeCard";
import prisma from "@/utils/prisma";
import { SkeletonCard } from "./ui/skeletonCard";
import { getRecipes } from "@/functions/recipes";
import { RecipeType } from "@/types/recipe";

export async function HomePage() {
  const recipes = await getRecipes();
  if (!recipes) return <SkeletonCard />;
  return (
    <main className="flex flex-col gap-8 p-4 md:p-6">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
        <Input
          className="flex-1"
          placeholder="Search recipes..."
          type="search"
        />
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
