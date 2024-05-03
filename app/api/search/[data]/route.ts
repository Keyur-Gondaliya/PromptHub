import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
export async function GET(
  req: Request,
  { params }: { params: { data: string } }
) {
  try {
    await connectToDB();
    const prompt = await Prompt.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "creator",
          foreignField: "_id",
          as: "creator",
        },
      },
      {
        $unwind: "$creator", // Ensure creator is not an array
      },
      {
        $match: {
          $or: [
            { prompt: { $regex: params.data, $options: "i" } },
            { tag: { $regex: params.data, $options: "i" } },
            { "creator.username": { $regex: params.data, $options: "i" } },
          ],
        },
      },
    ]);

    if (!prompt) {
      return new Response("Prompt Not Found.", { status: 404 });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to find prompt.", { status: 500 });
  }
}
