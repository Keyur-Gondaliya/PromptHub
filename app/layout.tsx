import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "PromptHub", template: "%s | PromptHub" },
  description: "Share Secret Hack AI Prompts",
  twitter: { card: "summary_large_image" },
  verification: { google: process.env.GOOGLE_VERIFICATION_CONTENT },
  alternates: { canonical: process.env.NEXTAUTH_URL },
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
