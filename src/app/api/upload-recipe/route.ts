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
  console.log(messages);

  try {
    // const result = await streamObject({
    //   model: openai("gpt-4-vision-preview"),
    // messages: [
    //   {
    //     role: "user",
    //     content: [
    //       {
    //         type: "text",
    //         text: "this is a recipe, need you to return to me the title, ingredients, instructions, cook-time, difficuly, servings",
    //       },
    //       {
    //         type: "image",
    //         image: new URL(
    //           "https://cdn.discordapp.com/attachments/727496094019485797/1246435797834666064/image.png?ex=665c614b&is=665b0fcb&hm=8cad6148f6ae57a9fe2408749931fa7da143d8c1ae9c2f0ea2fbb98dc837e578&"
    //         ),
    //       },
    //     ],
    //   },
    // ],
    //   schema: z.object({
    //     title: z.string(),
    //     ingredients: z.string(),
    //     instructions: z.string(),
    //     cookTime: z.string(),
    //     difficulty: z.string(),
    //     servings: z.number(),
    //   }),
    // });
    // const finalResult = result.fullStream;
    // return new Response(JSON.stringify({ finalResult }), {
    //   headers: { "Content-Type": "application/json" },
    // });
  } catch (error) {
    console.log(error);

    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
