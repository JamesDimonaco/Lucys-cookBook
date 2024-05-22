"use client";

import { useEffect, useRef, useState } from "react";
import RecipeCard from "./recipeCard";
import { Recipe } from "@prisma/client";
import { useInView } from "react-intersection-observer";
import { fetchPecipes } from "@/actions";

export default function InfiniteScrollRecipes({
  initalRecipes,
  search,
}: {
  initalRecipes: Recipe[];
  search: string;
}) {
  const [recipes, setRecipes] = useState<Recipe[]>(initalRecipes);
  const [skip, setSkip] = useState(10);
  const [ref, inView] = useInView();

  async function fetchMoreRecipes() {
    const newRecipes = await fetchPecipes({ limit: 10, skip, search });
    setRecipes((prevRecipes) => [...prevRecipes, ...newRecipes]);
    setSkip(skip + 10);
  }

  useEffect(() => {
    if (inView) {
      fetchMoreRecipes();
    }
  }, [inView]);

  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
      <div ref={ref}>{inView && <div>Loading...</div>}</div>
    </section>
  );
}