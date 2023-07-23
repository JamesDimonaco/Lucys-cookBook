"use client";
import { useState, ChangeEvent, FormEvent } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface RecipeFormProps {
  post: (recipe: any) => void;
  defaultFromState?: any;
}

function RecipeForm({ post, defaultFromState }: RecipeFormProps) {
  const [numberOfIngredientsSections, setNumberOfIngredientsSections] =
    useState(1);
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
      [event.target.name]: event.target.value.split("\n"),
    });
    console.log("handleArrayChange", formState);
  };

  const handleIngredientChange = (event: any, index: number, type: string) => {
    const value = event.target.value;
    console.log(value, "value");
    console.log(formState);

    let newIngredients = [...formState.ingredients];

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
      ingredients: newIngredients,
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(formState);
  };

  const ingredientsSection = (index: number) => {
    return (
      <label className="grid gap-2 text-text">
        Ingredients (separated by commas):
        <label>
          <h2>Title:</h2>
          <input
            className="bg-primary text-secondary"
            type="text"
            name={`ingredientTitle${index}`}
            onChange={(e) => handleIngredientChange(e, index, "title")}
          />
        </label>
        <textarea
          className="bg-primary text-secondary"
          name={`ingredients${index}`}
          value={formState[`ingredients${index}`]}
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
          className="bg-primary"
          type="hidden"
          name="id"
          value={formState.id}
        />
        <label className="grid gap-2 text-text">
          Title:
          <input
            className="bg-primary text-secondary"
            type="text"
            name="title"
            value={formState.title}
            onChange={handleInputChange}
          />
        </label>

        <label className="grid gap-2 text-text">
          Image URL:
          <input
            className="bg-primary text-secondary"
            type="text"
            name="imageUrl"
            value={formState.imageUrl}
            onChange={handleInputChange}
          />
        </label>
        <label className="grid gap-2 text-text">
          Difficulty:
          <select
            className="bg-primary text-secondary"
            name="difficulty"
            value={formState.difficulty}
            onChange={handleOptionChange}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </label>
        <label className="grid gap-2 text-text">
          Type:
          <select
            className="bg-primary text-secondary"
            name="type"
            value={formState.type}
            onChange={handleOptionChange}
          >
            <option value="starter">Starter</option>
            <option value="salad">Salad</option>
            <option value="dinner">Dinner</option>
            <option value="desert">Desert</option>
            <option value="nibbles">Nibbles</option>
          </select>
        </label>
        <label className="grid gap-2 text-text">
          Duration (minutes):
          <input
            className="bg-primary text-secondary"
            type="number"
            name="duration"
            value={formState.duration}
            onChange={handleInputChange}
          />
        </label>
        <label className="grid gap-2 text-text">
          Makes:
          <input
            className="bg-primary text-secondary"
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
            className="p-2 text-text bg-primary rounded-lg hover:text-secondary"
            type="button"
            onClick={() =>
              setNumberOfIngredientsSections(numberOfIngredientsSections + 1)
            }
          >
            Add ingredient section
          </button>
          {numberOfIngredientsSections > 1 && (
            <button
              className="p-2 text-text bg-secondary rounded-lg hover:text-accent"
              type="button"
              onClick={() =>
                setNumberOfIngredientsSections(numberOfIngredientsSections - 1)
              }
            >
              remove ingredient section
            </button>
          )}
        </div>

        <label className="grid mb-12 text-text">
          Instructions:
          <ReactQuill
            theme="snow"
            value={formState.content}
            onChange={(value, delta, source, editor) => {
              console.log(value, "value");

              setFormState({
                ...formState,
                content: value.toString(),
              });
            }}
          />{" "}
          <input
            className="bg-primary text-secondary"
            type="hidden"
            name="content"
            value={formState.content}
          />
        </label>
        <label className="grid gap-2 text-text">
          Notes:
          <textarea
            className="bg-primary text-secondary"
            name="notes"
            value={formState.notes}
            onChange={handleInputChange}
          />
        </label>
        <label className="grid gap-2 text-text">
          Tags (seperated by commas):
          <textarea
            className="bg-primary text-secondary"
            name="tags"
            value={formState.tags}
            onChange={handleArrayChange}
          />
        </label>
        <label className="grid gap-2 text-text">
          Origin:
          <input
            className="bg-primary text-secondary"
            type="text"
            value={formState.whereFrom}
            name="whereFrom"
            onChange={handleInputChange}
          />
        </label>
        <button
          className="bg-primary max-w-xs rounded-lg p-0 text-text"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default RecipeForm;
