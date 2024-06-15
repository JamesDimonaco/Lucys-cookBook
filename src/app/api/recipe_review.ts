export async function CREATE_RECIPE_REVIEW(image_url: string, user_id: string) {
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:3232";

  try {
    const previewRecipe = await fetch(`${backendUrl}/create_recipe_preview`, {
      method: "POST",
      cache: "no-cache",
      next: { revalidate: 1 }, // Add this line
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image_url,
        user_id,
      }),
    });

    const previewRecipeJson = await previewRecipe.json();

    const modifiedPreviewRecipeJson = {
      ...previewRecipeJson,
      whereFrom: previewRecipeJson.where_from,
      ingredientSections: previewRecipeJson.ingredient_sections,
      type: previewRecipeJson.type_,
    };

    return modifiedPreviewRecipeJson;
  } catch (error) {
    console.error("Error: ", error);

    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
