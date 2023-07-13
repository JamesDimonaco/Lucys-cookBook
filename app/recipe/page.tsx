import Form from "../components/Form";
import { postRecipe } from "../actions";

export default async function Recipes() {
  const defaultFromState = {
    title: "",
    content: "",
    imageUrl: "",
    difficulty: "easy",
    duration: 0,
    ingredients: [],
    notes: "",
    tags: [],
    whereFrom: "",
    authorId: "",
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <Form defaultFromState={defaultFromState} post={postRecipe} />
    </main>
  );
}
