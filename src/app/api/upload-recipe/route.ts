import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

export async function POST(req: Request, res: Response) {
  const { url } = await req.json();

  try {
    const result = await generateObject({
      model: openai("gpt-4-vision-preview"),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "this is a recipe, need you to return to me the title, ingredients, instructions, cook-time, difficuly, servings, notes, source and type",
            },
            {
              type: "image",
              image: new URL(url),
            },
          ],
        },
      ],
      schema: z.object({
        title: z.string(),
        ingredientSections: z.array(
          z.object({
            title: z.string(),
            ingredients: z.array(
              z.object({
                name: z.string(),
              })
            ),
          })
        ),
        content: z
          .string()
          .describe(
            "html rich text instructions method steps, use ordered lists create a 2 new html line inbetween each step Add title when nessery for new sections of instructions, Bolid Italics and highlights if needed "
          ),
        duration: z.number().describe("cook-time in minutes"),
        difficulty: z.enum(["easy", "medium", "hard"]),
        type: z.enum(["breakfast", "lunch", "dinner", "dessert"]),
        makes: z.number().describe("servings"),
        notes: z.string().optional(),
        whereFrom: z.string().optional().describe("source"),
      }),
    });

    const finalResult = result.object;

    return new Response(JSON.stringify({ finalResult }), {
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
