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
import useIngredientSections from "@/hooks/useIngredientSections";

export default function NewRecipeForm() {
  const {
    ingredientSections,
    addIngredientSection,
    addIngredient,
    removeIngredient,
    updateSectionTitle,
    updateIngredientName,
  } = useIngredientSections();

  return (
    <div className="w-full">
      <Card className="p-4 md:p-6 lg:p-8 w-full">
        <CardHeader>
          <CardTitle>Recipe Upload</CardTitle>
          <CardDescription>
            Fill out the form below to upload your recipe.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Enter recipe title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="Enter recipe description" />
            </div>
            <div className="space-y-2 col-span-1 md:col-span-2">
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" placeholder="Enter recipe content" />
            </div>
            <div className="space-y-2 col-span-1 md:col-span-2">
              <Label htmlFor="image-url">Image URL</Label>
              <Input id="image-url" placeholder="Enter image URL" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select>
                <SelectTrigger id="difficulty">
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
                type="number"
                id="duration"
                placeholder="Enter duration in minutes"
              />
            </div>
            {ingredientSections.map((section) => (
              <div
                key={section.id}
                className="space-y-2 col-span-1 md:col-span-2"
              >
                <Label htmlFor={section.id}>{section.title}</Label>
                <Input
                  id={section.id}
                  placeholder="Enter section title"
                  onChange={(e) =>
                    updateSectionTitle(section.id, e.target.value)
                  }
                />
                {section.ingredients.map((ingredient) => (
                  <div
                    key={ingredient.id}
                    className="flex items-center space-x-2"
                  >
                    <Input
                      placeholder="Enter ingredient"
                      value={ingredient.name}
                      onChange={(e) =>
                        updateIngredientName(
                          section.id,
                          ingredient.id,
                          e.target.value
                        )
                      }
                    />
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        removeIngredient(section.id, ingredient.id);
                      }}
                      variant="destructive"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    addIngredient(section.id);
                  }}
                  className="w-full"
                >
                  Add Ingredient
                </Button>
              </div>
            ))}
            <Button
              onClick={(e) => {
                e.preventDefault();
                addIngredientSection();
              }}
              variant="outline"
              className="w-full col-span-1 md:col-span-2"
            >
              Add Ingredient Section
            </Button>
            <div className="space-y-2 col-span-1 md:col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Enter notes" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input id="tags" placeholder="Enter tags" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select>
                <SelectTrigger id="type">
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
              <Label htmlFor="makes">Makes</Label>
              <Input
                type="number"
                id="makes"
                placeholder="Enter number of servings"
              />
            </div>
            <div className="space-y-2 col-span-1 md:col-span-2">
              <Label htmlFor="where-from">Source</Label>
              <Input id="where-from" placeholder="Enter source" />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            Upload Recipe
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
