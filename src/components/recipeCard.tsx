import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { RecipeType } from "../types/recipe";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

function RecipeCard({ recipes }: { recipes: RecipeType[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-5 gap-4 ">
      {recipes.map((recipe) => (
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
              width={300}
              height={100}
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
  );
}

export default RecipeCard;
