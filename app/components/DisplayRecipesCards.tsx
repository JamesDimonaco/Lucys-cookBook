"use client";

import RecipeCard from "./Card";
import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import { RecipeType } from "../types/recipe";

interface IProps {
  recipesFromServer: RecipeType[];
}

export default function Display({ recipesFromServer }: IProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [originalRecipes, setOriginalRecipes] = useState<RecipeType[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeType[]>([]);

  useEffect(() => {
    setOriginalRecipes(recipesFromServer);
    setFilteredRecipes(recipesFromServer);
  }, [recipesFromServer]);

  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      if (!originalRecipes) return;
      const results = originalRecipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRecipes(results);
    }, 300),
    [originalRecipes]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <main>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search for recipes..."
      />
      <div className="p-24 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-5 gap-4 ">
        {filteredRecipes &&
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
      </div>
    </main>
  );
}
