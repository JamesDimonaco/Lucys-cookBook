import { openai } from "@ai-sdk/openai";
import {
  StreamingTextResponse,
  streamText,
  StreamData,
  StreamObjectResult,
  streamObject,
} from "ai";
import { z } from "zod";

export async function POST(req: Request, res: Response) {
  const { messages, prompt } = await req.json();

  console.log(prompt);
  try {
    const result = await streamObject({
      model: openai("gpt-4-vision-preview"),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "this is a recipe, can you give me the title, ingredients, and instructions?",
            },
            {
              type: "image",
              image: new URL(
                "https://cdn.discordapp.com/attachments/727496094019485797/1246425611577331712/Untitled.PNG?ex=665c57cf&is=665b064f&hm=42b3c49387f1bc5581617ac35a6fe90926b6934119b7dff3167628ec14cfca59&"
              ),
            },
          ],
        },
      ],
      schema: z.object({
        title: z.string(),
        ingredients: z.string(),
        instructions: z.string(),
      }),
    });

    const finalResult = result.fullStream;
    return new Response(JSON.stringify({ finalResult }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);

    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
