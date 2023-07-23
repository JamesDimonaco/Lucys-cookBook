import Form from "../components/Form";
import { postRecipe } from "../actions";

export default async function Recipes() {
  const defaultFromState = {
    title: "",
    content: "",
    imageUrl: "",
    difficulty: "easy",
    type: "",
    duration: 0,
    ingredients: [{ title: "", ingredients: [] }],
    notes: "",
    tags: [],
    makes: 0,
    whereFrom: "",
    authorId: "",
  };

  return (
    <main className="">
      <Form defaultFromState={defaultFromState} post={postRecipe} />
    </main>
  );
}
