import { postRecipe } from "@/actions";
import NewRecipeForm from "@/components/ui/form/Form";

export default async function Recipes() {
  return (
    <main className="">
      {/* <Form defaultFromState={defaultFromState} post={postRecipe} /> */}
      <NewRecipeForm uploadRecipe={postRecipe} />
    </main>
  );
}

// const testAI = await fetch("http://localhost:3000/api/upload-recipe", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     messages: [
//       {
//         role: "user",
//         content: [
//           {
//             type: "text",
//             text: "this is a recipe, need you to return to me the title, ingredients, instructions, cook-time, difficuly, servings",
//           },
//           {
//             type: "image",
//             image: new URL(
//               "https://cdn.discordapp.com/attachments/727496094019485797/1246435797834666064/image.png?ex=665c614b&is=665b0fcb&hm=8cad6148f6ae57a9fe2408749931fa7da143d8c1ae9c2f0ea2fbb98dc837e578&"
//             ),
//           },
//         ],
//       },
//     ],
//   }),
// });
