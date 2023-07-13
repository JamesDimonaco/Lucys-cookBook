"use client";
import { Recipe } from "@prisma/client";
import React, { useState } from "react";
import Form from "./Form";
import { editRecipe } from "../actions";

interface EditRecipeProps {
  recipe: Recipe;
}

function EditRecipe({ recipe }: EditRecipeProps) {
  const [formState, setFormState] = useState(recipe);
  console.log(formState, "sdfhsfds");

  const [open, setOpen] = useState(false);

  return (
    <div>
      {!open ? (
        <button onClick={() => setOpen(!open)}>edit</button>
      ) : (
        <div className="w-screen h-screen">
          <Form defaultFromState={formState} post={editRecipe} />
        </div>
      )}
    </div>
  );
}

export default EditRecipe;
