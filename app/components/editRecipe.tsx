"use client";
import { FullRecipeTypeFromPrisma } from "../types/receipe";
import React, { useState } from "react";
import Form from "./Form";
import { editRecipe } from "../actions";

interface EditRecipeProps {
  recipe: FullRecipeTypeFromPrisma;
}

function EditRecipe({ recipe }: EditRecipeProps) {
  const numberOfIngredientsSections = recipe.ingredientSections.length;
  const [formState, setFormState] = useState(recipe);
  const [open, setOpen] = useState(false);

  const handleEdit = async (recipe: any) => {
    try {
      const updatedRecipe: any = await editRecipe(recipe);
      setFormState(updatedRecipe);

      setOpen(false);
    } catch (err) {
      console.error("Error while editing recipe", err);
      // Optionally, handle error state here
    }
  };

  return (
    <div>
      {!open ? (
        <button
          className="mx-4 p-2 bg-primary text-text rounded-md mt-4"
          onClick={() => setOpen(!open)}
        >
          edit
        </button>
      ) : (
        <div className="w-screen h-screen">
          <button
            className="mx-4 p-2 bg-primary text-text rounded-md mt-4"
            onClick={() => setOpen(!open)}
          >
            Close
          </button>
          <Form
            defaultNumberOfIngredientsSections={numberOfIngredientsSections}
            defaultFromState={formState}
            post={handleEdit}
          />
        </div>
      )}
    </div>
  );
}

export default EditRecipe;
