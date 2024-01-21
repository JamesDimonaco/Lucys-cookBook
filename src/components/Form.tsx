"use client";
import { useState, ChangeEvent, FormEvent } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UploadButton from "./UploadButton";
import Image from "next/image";

interface RecipeFormProps {
  post: (recipe: any) => void;
  defaultFromState?: any;
  defaultNumberOfIngredientsSections?: number;
}

function RecipeForm({
  post,
  defaultFromState,
  defaultNumberOfIngredientsSections = 1,
}: RecipeFormProps) {
  const [numberOfIngredientsSections, setNumberOfIngredientsSections] =
    useState(defaultNumberOfIngredientsSections);
  const [formState, setFormState] = useState(defaultFromState || {});
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleArrayChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value.split(","),
    });
  };

  const handleIngredientChange = (event: any, index: number, type: string) => {
    const value = event.target.value;

    let newIngredients = [...formState.ingredientSections];

    if (newIngredients[index] === undefined) {
      newIngredients[index] = { title: "", ingredients: [] };
    }

    if (type === "title") {
      newIngredients[index].title = value;
    } else if (type === "ingredients") {
      newIngredients[index].ingredients = value.split(",");
    }

    setFormState({
      ...formState,
      ingredientSections: newIngredients,
    });
  };

  const handleImageUpload = (imageUrl: string) => {
    console.log("Image URL: ", imageUrl);

    setFormState({
      ...formState,
      imageUrl: imageUrl,
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(formState);
  };

  const ingredientsSection = (index: number) => {
    return (
      <label key={index} className="grid gap-2 text-primary font-bold">
        Ingredients (separated by commas):
        <label>
          <h2>Title:</h2>
          <input
            className="bg-secondary text-black font-normal"
            type="text"
            name={`ingredientTitle${index}`}
            value={
              formState.ingredientSections[index]
                ? formState.ingredientSections[index].title || ""
                : ""
            }
            onChange={(e) => handleIngredientChange(e, index, "title")}
          />
        </label>
        <textarea
          className="bg-secondary text-black font-normal"
          name={`ingredients${index}`}
          value={
            formState.ingredientSections[index]
              ? formState.ingredientSections[index].ingredients.map(
                  (i: string | { name: string }) =>
                    typeof i === "string" ? i : i.name || ""
                )
              : ""
          }
          onChange={(e) => handleIngredientChange(e, index, "ingredients")}
        />
      </label>
    );
  };
  return (
    <div className="w-fit md:w-full ">
      <form
        className="grid grid-cols-1 gap-8 p-8 text-black bg-background w-full "
        action={post}
        // onSubmit={handleSubmit}
      >
        <input
          className="bg-secondary"
          type="hidden"
          name="id"
          value={formState.id}
        />
        <label className="grid gap-2 text-primary font-bold">
          Title:
          <input
            className="bg-secondary text-black font-normal"
            type="text"
            name="title"
            value={formState.title || ""}
            onChange={handleInputChange}
          />
        </label>
        <label className="grid gap-2 text-primary font-bold">
          Image URL:
          <input
            className="bg-secondary text-black font-normal"
            type="text"
            name="imageUrl"
            value={formState.imageUrl || ""}
            onChange={handleInputChange}
          />
        </label>

        {formState.imageUrl && (
          <div className="h-52 w-auto">
            <Image
              width={500}
              height={300}
              src={formState.imageUrl}
              alt={formState.title}
              className="mx-auto h-full  object-cover rounded-lg shadow-md"
            />
          </div>
        )}

        <UploadButton onSubmit={handleImageUpload} />

        <label className="grid gap-2 text-primary font-bold">
          Difficulty:
          <select
            className="bg-secondary text-black font-normal"
            name="difficulty"
            value={formState.difficulty || ""}
            onChange={handleOptionChange}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </label>
        <label className="grid gap-2 text-primary font-bold">
          Type:
          <select
            className="bg-secondary text-black font-normal"
            name="type"
            value={formState.type || ""}
            onChange={handleOptionChange}
          >
            <option value="starter">Starter</option>
            <option value="salad">Salad</option>
            <option value="dinner">Dinner</option>
            <option value="lightMeal">Light Meal</option>
            <option value="dessert">Dessert</option>
            <option value="nibbles">Nibbles</option>
          </select>
        </label>
        <label className="grid gap-2 text-primary font-bold">
          Duration (minutes):
          <input
            className="bg-secondary text-black font-normal"
            type="number"
            name="duration"
            value={formState.duration}
            onChange={handleInputChange}
          />
        </label>
        <label className="grid gap-2 text-primary font-bold">
          Makes:
          <input
            className="bg-secondary text-black font-normal"
            type="number"
            name="makes"
            value={formState.makes}
            onChange={handleInputChange}
          />
        </label>
        {Array(numberOfIngredientsSections)
          .fill(0)
          .map((_, index) => {
            return ingredientsSection(index);
          })}
        <div className="flex content-between mx-auto gap-4">
          <button
            className="p-2 text-text bg-primary rounded-lg "
            type="button"
            onClick={() =>
              setNumberOfIngredientsSections(numberOfIngredientsSections + 1)
            }
          >
            Add ingredient section
          </button>
          {numberOfIngredientsSections > 1 && (
            <button
              className="p-2 text-black bg-secondary rounded-lg hover:text-accent"
              type="button"
              onClick={() =>
                setNumberOfIngredientsSections(numberOfIngredientsSections - 1)
              }
            >
              remove ingredient section
            </button>
          )}
        </div>

        <label className=" text-primary font-bold ">Instructions:</label>
        <div>
          <ReactQuill
            className=" text-black bg-secondary"
            theme="snow"
            value={formState.content || ""}
            onChange={(value, delta, source, editor) => {
              console.log({ value, delta, source, editor });

              setFormState({
                ...formState,
                content: value.toString(),
              });
            }}
          />{" "}
        </div>
        <input
          className="bg-secondary text-black font-normal "
          type="hidden"
          name="content"
          value={formState.content || ""}
        />
        <label className="grid gap-2 text-primary font-bold">
          Notes:
          <textarea
            className="bg-secondary text-black font-normal"
            name="notes"
            value={formState.notes || ""}
            onChange={handleInputChange}
          />
        </label>
        <label className="grid gap-2 text-primary font-bold">
          Tags (seperated by commas):
          <textarea
            className="placeholder-red-800 bg-secondary text-black font-normal"
            name="tags"
            value={formState.tags || ""}
            onChange={handleArrayChange}
          />
        </label>
        <label className="grid gap-2 text-primary font-bold">
          Origin:
          <input
            className="bg-secondary text-black font-normal"
            type="text"
            value={formState.whereFrom || ""}
            name="whereFrom"
            onChange={handleInputChange}
          />
        </label>
        <button
          className="bg-primary max-w-xs rounded-lg p-0 text-text font-bold"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default RecipeForm;
