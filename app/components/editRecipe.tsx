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
  console.log("formState ---", formState);

  const handleEdit = async (recipe) => {
    try {
      // Perform the edit operation
      const updatedRecipe = await editRecipe(recipe);

      // If successful, update the state with the new data
      setFormState(updatedRecipe);

      // Close the form
      setOpen(false);
      window.location.reload();
    } catch (err) {
      console.error("Error while editing recipe", err);
      // Optionally, handle error state here
    }
  };

  return (
    <div>
      {!open ? (
        <button onClick={() => setOpen(!open)}>edit</button>
      ) : (
        <div className="w-screen h-screen">
          <Form
            defaultNumberOfIngredientsSections={numberOfIngredientsSections}
            defaultFromState={formState}
            post={handleEdit} // Replace editRecipe with handleEdit
          />
        </div>
      )}
    </div>
  );
}

export default EditRecipe;
