"use client";

import { GiCardRandom } from "react-icons/gi";
import { IRecipe } from "../types/recipeTypes";
import { useRouter } from "next/navigation";

interface RandomiserProps {
  recipes: IRecipe[];
}

export default function Randomiser({ recipes }: RandomiserProps) {
  const router = useRouter();

  const redirectToRandomRecipe = () => {
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    router.push(`/recipe/${randomRecipe.id}`);
  };

  return (
    <div>
      <button onClick={redirectToRandomRecipe}>
        <GiCardRandom size={40} />
      </button>
    </div>
  );
}
