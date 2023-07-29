import React from "react";
import { Recipe } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

function RecipeCard({ recipe }: { recipe: Recipe }) {
  console.log(recipe);

  return (
    <Link className="bg-background" href={`/recipe/${recipe.id}`}>
      <div className="max-w-md mx-auto  rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 bg-primary hover:bg-accent">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:h-full md:w-48"
              src={recipe.imageUrl || "/placeholder.webp"}
              alt={recipe.title}
              // width={200}
              // height={200}
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-text font-semibold">
              {recipe.title}
            </div>
            <p className="mt-2 text-secondary">
              Difficulty: {recipe.difficulty}
            </p>
            <p className="mt-2 text-secondary">
              Duration: {recipe.duration} minutes
            </p>
            {/* <p className="mt-2 text-secondary">
              Tags: {recipe.tags.join(", ")}
            </p> */}
            <p className="mt-2 text-secondary">Type: {recipe.type || "N/A"}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;
