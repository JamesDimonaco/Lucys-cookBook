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

  return (
    <div>
      {!open ? (
        <button onClick={() => setOpen(!open)}>edit</button>
      ) : (
        <div className="w-screen h-screen">
          <Form
            defaultNumberOfIngredientsSections={numberOfIngredientsSections}
            defaultFromState={formState}
            post={editRecipe}
          />
        </div>
      )}
    </div>
  );
}

export default EditRecipe;
