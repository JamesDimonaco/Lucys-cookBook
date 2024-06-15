export async function POST(req: Request, res: Response) {
  const { url } = await req.json();

  const backendUrl = process.env.BACKEND_API_URL || "http://localhost:3232";
  try {
    const previewRecipe = await fetch(`${backendUrl}/create_recipe_preview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image_url: url,
        user_id: "67e55044-10b1-426f-9247-bb680e5fe0c8",
      }),
    });

    const previewRecipeJson = await previewRecipe.json();
    const modifiedPreviewRecipeJson = {
      ...previewRecipeJson,
      whereFrom: previewRecipeJson.where_from,
      ingredientSections: previewRecipeJson.ingredient_sections,
      type: previewRecipeJson.type_,
    };

    return new Response(JSON.stringify(modifiedPreviewRecipeJson), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error: ", error);

    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
