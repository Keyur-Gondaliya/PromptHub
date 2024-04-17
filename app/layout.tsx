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
    "Discover diverse prompts to test and enhance LLM capabilities! Explore the PromptHub for AI research and development. #AI #PromptHub",
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
