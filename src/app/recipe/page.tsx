import Form from "../../components/Form";
import { postRecipe } from "../../actions";
import Form2 from "@/components/ui/Form";

export default async function Recipes() {
  const defaultFromState = {
    title: "",
    content: "",
    imageUrl: "",
    difficulty: "easy",
    type: "",
    duration: 0,
    ingredientSections: [{ title: "", ingredients: [] }],
    notes: "",
    tags: [],
    makes: 0,
    whereFrom: "",
    authorId: "",
  };

  return (
    <main className="">
      {/* <Form defaultFromState={defaultFromState} post={postRecipe} /> */}
      <Form2 />
    </main>
  );
}
