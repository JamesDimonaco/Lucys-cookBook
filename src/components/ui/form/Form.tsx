"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { IRecipe } from "@/types/recipeTypes";
import IngredientSection from "./IngredientSection";
import UploadButton from "@/components/UploadButton";
import { useState } from "react";
import RichTextInput from "./editor/RichTextInput";

type SubmitAction = (formData: FormData) => void;

interface RecipeFormProps {
  initalRecipe?: IRecipe;
  submitAction: SubmitAction;
}

export default function RecipeForm({
  initalRecipe,
  submitAction,
}: RecipeFormProps) {
  const isEditMode = !!initalRecipe;
  const [recipe, setRecipe] = useState<IRecipe | undefined>(initalRecipe);
  const [loading, setLoading] = useState(false);

  const uploadImage = async (imageUrl: string) => {
    setLoading(true);
    try {
      console.log("Image URL: ", imageUrl);
      const response = await fetch("http://localhost:3000/api/upload-recipe", {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: imageUrl,
        }),
      });
      const data = await response.json();
      setRecipe(data.finalResult);
      console.log("Data: ", data);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("Recipe: ", recipe);

  return (
    <div className="w-full">
      <Card className="p-4 md:p-6 lg:p-8 w-full">
        <CardHeader>
          <CardTitle>{isEditMode ? "Edit Recipe" : "Create Recipe"}</CardTitle>
          <UploadButton onSubmit={uploadImage} />
          <CardDescription>
            {isEditMode
              ? "Update the recipe details below."
              : "Fill out the form below to create a new recipe."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={submitAction}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {isEditMode && <input type="hidden" name="id" value={recipe?.id} />}
            <div className="space-y-2 col-span-2">
              <Label htmlFor="title">Title</Label>
              <Input
                name="title"
                id="title"
                placeholder="Enter recipe title"
                defaultValue={recipe?.title}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="content">Method</Label>
              <RichTextInput
                name="content"
                content={recipe?.content ?? ""}
                onChange={(newContent) =>
                  setRecipe((prevRecipe) => ({
                    ...prevRecipe!,
                    content: newContent,
                  }))
                }
              />
            </div>
            <div className="space-y-2 col-span-1 md:col-span-2">
              <Label htmlFor="image-url">Image URL</Label>
              <Input
                name="image-url"
                id="image-url"
                placeholder="Enter image URL"
                defaultValue={recipe?.imageUrl ?? ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select defaultValue={recipe?.difficulty || ""}>
                <SelectTrigger
                  defaultValue={recipe?.difficulty || ""}
                  name="difficulty"
                  id="difficulty"
                >
                  <SelectValue
                    defaultValue={recipe?.difficulty || ""}
                    placeholder="Select difficulty"
                  />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                name="duration"
                type="number"
                id="duration"
                placeholder="Enter duration in minutes"
                defaultValue={recipe?.duration || ""}
              />
            </div>
            <IngredientSection initialData={recipe?.ingredientSections || []} />
            <div className="space-y-2 col-span-1 md:col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                name="notes"
                id="notes"
                placeholder="Enter notes"
                defaultValue={recipe?.notes || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                name="tags"
                id="tags"
                placeholder="Enter tags"
                defaultValue={recipe?.tags?.join(", ") || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select name="type" defaultValue={recipe?.type || "none"}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                  <SelectItem value="dessert">Dessert</SelectItem>
                  <SelectItem value="snack">Snack</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="makes">Servings</Label>
              <Input
                name="makes"
                type="number"
                id="makes"
                placeholder="Enter number of servings"
                defaultValue={recipe?.makes || ""}
              />
            </div>
            <div className="space-y-2 col-span-1 md:col-span-2">
              <Label htmlFor="where-from">Source</Label>
              <Input
                name="whereFrom"
                id="where-from"
                placeholder="Enter source"
                defaultValue={recipe?.whereFrom || ""}
              />
            </div>
            <CardFooter className="col-span-2">
              <Button className="w-full" type="submit">
                {isEditMode ? "Update Recipe" : "Create Recipe"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
