"use client";

import { useEffect, useState } from "react";
import RecipeCard from "./recipeCard";
import { useInView } from "react-intersection-observer";
import { fetchPecipes } from "@/actions";
import { IRecipe } from "@/types/recipeTypes";

export default function InfiniteScrollRecipes({
  initiallRecipes,
  search,
  userId,
}: {
  initiallRecipes: IRecipe[];
  search?: string;
  userId?: string;
}) {
  const [recipes, setRecipes] = useState<IRecipe[]>(initiallRecipes);
  const [skip, setSkip] = useState(10);
  const [ref, inView] = useInView();

  async function fetchMoreRecipes() {
    const newRecipes = await fetchPecipes({
      limit: 10,
      skip,
      search,
      authorId: userId,
    });
    setRecipes((prevRecipes) => [...prevRecipes, ...newRecipes]);
    setSkip((prevSkip) => prevSkip + 10);
  }

  useEffect(() => {
    if (inView) {
      fetchMoreRecipes();
    }
  }, [inView]);

  useEffect(() => {
    setRecipes(initiallRecipes);
  }, [initiallRecipes]);

  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
      <div ref={ref}>{inView && <div>Loading...</div>}</div>
    </section>
  );
}
