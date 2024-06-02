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
import RichEditor from "./editor/RichEditor";

type SubmitAction = (formData: FormData) => void;

interface RecipeFormProps {
  recipe?: IRecipe | null;
  submitAction: SubmitAction;
}

export default function RecipeForm({ recipe, submitAction }: RecipeFormProps) {
  const isEditMode = !!recipe;

  console.log(isEditMode, recipe);

  return (
    <div className="w-full">
      <Card className="p-4 md:p-6 lg:p-8 w-full">
        <CardHeader>
          <CardTitle>{isEditMode ? "Edit Recipe" : "Create Recipe"}</CardTitle>
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
              <RichEditor content={recipe?.content ?? ""} />
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
              <Select defaultValue={recipe?.difficulty || "none"}>
                <SelectTrigger name="difficulty" id="difficulty">
                  <SelectValue placeholder="Select difficulty" />
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
              <Select defaultValue={recipe?.type || "none"}>
                <SelectTrigger name="type" id="type">
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
                name="servings"
                type="number"
                id="servings"
                placeholder="Enter number of servings"
                defaultValue={recipe?.makes || ""}
              />
            </div>
            <div className="space-y-2 col-span-1 md:col-span-2">
              <Label htmlFor="where-from">Source</Label>
              <Input
                name="source"
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
