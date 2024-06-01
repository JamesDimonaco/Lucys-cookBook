import NewRecipeForm from "@/components/ui/Form";

export default async function Recipes() {
  const testAI = await fetch("http://localhost:3000/api/AI", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: "tell me a joke",
    }),
  });

  const data = await testAI.json();
  console.log(data);
  return (
    <main className="">
      {/* <Form defaultFromState={defaultFromState} post={postRecipe} /> */}
      <NewRecipeForm />
    </main>
  );
}
