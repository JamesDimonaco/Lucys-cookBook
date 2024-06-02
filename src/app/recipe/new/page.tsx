import { postRecipe } from "@/actions";
import NewRecipeForm from "@/components/ui/form/Form";

export default async function Recipes() {
  // const testAI = await fetch("http://localhost:3000/api/upload-recipe", {
  //   method: "POST",
  //   cache: "no-cache",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     messages: [],
  //     prompt:
  //       "this is a recipe, need you to return to me the title, ingredients, instructions, cook-time, difficuly, servings",
  //   }),
  // });

  // console.log(await testAI.json());

  return (
    <main className="">
      {/* <Form defaultFromState={defaultFromState} post={postRecipe} /> */}
      <NewRecipeForm uploadRecipe={postRecipe} />
    </main>
  );
}
