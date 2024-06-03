import { IIngredient, IIngredientSection } from "@/types/recipeTypes";
import { useEffect, useState } from "react";

// Define the hook and its return types
function useIngredientSections(initialData?: IIngredientSection[]) {
  const [ingredientSections, setIngredientSections] = useState<
    IIngredientSection[]
  >(
    initialData ?? [
      {
        id: "1",
        title: "default section",
        ingredients: [
          {
            id: "1",
            name: "",
          },
        ],
      },
    ]
  );

  useEffect(() => {
    if (initialData) {
      setIngredientSections(initialData);
    }
  }, [initialData]);

  const addIngredientSection = () => {
    const newSection: IIngredientSection = {
      id: Date.now().toString(), // For demonstration purposes; use a better ID generator in production
      title: "",
      ingredients: [],
    };
    setIngredientSections([...ingredientSections, newSection]);
  };

  const removeIngredientSection = (sectionId: string) => {
    if (ingredientSections.length > 1) {
      setIngredientSections(
        ingredientSections.filter((section) => section.id !== sectionId)
      );
    }
  };

  const addIngredient = (sectionId: string) => {
    const newIngredient: IIngredient = {
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
    removeIngredientSection,
  };
}

export default useIngredientSections;
