import { Metadata } from "next";
import { Suspense } from "react";
import UpdatePrompt from "./UpdatePrompt";
export const metadata: Metadata = {
  title: "Update Prompt",
};

function UpdatePromptContainer() {
  return (
    <Suspense>
      <UpdatePrompt />
    </Suspense>
  );
}

export default UpdatePromptContainer;
