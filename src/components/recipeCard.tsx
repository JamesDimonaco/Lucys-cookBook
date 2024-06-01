import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { IRecipe } from "../types/recipeTypes";
import { Recipe } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { StarIcon } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

function RecipeCard({ recipe }: { recipe: IRecipe }) {
  return (
    <Card key={recipe.id}>
      <Link href={`/recipe/${recipe.id}`}>
        <CardContent className=" flex flex-col gap-4">
          <Image
            alt="Recipe image"
            className="aspect-[3/2] object-cover rounded-lg overflow-hidden "
            height={200}
            src={recipe.imageUrl || "/placeholder.webp"}
            width={300}
          />
          <h3 className="text-lg font-semibold">{recipe.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {recipe.description}
          </p>
        </CardContent>
      </Link>

      <CardFooter>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {recipe.duration} mins
        </span>
        <Button className="ml-auto" variant="ghost">
          <StarIcon className="h-5 w-5 mr-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default RecipeCard;
