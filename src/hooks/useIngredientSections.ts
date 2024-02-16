import { Ingredient, IngredientSectionType } from "@/types/recipe";
import { useState } from "react";

// Define the hook and its return types
function useIngredientSections() {
  const [ingredientSections, setIngredientSections] = useState<
    IngredientSectionType[]
  >([]);

  const addIngredientSection = () => {
    const newSection: IngredientSectionType = {
      id: Date.now().toString(), // For demonstration purposes; use a better ID generator in production
      title: "",
      ingredients: [],
    };
    setIngredientSections([...ingredientSections, newSection]);
  };

  const addIngredient = (sectionId: string) => {
    const newIngredient: Ingredient = {
      id: Date.now().toString(), // For demonstration purposes; use a better ID generator in production
      name: "",
    };
    setIngredientSections(
      ingredientSections.map((section) =>
        section.id === sectionId
          ? { ...section, ingredients: [...section.ingredients, newIngredient] }
          : section
      )
    );
  };

  const removeIngredient = (sectionId: string, ingredientId: string) => {
    setIngredientSections(
      ingredientSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              ingredients: section.ingredients.filter(
                (ingredient) => ingredient.id !== ingredientId
              ),
            }
          : section
      )
    );
  };

  const updateSectionTitle = (sectionId: string, newTitle: string) => {
    setIngredientSections(
      ingredientSections.map((section) =>
        section.id === sectionId ? { ...section, title: newTitle } : section
      )
    );
  };

  const updateIngredientName = (
    sectionId: string,
    ingredientId: string,
    newName: string
  ) => {
    setIngredientSections(
      ingredientSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              ingredients: section.ingredients.map((ingredient) =>
                ingredient.id === ingredientId
                  ? { ...ingredient, name: newName }
                  : ingredient
              ),
            }
          : section
      )
    );
  };

  return {
    ingredientSections,
    addIngredientSection,
    addIngredient,
    removeIngredient,
    updateSectionTitle,
    updateIngredientName,
  };
}

export default useIngredientSections;
