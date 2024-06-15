import { postRecipe } from "@/actions";
import RecipeForm from "@/components/ui/form/Form";
import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function Recipes() {
  const session = await auth();
  const userID = session?.user?.id;

  if (!userID) {
    console.error("User not found");
    redirect("/");
  }
  return <RecipeForm submitAction={postRecipe} userID={userID} />;
}
