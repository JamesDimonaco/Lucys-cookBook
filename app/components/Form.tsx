"use client";
import { useState, ChangeEvent, FormEvent } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface RecipeFormProps {
  post: (recipe: any) => void;
  defaultFromState?: any;
}

function RecipeForm({ post, defaultFromState }: RecipeFormProps) {
  console.log(defaultFromState, "defaultFromState");

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
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(formState);
  };

  return (
    <div className="w-fit md:w-full">
      <form
        className="grid grid-cols-1 gap-8 border p-8 text-black bg-gray-200 w-full "
        action={post}
        // onSubmit={handleSubmit}
      >
        <input type="hidden" name="id" value={formState.id} />
        <label className="grid gap-2">
          Title:
          <input
            type="text"
            name="title"
            value={formState.title}
            onChange={handleInputChange}
          />
        </label>

        <label className="grid gap-2">
          Image URL:
          <input
            type="text"
            name="imageUrl"
            value={formState.imageUrl}
            onChange={handleInputChange}
          />
        </label>
        <label className="grid gap-2">
          Difficulty:
          <select
            name="difficulty"
            value={formState.difficulty}
            onChange={handleOptionChange}
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </label>
        <label className="grid gap-2">
          Duration (minutes):
          <input
            type="number"
            name="duration"
            value={formState.duration}
            onChange={handleInputChange}
          />
        </label>
        <label className="grid gap-2">
          Ingredients (one per line):
          <textarea
            name="ingredients"
            value={formState.ingredients}
            onChange={handleArrayChange}
          />
        </label>
        <label className="grid mb-5">
          Ingridents:
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
          <input type="hidden" name="content" value={formState.content} />
        </label>
        <label className="grid gap-2">
          Notes:
          <textarea
            name="notes"
            value={formState.notes}
            onChange={handleInputChange}
          />
        </label>
        <label className="grid gap-2">
          Tags (one per line):
          <textarea
            name="tags"
            value={formState.tags}
            onChange={handleArrayChange}
          />
        </label>
        <label className="grid gap-2">
          Origin:
          <input
            type="text"
            value={formState.whereFrom}
            name="whereFrom"
            onChange={handleInputChange}
          />
        </label>
        <button className="bg-green-300 border rounded-lg p-0 " type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default RecipeForm;
