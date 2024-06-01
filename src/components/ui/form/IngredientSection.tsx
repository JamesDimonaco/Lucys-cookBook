import { IIngredient } from "@/types/recipeTypes";
import { Input } from "../input";
import { Label } from "../label";
import useIngredientSections from "@/hooks/useIngredientSections";
import { Button } from "../button";

export default function IngredientSection() {
  const {
    ingredientSections,
    addIngredientSection,
    addIngredient,
    removeIngredient,
    updateSectionTitle,
    updateIngredientName,
  } = useIngredientSections();

  return (
    <>
      {ingredientSections.map((section) => (
        <div key={section.id} className="space-y-2 col-span-1 md:col-span-2">
          <Label htmlFor={section.id}>{section.title}</Label>
          <Input
            id={section.id}
            placeholder="Enter section title"
            onChange={(e) => updateSectionTitle(section.id, e.target.value)}
          />
          {section.ingredients.map((ingredient: IIngredient) => (
            <div key={ingredient.id} className="flex items-center space-x-2">
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
    </>
  );
}
