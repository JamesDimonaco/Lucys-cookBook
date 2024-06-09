import { postRecipe } from "@/actions";
import RecipeForm from "@/components/ui/form/Form";

export default async function Recipes() {
  return <RecipeForm submitAction={postRecipe} />;
}
