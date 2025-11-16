import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Avro Wiki - Knowledge Base",
  description: "Obsidian-compatible wiki with sidebar and treeview",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
