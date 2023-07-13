import React from "react";
import { Recipe } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/recipe/${recipe.id}`}>
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4">
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
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {recipe.title}
            </div>
            <p className="mt-2 text-gray-500">
              Difficulty: {recipe.difficulty}
            </p>
            <p className="mt-2 text-gray-500">
              Duration: {recipe.duration} minutes
            </p>
            <p className="mt-2 text-gray-500">Tags: {recipe.tags.join(", ")}</p>
            <p className="mt-2 text-gray-500">
              Author: {recipe.authorId || "unknown"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;
