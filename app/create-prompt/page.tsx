import CreatePrompt from "./CreatePrompt";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Update Prompt",
};

function CreatePromptContainer() {
  return <CreatePrompt />;
}

export default CreatePromptContainer;
