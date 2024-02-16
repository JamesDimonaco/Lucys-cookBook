import NewRecipeForm from "@/components/ui/Form";

export default async function Recipes() {
  return (
    <main className="">
      {/* <Form defaultFromState={defaultFromState} post={postRecipe} /> */}
      <NewRecipeForm />
    </main>
  );
}
