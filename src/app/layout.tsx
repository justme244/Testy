import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Testy - QA Test Management",
  description: "Frontend awal platform manajemen tes untuk QA Engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
