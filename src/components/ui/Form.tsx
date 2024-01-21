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

export default function Form2() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recipe Upload</CardTitle>
        <CardDescription>
          Fill out the form below to upload your recipe.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Enter recipe title" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea id="content" placeholder="Enter recipe content" />
          </div>
          <div className="space-y-2">
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
            <Input id="duration" placeholder="Enter duration" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ingredients">Ingredients</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="ingredient-1">Ingredient 1</Label>
                <Input id="ingredient-1" placeholder="Enter ingredient" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="ingredient-2">Ingredient 2</Label>
                <Input id="ingredient-2" placeholder="Enter ingredient" />
              </div>
            </div>
            <Button className="w-full" variant="outline">
              Add Ingredient
            </Button>
          </div>
          <div className="space-y-2">
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
            <Input id="makes" placeholder="Enter number of servings" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="where-from">Where From</Label>
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
  );
}
