import Image from "next/image";
import prisma from "@/lib/prisma";
import { useState, useEffect } from "react";
import Table from "./components/table";
import RecipeCard from "./components/Card";

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

  const recipes = await fetchData();
  console.log(recipes);

  return (
    <main className="p-24 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-5 gap-4 ">
      {recipes &&
        recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
    </main>
  );
}
