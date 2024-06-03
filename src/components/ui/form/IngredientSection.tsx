import { IIngredient, IIngredientSection } from "@/types/recipeTypes";
import { Input } from "../input";
import { Label } from "../label";
import useIngredientSections from "@/hooks/useIngredientSections";
import { Button } from "../button";
import { FaTrash } from "react-icons/fa";

interface IngredientSectionProps {
  initialData?: IIngredientSection[];
}

export default function IngredientSection({
  initialData,
}: IngredientSectionProps) {
  const {
    ingredientSections,
    addIngredientSection,
    addIngredient,
    removeIngredient,
    updateSectionTitle,
    updateIngredientName,
    removeIngredientSection,
  } = useIngredientSections(initialData);

  return (
    <>
      {ingredientSections.map((section, sectionIndex) => (
        <div key={section.id} className="space-y-2 col-span-1 md:col-span-2">
          <div className="flex justify-between">
            <Label htmlFor={section.id}>{section.title}</Label>
            {ingredientSections.length > 1 && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  removeIngredientSection(section.id);
                }}
                variant="destructive"
              >
                <FaTrash color="black" />
              </Button>
            )}
          </div>
          <Input
            name={`ingredientSectionTitle-${sectionIndex}`}
            id={section.id}
            value={section.title}
            placeholder="Enter section title"
            onChange={(e) => updateSectionTitle(section.id, e.target.value)}
          />
          {section.ingredients.map(
            (ingredient: IIngredient, ingredientIndex: number) => (
              <div key={ingredient.id} className="flex items-center space-x-2">
                <Input
                  name={`ingredient-${sectionIndex}-${ingredientIndex}`}
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
                  <FaTrash color="black" />
                </Button>
              </div>
            )
          )}
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
