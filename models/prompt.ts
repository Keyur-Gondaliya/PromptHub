import { Schema, model, models } from "mongoose";
const PropmptSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creator is required!"],
    },
    prompt: {
      type: String,
      required: [true, "Prompt is required!"],
    },
    tag: {
      type: String,
      required: [true, "Tag is required!"],
    },
  },
  { timestamps: true }
);
const Prompt = models.Prompt || model("Prompt", PropmptSchema);
export default Prompt;
