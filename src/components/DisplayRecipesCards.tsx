"use client";
// Display.tsx
import Image from "next/image";
import { useEffect, useState } from "react";
import { RecipeType } from "../types/recipe";
import Randomiser from "./Randomiser";
import Search from "./Search";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

interface IProps {
  recipesFromServer: RecipeType[];
}

export default function Display({ recipesFromServer }: IProps) {
  const [originalRecipes, setOriginalRecipes] = useState<RecipeType[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeType[]>([]);

  useEffect(() => {
    setOriginalRecipes(recipesFromServer);
    setFilteredRecipes(recipesFromServer);
  }, [recipesFromServer]);

  const handleSearchAndFilter = (term: string, filters: any) => {
    if (!originalRecipes) return;

    let results = originalRecipes;

    // Apply search term
    if (term) {
      results = results.filter((recipe) =>
        recipe.title.toLowerCase().includes(term.toLowerCase())
      );
    }

    // Apply filters
    if (filters.type) {
      results = results.filter(
        (recipe) => recipe.type.toLowerCase() === filters.type
      );
    }
    if (filters.difficulty) {
      results = results.filter(
        (recipe) => recipe.difficulty.toLowerCase() === filters.difficulty
      );
    }

    setFilteredRecipes(results);
  };

  return (
    <main>
      <div className="flex justify-center items-center gap-6 bg-secondary my-4 mx-2 py-4 px-40 rounded">
        <Search onSearchAndFilter={handleSearchAndFilter} />
        <Randomiser recipes={filteredRecipes} />
      </div>
      <div className="p-16 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-5 gap-4 ">
        {filteredRecipes &&
          filteredRecipes.map((recipe) => (
            <Card key={recipe.id}>
              <CardHeader>
                <CardTitle>{recipe.title}</CardTitle>
                <CardDescription>{recipe.type}</CardDescription>
                <CardDescription>{recipe.difficulty}</CardDescription>
                <CardDescription>{recipe.duration}</CardDescription>
              </CardHeader>

              <CardContent className="flex justify-center items-center">
                <Image
                  className="object-cover rounded-md"
                  src={recipe.imageUrl || "/placeholder.webp"}
                  alt={recipe.title}
                  width={200}
                  height={300}
                />
              </CardContent>
              <CardFooter>
                <Link href={`/recipe/${recipe.id}`} passHref>
                  <Button className="bg-red-500" variant="link">
                    View Recipe
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
      </div>
    </main>
  );
}
