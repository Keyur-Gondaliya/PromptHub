import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: Request) {
  try {
    const { userId, prompt, tag } = await req.json();
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response("Failed to create new prompt.", { status: 500 });
  }
}
export { handler as POST };
