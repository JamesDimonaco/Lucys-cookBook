import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RecipeType } from "../types/recipe";

function RecipeCard({ recipe }: { recipe: RecipeType }) {
  return (
    <Link href={`/recipe/${recipe.id}`} passHref>
      <div className="cursor-pointer max-w-md mx-auto rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 bg-primary hover:bg-accent">
        <div className="relative h-48 w-full">
          <Image
            className="object-cover"
            src={recipe.imageUrl || "/placeholder.webp"}
            alt={recipe.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-text font-semibold">
            {recipe.title}
          </div>
          <p className="mt-2 text-secondary">Difficulty: {recipe.difficulty}</p>
          <p className="mt-2 text-secondary">
            Duration: {recipe.duration} minutes
          </p>
          <p className="mt-2 text-secondary">Type: {recipe.type || "N/A"}</p>
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;
