import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || ""),
  title: {
    default: "PromptHub | Unlock Your AI Potential with Abundance AI Prompts",
    template: "%s | PromptHub",
  },
  description:
    "The PromptHub is a collection of prompts that are useful to test the capabilities of LLMs on a variety of fundamental capabilities and complex tasks. We hope the Prompt Hub helps you discover interesting ways to leverage, experiment, and build with LLMs. We encourage and welcome contributions from the AI research and developer community.",
  twitter: { card: "summary_large_image" },
  verification: { google: process.env.GOOGLE_VERIFICATION_CONTENT },
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
