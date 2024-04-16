import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import type { NextApiRequest, NextApiResponse } from "next";
async function handler(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDB();
    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompt.", { status: 500 });
  }
}
export { handler as GET };
